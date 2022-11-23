var App = App || {};

App.MainController = (function(){

    var module = {

        initialize : function() {

            /*
             * RENDERER
             * <<<<<<<<<<<<<<<<<<<<<<<<<<
             * */
            var renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            /*
             * SCENE
             * <<<<<<<<<<<<<<<<<<<<<<<<<<
             * */
            var scene = new THREE.Scene();

            var boundaries = 2000;


            //console.log(scene);

            var skydome = new SkyDome("assets/textures/skybox.jpg", boundaries/2);
            scene.add(skydome);

            /*
             * LIGHTS
             * <<<<<<<<<<<<<<<<<<<<<<<<<<
             * */
            var light = new THREE.AmbientLight(0xaaaaaa);
            scene.add(light);

            /*
             * CAMERA
             * <<<<<<<<<<<<<<<<<<<<<<<<<<
             * */
            var camera	= new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, boundaries);
            camera.position.z = 20;


            /*
             * POST-PROCESSING
             * <<<<<<<<<<<<<<<<<<<<<<<<<<
             * */
            var ppm = new PostProcessingManager(scene, renderer, camera);

            /*
             * RENDER
             * <<<<<<<<<<<<<<<<<<<<<<<<<<
             * */

            var runner = new Runner();
            runner.draw = function(time){
                scene.children[0].rotation.x += 0.01;
                scene.children[0].rotation.y += 0.01;
                scene.children[0].rotation.z += 0.01;
                ppm.render();
            };
        }
    };

    return module;
})();

App.MainController.initialize();
