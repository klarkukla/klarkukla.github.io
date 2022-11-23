"use strict";

var World = (function () {

	//---------------------------

	var sceneSize = 4000;

	// RENDERER

	var renderer = new THREE.WebGLRenderer({ antialias: false });
	//renderer.setClearColor(0x111);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// CAM

	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, sceneSize * 2);
	camera.position.set(0, 0, 100);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	// SCENE

	var scene = new THREE.Scene();

	// FOG

	//scene.fog = new THREE.Fog(0x111111, 400, sceneSize/2);

	// LIGHTS

	/*var dl = new THREE.DirectionalLight(0xffffff, 1);
 dl.position.set(0, 1000, 1000);
 scene.add(dl);*/

	// CONTROLS

	var controls = new THREE.OrbitControls(camera, renderer.domElement);

	return {
		renderer: renderer,
		camera: camera,
		scene: scene,
		controls: controls,
		sceneSize: sceneSize
	};
})();

//# sourceMappingURL=world-compiled.js.map