
//登入判斷
function showConfirmation() {
	event.preventDefault();
    // 獲取帳號和密碼的值
    var account = document.querySelector('#account').value;
    var password = document.querySelector('#password').value;

    var dataObject = {
        "username": "none",
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
            if (response.logincode == 1) {
                checklogin(response.response.data);
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

//登入跳轉
function checklogin(datas) {
    $.each(datas, function (index, data) {
        if (data.member_status == true) {
            if (data.member_level == 1) {
                alert('登入成功！');
                window.location.replace('../會員/2.網站首頁介面.html?member_id=' + data.member_id);
            } else if (data.member_level == 2) {
                alert('登入成功！');
                window.location.replace('../引進商/4.電影資訊管理介面.html?importer_id=' + data.member_id);
            } else if (data.member_level == 3) {
                alert('尚未準備');
                window.location.replace('../../index.html');
            } else if (data.member_level == 0) {
                alert('登入成功！');
                window.location.replace('../管理員/3.管理員權限介面.html?admin_id=' + data.member_id);
            } else {
                alert('未知的會員等級');
            }
        } else {
            alert('帳號被停權，無法登入。返回首頁。');
            window.location.replace('../../index.html');
        }
    });
}
