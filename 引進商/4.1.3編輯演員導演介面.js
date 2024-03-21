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
                                    '<button class="lock-btn" onclick="AddActorMovie(this)" data-id="' + movie.id + '">演員</button>' +
                                    '<button class="view-btn" onclick="AddDirectorMovie(this)" data-id="' + movie.id + '">導演</button>' +
                                '</div>' +
                            '</div>');

        postersContainer.append(moviePoster);
    });
}
function AddActorMovie(button) {
	var movieId = button.getAttribute('data-id');
	var urlParams = new URLSearchParams(window.location.search);
    var importerId = urlParams.get('importer_id');
    
    window.location.href = '4.1.1新增演員介面.html?movie_id=' + movieId + '&importer_id=' + importerId;
}
function AddDirectorMovie(button) {
	var movieId = button.getAttribute('data-id');
	var urlParams = new URLSearchParams(window.location.search);
    var importerId = urlParams.get('importer_id');
    
    window.location.href = '4.1.2新增導演介面.html?movie_id=' + movieId + '&importer_id=' + importerId;
}