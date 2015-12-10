

var AppController = {

	locationLabel : "Location/",

	init : function() {
		addMarker();
	},

	
}

/**
* Initialize the app when window is done loading
*/
window.onload = function() {
   AppController.init();
};