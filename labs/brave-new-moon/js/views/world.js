define([
    'backbone',
    'three',

    'modules/3d/PointerLockControls',
    'modules/3d/WindowResizer',

    '../modules/PostProcessingManager'
],
function(
            Backbone,
            THREE,

            PointerLockControls,
            WindowResizer,

            PostProcessingManager
    ) {

    var view = Backbone.View.extend({

        el: '#world',

        globals: {
            meshObjects: []
        },

        initialize: function(options) {
            _.bindAll(this, 'renderSculpture', 'setup', 'render', 'enableControls', 'disableControls');

            this.options = options;
            this.options.e.bind('hideUI', this.enableControls);
            this.options.e.bind('showUI', this.disableControls);

            this.setup();
        },

        setup: function() {

            var self = this;

            // scene
            this.scene = new THREE.Scene();

            // cam
            this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 20000);
            this.scene.add(this.camera);

            // fog
            //this.scene.fog = new THREE.Fog(0xb79f79, 1, 3000);

            // renderer
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setClearColor(0xb79f79, 1);
            this.renderer.gammaInput = true;
            this.renderer.gammaOutput = true;
            this.$el.append(this.renderer.domElement);

            // light
            var ambientLight = new THREE.AmbientLight(0xffffff);
            this.scene.add(ambientLight);

            // floor
            var floorGeometry = new THREE.PlaneGeometry(20000, 20000, 100, 100);
            var floorMaterial = new THREE.MeshLambertMaterial({color: 0x1a1a1a, side: THREE.DoubleSide});
            var floor = new THREE.Mesh(floorGeometry, floorMaterial);
            floor.position.y = 0;
            floor.rotation.x = Math.PI / 2;
            floor.receiveShadow = true;
            //this.scene.add(floor);

            // controls
            this.controls = new THREE.PointerLockControls(this.camera, {x:0, y:200, z: 1800});
            this.scene.add(this.controls.getObject());

            /*
            *
            * effects
            *
            * */
            this.PPManager = new PostProcessingManager(this.scene, this.renderer, this.camera);

            /*
             *
             * sculpture
             *
             * */
            this.renderSculpture();

            /*
            *
            * animate
            *
            * */
            var time = Date.now();
            requestAnimationFrame(function animate(){
                self.render(time);
                time = Date.now();
                requestAnimationFrame(animate);
            });

            // resize
            WindowResizer(this.renderer, this.camera);
        },

        render: function (time) {

            this.controls.update(Date.now() - time, 0.2);
            this.renderer.setClearColor(0xb79f79, 1);

            for(var i = 0; i < this.globals.meshObjects.length; i++){
                if(this.globals.meshObjects[i] !== undefined){
                    this.globals.meshObjects[i].rotation.y += 0.001 * Math.random();
                    this.globals.meshObjects[i].rotation.z += 0.001 * Math.random();
                }
            }

            this.renderer.render(this.scene, this.camera);
            //this.PPManager.render();
        },

        renderSculpture: function() {

            var self = this;
            var objects = this.model.get('objects');
            var age = this.options.model2.get('age');
            var pieces = this.options.model2.get('pieces');
            var p = 0;

            function addObject(i) {

                var texture = new THREE.ImageUtils.loadTexture(objects[i].src, undefined, loaded, error);

                function loaded(e) {

                    var material = new THREE.MeshLambertMaterial({
                        map: texture, 
                        side:THREE.DoubleSide, 
                        transparent: true, 
                        opacity: 1,
                        alphaTest: 0.5
                    });

                    var geometry = new THREE.PlaneGeometry(e.image.width, e.image.height);

                    var object = self.globals.meshObjects[i] = new THREE.Mesh(geometry, material);
                    object.position = objects[i].position;
                    object.rotation.x = objects[i].rotation.x;
                    object.rotation.y = objects[i].rotation.y;
                    object.rotation.z = objects[i].rotation.z;

                    self.scene.add(object);

                    p++;
                    if (p == pieces) {
                        self.options.e.trigger('objectsLoaded');
                    }
                }


                function error(){
                    self.options.e.trigger('loadingError');
                }
            }

            for (var i = 0; i < pieces; i++) {
                addObject(i);
            }
        },

        /*-------------------------------------------*/

        enableControls: function() {
            this.controls.enabled = true;
        },

        disableControls: function() {
            this.controls.enabled = false;
        } 
    });

    return view;
});