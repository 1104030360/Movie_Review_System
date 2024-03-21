
//搜尋
function performSearch() {
    var keyword = document.getElementById('searchInput').value;
    var urlParams = new URLSearchParams(window.location.search);
    var memberID = urlParams.get('member_id');

    if (keyword.trim() !== '') {
        window.location.href = '2.3搜尋結果介面.html?keyword=' + encodeURIComponent(keyword) + '&member_id=' + memberID ;
    } else {
        window.location.href = '2.3搜尋結果介面.html?member_id=' + memberID;
    }
}

//點擊愛心
function toggleLike(buttonId) {
    var movieId = buttonId.substring('likeButton_'.length);
    var likeIcon = document.getElementById('likeIcon_' + movieId);

    if (likeIcon) {
        // 切換愛心的外觀
        likeIcon.classList.toggle('filled-heart');

        // 發送 Ajax 請求
        if (likeIcon.classList.contains('filled-heart')) {
            // 如果愛心變成紅色，表示需要新增到資料庫
            addFavorite(movieId);
        } else {
            // 如果紅色消失，表示需要從資料庫刪除
            removeFavorite(movieId);
        }
    } else {
        console.error('Element with id ' + 'likeIcon_' + movieId + ' not found.');
    }
}

//加入片單
function addFavorite(movieID) {
	
	var urlParams = new URLSearchParams(window.location.search);
    var memberID = urlParams.get('member_id');
    
    var dataObject = {
        "member_id" : memberID,
        "movie_id" : movieID
    };
     var data_string = JSON.stringify(dataObject);
	
    // 發送新增到資料庫的 Ajax 請求
    $.ajax({
        url: '/MovieReviw/api/FavoriteController.do',
        type: 'POST',
        data: data_string,
        crossDomain: true, // 允許跨域請求
        cache: false,
        dataType: 'json',
        success: function(response) {
             if(response.checkcode == 1){
				swal("加入片單成功",response.message, "success");
                //alert(response.message)
            } else {
				swal("加入片單失敗",response.message, "error");
                //alert(response.message);
            }
        },
        error: function() {
            console.error('Failed to add movie to favorites.');
        }
    });
}

//移除片單
function removeFavorite(movieID) {
    // 發送從資料庫刪除的 Ajax 請求
    var urlParams = new URLSearchParams(window.location.search);
    var memberID = urlParams.get('member_id');
    
    var dataObject = {
        "member_id" : memberID,
        "movie_id" : movieID
    };
    var data_string = JSON.stringify(dataObject);
    
    
    $.ajax({
        url: '/MovieReviw/api/FavoriteController.do',
        type: 'DELETE',
        data: data_string,
        crossDomain: true, // 允許跨域請求
        cache: false,
        dataType: 'json',
        success: function(response) {
			if(response.checkcode == 1){
				swal("移除片單成功",response.message, "success");
                //alert(response.message)
            } else {
				swal("移除片單失敗",response.message, "error");
                //alert(response.message);
            }
        },
        error: function() {
            console.error('Failed to remove movie from favorites.');
        }
    });
}

//獲得片單
function getFavorite() {

	var urlParams = new URLSearchParams(window.location.search);
    var memberID = urlParams.get('member_id');
   
    // 使用 jQuery 的 $.ajax 方法
    $.ajax({
        url: '/MovieReviw/api/FavoriteController.do',
        type: 'GET',
        data: "member_id=" + memberID,
        crossDomain: true, // 允許跨域請求
        cache: false,
        dataType: 'json',
        success: function(response) {
            // 在這裡處理後端的回應
            if(response.state == 200){
                // response 包含從後端獲取的電影資料
                console.log(response);
            	updateFavoriteIcons(response.response.data);         
            }
            console.log(response);
            
        },
        error: function() {
            // 處理錯誤
            console.error('無法連接到後端API');
        }
    });
}
function updateFavoriteIcons(favoriteData) {
	console.log(favoriteData);
    $.each(favoriteData, function(index, data) {
		console.log(data);
        var likeIcon = document.getElementById('likeIcon_' + data.id);

        if (likeIcon) {
            likeIcon.classList.add('filled-heart');
        } else {
            console.error('Element with id ' + 'likeIcon_' + data.id + ' not found.');
        }
    });
}


function getMovieById() {
	  var apiUrl = '/MovieReviw/api/MovieController.do'
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
        '<button class="add-to-watchlist-btn" id="likeButton_' + data.id + '" onclick="toggleLike(this.id)">' +
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
   getFavorite();
}

