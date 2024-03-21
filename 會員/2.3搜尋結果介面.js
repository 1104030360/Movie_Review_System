$(document).ready(function() {
    getSerchedMovies();
    getAccount() ;
});

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

//獲得搜尋電影結果
function getSerchedMovies() {
	var urlParams = new URLSearchParams(window.location.search);
    var keyword = urlParams.get('keyword');
    
    $.ajax({
        type: 'GET',
        url: '/MovieReviw/api/MovieController.do',
        data: "keyword=" + keyword,
        crossDomain: true,
        cache: false,
        dataType: 'json',
        success: function(response) {
			// 在這裡處理後端的回應
            if(response.state == 200){
                  // response 包含從後端獲取的電影資料
            	updateMoviesList(response.response.data);  
            }
            console.log(response);
        },
        error: function(error) {
            // 處理錯誤的回應
            console.error(error);
        }
    });
	
}
function updateMoviesList(movies) {
    var moviesList = $('#MovieList1');
    var urlParams = new URLSearchParams(window.location.search);
    var memberId = urlParams.get('member_id');

    moviesList.empty();
    
    if (movies.length === 0) {
		swal("搜尋失敗", "試著找另一個關鍵字吧!", "error");
        moviesList.append('<p class="no-results">查無結果</p>');
        return;
    }

    $.each(movies, function(index, data) {
        var movieCard = '<li>' +
                            '<div class="movie-card">' +
                                '<a href="2.1電影介面.html?movie_id=' + data.id + '&member_id=' + memberId + '">' +
                                    '<figure class="card-banner">' +
                                        '<img src= "../Poster/' + data.poster + '" alt="' + data.name + ' movie poster">' +
                                    '</figure>' +
                                '</a>' +
                                '<div class="title-wrapper">' +
                                    '<a href="2.1電影介面.html?movie_id=' + data.id + '&member_id=' + memberId + '">' +
                                        '<h3 class="card-title">' + data.name + '</h3>' +
                                    '</a>' +
                                    '<button class="add-to-watchlist-btn" id="likeButton" onclick="toggleLike()">' +
                                        '<i class="far fa-heart" id="likeIcon_' + data.id + '"></i>' +
                                    '</button>' +
                                '</div>' +
                                '<div class="card-meta">' +
                                    '<div class="badge badge-outline">' + data.rlevel + '</div>' +
                                    '<div class="duration">' +
                                        '<ion-icon name="time-outline"></ion-icon>' +
                                        '<time datetime="PT' + data.length + '">' + data.length + ' min</time>' +
                                    '</div>' +
                                    '<div class="rating">' +
                                        '<ion-icon name="star"></ion-icon>' +
                                        '<data>' + data.stars + '</data>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</li>';
        
        moviesList.append(movieCard);
    });
    getFavorite();
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
        var likeIcon = document.getElementById('likeIcon_' + data.id);

        if (likeIcon) {
            likeIcon.classList.add('filled-heart');
        } else {
            console.error('Element with id ' + 'likeIcon_' + data.id + ' not found.');
        }
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
		$('#mem').attr('href', '2.2會員資料介面.html?member_id=' + data.member_id);
		$('#logo').attr('href', '2.網站首頁介面.html?member_id=' + data.member_id);
	});
}
