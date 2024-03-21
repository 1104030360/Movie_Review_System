
//首頁幻燈片
function changeMainPoster() {
    const images = [
        '../MainPoster/image1.jpg',
        '../MainPoster/image2.jpg',
        '../MainPoster/image3.jpg',
        '../MainPoster/image4.jpg',
        '../MainPoster/image5.jpg',
        '../MainPoster/image6.jpg',
        '../MainPoster/image7.jpg',
        '../MainPoster/image8.jpg',
        '../MainPoster/image9.jpg',
        '../MainPoster/image10.jpg'
    ];

    let currentIndex = 0;

    function changeBackground() {
        const heroSection = $('#hero');

        // 淡出效果
        heroSection.fadeOut(1000, function () {
            currentIndex = (currentIndex + 1) % images.length;
            const imageUrl = images[currentIndex];
            heroSection.css('backgroundImage', `url(${imageUrl})`);

            // 淡入效果
            heroSection.fadeIn(1000);
        });
    }

    // 初始更換一次背景
    changeBackground();

    // 定時更換背景圖片
    setInterval(changeBackground, 5000); // 5000毫秒（5秒）更換一次
}

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

function filterMovies(rating) {
	 var movieItems = document.querySelectorAll('#MovieList3 li');
		
	movieItems.forEach(function (item) {
	var movieRating = item.querySelector('.badge').getAttribute('data-rating');
		
		if ( rating==="全部" || movieRating === rating) {
			    item.style.display = "";
		} else {
			     item.style.display = 'none';
		}
	});
}

//點擊愛心
function toggleLike1(buttonId) {
    var movieId1 = buttonId.substring('likeButton1_'.length);
    var likeIcon1 = document.getElementById('likeIcon1_' + movieId1);


    if (likeIcon1 ) {
        // 切換愛心的外觀
        likeIcon1.classList.toggle('filled-heart');

        // 發送 Ajax 請求
        if (likeIcon1.classList.contains('filled-heart')) {
            // 如果愛心變成紅色，表示需要新增到資料庫
            addFavorite(movieId1);

        } else {
            // 如果紅色消失，表示需要從資料庫刪除
            removeFavorite(movieId1);

        }
    } else {
        console.error('Element with id ' + 'likeIcon1_' + movieId1 + ' not found.');
    }
}
function toggleLike2(buttonId) {
    var movieId2 = buttonId.substring('likeButton2_'.length);
    var likeIcon2 = document.getElementById('likeIcon2_' + movieId2);


    if (likeIcon2 ) {
        // 切換愛心的外觀
    
        likeIcon2.classList.toggle('filled-heart');
   

        // 發送 Ajax 請求
        if ( likeIcon2.classList.contains('filled-heart')) {
            // 如果愛心變成紅色，表示需要新增到資料庫      
            addFavorite(movieId2); 
        } else {
            // 如果紅色消失，表示需要從資料庫刪除
            removeFavorite(movieId2);
        }
    } else {
        console.error('Element with id ' + 'likeIcon2_' + movieId2 + ' not found.');
    }
}
function toggleLike3(buttonId) {
    var movieId3 = buttonId.substring('likeButton3_'.length);
    var likeIcon3 = document.getElementById('likeIcon3_' + movieId3);

    if (likeIcon3) {
        // 切換愛心的外觀
        likeIcon3.classList.toggle('filled-heart');

        // 發送 Ajax 請求
        if (likeIcon3.classList.contains('filled-heart')) {
            // 如果愛心變成紅色，表示需要新增到資料庫

            addFavorite(movieId3);
        } else {
            // 如果紅色消失，表示需要從資料庫刪除
            removeFavorite(movieId3);
        }
    } else {
        console.error('Element with id ' + 'likeIcon_' + movieId3 + ' not found.');
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
            getMoviesBy1();
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
            getMoviesBy1();
        },
        error: function() {
            console.error('Failed to remove movie from favorites.');
        }
    });
}

//獲得片單
function getFavorite1() {

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
            	updateFavoriteIcons1(response.response.data);         
            }
            console.log(response);
            
        },
        error: function() {
            // 處理錯誤
            console.error('無法連接到後端API');
        }
    });
}
function updateFavoriteIcons1(favoriteData) {
	console.log(favoriteData);
    // 迭代愛心的資料，更新 HTML 頁面上的愛心外觀
    $.each(favoriteData, function(index, data) {
        var likeIcon1 = document.getElementById('likeIcon1_' + data.id);


        if (likeIcon1) {
            // 只有在資料庫中存在相應電影時才添加 'filled-heart' 類
            likeIcon1.classList.add('filled-heart');

        } else {
            console.error('Element with id ' + 'likeIcon1_' + data.id + ' not found.');
        }
    });
}
function getFavorite2() {

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
            	updateFavoriteIcons2(response.response.data);         
            }
            console.log(response);
            
        },
        error: function() {
            // 處理錯誤
            console.error('無法連接到後端API');
        }
    });
}
function updateFavoriteIcons2(favoriteData) {
	console.log(favoriteData);
    // 迭代愛心的資料，更新 HTML 頁面上的愛心外觀
    $.each(favoriteData, function(index, data) {
        var likeIcon2 = document.getElementById('likeIcon2_' + data.id);

        if (likeIcon2) {
            // 只有在資料庫中存在相應電影時才添加 'filled-heart' 類

            likeIcon2.classList.add('filled-heart');

        } else {
            console.error('Element with id ' + 'likeIcon2_' + data.id + ' not found.');
        }
    });
}
function getFavorite3() {

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
            	updateFavoriteIcons3(response.response.data);         
            }
            console.log(response);
            
        },
        error: function() {
            // 處理錯誤
            console.error('無法連接到後端API');
        }
    });
}
function updateFavoriteIcons3(favoriteData) {
	console.log(favoriteData);
    // 迭代愛心的資料，更新 HTML 頁面上的愛心外觀
    $.each(favoriteData, function(index, data) {

        var likeIcon3 = document.getElementById('likeIcon3_' + data.id);

        if (likeIcon3) {
            // 只有在資料庫中存在相應電影時才添加 'filled-heart' 類

            likeIcon3.classList.add('filled-heart');
        } else {
            console.error('Element with id ' + 'likeIcon3_' + data.id + ' not found.');
        }
    });
}

  
  
