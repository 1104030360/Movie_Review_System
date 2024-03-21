 $(document).ready(function() {
        getMovieData();
 });
 
//將電影資訊填回去欄位
function getMovieData() {
    var urlParams = new URLSearchParams(window.location.search);
    var movieId = urlParams.get('movie_id');
    
    $.ajax({
        url: '/MovieReviw/api/MovieAnotherController.do',
        type: 'GET',
        data:"movie_id=" + movieId,
        crossDomain: true,
        cache: false,
        dataType: 'json',
        success: function(response) {
            // 在這裡處理後端的回應
            if (response.state == 200) {
                fillFormWithMovieData(response.response.data);
            }
            else {
				console.log(response.message);
			}
            
            console.log(response);
        },
        error: function() {
            // 處理錯誤
            console.error('無法連接到後端API');
        }
    });
}
function fillFormWithMovieData(movieData) {
    $.each(movieData, function(index, movie) {
        var formattedDate = formatDate(movie.date);

        $('#movieName').val(movie.name);
        $('#rating').val(movie.rlevel);
        $('#releaseDate').val(formattedDate);

        $('#duration').val(movie.length);
        $('#trailerLink').val(movie.trailer);
        $('#movieInfo').val(movie.intro);

        var posterPath = '../Poster/' + movie.poster;
        $('#posterPreview').attr('src', posterPath).show();
    });
    function formatDate(inputDate) {
        var dateParts = inputDate.split('/');
        return dateParts[0] + '-' + dateParts[1] + '-' + dateParts[2];
    }
}

//提交編輯後的電影資訊
function uploadMovie() {
    var urlParams = new URLSearchParams(window.location.search);
    var movieId = urlParams.get('movie_id');
    var urlParams = new URLSearchParams(window.location.search);
    var importerId = urlParams.get('importer_id');
    
    var movieName = $("#movieName").val();
    var rating = $("#rating").val();
    var releaseDate = $("#releaseDate").val();
    var duration = $("#duration").val();
    var trailerLink = $("#trailerLink").val();
    var movieInfo = $("#movieInfo").val();
    var moviePoster = $("#moviePoster")[0].files[0];
    
    var formData = new FormData(document.getElementById('uploadForm'));
    formData.append("movieName", movieName);
    formData.append("rating", rating);
    formData.append("releaseDate", releaseDate);
    formData.append("duration", duration);
    formData.append("trailerLink", trailerLink);
    formData.append("movieInfo", movieInfo);
    formData.append("action", "2");
    formData.append("movie_id", movieId);

    if (moviePoster) {
        formData.append("moviePoster", moviePoster);
        formData.append("isNewPoster", "1");
    }else {
		formData.append("isNewPoster", "0");
	}
    

    // 檢查欄位是否為空
    if (movieName === '' || rating === '' || movieInfo === '' || releaseDate === '' || duration === '' || trailerLink === '') {
		swal("電影編輯失敗", "請填寫所有必填欄位", "error");
        //alert('請填寫所有必填欄位');
        return false; // 防止表單提交
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
    window.location.replace('4.2歷史上架電影介面.html?importer_id=' + importerId);
} 
            