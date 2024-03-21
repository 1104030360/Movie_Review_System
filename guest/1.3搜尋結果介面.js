// 在文檔就緒時調用 getSerchedMovies 函數
$(document).ready(function() {
    getSerchedMovies();
});

//加入片單(訪客)
function toggleLike() {
		swal("加入片單失敗", "請先登入後，才可新增到我的片單", "error");
   		//alert("請先登入後，才可新增到我的片單");
}

//搜尋
function performSearch() {
    var keyword = document.getElementById('searchInput').value;

    if (keyword.trim() !== '') {
        window.location.href = '1.3搜尋結果介面.html?keyword=' + encodeURIComponent(keyword);
    } else {
        window.location.href = '1.3搜尋結果介面.html';  
    }
}

//搜尋電影結果
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

    moviesList.empty();
    
    if (movies.length === 0) {
		swal("搜尋失敗", "試著找另一個關鍵字吧!", "error");
        moviesList.append('<p class="no-results">查無結果</p>');
        return;
    }

    $.each(movies, function(index, data) {
        var movieCard = '<li>' +
                            '<div class="movie-card">' +
                                '<a href="1.1電影介面.html?movie_id=' + data.id + '">' +  
                                    '<figure class="card-banner">' +
                                        '<img src= "../Poster/' + data.poster + '" alt="' + data.name + ' movie poster">' +
                                    '</figure>' +
                                '</a>' +
                                '<div class="title-wrapper">' +
                                    '<a href="1.1電影介面.html?movie_id=' + data.id + '">' + 
                                        '<h3 class="card-title">' + data.name + '</h3>' +
                                    '</a>' +
                                    '<button class="add-to-watchlist-btn" id="likeButton" onclick="toggleLike()">' +
                                        '<i class="far fa-heart" id="likeIcon"></i>' +
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
