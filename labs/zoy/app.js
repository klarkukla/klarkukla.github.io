"use strict";

var sceneSize = 4000;

// RENDERER

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor(0x111);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// CAM

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, sceneSize);
camera.position.set(0, 2500, 0);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// SCENE

var scene = new THREE.Scene();

// FOG

//scene.fog = new THREE.Fog(0x111111, 400, sceneSize);

// CONTROLS

var controls = new THREE.OrbitControls(camera, renderer.domElement);

//-----------------------------------------------

// ADD OBJECTS





// LUNGS

var lung0 = new Lung({
    textures: [
        new THREE.ImageUtils.loadTexture('img/0.png'),
        new THREE.ImageUtils.loadTexture('img/0_bump.png'),
        new THREE.ImageUtils.loadTexture('img/0_bump.png'),
        new THREE.ImageUtils.loadTexture('img/0_bump.png')
    ],
    textureOffsetSpeed: 0.0005,
    pumpSpeed: 0.001
});
lung0.mesh.position.set(-200, 0, 0);
scene.add(lung0.mesh);

var lung1 = new Lung({
    textures: [
        new THREE.ImageUtils.loadTexture('img/otomon.png'),
        new THREE.ImageUtils.loadTexture('img/0_bump.png'),
        new THREE.ImageUtils.loadTexture('img/0_bump.png'),
        new THREE.ImageUtils.loadTexture('img/0_bump.png')
    ],
    textureOffsetSpeed: 0.0009,
    pumpSpeed: 0.001
});
lung1.mesh.position.set(400, 0, 0);
lung1.mesh.scale.set(0.7, 0.7, 0.7);
scene.add(lung1.mesh);


var loader = new THREE.ColladaLoader();
loader.options.convertUpAxis = true;

var pool = null;
loader.load('img/pool.dae', function(collada){

    var dae = collada.scene;

    dae.traverse(function(child){

        if(child instanceof THREE.Mesh){

            var geometry = child.geometry;
            Morpheus.generateMorphTargets(geometry);

            var material = new THREE.MeshBasicMaterial({
                morphTargets: true,
                wireframe: true
            });

            pool = new THREE.Mesh(geometry, material);

            pool.scale.x = pool.scale.y = pool.scale.z = 600;
            pool.position.y = -50;
            pool.updateMatrix();

            scene.add(pool);
        }
    });
});




// RENDER

Animator.render(function(t){

    lung0.render(t, 0);
    lung1.render(t, 10);

    if(pool !== null){
        pool.morphTargetInfluences[0] = (1 + Math.sin(t*0.001)) / 8;
    }

    renderer.render(scene, camera);
});
