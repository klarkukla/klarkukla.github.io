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

        //--------------------------------------------------

        Loader.objLoader.load('assets/models/beautiful-girl.obj', function(object){
            object.traverse(function(child){
                if(child instanceof THREE.Mesh){
                    child.material = Materials.m4;
                    child.position.set(0, 50, 0);
                    child.scale.set(50, 50, 50);
                    self.container.add(child);
                }
            });
        });
    }

    render(t){
        super.render(t);

        //--------------------------------------------------

        this.magma.scale.x = SoundGrabber.getFFT()[0] + 1;
        this.magma.scale.y = SoundGrabber.getFFT()[1] + 1;
        this.magma.scale.z = SoundGrabber.getFFT()[2] + 1;
    }
}