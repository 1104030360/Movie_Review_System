$(document).ready(function() {
    	var urlParams = new URLSearchParams(window.location.search);
        var adminId = urlParams.get('admin_id');
        $('#admin1').attr('href', '3.2帳號管理介面.html?admin_id=' + adminId);
        $('#admin2').attr('href', '3.1電影管理介面.html?admin_id=' + adminId);
        $('#add-importer').attr('href', '3.2.1新增引進商介面.html?admin_id=' + adminId);
        getAccount();
}); 

//獲得所有帳號資訊
function getAccount() {
		var urlParams = new URLSearchParams(window.location.search);
        var adminId = urlParams.get('admin_id');
	
	  $.ajax({
        type: 'GET',
        url: '/MovieReviw/api/UserController.do',
        data: "admin_id=" + adminId,
        crossDomain: true,
        cache: false,
        dataType: 'json',
         success: function(response) {
			// 在這裡處理後端的回應
            if(response.state == 200){
				console.log(response);
                updateSections(response.response.data) ;   
            }
            console.log(response);
        },
        error: function(error) {
            // 處理錯誤的回應
            console.error(error);
        }
    });
	
}

//將帳號分等級，然後填回相對應的區域
function updateSections(data) {
	console.log(data);
	
    $('#memberTableBody').empty();
    $('#distributorTableBody').empty();
    $('#supplierTableBody').empty();

    $.each(data, function(index, account) {
        var row = '<tr>' +
                      '<td>' + account.member_name + '</td>' +
                      '<td>' + account.member_email + '</td>' +
                       '<td>' + account.member_password + '</td>' +
                      '<td>' + getStatusLabel(account.member_status) + '</td>';

        //引進商、放映商
        if (account.member_level === '2' || account.member_level === '3') {
            row += '<td>' + account.member_info + '</td>';
        }

        row += '<td class="actions">' +
                   '<button onclick="changeStatus(this)" data-id="' + account.member_id + '">' + initialButton(account.member_status) + '</button>';

        // 只有會員的帳號能刪除
        if (account.member_level === '1') {
            row += '<button onclick="deleteMember(this)" data-id="' + account.member_id + '">刪除</button>';
        }

        row += '</td>' +
               '</tr>';

        var sectionClass = getSectionClass(account.member_level);
        $('#' + sectionClass).append(row);
    });
}

function getSectionClass(accountLevel) {
	console.log(accountLevel) ;
    switch (accountLevel) {
        case '1':
            return 'memberTableBody';
        case '2':
            return 'distributorTableBody';
        case '3':
            return 'supplierTableBody';
        default:
            return '';
    }
}

//變更帳號狀態
function changeStatus(button) {
    const accountId = $(button).data('id');
    const row = $(button).closest('tr');
    const statusCell = row.find('td:nth-child(4)');
    const status = statusCell.text().trim();
    
     var dataObject = {
        "id" : accountId,
        "newStatus" : (status === 'Active') ? "0" : "1" ,
        "username": "none",
        "password": "none"
    };
     var data_string = JSON.stringify(dataObject);

    $.ajax({
        url: '/MovieReviw/api/UserController.do', 
        method: 'PUT',
        data: data_string,
        crossDomain: true,
        cache: false,
        dataType: 'json',
         success: function(response) {
			// 在這裡處理後端的回應
            if(response.state == 200){
				console.log(response);
                getAccount() ;   
            }
            console.log(response);
        },
        error: function(error) {
            // 處理錯誤的回應
            console.error(error);
        }
    });
}
function deleteMember(button) {
    const accountId = $(button).data('id');

    var dataObject = {
        "id": accountId,
    };
     var data_string = JSON.stringify(dataObject);

    if (confirm('確定要刪除帳號？\n按下確認，帳號將會永久刪除。')) {
		 $.ajax({
        type: "DELETE",
        url: "/MovieReviw/api/UserController.do",
        data:  data_string,
        crossDomain: true,
        cache: false,
        dataType: 'json',
        timeout: 5000,
        success: function (response) {
            if(response.deletecode == 1){
				swal("帳號刪除成功",response.message, "success");
				//alert(response.message);
                getAccount();
            } else {
				swal("帳號刪除失敗",response.message, "error");
                //alert(response.message);
            }
        },
        error: function () {
            alert("無法連線到伺服器！");
        }
    });
        
    } else {
        return false;
    }
}
function getStatusLabel(accountStatus) {
    return (accountStatus === true) ? 'Active' : 'Inactive';
}
function initialButton (accountStatus) {
    return (accountStatus === true) ? '停權' : '復權';
}