//演員資訊
function updateActorDetails(actorData) {
	 var urlParams = new URLSearchParams(window.location.search);
     var memberId = urlParams.get('member_id');

    $.each(actorData, function(index, actor) {
        var actorCard = '<li class="DA-card">' +
        				'<a href="2.1.1演員介面.html?actor_id=' + actor.id + '&member_id=' + memberId +  '">' +
	                        '<img src="../ActorPhoto/' + actor.photo + '" alt="' + actor.name + '">' +
	                    '</a>' +
                            '<p>' + actor.name + '</p>' +
                        '</li>';
        
        $('#cast').append(actorCard);
    });
}

//導演資訊
function updateDirectorDetails(directorData) {
	var urlParams = new URLSearchParams(window.location.search);
    var memberId = urlParams.get('member_id');

    $.each(directorData, function(index, director) {
        var directorCard = '<li class="DA-card">' +
	                        '<a href="2.1.2導演介面.html?director_id=' + director.id + '&member_id=' + memberId + '">' +
	                            '<img src="../DirectorPhoto/' + director.photo + '" alt="' + director.name + '">' +
	                        '</a>' +
                                '<p>' + director.name + '</p>' +
                            '</li>';
        
        $('#director').append(directorCard);
    });
}

//獲得會員資訊
function getAccount() {
	var urlParams = new URLSearchParams(window.location.search);
    var memberId = urlParams.get('member_id');
    
    $.ajax({
        type: 'GET',
        url: '/MovieReviw/api/UserController.do',
        data: "member_id=" + memberId,
        crossDomain: true,
        cache: false,
        dataType: 'json',
        success: function(response) {
			// 在這裡處理後端的回應
            if(response.state == 200){
                  updateMemberData(response.response.data) ;   
            }
            console.log(response);
        },
        error: function(error) {
            // 處理錯誤的回應
            console.error(error);
        }
    });
    
}
function updateMemberData(datas) {
	$.each(datas, function(index, data) {
		document.getElementById('mem').innerHTML = data.member_name;
		$('#logo').attr('href', '2.網站首頁介面.html?member_id=' + data.member_id);
		$('#mem').attr('href', '2.2會員資料介面.html?member_id=' + data.member_id);
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
	var urlParams = new URLSearchParams(window.location.search);
    var memberID = urlParams.get('member_id');
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
		        '<p class="comment-text">' + comment.comment + '</p>'
		
		commentHtml +=
		    '<div class="like-section" onclick="likeComment(\'' + comment.member_id + '\', \'' + comment.member_id + '\')">' +
		            '<i class="fas fa-thumbs-up thumbs-up" id="likeBtn' + comment.member_id + '"></i>' +
		            '<span id="likeCount' + comment.member_id + '" class="like-count">' + comment.comment_likes + '</span>' +
		    '</div>';

		// 判斷是否為自己的評論，如果是，加上編輯和刪除按鈕
		if (comment.member_id == memberID) {
			commentHtml +=
		    '<div class="edit-delete-buttons">' +
		        '<button class="edit-btn" onclick="editComment(' + comment.comment_stars + ', \'' + comment.comment + '\')">編輯</button>' +
		        '<button class="delete-btn" onclick="deleteComment()">刪除</button>' +
		    '</div>';
		}
		
		
		commentHtml += '</div>';
        commentContainer.append(commentHtml);
     });
}

