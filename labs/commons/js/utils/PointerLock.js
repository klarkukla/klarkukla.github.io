/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
>> @author Thomas Lhoest - tlhoest@gmail.com
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/

var PointerLock = (function() {

    var element = null;

    var module = {

        grab: function (DOMElement) {
            element = DOMElement;
        },

		/*
			@params : success & error callbacks
		*/
		lock: function(success, error) {

			// defaults
			success = typeof success != 'undefined' ? success : null;
	  		error = typeof error != 'undefined' ? error : null;

	  		// check browser support
			var havePointerLock = 
			'pointerLockElement' in document || 
			'mozPointerLockElement' in document || 
			'webkitPointerLockElement' in document;

			if (havePointerLock) {
				// success handler
				var pointerlockchange = function(e) {
					var txt = '';
					if (document.pointerLockElement === element ||
						document.mozPointerLockElement === element ||
						document.webkitPointerLockElement === element) {
						
						txt = 'Pointer Lock enabled on ' + element;
					} else {
						txt = 'Pointer Lock disabled on ' + element;
					}
					if (success !== null) {
						return success.call(this, txt);
					}
				};

				// error handler
				var pointerlockerror = function(e) {
					if (success !== null) {
						return error.call(this, 'Error : Pointer Lock error');
					}	
				};

				// lock change handlers
				document.addEventListener( 'pointerlockchange', pointerlockchange, false );
				document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
				document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
				// error handlers
				document.addEventListener( 'pointerlockerror', pointerlockerror, false );
				document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
				document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

				// Ask the browser to lock the pointer
				element.requestPointerLock =
					element.requestPointerLock ||
					element.mozRequestPointerLock ||
					element.webkitRequestPointerLock;
				// click handler
				element.addEventListener('click', this.clickHandler, false);
				element.click();
			} else {
				alert('Your browser doesn\'t seem to support Pointer Lock API.<br> Please download the latest version of Firefox or Chrome');
			}
		},

		unlock: function() {
			element.removeEventListener('click', this.clickHandler, false);
		},

		clickHandler: function(e){

			element = e.target;

			// if Firefox
			if (/Firefox/i.test(navigator.userAgent)) {

				function fullscreenchange(e) {
					if (document.fullscreenElement === element ||
						document.mozFullscreenElement === element ||
						document.mozFullScreenElement === element) {
						document.removeEventListener( 'fullscreenchange', fullscreenchange );
						document.removeEventListener( 'mozfullscreenchange', fullscreenchange );
						element.requestPointerLock();
					}
				}

				document.addEventListener( 'fullscreenchange', fullscreenchange, false );
				document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );

				element.requestFullscreen =
					element.requestFullscreen ||
					element.mozRequestFullscreen ||
					element.mozRequestFullScreen ||
					element.webkitRequestFullscreen;

				element.requestFullscreen();
			} else {
				element.requestPointerLock();
			}
		}
	};

	return module;
})();