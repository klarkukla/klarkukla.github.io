var Textures = (function(){

	//--------------------------------------------------

	var t0 = THREE.ImageUtils.loadTexture('assets/img/0.png');
	t0.wrapS = t0.wrapT = THREE.RepeatWrapping;

	//--------------------------------------------------

	var t1 = THREE.ImageUtils.loadTexture('assets/img/1.png');
	t1.wrapS = t1.wrapT = THREE.RepeatWrapping;

	//--------------------------------------------------

	var t2 = THREE.ImageUtils.loadTexture('assets/img/2.png');
	t2.wrapS = t2.wrapT = THREE.RepeatWrapping;

	//--------------------------------------------------

	var t3 = THREE.ImageUtils.loadTexture('assets/img/3.png');
	t3.wrapS = t3.wrapT = THREE.RepeatWrapping;

	//--------------------------------------------------

	return{
		t0: t0,
		t1: t1,
		t2: t2,
		t3: t3
	}
})();