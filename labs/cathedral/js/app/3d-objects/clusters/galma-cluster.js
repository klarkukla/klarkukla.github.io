class GalmaCluster extends Cluster{

    constructor(params){
        super(params);

        var self = this;

        //----------------------------------

        this.children = [];
        Loader.objLoader.load('assets/models/clusters/galma-cluster.obj', function(object){

            //console.log(object);

            for(var i = 0; i < object.children.length; i++){
                self.children.push(object.children[i]);
            }

            self.children[0].material = Materials.m4;
            self.children[1].material = Materials.m5;
            self.children[2].material = Materials.m4;
            self.children[3].material = Materials.m5;

            object.scale.set(20, 20, 20);
            self.container.add(object);
        });
    }

    render(t){
        super.render(t);

        //--------------------------------------------------
    }
}