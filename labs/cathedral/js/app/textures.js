var Textures = (function(){

	var loader = Loader.textureLoader;

	//--------------------------------------------------

	var t0 = loader.load('assets/textures/t0.png');
	t0.wrapS = t0.wrapT = THREE.RepeatWrapping;

	//--------------------------------------------------

	var t1 = loader.load('assets/textures/t1.png');
	t1.wrapS = t1.wrapT = THREE.RepeatWrapping;

	//--------------------------------------------------

	var t2 = loader.load('assets/textures/t2.png');
	t2.wrapS = t2.wrapT = THREE.RepeatWrapping;

	var t2_normal = loader.load('assets/textures/t2_normal.png');
	t2_normal.wrapS = t2_normal.wrapT = THREE.RepeatWrapping;

	var t2_bump = loader.load('assets/textures/t2.png');
	t2_bump.wrapS = t2_bump.wrapT = THREE.RepeatWrapping;

	//--------------------------------------------------

	var t3 = loader.load('assets/textures/t3.png');
	t3.wrapS = t3.wrapT = THREE.RepeatWrapping;

	//--------------------------------------------------

	var t4 = loader.load('assets/textures/t4.png');
	t4.wrapS = t4.wrapT = THREE.RepeatWrapping;

	var t4_normal = loader.load('assets/textures/t4_normal.png');
	t4_normal.wrapS = t4_normal.wrapT = THREE.RepeatWrapping;

	var t4_bump = loader.load('assets/textures/t4_bump.png');
	t4_bump.wrapS = t4_bump.wrapT = THREE.RepeatWrapping;

	//--------------------------------------------------

	var mayona = loader.load('assets/textures/mayona.png');

	//--------------------------------------------------

	var otomon = loader.load('assets/textures/otomon.png');

	//--------------------------------------------------

	return{
		t0: t0,
		t1: t1,
		t2: t2,
		t2_normal: t2_normal,
		t2_bump: t2_bump,
		t3: t3,
		t4: t4,
		t4_normal: t4_normal,
		t4_bump: t4_bump,
		mayona: mayona,
		otomon: otomon
	}
})();