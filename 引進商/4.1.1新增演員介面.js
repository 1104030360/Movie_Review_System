$(document).ready(function() {
    getAllActor();
});

//全部演員列表
function getAllActor() {  
    $.ajax({
    type: "GET",
    url: '/MovieReviw/api/ActorController.do', 
    crossDomain: true,
    cache: false,
    dataType: 'json',
    success: function (response) {
		console.log(response) ;
     	updateActor(response.response.data);
    },
    error: function (error) {
        console.error("Error fetching actors data: ", error);
    }
});
     
}
function updateActor(ActorData){
        var recommendedActorsList = $("#recommendedActors");

	    recommendedActorsList.empty();
	
	    $.each(ActorData, function(index, actor) {
	        var listItem = '<li>' +
	            '<img src="../ActorPhoto/' + actor.photo + '" alt="' + actor.name + '" onclick="addSelectedActor(this)" data-id="' + actor.id +'">' +
	            '<p>' + actor.name + '</p>' +
	            '</li>';
	
	        recommendedActorsList.append(listItem);
	    });
	    getActorByMovie();
}

//該電影演員列表
function getActorByMovie() {
	var urlParams = new URLSearchParams(window.location.search);
    var movieId = urlParams.get('movie_id');
	
	$.ajax({
	    type: "GET",
	    url: '/MovieReviw/api/ActorController.do',  
	    data: "movie_id=" + movieId,
	    crossDomain: true,
	    cache: false,
	    dataType: 'json',
	    success: function (response) {
			console.log(response) ;
	     	updateMovieActor(response.response.data);
	    },
	    error: function (error) {
	        console.error("Error fetching actors data: ", error);
	    }
});
}
function updateMovieActor(ActorData){
        var recommendedActorsList = $("#MovieActors");

	    recommendedActorsList.empty();
	
	    $.each(ActorData, function(index, actor) {
	        var listItem = '<li>' +
	            '<img src="../ActorPhoto/' + actor.photo + '" alt="' + actor.name + '" onclick="deleteSelectedActor(this)" data-id="' + actor.id + '">' +
	            '<p>' + actor.name + '</p>' +
	            '</li>';
	
	        recommendedActorsList.append(listItem);
	    });
}

//新增演員到該電影
function addSelectedActor(element) {
	var urlParams = new URLSearchParams(window.location.search);
    var movieId = urlParams.get('movie_id');
    var actorId = $(element).data('id');
    
    var dataObject = {
        "movie_id": movieId,
        "actor_id": actorId
    };

    var dataString = JSON.stringify(dataObject);

    $.ajax({
        type: "POST",
        url: '/MovieReviw/api/ActorController.do',
        data: dataString,
        crossDomain: true,
        cache: false,
        dataType: 'json',
        success: function (response) {
            console.log(response);
            getAllActor();
        },
        error: function (error) {
            console.error("Error adding actor to movie: ", error);
        }
    });
}

//將該電影演員移除
function deleteSelectedActor(element) {
    var urlParams = new URLSearchParams(window.location.search);
    var movieId = urlParams.get('movie_id');
    var actorId = $(element).data('id');
    
    var dataObject = {
        "movie_id": movieId,
        "actor_id": actorId
    };

    var dataString = JSON.stringify(dataObject);


    $.ajax({
        type: "DELETE", 
        url: '/MovieReviw/api/ActorController.do', 
        data: dataString,
        crossDomain: true,
        cache: false,
        dataType: 'json',
        success: function (response) {
            console.log(response);
            getAllActor();
        },
        error: function (error) {
            console.error("Error deleting actor from movie: ", error);
        }
    });
}
function BackToPrevious(){
	var urlParams = new URLSearchParams(window.location.search);
    var importerId = urlParams.get('importer_id');
    window.location.replace('4.1.3編輯演員導演介面.html?importer_id=' + importerId);
}
function NewActor() {
	var urlParams = new URLSearchParams(window.location.search);
    var movieId = urlParams.get('movie_id');
    var urlParams = new URLSearchParams(window.location.search);
    var importerId = urlParams.get('importer_id');
    window.location.replace('4.1.1.1演員添加介面.html?importer_id=' + importerId + '&movie_id=' + movieId );
}




