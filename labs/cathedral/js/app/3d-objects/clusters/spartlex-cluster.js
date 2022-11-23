class SpartlexCluster extends Cluster{

    constructor(params){
        super(params);

        var self = this;

        //----------------------------------

        Loader.objLoader.load('assets/models/cat.obj', function(object){
            object.traverse(function(child){
                    if(child instanceof THREE.Mesh){
                    child.material = Materials.m5;
                    child.position.set(0, 50, 0);
                    child.scale.set(50, 50, 50);
                    self.container.add(child);
                }
            });
        });

        Loader.objLoader.load('assets/models/statue-prometheus.obj', function(object){
            object.traverse(function(child){
                if(child instanceof THREE.Mesh){
                    child.material = Materials.m5;
                    child.scale.set(1, 1, 1);
                    self.container.add(child);
                }
            });
        });

        //----------------------------------

        this.waves = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100, 40, 40),
            Materials.m1
        );
        this.waves.position.y = 40;
        this.waves.rotation.x = 90;
        this.container.add(this.waves);

        //----------------------------------

        var hook = new Hook(Materials.m5);
        this.container.add(hook.mesh);
    }

    render(t){
        super.render(t);

        //----------------------------------

    }
}