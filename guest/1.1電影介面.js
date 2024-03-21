
//搜尋
function performSearch() {
    var keyword = document.getElementById('searchInput').value;

    if (keyword.trim() !== '') {
        window.location.href = '1.3搜尋結果介面.html?keyword=' + encodeURIComponent(keyword);
    } else {
        window.location.href = '1.3搜尋結果介面.html';  
    }
}

//評價(訪客)
function rateMovie() {
	swal("評價失敗", "請先登入會員，以進行評價！", "error");
    //alert('請先登入會員，以進行評價！');

}

//按讚(訪客)
function likeComment() {
	swal("按讚失敗", "請先登入會員，以按讚評論！", "error");
    //alert('請先登入會員，以按讚評論！');

}

//加入片單(訪客)
function toggleLike() {
	swal("加入片單失敗", "請先登入會員，以加入片單！", "error");
	//alert('請先登入會員，以加入片單！');
}

//電影資訊
function getMovieById() {
	  var apiUrl = '/MovieReviw/api/MovieController.do'
	// 使用 JavaScript 從 URL 中獲取 movie_id 參數的值
        var urlParams = new URLSearchParams(window.location.search);
        var movieId = urlParams.get('movie_id');
        console.log("movieId:", movieId);
    $.ajax({
        type: 'GET',
        url: apiUrl,
        data: "movie_id=" + movieId,
        crossDomain: true,
        cache: false,
        dataType: 'json',
        success: function(response) {
			// 在這裡處理後端的回應
            if(response.state == 200){
                // 處理成功的回應
            	const movieData = response.response1.data; 
            	const actorData = response.response2.data;
            	const directorData = response.response3.data ;
            	updateMovieDetails(movieData);
            	updateActorDetails(actorData);
            	updateDirectorDetails(directorData);      
            }
            console.log(response);
        },
        error: function(error) {
            // 處理錯誤的回應
            console.error(error);
        }
    });
}
function updateMovieDetails(movieData) {
var moviedetailed = $('#specificmovie');
var youtubeIframe = document.getElementById('youtube-iframe');

$.each(movieData, function(key, data) {
    var spmovie =
        '<div class="container">' +
        '<figure class="movie-detail-banner">' +
        '<img src="../Poster/' + data.poster + '" alt="' + data.name + ' movie poster" id="poster">' +
        '</figure>' +
        '<div class="movie-detail-content">' +
        '<div class="meta-wrapper">' +
        '<h1 class="h1 detail-title">' +
        '<strong>' + data.name + '</strong>' +
        '</h1>' +
        '<button class="add-to-watchlist-btn" id="likeButton_' + data.id + '" onclick="toggleLike()">' +
        '<i class="far fa-heart" id="likeIcon_' + data.id + '"></i>' +
        '</button>' +
        '</div>' +
        '<div class="meta-wrapper">' +
        '<div class="badge-wrapper">' +
        '<div class="badge badge-fill">' + data.rlevel + '</div>' +
        '</div>' +
        '<div class="date-time">' +
        '<div>' +
        '<ion-icon name="calendar-outline"></ion-icon>' +
        '<time datetime="2021">' + data.date + '</time>' +
        '</div>' +
        '<div>' +
        '<ion-icon name="time-outline"></ion-icon>' +
        '<time datetime="PT' + data.length + '">' + data.length + ' min</time>' +
        '</div>' +
        '<div>' +
        '<ion-icon name="star"></ion-icon>' +
        '<data>' + data.stars + '</data>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<p class="storyline">' + data.intro + '</p>' +
        '<p class="detail-subtitle">Director</p>' +
        '<ul class="DA-grid" id="director"></ul>' +
        '<p class="detail-subtitle">Cast</p>' +
        '<ul class="DA-grid" id="cast"></ul>' +
        '</div>' +
        '</div>';

    moviedetailed.append(spmovie);
    youtubeIframe.src = data.trailer ;
});
}

//演員資訊
function updateActorDetails(actorData) {

    $.each(actorData, function(index, actor) {
        var actorCard = '<li class="DA-card">' +
                    '<a href="1.1.1演員介面.html?actor_id=' + actor.id + '">' +
                        '<img src="../ActorPhoto/' + actor.photo + '" alt="' + actor.name + '">' +
                    '</a>' +
                    '<p>' + actor.name + '</p>' +
                '</li>';
        
        $('#cast').append(actorCard);
    });
}

//導演資訊
function updateDirectorDetails(directorData) {

    $.each(directorData, function(index, director) {
        var directorCard = '<li class="DA-card">' +
                        '<a href="1.1.2導演介面.html?director_id=' + director.id + '">' +
                            '<img src="../DirectorPhoto/' + director.photo + '" alt="' + director.name + '">' +
                        '</a>' +
                        '<p>' + director.name + '</p>' +
                    '</li>';
        
        $('#director').append(directorCard);
    });
}


//評論資訊
function getComment() {
	  var urlParams = new URLSearchParams(window.location.search);
      var movieId = urlParams.get('movie_id');
	
	$.ajax({
        url: '/MovieReviw/api/ReviewController.do?movie_id=' + movieId ,
        type: 'GET',
        crossDomain: true,
        cache: false,
        dataType: 'json',
        success: function(response) {
            if (response.state == 200) {
                // 成功獲取評論數據後，處理並動態生成評論區
                generateCommentSection(response.response.data);
            } else {
                console.error('Failed to retrieve comments.');
            }
        },
        error: function() {
            console.error('Error in AJAX request.');
        }
    });
}

// 函數：動態生成評論區
function generateCommentSection(comments) {
	console.log(comments);
    var commentContainer = $('#commentdiv');

    $.each(comments, function(index, comment) {
        var commentHtml =
            '<div class="comment">' +
                '<div class="user-info">' +
                    '<h3>' + comment.member_name + '</h3>' +
                    '<div class="star-rating">' +
                        generateStarRating(comment.comment_stars) +
                    '</div>' +
                '</div>' +
                '<p class="comment-text">' + comment.comment + '</p>' +
                '<div class="like-section" onclick="likeComment()">' +
                    '<i class="fas fa-thumbs-up thumbs-up" id="likeBtn' + comment.member_id + '"></i>' +
                    '<span id="likeCount' + comment.member_id + '" class="like-count">' + comment.comment_likes + '</span>' +
                '</div>' +
            '</div>';

        commentContainer.append(commentHtml);
    });
}

// 函數：動態生成星級評分
function generateStarRating(stars) {
    var starHtml = '';
    for (var i = 1; i <= 5; i++) {
        if (i <= stars) {
            starHtml += '<span class="star selected">&#9733;</span>';
        } else {
            starHtml += '<span class="star">&#9733;</span>';
        }
    }
    return starHtml;
}

$(document).ready(function() {
    getMovieById();
    getComment();
});