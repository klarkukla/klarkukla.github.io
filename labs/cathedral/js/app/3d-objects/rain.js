class Rain{
    /**
    *
    * @param size:Int
    *
    * */
    constructor(size){

        this.size = size;
        this.bounds = this.size / 4;

        this.lines = [];
        this.container = new THREE.Object3D();

        this.geometry = new THREE.Geometry();
        this.geometry.vertices.push(
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, 50)
        );

        this.line = new THREE.Line(
            this.geometry,
            new THREE.LineBasicMaterial({
                color: 0xffffff
            })
        );

        for(var i = 0; i < 28; i++){

            let l = this.line.clone();

            l.position.set(
                (-this.bounds + (Math.random() * (this.bounds * 2))),
                (-this.bounds + (Math.random() * (this.bounds * 2))),
                (-this.bounds + (Math.random() * (this.bounds * 2)))
            );

            l.rotation.x = Math.PI / 2;

            this.lines.push(l);
            this.container.add(l);
        }
    }

    get mesh(){
        return this.container;
    }

    render(t){

        this.container.scale.x = (SoundGrabber.getFFT()[32] * 0.4) + 1;
        this.container.scale.y = (SoundGrabber.getFFT()[64] * 0.4) + 1;
        this.container.scale.z = (SoundGrabber.getFFT()[128] * 0.4) + 1;

        for(var i = 0; i < this.lines.length; i++){
            if(this.lines[i].position.y > -(this.size / 4)){
                this.lines[i].position.y -= 2;
            } else {
                this.lines[i].position.y = this.size / 4;
            }
        }
    }
}