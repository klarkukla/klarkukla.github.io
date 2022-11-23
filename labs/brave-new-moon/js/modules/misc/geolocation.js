/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
>> @author Thomas Lhoest - tlhoest@gmail.com
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/

define(function() {

	var G = function() {};

	/*
		@params : success & error callbacks
	*/
	G.prototype.geolocate = function(success, error) {

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(geolocComplete, geolocError);
		} else {
			console.log('No geolocation available');
		}

		function geolocComplete(position) {
			return success.call(this, position);
		}

		function geolocError(error) {
		    var e = 'Geoloc error : ';
		    switch(error.code){
			    case error.TIMEOUT:
			    	e += 'TIMEOUT';
			    break;
			    case error.PERMISSION_DENIED:
			    	e += 'PERMISSION_DENIED';
			    break;
			    case error.POSITION_UNAVAILABLE:
			    	e += 'POSITION_UNAVAILABLE';
			    break;
			    case error.UNKNOWN_ERROR:
			    	e += 'UNKNOWN_ERROR';
			    break;
			}
			return error.call(this, e);
		}
	};
	
	return G;
});