/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
$$ @author Thomas Lhoest - tlhoest@gmail.com
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/

/*
>> WindowResizer for THREE.js + Require
*/

define(function(){

	var M = function(renderer, camera){

		this.renderer = renderer;
		this.camera = camera;

		window.addEventListener('resize', function() {
	        var WIDTH = window.innerWidth,
	            HEIGHT = window.innerHeight;
	        this.renderer.setSize(WIDTH, HEIGHT);
	        this.camera.aspect = WIDTH / HEIGHT;
	        this.camera.updateProjectionMatrix();
	    });

	};

	return M;          
});