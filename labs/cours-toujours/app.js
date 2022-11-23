(function(){

    var camera, scene, renderer;

    var polys, puddles;

    var speed = 10;
    var horizon = 3000;

    var moveLeft = false;
    var moveRight = false;

    var velocity = 0;

    var compositor = null;
    var postProcessing = {
        render: false
    };

    var uniforms = null;

    var gui = new dat.GUI();
    gui.close();

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor(0x442EB2, 1.0);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, horizon);
    camera.position.y = -500;
    camera.position.z = 20;
    camera.lookAt(new THREE.Vector3(0,0,0));

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(renderer.getClearColor(), 0.0007);

    compositor = Compositor(scene, renderer, camera, gui);



    /*
    *
    *
    * polys
    *
    * */

    polys = [];

    var darkMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, transparent: false, opacity: 0.5 } );

    var cube = THREE.SceneUtils.createMultiMaterialObject(
        new THREE.BoxGeometry(30, 30, 30),
        [darkMaterial, new THREE.MeshBasicMaterial( { color: 0x56CC53, wireframe: false, wireframeLinewidth: 3} )]
    );

    var tetra = THREE.SceneUtils.createMultiMaterialObject(
        new THREE.TetrahedronGeometry( 15, 0),
        [darkMaterial, new THREE.MeshBasicMaterial( { color: 0x54B252, wireframe: false, wireframeLinewidth: 3} )]
    );

    var octa = THREE.SceneUtils.createMultiMaterialObject(
        new THREE.OctahedronGeometry( 10, 0),
        [darkMaterial, new THREE.MeshBasicMaterial( { color: 0xDCAA86, wireframe: false, wireframeLinewidth: 3} )]
    );

    var totalPolys = 100;

    for(var i = 0; i < totalPolys; i++){
        var poly;
        if(i < (totalPolys * 0.6)){
            poly = octa.clone();
        } else if(i >= totalPolys * 0.6 && i < totalPolys * 0.9){
            poly = tetra.clone();
        } else {
            poly = cube.clone();
        }

        poly.position.set(Math.random() * horizon - horizon/2, Math.random() * horizon + horizon/2, Math.random() * 200);

        poly.spinX = (Math.random() * 20 - 10) / 1000;
        poly.spinY = (Math.random() * 4 - 2) /100;
        poly.modX = (Math.random() * 3 - 2)/10;
        poly.modY = (Math.random() * 10 - 5)/10;
        polys.push(poly);
        scene.add(poly);
    }


    // Cones

    for(var i = 0; i < 10; i++){

        poly = THREE.SceneUtils.createMultiMaterialObject(
            new THREE.CylinderGeometry( 0, 30, 100, 20, 4 ),
            [darkMaterial, new THREE.MeshBasicMaterial( { color: 0x9682FF, wireframe: false, wireframeLinewidth: 3} )]
        );

        poly.position.set(Math.random() * horizon - horizon/2, Math.random() * horizon + horizon/2, 0);

        poly.rotation.x = Math.PI /2;

        poly.spinX = 0;
        poly.spinY = 0;
        poly.modX = 0;
        poly.modY = 0;

        polys.push(poly);
        scene.add(poly);

    }

    // lines

    var material = new THREE.LineBasicMaterial({
        color: 0xffffff
    });

    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 50)
    );


    for(var i = 0; i < 100; i++){

        poly = new THREE.Line(geometry, material);

        poly.position.set(Math.random() * horizon - horizon/2, Math.random() * horizon + horizon/2, Math.random() * 200);

        poly.spinX = (Math.random() * 20 - 10) / 1000;
        poly.spinY = (Math.random() * 4 - 2) /100;
        poly.modX = (Math.random() * 3 - 2)/10;
        poly.modY = (Math.random() * 10 - 5)/10;

        polys.push(poly);
        scene.add(poly);

    }

    //rings


    for(var i = 0; i < 10; i++){

        poly = new THREE.Mesh(
            new THREE.RingGeometry( 150, 200, 32 ),
            new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide })
        );

        poly.position.set(Math.random() * horizon - horizon/2, Math.random() * horizon + horizon/2, (Math.random() * 400) + 200);

        poly.spinX = 0;
        poly.spinY = 0;
        poly.modX = Math.sin(i);
        poly.modY = 0;

        polys.push(poly);
        scene.add(poly);
    }

    //polyhedrons


    for(var i = 0; i < 100; i++){

        /*uniforms = {
            time: {
                type: "f",
                value: 1.0
            },
            resolution: {
                type: "v2",
                value: new THREE.Vector2()
            }
        };

        var m = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader: document.getElementById('fragmentShader').textContent
        });

        uniforms.resolution.value.x = 100; //width
        uniforms.resolution.value.y = 100; //height*/

        poly = new THREE.Mesh(
            new THREE.CircleGeometry(20, 20),
            new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide })
        );

        poly.position.set(Math.random() * horizon - horizon/2, Math.random() * horizon + horizon/2, (Math.random() * 400) + 200);

        poly.spinX = 0;
        poly.spinY = 0;
        poly.modX = Math.sin(i);
        poly.modY = 0;

        polys.push(poly);
        scene.add(poly);
    }

    //


    //


    //puddles

    var radius = 100;
    var segments = 32;

    for(var i = 0; i < 10; i++){

        poly = new THREE.Mesh(
            new THREE.CircleGeometry(radius, segments),
            new THREE.MeshBasicMaterial({color:0xFF9A4F})
        );

        poly.position.set(Math.random() * horizon - horizon/2, Math.random() * horizon + horizon/2, -55);

        poly.spinX = 0;
        poly.spinY = 0;
        poly.modX = 0;
        poly.modY = 0;

        polys.push(poly);
        scene.add(poly);

    }

    /*
    *
    * GUI
    *
    * */

    var f1 = gui.addFolder('camera position');
    f1.add(camera.position, 'x', -500, 500).listen();
    f1.add(camera.position, 'y', -2000, 2000);
    f1.add(camera.position, 'z', 1, 600);
    f1.open();

    var f2 = gui.addFolder('camera rotation');
    f2.add(camera.rotation, 'x', -Math.PI, Math.PI);
    f2.add(camera.rotation, 'y', -Math.PI, Math.PI);
    f2.add(camera.rotation, 'z', -Math.PI, Math.PI);
    f2.open();

    var p = gui.addFolder('Post Processing');
    p.add(postProcessing, 'render');
    p.open();


    /*
    *
    *
    * listeners
    *
    * */

    window.addEventListener('resize', onWindowResize, false );
    window.addEventListener('keydown', onKeyDown, false);
    window.addEventListener('keyup', onKeyUp, false);

    /*
    *
    * Animate
    *
    * */

    Animator.render(function(time){

        for(var i = 0; i < polys.length; i++){
            var poly = polys[i];
            poly.rotation.x += poly.spinX;
            poly.rotation.y += poly.spinY;
            poly.position.x += poly.modX;
            //poly.position.y += - speed - poly.modY;

            if(poly.position.y < camera.position.y){
                polys[i].position.x = Math.random() * horizon - horizon/2;
                polys[i].position.y = camera.position.y + horizon;
            }

        }

        //uniforms.time.value += 0.3;
        moveCamera(Date.now() - time);
        render();

    });

    /*
    *
    * Render
    *
    *
    * */

    function render(){
        if(postProcessing.render){
            compositor.render();
            renderer.autoClear = false;
        } else {
            renderer.autoClear = true;
            renderer.render(scene, camera);
        }
    }


    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
        render();
    }

    function moveCamera(delta) {

        delta *= 0.1;

        velocity += ( - velocity ) * 0.04 * delta;

        var multi = speed / 20;

        if ( moveLeft ) velocity -= multi * delta;
        if ( moveRight ) velocity += multi * delta;

        camera.translateX( velocity );
        camera.position.y += speed;
    }


    function onKeyDown(e){

        switch(e.keyCode){

            case 37: // left
            case 65: // a
                moveLeft = true;
            break;

            case 39: // right
            case 68: // d
                moveRight = true;
            break;
        }
    }

    function onKeyUp(event){

        switch( event.keyCode ) {

            case 37: // left
            case 65: // a
                moveLeft = false;
                break;

            case 39: // right
            case 68: // d
                moveRight = false;
                break;

        }

    }

})();
