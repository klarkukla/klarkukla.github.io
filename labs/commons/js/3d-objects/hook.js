/**
*
*
*
**/

class Hook{

    constructor(material){

        this.material = material;
        this.container = new THREE.Object3D();

        for(var i = 0; i < 10; i++){

            let m = new THREE.Mesh(
                new THREE.TorusGeometry(25, 1, 3, 3, 3),
                this.material
            );
            m.position.x = 5 * Math.sin(i);
            //this.mesh.position.z = 5 * Math.cos(i);
            m.position.y = (5 * i) + 50;
            m.rotation.x = Math.PI / 2;
            //this.mesh.rotation.y = i;
            m.rotation.z = i * 0.5;

            this.container.add(m);
        }
    }

    get mesh(){
        return this.container;
    }
}