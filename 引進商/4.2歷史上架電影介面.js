 $(document).ready(function() {
    	var urlParams = new URLSearchParams(window.location.search);
        var importerId = urlParams.get('importer_id');
        $('#importer1').attr('href', '4.1上架電影介面.html?importer_id=' + importerId);
        $('#importer2').attr('href', '4.2歷史上架電影介面.html?importer_id=' + importerId);
        $('#importer3').attr('href', '4.1.3編輯演員導演介面.html?importer_id=' + importerId);
        getMovieData();
 });
 
//電影資訊
function getMovieData() {
	var urlParams = new URLSearchParams(window.location.search);
    var importerId = urlParams.get('importer_id');
    $.ajax({
        type: 'GET',
        url: '/MovieReviw/api/MovieController.do',
        data: "importer_id=" + importerId,
        crossDomain: true,
        cache: false,
        dataType: 'json',
        success: function(response) {
            updateMoviePosters(response.response.data);
        },
        error: function(error) {
            console.error('Error fetching movie data:', error);
        }
    });
}

function updateMoviePosters(movieData) {
	console.log(movieData);
    var postersContainer = $('.movie-posters');

    postersContainer.empty();

    $.each(movieData, function(index, movie) {
        var moviePoster = $('<div class="movie-poster" data-movie-id="' + movie.id + '">' +
                                '<img src="../Poster/' + movie.poster + '" alt="Movie Poster">' +
                                '<div class="poster-options">' +
                                    '<button class="lock-btn" onclick="EditMovie(this)" data-id="' + movie.id + '">編輯</button>' +
                                    '<button class="view-btn" onclick="DeleteMovie(this)" data-id="' + movie.id + '">下架</button>' +
                                '</div>' +
                            '</div>');

        postersContainer.append(moviePoster);
    });
}
function DeleteMovie(button){
	var movieId = button.getAttribute('data-id');
	
	var dataObject = {
        "movie_id": movieId,
    };
     var data_string = JSON.stringify(dataObject);

    if (confirm('確定要下架電影？\n按下確認，電影將會永久刪除。')) {
		 $.ajax({
        type: "DELETE",
        url: "/MovieReviw/api/MovieController.do",
        data:  data_string,
        crossDomain: true,
        cache: false,
        dataType: 'json',
        timeout: 5000,
        success: function (response) {
            if(response.deletecode == 1){
				swal("電影下架成功", response.message, "success");
				//alert(response.message);
                getMovieData();
            } else {
				swal("電影下架成功失敗", response.message, "error");
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
function EditMovie(button){
	var movieId = button.getAttribute('data-id');
	var urlParams = new URLSearchParams(window.location.search);
    var importerId = urlParams.get('importer_id');
    
     window.location.replace('4.2.1編輯電影介面.html?importer_id=' + importerId +  '&movie_id=' + movieId);
	
	
}


