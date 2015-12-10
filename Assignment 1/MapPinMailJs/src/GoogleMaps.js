var myLatLng = {lat: 59.32939910888672, lng: 18.068599700927734};
var map;
var url = "http://ip-json.rhcloud.com/json/64.27.57.24";

function initMap() {
	var geoCoder = new google.maps.Geocoder();
	// Create a map object and specify the DOM element for display.
	map = new google.maps.Map(document.getElementById('map'), {
		center: myLatLng,
		zoom: 4
	});
}

function addMarker() {
	var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
}