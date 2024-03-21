function uploadMovie() {
	var urlParams = new URLSearchParams(window.location.search);
    var importerId = urlParams.get('importer_id');
	var movieName = $("#movieName").val();
    var rating = $("#rating").val();
    var releaseDate = $("#releaseDate").val();
    var duration = $("#duration").val();
    var trailerLink = $("#trailerLink").val();
    var movieInfo = $("#movieInfo").val();
    var moviePoster = $("#moviePoster")[0].files[0];
    
    var posterPreview = $("#posterPreview")[0];
    if (moviePoster) {
        var reader = new FileReader();
        reader.onload = function (e) {
            posterPreview.src = e.target.result;
            posterPreview.style.display = 'block';
        };
        reader.readAsDataURL(moviePoster);
    }
    
    var formData = new FormData(document.getElementById('uploadForm'));
    formData.append("movieName", movieName);
    formData.append("rating", rating);
    formData.append("releaseDate", releaseDate);
    formData.append("duration", duration);
    formData.append("trailerLink", trailerLink);
    formData.append("movieInfo", movieInfo);
    formData.append("moviePoster", moviePoster);
    formData.append("action", "1");
    formData.append("importer_id", importerId);
    console.log(rating) ;


    // 檢查欄位是否為空
    if (!document.getElementById('uploadForm').checkValidity()) {
        swal("電影上架失敗", "請填寫所有必填欄位", "error");
        return false; // 防止表单提交
    } else {
        $.ajax({
            url: '/MovieReviw/api/MovieAnotherController.do',
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                alert(response.message);
                window.location.replace('4.2歷史上架電影介面.html?importer_id=' + importerId);
            },
            error: function (error) {
                console.error(error);
            }
        });
    }
}
function cancelUpload() {
	var urlParams = new URLSearchParams(window.location.search);
    var importerId = urlParams.get('importer_id');
    window.location.replace('4.電影資訊管理介面.html?importer_id=' + importerId);
}