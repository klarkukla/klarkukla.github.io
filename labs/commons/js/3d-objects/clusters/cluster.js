class Cluster{

    constructor(params){
        this.rotation = params.rotation;
        this.loader = params.loaderInstance;
        this.container = new THREE.Object3D();
    }

    get mesh(){
        return this.container;
    }

    render(t){
        this.container.rotation.y += this.rotation;
    }
}