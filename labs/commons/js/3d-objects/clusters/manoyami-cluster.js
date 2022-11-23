class ManoyamiCluster extends Cluster{

    constructor(params){
        super(params);

        var self = this;

        //--------------------------------------------------

        this.mayona = new GlassCanvas(Textures.mayona, 150);
        this.mayona.mesh.position.set(0, 50, 0);
        this.mayona.mesh.scale.set(0.4, 0.4, 0.4);
        this.mayona.mesh.rotation.set(0, 40, 0);
        this.container.add(this.mayona.mesh);

        //--------------------------------------------------

        this.magma = new THREE.Mesh(
            new THREE.IcosahedronGeometry(50, 5),
            Materials.m0
        );
        this.magma.position.y = 0;
        this.container.add(this.magma);
    }

    render(t){
        super.render(t);

        //--------------------------------------------------

        this.magma.scale.x = SpectralPlayer.getFFT()[0] + 1;
        this.magma.scale.y = SpectralPlayer.getFFT()[1] + 1;
        this.magma.scale.z = SpectralPlayer.getFFT()[2] + 1;
    }
}
