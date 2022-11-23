/**
*
* @class ManoyamiIsland
* ---------------------
*
* */

class ManoyamiIsland extends Island{

    constructor(params){
        super(params);

        var that = this;

        //----------------------------------

        this.platform = null;
        this.loader.load('assets/models/platform1.dae', function(collada){
            collada.scene.traverse(function(child){
                if(child instanceof THREE.Mesh){
                    var geometry = child.geometry;
                    Morpheus.generateMorphTargets(geometry);
                    that.platform = new THREE.Mesh(geometry, Materials.m3);
                    that.platform.scale.set(30, 10, 30);
                    that.container.add(that.platform);
                }
            });
        });

        //--------------------------------------------------

        this.mano = null;
        this.loader.load('assets/models/mano.dae', function(collada){
            collada.scene.traverse(function(child){
                if(child instanceof THREE.Mesh){
                    that.mano = new THREE.Mesh(child.geometry, Materials.m0);
                    that.mano.position.set(20, 60, 0);
                    that.mano.scale.set(0.2, 0.2, 0.2);
                    that.mano.rotation.x = Math.PI;
                    that.container.add(that.mano);
                }
            });
        });

        //--------------------------------------------------

        this.yami = null;
        this.loader.load('assets/models/yami.dae', function(collada){
            collada.scene.traverse(function(child){
                if(child instanceof THREE.Mesh){
                    that.yami = new THREE.Mesh(child.geometry, Materials.m1);
                    that.yami.position.set(0, 60, 0);
                    that.yami.scale.x = that.yami.scale.y = that.yami.scale.z = 0.2;
                    that.container.add(that.yami);
                }
            });
        });
    }

    render(t){
        super.render(t);

        //--------------------------------------------------

        if(this.platform !== null){
            this.platform.morphTargetInfluences[0] = SoundGrabber.getFFT()[0];
        }

        //--------------------------------------------------

        if(this.mano !== null){
            //this.mano.rotation.y += 0.008;
        }
    }
}