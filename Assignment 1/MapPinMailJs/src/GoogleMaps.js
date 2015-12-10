var centerLatLng = {lat: 59.32939910888672, lng: 18.068599700927734};
var map;
var infoWindow = null;

/**
*	Method is called as a callback from a script in the header
*	Creates a Map object to the DOM element
*/
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: centerLatLng,
		zoom: 4
	});
}

/**
*	Method is called from the GmailService.js
*	Creates a Geocode object which is used to set the location of the marker
*	@param {Object} message, containts data to determent address location
*/
function getGeocode(message) {
	var geocoder = new google.maps.Geocoder();

	geocoder.geocode({'address': message.location},
		function(results, status){
            if(status == google.maps.GeocoderStatus.OK){
                addMapMarker(results[0].geometry.location, message);
            }
            else {
	        	console.log("something went wrong");
            }
        });
}

/**
*	Creates a Marker object and put it on the right position coordinate
*	Creates an InfoWinow object to show on the markers eventListener
*	@param {Object} coords, containts data to determent position
*	@param {Object} message, containts data to determent title of the marker 
*/
function addMapMarker(coords, message) {
	var marker = new google.maps.Marker({
		map: map,
		position: coords,
		title: message.snippet
  	});

	marker.addListener('click', function() {

		if (infoWindow) {
			infoWindow.close();
		}

		infoWindow = new google.maps.InfoWindow({
			content : getInfoWindow(message)
		});

		infoWindow.open(map, marker);
	});
}

/**
*	Creates html string to use as info to the InfoWindow
*	@param {Object} message, containts data to determent content
*	@return String html
*/
function getInfoWindow(message) {
	var contentString = '<div id="content">'+
      '<h2 id="firstHeading" class="firstHeading">'+message.snippet+'</h2>'+
      '<div id="bodyContent">'+
      '<h3>Conference meeting in '+message.location+'</h3>'+
      '<p>Received from: '+message.from+'</p><p>Invitation received: '+message.date+'.</p>'+
      '</div>'+
      '</div>';
	return contentString;
}