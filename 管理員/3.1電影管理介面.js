 $(document).ready(function() {
    	var urlParams = new URLSearchParams(window.location.search);
        var adminId = urlParams.get('admin_id');
        $('#admin1').attr('href', '3.2帳號管理介面.html?admin_id=' + adminId);
        $('#admin2').attr('href', '3.1電影管理介面.html?admin_id=' + adminId);
        getMovieData();
 });
 
//電影資訊
function getMovieData() {
	var urlParams = new URLSearchParams(window.location.search);
    var adminId = urlParams.get('admin_id');
    $.ajax({
        type: 'GET',
        url: '/MovieReviw/api/MovieController.do',
        data: "admin_id=" + adminId,
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
                                    '<button class="lock-btn" onclick="toggleLock(this)" data-id="' + movie.id + '"> ' + getStatusLabel(movie.status) + '</button>' +
                                    '<button class="view-btn" onclick="redirectToVisitorHomepage(this)" data-id="' + movie.id + '">查看</button>' +
                                '</div>' +
                            '</div>');

        postersContainer.append(moviePoster);
    });
}

//鎖定電影
function toggleLock(button) {
	var movieId = $(button).data('id');
	var buttonText = $(button).text().trim();
    var newStatus = (buttonText === '解鎖') ? "1" : "0";

     var dataObject = {
        "id" : movieId,
        "name" : "none",
        "intro": "none",
        "poster": "none",
        "date": "none",
        "length": "none",
        "rlevel": "none",
        "trailer": "none",
        "status" : newStatus,
        "stars": "none"
    };
    var data_string = JSON.stringify(dataObject);
    
      $.ajax({
        type: 'PUT',
        url: '/MovieReviw/api/MovieController.do',
        data: data_string,
        crossDomain: true,
        cache: false,
        dataType: 'json',
        success: function(response) {
			if(response.checkcode == 1) {
				swal("鎖定/解鎖電影成功",response.message, "success");
				//alert(response.message) ;
				getMovieData();
			}
			else {
				swal("鎖定/解鎖電影失敗",response.message, "error");
				//alert(response.message) ;
			}  
        },
        error: function(error) {
            console.error('Error fetching movie data:', error);
        }
    });
}
function redirectToVisitorHomepage(button) {
	var movieId = $(button).data('id');
	var urlParams = new URLSearchParams(window.location.search);
    var adminId = urlParams.get('admin_id');
    // Redirect to the visitor homepage
    window.location.href = "3.1.1電影介面.html?movie_id=" + movieId +"&admin_id=" + adminId ;
}
function getStatusLabel(movieStatus) {
    return (movieStatus === true) ? '鎖定' : '解鎖';
}


