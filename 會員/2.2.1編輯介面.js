
//提交編輯資料
function confirmEdit() {
	event.preventDefault();
	
	var urlParams = new URLSearchParams(window.location.search);
    var memberId = urlParams.get('member_id');
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var dataObject = {
        "id": memberId,
        "username": username,
        "password": password,
        "newStatus" : "none"
    };
     var data_string = JSON.stringify(dataObject);
     
     // 發出POST的AJAX請求
    $.ajax({
        type: "PUT",
        url: "/MovieReviw/api/UserController.do",
        data: data_string,
        crossDomain: true,
        cache: false,
        dataType: 'json',
        timeout: 5000,
        success: function (response) {
            if(response.updatecode == 1){
                window.location.replace('2.2會員資料介面.html?member_id=' + memberId);
            } else {
				swal("編輯資料失敗",response.message, "error");
                //alert(response.message);
            }
        },
        error: function () {
            alert("無法連線到伺服器！");
        }
    });

    return false; // 防止表單提交

    
}

//獲得會員資訊
function getAccount() {
	var urlParams = new URLSearchParams(window.location.search);
    var memberId = urlParams.get('member_id');
    
    $.ajax({
        type: 'GET',
        url: '/MovieReviw/api/UserController.do',
        data: "member_id=" + memberId,
        crossDomain: true,
        cache: false,
        dataType: 'json',
        success: function(response) {
			// 在這裡處理後端的回應
            if(response.state == 200){
                  updateMemberData(response.response.data) ;   
            }
            console.log(response);
        },
        error: function(error) {
            // 處理錯誤的回應
            console.error(error);
        }
    });
    
}
function updateMemberData(datas) {
	$.each(datas, function(index, data) {
		document.getElementById('mem').innerHTML = data.member_name;
		$('#logo').attr('href', '2.網站首頁介面.html?member_id=' + data.member_id);
		$('#edit').attr('href', '2.2.1編輯介面.html?member_id=' + data.member_id);
		document.getElementById('username').value = data.member_name;
        document.getElementById('account').value = data.member_email;
        document.getElementById('password').value = data.member_password;
	});
}
$(document).ready(function() {
    getAccount() ;
});