//按讚評論
function likeComment(memberId1, memberId2) {
    var likeCount = $('#likeCount' + memberId2);
    var likeBtn = $('#likeBtn' + memberId1);

    var isLiked = likeBtn.hasClass('clicked');
    likeBtn.toggleClass('clicked', !isLiked);

    var currentCount = parseInt(likeCount.text());
    likeCount.text(isLiked ? currentCount - 1 : currentCount + 1);
    var urlParams = new URLSearchParams(window.location.search);
    var movieID = urlParams.get('movie_id');
    
    
    var dataObject = {
        "member_id" : memberId1,
        "movie_id" : movieID,
        "likes" : String(isLiked ? currentCount - 1 : currentCount + 1),
        "stars": "0",
        "comment" : "0"
    };
     var data_string = JSON.stringify(dataObject);
	
    // 發送新增到資料庫的 Ajax 請求
    $.ajax({
        url: '/MovieReviw/api/ReviewController.do',
        type: 'PUT',
        data: data_string,
        crossDomain: true, // 允許跨域請求
        cache: false,
        dataType: 'json',
        success: function(response) {
            if(response.checkcode == 1){
                console.log(response.message);
            } else {
                console.log(response.message);
            }
        },
        error: function() {
            console.error('Failed to update likes.');
        }
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

//編輯
function editComment(currentStars, currentComment) {
    setEditedStars(currentStars);
    $('#editCommentInput').val(currentComment);

    showEditCommentModal();
}
//顯示評論框
function showEditCommentModal() {
    var editModal = $('#editCommentModal');
    
    var editModal = document.getElementById("editCommentModal");
    editModal.style.display = "block";
}

// 編輯後的星星評分
function setEditedStars(stars) {
    selectedEditedStars = stars;

    var modalStars = $('#editCommentModal .star-rating .rating-star');
    
    modalStars.each(function (index, star) {
        if (index < stars) {
            $(star).addClass("colored");
            $(star).css("color", "#ffc107"); 
        } else {
            $(star).removeClass("colored");
            $(star).css("color", "#ccc"); 
        }
    });
}

// 保存編輯後的評論
function saveEditedComment() {
    var editedStars = selectedEditedStars;
    var editedComment = $('#editCommentInput').val();
    var urlParams = new URLSearchParams(window.location.search);
    var memberId = urlParams.get('member_id');
    var urlParams = new URLSearchParams(window.location.search);
    var movieId = urlParams.get('movie_id');
    
     var dataObject = {
        "member_id" : memberId,
        "movie_id" : movieId,
        "stars": String(editedStars),
        "comment": editedComment,
        "likes" : "none"
    };
     var data_string = JSON.stringify(dataObject);

    $.ajax({
        type: 'PUT',
        url: '/MovieReviw/api/ReviewController.do',
        data: data_string,
        crossDomain: true,
        cache: false,
        dataType: 'json',
        success: function(response) {
            if (response.checkcode == 1) {
                alert(response.message);
                hideEditCommentModal();
                getComment();
            }
            else{
				alert(response.message);
            	hideEditCommentModal();
			}
        },
        error: function(error) {
            console.error(error);
        }
    });
}

//隱藏編輯框
function hideEditCommentModal() {
    var editModal = $('#editCommentModal');

    var editModal = document.getElementById("editCommentModal");
    editModal.style.display = "none";
}
function deleteComment() {
	
	// 使用者確認是否刪除
    var confirmDelete = confirm("確定要刪除評論嗎？");
    if (!confirmDelete) {
        // 使用者取消刪除
        return;
    }
    
    
	var urlParams = new URLSearchParams(window.location.search);
    var memberId = urlParams.get('member_id');
    var urlParams = new URLSearchParams(window.location.search);
    var movieId = urlParams.get('movie_id');
    
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
				swal("刪除評論成功", response.message, "success");
				//alert(response.message);
				hideEditCommentModal();
                getComment() ;   
            }
            else{
				swal("刪除評論失敗", response.message, "error");
				//alert(response.message);
            	hideCommentModal();
			}
            
        },
        error: function(error) {
            // 處理錯誤的回應
            console.error(error);
        }
    });
    
	
}

//顯示評論框
var selectedStars = 0;
function showCommentModal(stars) {
    selectedStars = stars; 

    var modalStars = document.querySelectorAll("#commentModal .star-rating .rating-star");
    modalStars.forEach(function (star, index) {
        if (index < stars) {
            star.classList.add("colored");
            star.style.color = "#ffc107";
        } else {
            star.classList.remove("colored");
            star.style.color = "#ccc";
        }
    });

    var modal = document.getElementById("commentModal");
    modal.style.display = "block";
}

//隱藏評論框
function hideCommentModal() {
    var modal = document.getElementById("commentModal");
    modal.style.display = "none";
}

//提交評價
function submitComment() {
    var comment = document.getElementById("commentInput").value;
    var urlParams = new URLSearchParams(window.location.search);
    var memberId = urlParams.get('member_id');
    var urlParams = new URLSearchParams(window.location.search);
    var movieId = urlParams.get('movie_id');
    
     var dataObject = {
        "stars" : selectedStars,
        "comment" : "" + comment,
        "member_id" : memberId,
        "movie_id" : movieId
    };
     var data_string = JSON.stringify(dataObject);
    
    $.ajax({
        type: 'POST',
        url: '/MovieReviw/api/ReviewController.do',
        data: data_string,
        crossDomain: true,
        cache: false,
        dataType: 'json',
        success: function(response) {
			// 在這裡處理後端的回應
            if(response.checkcode == 1){
				swal("新增評論成功", response.message, "success");
				//alert(response.message);
				hideCommentModal();
                getComment() ;   
            }
            else{
				swal("新增評論失敗", response.message, "success");
				//alert(response.message);
            	hideCommentModal();
			}
        },
        error: function(error) {
            // 處理錯誤的回應
            console.error(error);
        }
    });
    

}
$(document).ready(function() {
        getMovieById();
        getAccount();
        getComment();

});

