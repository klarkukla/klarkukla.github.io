/**
*
* @class GalmaIsland
* ------------------
*
* */

class GalmaIsland extends Island{

    constructor(params){
        super(params);

        var that = this;

        //----------------------------------

        this.platform = null;
        this.loader.load('assets/models/platform3.dae', function(collada){
            collada.scene.traverse(function(child){
                if(child instanceof THREE.Mesh){
                    that.platform = new THREE.Mesh(child.geometry, Materials.m4);
                    that.platform.position.set(0, -150, 0);
                    that.platform.scale.set(60, 200, 60);
                    that.container.add(that.platform);
                }
            });
        });

        //----------------------------------

        this.jesus = null;
        this.loader.load('assets/models/jesus.dae', function(collada){
            collada.scene.traverse(function(child){
                if(child instanceof THREE.Mesh){
                    that.jesus = new THREE.Mesh(child.geometry, Materials.m3);
                    that.jesus.position.set(0, 100, 0);
                    that.jesus.scale.set(30, 20, 30);
                    that.container.add(that.jesus);
                }
            });
        });

        //--------------------------------------------------

        this.galma = new GlassCanvas(new THREE.ImageUtils.loadTexture('assets/img/galmasani.png'), 150);
        this.galma.mesh.position.set(0, 50, 0);
        this.galma.mesh.scale.set(0.4, 0.4, 0.4);
        this.galma.mesh.rotation.set(0, 40, 0);
        this.container.add(this.galma.mesh);

        //--------------------------------------------------

        this.magma = new THREE.Mesh(
            new THREE.IcosahedronGeometry(50, 5),
            Materials.m0
        );
        this.magma.position.y = 110;
        this.container.add(this.magma);
    }

    render(t){
        super.render(t);

        //--------------------------------------------------

        this.magma.scale.x = SoundGrabber.getFFT()[0] + 1;
        this.magma.scale.y = SoundGrabber.getFFT()[1] + 1;
        this.magma.scale.z = SoundGrabber.getFFT()[2] + 1;
    }
}