/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
>> @author Thomas Lhoest - tlhoest@gmail.com
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/

define(function() {
	
	/*
		@params : DOM Element to lock
	*/
	var PointerLock = function(DOMElement){
		this.element = DOMElement;
	};

	PointerLock.prototype = {

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
					if (document.pointerLockElement === this.element || 
						document.mozPointerLockElement === this.element || 
						document.webkitPointerLockElement === this.element) {
						
						txt = 'Pointer Lock enabled on ' + this.element;
					} else {
						txt = 'Pointer Lock disabled on ' + this.element;
					}
					if (success !== null) {
						return success.call(this, txt);
					}
				}

				// error handler
				var pointerlockerror = function(e) {
					if (success !== null) {
						return error.call(this, 'Error : Pointer Lock error');
					}	
				}

				// lock change handlers
				document.addEventListener( 'pointerlockchange', pointerlockchange, false );
				document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
				document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
				// error handlers
				document.addEventListener( 'pointerlockerror', pointerlockerror, false );
				document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
				document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

				// Ask the browser to lock the pointer
				this.element.requestPointerLock = 
					this.element.requestPointerLock || 
					this.element.mozRequestPointerLock || 
					this.element.webkitRequestPointerLock;
				// click handler
				this.element.addEventListener('click', this.clickHandler, false);
				this.element.click();
			} else {
				alert('Your browser doesn\'t seem to support Pointer Lock API.<br> Please download the latest version of Firefox or Chrome');
			}
		},

		unlock: function() {
			this.element.removeEventListener('click', this.clickHandler, false);
		},

		clickHandler: function(e){

			var that = this;
			that.element = e.target;

			// if Firefox
			if (/Firefox/i.test(navigator.userAgent)) {

				function fullscreenchange(e) {
					if (document.fullscreenElement === that.element || 
						document.mozFullscreenElement === that.element || 
						document.mozFullScreenElement === that.element) {
						document.removeEventListener( 'fullscreenchange', fullscreenchange );
						document.removeEventListener( 'mozfullscreenchange', fullscreenchange );
						that.element.requestPointerLock();
					}
				};

				document.addEventListener( 'fullscreenchange', fullscreenchange, false );
				document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );

				that.element.requestFullscreen = 
					that.element.requestFullscreen || 
					that.element.mozRequestFullscreen || 
					that.element.mozRequestFullScreen || 
					that.element.webkitRequestFullscreen;

				that.element.requestFullscreen();
			} else {
				that.element.requestPointerLock();
			}
		}
	};

	return PointerLock;
});