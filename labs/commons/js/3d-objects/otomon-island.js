/**
*
* @class OtomonIsland
* -------------------
*
* */

class OtomonIsland extends Island{

    constructor(params){
        super(params);

        var that = this;

        //----------------------------------

        this.platform = null;
        this.loader.load('assets/models/platform2.dae', function(collada){
            collada.scene.traverse(function(child){
                if(child instanceof THREE.Mesh){
                    that.platform = new THREE.Mesh(child.geometry, Materials.m4);
                    that.platform.scale.set(60, 30, 60);
                    that.container.add(that.platform);
                }
            });
        });

        //--------------------------------------------------

        this.otomon = new GlassCanvas(new THREE.ImageUtils.loadTexture('assets/img/otomon.png'), 150);
        this.otomon.mesh.position.set(0, 50, 0);
        this.otomon.mesh.scale.set(0.4, 0.4, 0.4);
        this.otomon.mesh.rotation.set(0, 40, 0);
        this.container.add(this.otomon.mesh);

        //--------------------------------------------------

        this.cccc = new CCCC(Materials.m1);
        this.cccc.mesh.position.set(0, 100, 0);
        this.cccc.mesh.scale.set(0.1, 0.1, 0.1);
        this.container.add(this.cccc.mesh);
    }

    render(t){
        super.render(t);

        //--------------------------------------------------

        this.cccc.render();
        this.cccc.mesh.scale.x = SoundGrabber.getFFT()[0] + 0.5;
        this.cccc.mesh.scale.y = SoundGrabber.getFFT()[500] + 0.5;
        this.cccc.mesh.scale.z = SoundGrabber.getFFT()[800] + 0.5;
    }
}