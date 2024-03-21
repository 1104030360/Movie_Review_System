
//獲得電影
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
                            '<img src="../ActorPhoto/' + actor.photo + '" alt="' + actor.name + '">' +
                            '<p>' + actor.name + '</p>' +
                        '</li>';
        
        $('#cast').append(actorCard);
    });
}

// 更新導演資訊的函式
function updateDirectorDetails(directorData) {
    $.each(directorData, function(index, director) {
        var directorCard = '<li class="DA-card">' +
                                '<img src="../DirectorPhoto/' + director.photo + '" alt="' + director.name + '">' +
                                '<p>' + director.name + '</p>' +
                            '</li>';
        
        $('#director').append(directorCard);
    });
}

//獲得評價
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
    commentContainer.empty();

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
                '<button class="delete-comment-btn" onclick="deleteComment(this)"data-id="' + comment.member_id + '">刪除</button>' +
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

//刪除評價
function deleteComment(button) {
	var memberId = $(button).data('id');
    var urlParams = new URLSearchParams(window.location.search);
    var movieId = urlParams.get('movie_id');
    
    
    var result = confirm("確定要刪除此留言？");
    if (!result) {
		return ;
    }
    
     var dataObject = {
        "member_id" : memberId,
        "movie_id" : movieId
    };
     var data_string = JSON.stringify(dataObject);
    
    $.ajax({
        type: 'DELETE',
        url: '/MovieReviw/api/ReviewController.do',
        data: data_string,
        crossDomain: true,
        cache: false,
        dataType: 'json',
        success: function(response) {
			// 在這裡處理後端的回應
            if(response.checkcode == 1){
				swal("刪除評價成功",response.message, "success");
				//alert(response.message);
                getComment() ;   
            }
            else{
				swal("刪除評價失敗", response.message, "error");
				//alert(response.message);
			}
            
        },
        error: function(error) {
            // 處理錯誤的回應
            console.error(error);
        }
    });
    
	
}

$(document).ready(function() {
	var urlParams = new URLSearchParams(window.location.search);
    var adminId = urlParams.get('admin_id');
    $('#logo').attr('href', '3.管理員權限介面.html?admin_id=' + adminId);
    $('#back').attr('href', '3.1電影管理介面.html?admin_id=' + adminId);
    
    getMovieById();
    getComment();
});