/**
*
* @class SpartlexIsland
* ---------------------
*
* */

class SpartlexIsland extends Island{

    constructor(params){
        super(params);

        var that = this;

        //----------------------------------

        this.platform = null;
        this.loader.load('assets/models/platform0.dae', function(collada){
            collada.scene.traverse(function(child){
                if(child instanceof THREE.Mesh){
                    var geometry = child.geometry;
                    Morpheus.generateMorphTargets(geometry);
                    that.platform = new THREE.Mesh(geometry, Materials.m3);
                    that.platform.scale.x = that.platform.scale.y = that.platform.scale.z = 60;
                    that.container.add(that.platform);
                }
            });
        });

        //----------------------------------

        this.spartan = null;
        this.loader.load('assets/models/spartan.dae', function(collada){
            collada.scene.traverse(function(child){
                if(child instanceof THREE.Mesh){
                    that.spartan = new THREE.Mesh(child.geometry, Materials.m0);
                    that.spartan.scale.x = that.spartan.scale.y = that.spartan.scale.z = 2;
                    that.spartan.position.y = 100;
                    that.container.add(that.spartan);
                }
            });
        });

        //----------------------------------

        this.tree = null;
        this.loader.load('assets/models/tree.dae', function(collada){
            collada.scene.traverse(function(child){
                if(child instanceof THREE.Mesh){
                    that.tree = new THREE.Mesh(child.geometry, Materials.m4);
                    that.tree.scale.x = that.tree.scale.y = that.tree.scale.z = 10;
                    that.tree.rotation.x = Math.PI/2;
                    that.tree.material.needsUpdate = true;
                    that.container.add(that.tree);
                }
            });
        });

        //----------------------------------

        this.waves = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100, 40, 40),
            Materials.m1
        );
        this.waves.rotation.x = 90;
        this.container.add(this.waves);

        //----------------------------------

        var hook = new Hook(Materials.m5);
        this.container.add(hook.mesh);
    }

    render(t){
        super.render(t);

        //----------------------------------

        if(this.platform !== null){
            this.platform.morphTargetInfluences[0] = ((1 + Math.sin(t*0.001)) / 8);
        }

        //----------------------------------

        if(this.tree !== null){
            if(SoundGrabber.getFFT()[0] !== undefined){
                this.tree.material.map.offset.x += SoundGrabber.getFFT()[25] * 0.02;
            }
        }
    }
}