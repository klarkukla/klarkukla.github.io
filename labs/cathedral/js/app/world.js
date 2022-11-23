var World = (function(){

	//---------------------------

	var sceneSize = 4000;

	// RENDERER

	var renderer = new THREE.WebGLRenderer({antialias: false});
	//renderer.setClearColor(0x111);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('world').appendChild(renderer.domElement);

	// CAM

	var camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, sceneSize * 2);

	// SCENE

	var scene = new THREE.Scene();

	// FOG

	//scene.fog = new THREE.Fog(0x111111, 400, sceneSize/2);

	// LIGHTS

	var dl = new THREE.DirectionalLight(0xffffff, 1);
	dl.position.set(sceneSize, sceneSize, sceneSize);
	scene.add(dl);

	// CONTROLS

	//var controls = new THREE.OrbitControls(camera, renderer.domElement);

	var gamepadControls = new Xbox360Controls(camera, {
		bodySpeed: 5,
		headSpeed: 10,
		position: {
			x: -50,
			y: 100,
			z: 100
		}
	});
	scene.add(gamepadControls.object);

	return{
		renderer: renderer,
		camera: camera,
		scene: scene,
		//controls: controls,
		gamepadControls: gamepadControls,
		sceneSize :sceneSize
	}
})();
