$(document).ready(function() {
    getAllDirector();
});

//所有導演資訊
function getAllDirector() {  
    $.ajax({
    type: "GET",
    url: '/MovieReviw/api/DirectorController.do', 
    crossDomain: true,
    cache: false,
    dataType: 'json',
    success: function (response) {
		console.log(response) ;
     	updateDirector(response.response.data);
    },
    error: function (error) {
        console.error("Error fetching director data: ", error);
    }
});
     
}
function updateDirector(DirectorData){
        var recommendedDirectorsList = $("#recommendedDirectors");

	    recommendedDirectorsList.empty();
	
	    $.each(DirectorData, function(index, director) {
	        var listItem = '<li>' +
	            '<img src="../DirectorPhoto/' + director.photo + '" alt="' + director.name + '" onclick="addSelectedDirector(this)" data-id="' + director.id +'">' +
	            '<p>' + director.name + '</p>' +
	            '</li>';
	
	        recommendedDirectorsList.append(listItem);
	    });
	    getDirectorByMovie();
}

//該部電影導演資訊
function getDirectorByMovie() {
	var urlParams = new URLSearchParams(window.location.search);
    var movieId = urlParams.get('movie_id');
	
	$.ajax({
	    type: "GET",
	    url: '/MovieReviw/api/DirectorController.do', 
	    data: "movie_id=" + movieId,
	    crossDomain: true,
	    cache: false,
	    dataType: 'json',
	    success: function (response) {
			console.log(response) ;
	     	updateMovieDirector(response.response.data);
	    },
	    error: function (error) {
	        console.error("Error fetching directors data: ", error);
	    }
});
}
function updateMovieDirector(DirectorData){
        var recommendedDirectorsList = $("#MovieDirectors");

	    recommendedDirectorsList.empty();
	
	    $.each(DirectorData, function(index, director) {
	        var listItem = '<li>' +
	            '<img src="../DirectorPhoto/' + director.photo + '" alt="' + director.name + '" onclick="deleteSelectedDirector(this)" data-id="' + director.id + '">' +
	            '<p>' + director.name + '</p>' +
	            '</li>';
	
	        recommendedDirectorsList.append(listItem);
	    });
}

//新增導演到該部電影
function addSelectedDirector(element) {
	var urlParams = new URLSearchParams(window.location.search);
    var movieId = urlParams.get('movie_id');
    var directorId = $(element).data('id');
    
    var dataObject = {
        "movie_id": movieId,
        "director_id": directorId
    };

    var dataString = JSON.stringify(dataObject);

    $.ajax({
        type: "POST",
        url: '/MovieReviw/api/DirectorController.do',
        data: dataString,
        crossDomain: true,
        cache: false,
        dataType: 'json',
        success: function (response) {
            console.log(response);
            getAllDirector();
        },
        error: function (error) {
            console.error("Error adding director to movie: ", error);
        }
    });
}

//移除該部的導演
function deleteSelectedDirector(element) {
    var urlParams = new URLSearchParams(window.location.search);
    var movieId = urlParams.get('movie_id');
    var directorId = $(element).data('id');
    
    var dataObject = {
        "movie_id": movieId,
        "director_id": directorId
    };

    var dataString = JSON.stringify(dataObject);

    $.ajax({
        type: "DELETE", 
        url: '/MovieReviw/api/DirectorController.do', 
        data: dataString,
        crossDomain: true,
        cache: false,
        dataType: 'json',
        success: function (response) {
            console.log(response);
            getAllDirector();
        },
        error: function (error) {
            console.error("Error deleting director from movie: ", error);
        }
    });
}
function BackToPrevious(){
	var urlParams = new URLSearchParams(window.location.search);
    var importerId = urlParams.get('importer_id');
    window.location.replace('4.1.3編輯演員導演介面.html?importer_id=' + importerId);
}
function NewDirector() {
	var urlParams = new URLSearchParams(window.location.search);
    var movieId = urlParams.get('movie_id');
    var urlParams = new URLSearchParams(window.location.search);
    var importerId = urlParams.get('importer_id');
    window.location.replace('4.1.2.1導演添加介面.html?importer_id=' + importerId + '&movie_id=' + movieId );
}