/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
@author Thomas Lhoest - tlhoest@gmail.com
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/

/*
>> Resize THREE.js
*/

var WindowResize = (function(){

	var module = function(renderer, camera){

		window.addEventListener('resize', function(){
	        var WIDTH = window.innerWidth,
	            HEIGHT = window.innerHeight;
	        renderer.setSize(WIDTH, HEIGHT);
	        camera.aspect = WIDTH / HEIGHT;
	        camera.updateProjectionMatrix();
	    });
	};

	return module;
})();