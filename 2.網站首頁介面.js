
//開頭的幻燈片
function changeMainPoster() {
	
	//照片
    const images = [
        'SA/MainPoster/image1.jpg',
        'SA/MainPoster/image2.jpg',
        'SA/MainPoster/image3.jpg',
        'SA/MainPoster/image4.jpg',
        'SA/MainPoster/image5.jpg',
        'SA/MainPoster/image6.jpg',
        'SA/MainPoster/image7.jpg',
        'SA/MainPoster/image8.jpg',
        'SA/MainPoster/image9.jpg',
        'SA/MainPoster/image10.jpg'
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

    if (keyword.trim() !== '') {
        window.location.href = 'SA/guest/1.3搜尋結果介面.html?keyword=' + encodeURIComponent(keyword);
    } else {
        window.location.href = 'SA/guest/1.3搜尋結果介面.html';  
    }
}

//加入片單(訪客)
function toggleLike() {
	swal("加入片單失敗", "請先登入後，才可新增到我的片單", "error");
   	//alert("請先登入後，才可新增到我的片單");
}

//篩選
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

  
// 使用 Ajax 獲取電影資料(最近日期)
function getMoviesBy1() {
	
    // 假設後端 API 的 URL 為 /api/movies
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

//最高評價
function getMoviesBy2() {
    // 假設後端 API 的 URL 為 /api/movies
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

//所有電影
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

// 更新電影列表
function updateMoviesList1(movies) {
    // 在這裡更新 HTML 頁面上的電影列表
    var moviesList = $('#MovieList1');

    // 清空原有的列表
    moviesList.empty();

    // 迭代電影資料，生成 HTML 元素，然後加到列表中
    $.each(movies, function(index, data) {
        var movieCard = '<li>' +
                            '<div class="movie-card">' +
                                '<a href="SA/guest/1.1電影介面.html?movie_id=' + data.id + '">' +  
                                    '<figure class="card-banner">' +
                                        '<img src= "SA/Poster/' + data.poster + '" alt="' + data.name + ' movie poster">' +
                                    '</figure>' +
                                '</a>' +
                                '<div class="title-wrapper">' +
                                    '<a href="SA/guest/1.1電影介面.html?movie_id=' + data.id + '">' +  
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
   	getMoviesBy2();
}
function updateMoviesList2(movies) {
    // 在這裡更新 HTML 頁面上的電影列表
    var moviesList = $('#MovieList2');

    // 清空原有的列表
    moviesList.empty();

    // 迭代電影資料，生成 HTML 元素，然後加到列表中
    $.each(movies, function(index, data) {
        var movieCard = '<li>' +
                            '<div class="movie-card">' +
                                '<a href="SA/guest/1.1電影介面.html?movie_id=' + data.id + '">' +  // 在這裡使用 movie_id
                                    '<figure class="card-banner">' +
                                        '<img src= "SA/Poster/' + data.poster + '" alt="' + data.name + ' movie poster">' +
                                    '</figure>' +
                                '</a>' +
                                '<div class="title-wrapper">' +
                                    '<a href="SA/guest/1.1電影介面.html?movie_id=' + data.id + '">' +  // 在這裡使用 movie_id
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
    getMoviesBy3();
}
function updateMoviesList3(movies) {
    // 在這裡更新 HTML 頁面上的電影列表
    var moviesList = $('#MovieList3');

    // 清空原有的列表
    moviesList.empty();

    // 迭代電影資料，生成 HTML 元素，然後加到列表中
    $.each(movies, function(index, data) {
        var movieCard = '<li>' +
                            '<div class="movie-card">' +
                                '<a href="SA/guest/1.1電影介面.html?movie_id=' + data.id + '">' +  // 在這裡使用 movie_id
                                    '<figure class="card-banner">' +
                                        '<img src= "SA/Poster/' + data.poster + '" alt="' + data.name + ' movie poster">' +
                                    '</figure>' +
                                '</a>' +
                                '<div class="title-wrapper">' +
                                    '<a href="SA/guest/1.1電影介面.html?movie_id=' + data.id + '">' +  // 在這裡使用 movie_id
                                        '<h3 class="card-title">' + data.name + '</h3>' +
                                    '</a>' +
                                    '<button class="add-to-watchlist-btn" id="likeButton" onclick="toggleLike()">' +
                                        '<i class="far fa-heart" id="likeIcon"></i>' +
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
}

// 在文檔就緒時調用 getMovies 函數
$(document).ready(function() {
	changeMainPoster();
	getMoviesBy1();
});


