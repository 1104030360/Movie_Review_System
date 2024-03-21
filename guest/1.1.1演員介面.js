$(document).ready(function() {
	getActor();
	getMovies();
});

//演員相關電影
function getMovies() {
	var urlParams = new URLSearchParams(window.location.search);
    var actorId = urlParams.get('actor_id');
    // 假設後端 API 的 URL 為 /api/movies
    var apiUrl = '/MovieReviw/api/MovieController.do';

    // 使用 jQuery 的 $.ajax 方法
    $.ajax({
        url: apiUrl,
        type: 'GET',
        data:"actor_id=" + actorId,
        crossDomain: true, // 允許跨域請求
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
        error: function() {
            // 處理錯誤
            console.error('無法連接到後端API');
        }
    });
}
function updateMoviesList(movies) {
    // 在這裡更新 HTML 頁面上的電影列表
    var moviesList = $('#MovieList');

    // 清空原有的列表
    moviesList.empty();

    // 迭代電影資料，生成 HTML 元素，然後加到列表中
    $.each(movies, function(index, data) {
        var movieCard = '<li>' +
                            '<div class="movie-card">' +
                                '<a href="1.1電影介面.html?movie_id=' + data.id + '">' +  // 在這裡使用 movie_id
                                    '<figure class="card-banner">' +
                                        '<img src= "../Poster/' + data.poster + '" alt="' + data.name + ' movie poster">' +
                                    '</figure>' +
                                '</a>' +
                                '<div class="title-wrapper">' +
                                    '<a href="1.1電影介面.html?movie_id=' + data.id + '">' +  // 在這裡使用 movie_id
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

//演員資料
function getActor() {
	var urlParams = new URLSearchParams(window.location.search);
    var actorId = urlParams.get('actor_id');
    console.log(actorId);
    
	$.ajax({
        type: "GET",
        url: '/MovieReviw/api/ActorController.do',
        data: "actor_id=" + actorId,
        crossDomain: true, // 允許跨域請求
        cache: false,
        dataType: 'json',
        success: function(response) {
			console.log(response);
            // Handle the received actor data
            updateActorDetails(response.response.data);
        },
        error: function(error) {
            console.error("Error fetching actor data: ", error);
        }
    });
}

function updateActorDetails(actorData) {
	// Assuming that the container element has an ID, let's use it
    var container = $("#actor_container");

    // Clear existing content in the container
    container.empty();

    $.each(actorData, function(index, actor) {
		var genderIconName = actor.gender === "女" ? "female" : "male";
        // Build the HTML structure for each actor and append it to the container
        var actorHtml = '<figure class="movie-detail-banner">' +
                            '<img src="../ActorPhoto/' + actor.photo + '" alt="' + actor.name + ' photo">' +
                        '</figure>' +
                        '<div class="movie-detail-content">' +
                            '<div class="meta-wrapper">' +
                                '<h1 class="h1 detail-title">' +
                                    '<strong>' + actor.name + '</strong>' +
                                '</h1>' +
                            '</div>' +
                            '<div class="meta-wrapper date-time">' +
                                '<div>' +
                                    '<ion-icon name="calendar-outline"></ion-icon>' +
                                    '<time datetime="2021">' + actor.birth + '</time>' +
                                '</div>' +
                                '<div>' +
                                    '<ion-icon name="' + genderIconName + '"></ion-icon>' +
                                    '<data>' + actor.gender + '</data>' +
                                '</div>' +
                            '</div>' +
                            '<p class="storyline">' + actor.intro + '</p>' +
                        '</div>';

        // Append the HTML structure to the container
        container.append(actorHtml);
    });
}

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