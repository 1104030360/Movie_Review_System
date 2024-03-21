
//新增引進商
function confirmAdd() {
	var urlParams = new URLSearchParams(window.location.search);
    var adminId = urlParams.get('admin_id');
    var businessNumber = $('#businessNumber').val();
    var name = $('#name').val();
    var account = $('#account').val();
    var password = $('#password').val();
    
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	var isValid = regex.test(account);
	
	
	//空欄位
	 if (businessNumber.trim() === '' || name.trim() === '' || account.trim() === '' || password.trim() === '') {
        swal("欄位不得為空", "請填寫所有必填欄位", "error");
        console.log("請填寫所有必填欄位");
        return false;
    }

	//email格式判斷
	if (!isValid) {
		swal("帳號格式有誤", "email格式不正確", "error");
	    console.log("帳號格式不正確(要有'@')");
	    //window.location.replace('1.2.1註冊介面.html');
        return false;
     }
     
     //營業字號
    if (!/^\d+$/.test(businessNumber)) {
        swal("營業字號格式有誤", "營業字號應該為數字", "error");
        console.log("營業字號格式不正確(應該為數字)");
        return false;
    }

    var dataObject = {
        "businessNumber": businessNumber,
        "username": name,
        "email": account,
        "password": password
    };

    var dataString = JSON.stringify(dataObject);

    $.ajax({
        url: '/MovieReviw/api/UserController.do',
        method: 'POST',
        data: dataString,
        crossDomain: true,
        cache: false,
        dataType: 'json',
        success: function(response) {
            console.log(response);
            if(response.registercode == 1) {
				window.location.href = '3.2帳號管理介面.html?admin_id=' + adminId;
			}
			else {
				swal("引進商新增失敗",response.message, "error");
				//alert(response.message);
			} 
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}
function cancel() {
	var urlParams = new URLSearchParams(window.location.search);
    var adminId = urlParams.get('admin_id');
    window.location.href = '3.2帳號管理介面.html?admin_id=' + adminId;
}