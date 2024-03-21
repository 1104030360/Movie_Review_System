function BackToPrevious(){
	var urlParams = new URLSearchParams(window.location.search);
    var movieId = urlParams.get('movie_id');
    var urlParams = new URLSearchParams(window.location.search);
    var importerId = urlParams.get('importer_id');
    window.location.replace('4.1.1新增演員介面.html?importer_id=' + importerId + '&movie_id=' + movieId );
}
function addNewActor() {
	var urlParams = new URLSearchParams(window.location.search);
    var movieId = urlParams.get('movie_id');
    var urlParams = new URLSearchParams(window.location.search);
    var importerId = urlParams.get('importer_id');
	var actorName = $("#actorName").val();
    var actorBirthday = $("#actorBirthday").val();
    var actorGender = $("#actorGender").val();
    var actorIntroduction = $("#actorIntroduction").val();
    var actorImage = $("#actorImage")[0].files[0];
    
    
    
    var formData = new FormData(document.getElementById('uploadForm'));
    formData.append("actorName", actorName);
    formData.append("actorBirthday", actorBirthday);
    formData.append("actorGender", actorGender);
    formData.append("actorIntroduction", actorIntroduction);
    formData.append("actorImage", actorImage);
    formData.append("action", "1");



    // 檢查欄位是否為空
    if (actorName === '' || actorIntroduction === '' ||  actorBirthday === '' ||  actorImage === '' ||  actorGender === '' ) {
		swal("演員添加失敗", "請填寫所有必填欄位", "error");
        //alert('請填寫所有必填欄位');
        return false; // 防止表單提交
    } else {
		$.ajax({
	        url: '/MovieReviw/api/ActorAnotherController.do',
	        type: "POST",
	        data: formData,
	        processData: false,
	        contentType: false,
	        success: function (response) {
	            alert(response.message);
	            window.location.replace('4.1.1.1演員添加介面.html?importer_id=' + importerId + '&movie_id=' + movieId );
	        },
	        error: function (error) {
	            console.error(error);
	        }
    	});
        
    }
}