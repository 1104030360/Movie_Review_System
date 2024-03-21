
//登出
function logout() {
    if (confirm('確定要登出？')) {
        window.location.replace('../../index.html');
    } else {
        return false;
    }
}

//刪除帳號
// 資料庫要刪資料
function deleteAccount() {      
	var urlParams = new URLSearchParams(window.location.search);
    var memberId = urlParams.get('member_id');
    
     var dataObject = {
        "id": memberId,
    };
     var data_string = JSON.stringify(dataObject);

    if (confirm('確定要刪除帳號？\n按下確認，帳號將會永久刪除。')) {
		 $.ajax({
        type: "DELETE",
        url: "/MovieReviw/api/UserController.do",
        data:  data_string,
        crossDomain: true,
        cache: false,
        dataType: 'json',
        timeout: 5000,
        success: function (response) {
            if(response.deletecode == 1){
				alert(response.message);
                window.location.replace('../../index.html');
            } else {
				swal("刪除帳號失敗",response.message, "error");
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
	updateMoviesList(favoriteData) ;
    // 迭代愛心的資料，更新 HTML 頁面上的愛心外觀
    $.each(favoriteData, function(index, data) {
        var likeIcon = document.getElementById('likeIcon_' + data.id);

        if (likeIcon) {
            // 只有在資料庫中存在相應電影時才添加 'filled-heart' 類
            likeIcon.classList.add('filled-heart');
        } else {
            console.error('Element with id ' + 'likeIcon_' + data.id + ' not found.');
        }
    });
}
function updateMoviesList(movies) {
    var moviesList = $('#MovieList1');
    
    var urlParams = new URLSearchParams(window.location.search);
    var memberId = urlParams.get('member_id');

    moviesList.empty();

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
                                     '<button class="add-to-watchlist-btn" id="likeButton_' + data.id + '" onclick="toggleLike(this.id)">' +
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
}

function updateMemberData(datas) {
	$.each(datas, function(index, data) {
		document.getElementById('mem').innerHTML = data.member_name;
		$('#logo').attr('href', '2.網站首頁介面.html?member_id=' + data.member_id);
		$('#edit').attr('href', '2.2.1編輯介面.html?member_id=' + data.member_id);
	});
}
$(document).ready(function() {
    getAccount() ;
    getFavorite();
});