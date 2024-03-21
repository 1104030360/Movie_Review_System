
//確認註冊格式
function showConfirmation() {
	event.preventDefault();
    var username = document.querySelector('#username').value;
    var account = document.querySelector('#account').value;
    var password = document.querySelector('#password').value;
    
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	var isValid = regex.test(account);

	//email格式判斷
	if (!isValid) {
		swal("帳號格式有誤", "email格式不正確", "error");
	    console.log("帳號格式不正確(要有'@')");
	    //window.location.replace('1.2.1註冊介面.html');
        return false;
     }
	

    
    var dataObject = {
        "username": username,
        "email": account,
        "password": password,
        "businessNumber": "none"
    };
     var data_string = JSON.stringify(dataObject);
    // 發出POST的AJAX請求
    $.ajax({
        type: "POST",
        url: "/MovieReviw/api/UserController.do",
        data: data_string,
        crossDomain: true,
        cache: false,
        dataType: 'json',
        timeout: 5000,
        success: function (response) {
            if (response.registercode == 1) {
                login(response.response.data);
            } else {
				swal("系統錯誤", response.message, "error");
                //alert(response.message);
            }
        },
        error: function () {
            alert("無法連線到伺服器！");
        }
    });

    return false; // 防止表單提交
}

//自動跳轉登入
function login (datas) {
	$.each(datas, function (index, data) {
          alert('註冊成功！系通將自動登入');
          window.location.replace('../會員/2.網站首頁介面.html?member_id=' + data.member_id);
		
	});
}