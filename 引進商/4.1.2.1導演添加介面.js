function BackToPrevious(){
	var urlParams = new URLSearchParams(window.location.search);
    var movieId = urlParams.get('movie_id');
    var urlParams = new URLSearchParams(window.location.search);
    var importerId = urlParams.get('importer_id');
    window.location.replace('4.1.2新增導演介面.html?importer_id=' + importerId + '&movie_id=' + movieId );
}

//新增導演
function addNewDirector() {
	var urlParams = new URLSearchParams(window.location.search);
    var movieId = urlParams.get('movie_id');
    var urlParams = new URLSearchParams(window.location.search);
    var importerId = urlParams.get('importer_id');
	var directorName = $("#directorName").val();
    var directorBirthday = $("#directorBirthday").val();
    var directorGender = $("#directorGender").val();
    var directorIntroduction = $("#directorIntroduction").val();
    var directorImage = $("#directorImage")[0].files[0];
    
    
    var formData = new FormData(document.getElementById('uploadForm'));
    formData.append("directorName", directorName);
    formData.append("directorBirthday", directorBirthday);
    formData.append("directorGender", directorGender);
    formData.append("directorIntroduction", directorIntroduction);
    formData.append("directorImage", directorImage);
    formData.append("action", "1");


    // 檢查欄位是否為空
    if (directorName === '' || directorIntroduction === '' ||  directorBirthday === '' ||  directorImage === '' ||  directorGender === '' ) {
		swal("導演添加失敗", "請填寫所有必填欄位", "error");
        //alert('請填寫所有必填欄位');
        return false; // 防止表單提交
    } else {
		$.ajax({
	        url: '/MovieReviw/api/DirectorAnotherController.do',
	        type: "POST",
	        data: formData,
	        processData: false,
	        contentType: false,
	        success: function (response) {
	            alert(response.message);
	            window.location.replace('4.1.2.1導演添加介面.html?importer_id=' + importerId + '&movie_id=' + movieId );
	        },
	        error: function (error) {
	            console.error(error);
	        }
    	});
        
    }
}