//電影資料(最近日期)
function getMoviesBy1() {
    var apiUrl = '/MovieReviw/api/MovieController.do';

    // 使用 jQuery 的 $.ajax 方法
    $.ajax({
        url: apiUrl,
        type: 'GET',
        data:"action=" + "1",
        crossDomain: true, // 允許跨域請求
        cache: false,
        dataType: 'json',
        success: function(response) {
            // 在這裡處理後端的回應
            if(response.state == 200){
                // response 包含從後端獲取的電影資料
            	updateMoviesList1(response.response.data);         
            }
            console.log(response);
            
        },
        error: function() {
            // 處理錯誤
            console.error('無法連接到後端API');
        }
    });
}

//電影資訊(評分最高)
function getMoviesBy2() {
    var apiUrl = '/MovieReviw/api/MovieController.do';

    // 使用 jQuery 的 $.ajax 方法
    $.ajax({
        url: apiUrl,
        type: 'GET',
        data:"action=" + "2",
        crossDomain: true, // 允許跨域請求
        cache: false,
        dataType: 'json',
        success: function(response) {
            // 在這裡處理後端的回應
            if(response.state == 200){
                // response 包含從後端獲取的電影資料
            	updateMoviesList2(response.response.data);         
            }
            console.log(response);
            
        },
        error: function() {
            // 處理錯誤
            console.error('無法連接到後端API');
        }
    });
}

//電影資訊(全部電影)
function getMoviesBy3() {
    // 假設後端 API 的 URL 為 /api/movies
    var apiUrl = '/MovieReviw/api/MovieController.do';

    // 使用 jQuery 的 $.ajax 方法
    $.ajax({
        url: apiUrl,
        type: 'GET',
        data:"action=" + "3",
        crossDomain: true, // 允許跨域請求
        cache: false,
        dataType: 'json',
        success: function(response) {
            // 在這裡處理後端的回應
            if(response.state == 200){
                // response 包含從後端獲取的電影資料
            	updateMoviesList3(response.response.data);         
            }
            console.log(response);
            
        },
        error: function() {
            // 處理錯誤
            console.error('無法連接到後端API');
        }
    });
}
function updateMoviesList1(movies) {
	var urlParams = new URLSearchParams(window.location.search);
    var memberId = urlParams.get('member_id');
    var moviesList = $('#MovieList1');

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
                                     '<button class="add-to-watchlist-btn" id="likeButton1_' + data.id + '" onclick="toggleLike1(this.id)">' +
                                        '<i class="far fa-heart" id="likeIcon1_' + data.id + '"></i>' +
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
    getFavorite1();
    getMoviesBy2();
}
function updateMoviesList2(movies) {
	var urlParams = new URLSearchParams(window.location.search);
    var memberId = urlParams.get('member_id');
    var moviesList = $('#MovieList2');

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
                                     '<button class="add-to-watchlist-btn" id="likeButton2_' + data.id + '" onclick="toggleLike2(this.id)">' +
                                        '<i class="far fa-heart" id="likeIcon2_' + data.id + '"></i>' +
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
    getFavorite2();
    getMoviesBy3();
}
function updateMoviesList3(movies) {
	var urlParams = new URLSearchParams(window.location.search);
    var memberId = urlParams.get('member_id');
    var moviesList = $('#MovieList3');

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
                                     '<button class="add-to-watchlist-btn" id="likeButton3_' + data.id + '" onclick="toggleLike3(this.id)">' +
                                        '<i class="far fa-heart" id="likeIcon3_' + data.id + '"></i>' +
                                    '</button>' +
                                '</div>' +
                                '<div class="card-meta">' +
                                    '<div class="badge badge-outline" data-rating="' + data.rlevel + '">' + data.rlevel + '</div>' +
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
     getFavorite3();
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


// 在文檔就緒時調用 getMovies 函數
$(document).ready(function() {
	changeMainPoster();
    getMoviesBy1();
    getAccount() ;
});


