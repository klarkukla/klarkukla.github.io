var Scene = (function(){

    //--------------------------------------------------

    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;

    //--------------------------------------------------
    // axes

    var axis0 = new THREE.Object3D();
    var axis1 = new THREE.Object3D();
    var axis2 = new THREE.Object3D();
    var axis3 = new THREE.Object3D();
    World.scene.add(axis0);
    World.scene.add(axis1);
    World.scene.add(axis2);
    World.scene.add(axis3);

    //--------------------------------------------------

    var skybox = new THREE.Mesh(new THREE.SphereGeometry(World.sceneSize / 2, 60, 40), Materials.m1);
    skybox.scale.set(-1, 1, 1);
    World.scene.add(skybox);

    //-------------------------------------------

    var rain = new Rain(World.sceneSize);
    World.scene.add(rain.mesh);

    //--------------------------------------------------
    // islands

    var island0 = new SpartlexIsland({
        rotation: 0.001,
        loaderInstance: loader
    });
    island0.mesh.position.set(50, 0, 351);
    axis0.add(island0.mesh);

    //--------------------------------------------------

    var island1 = new ManoyamiIsland({
        rotation: 0.0008,
        loaderInstance: loader
    });
    island1.mesh.position.set(200, 250, -50);
    axis1.add(island1.mesh);

    //--------------------------------------------------

    var island2 = new GalmaIsland({
        rotation: 0.005,
        loaderInstance: loader
    });
    island2.mesh.position.set(-180, -250, 320);
    axis2.add(island2.mesh);

    //--------------------------------------------------

    var island3 = new OtomonIsland({
        rotation: 0.008,
        loaderInstance: loader
    });
    island3.mesh.position.set(180, -500, -323);
    axis3.add(island3.mesh);

    //--------------------------------------------------

    return{

        render: function(t){

            //--------------------------------------------------

            island0.render(t);
            island1.render(t);
            island2.render(t);
            island3.render(t);

            //--------------------------------------------------

            rain.render();

            //--------------------------------------------------

            axis0.rotation.y += 0.00059;
            axis1.rotation.y -= 0.00046;
            axis2.rotation.y += 0.00089;
            axis3.rotation.y -= 0.00073;

            axis0.scale.x = (SoundGrabber.getFFT()[512]) + 1;
            axis1.scale.x = (SoundGrabber.getFFT()[64]) + 1;
            axis2.scale.x = (SoundGrabber.getFFT()[128]) + 1;
            axis3.scale.x = (SoundGrabber.getFFT()[256]) + 1;
        }
    }
})();