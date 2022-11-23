class OtomonCluster extends Cluster{

    constructor(params){
        super(params);

        var that = this;

        //--------------------------------------------------

        this.otomon = new GlassCanvas(Textures.otomon, 150);
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