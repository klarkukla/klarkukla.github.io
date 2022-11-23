(function(window){
    /**
    *
    * @object RingOfGlory
    *
    * */
    var RingOfGlory = function(spline, speed){
        this.spline = spline;
        this.speed = speed;

        this.tangent = new THREE.Vector3();
        this.axis = new THREE.Vector3();
        this.up = new THREE.Vector3(0, 1, 0);
        this.counter = 0;

        // RING

        var geometry = new THREE.Geometry();
        var splinePoints = spline.getPoints(150);
        for(var i = 0; i < splinePoints.length; i++){
            geometry.vertices.push(splinePoints[i]);
        }

        this.ring = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: 0xB5865A}));

        // VEHICLE

        this.vehicle = new THREE.Mesh(
            new THREE.CircleGeometry(5, 32),
            new THREE.MeshBasicMaterial({
                color: 0xB5865A,
                side: THREE.DoubleSide
            })
        );

        scene.add(this.ring);
        scene.add(this.vehicle);
    };

    RingOfGlory.prototype = {

        getVehicle: function(){
            return this.vehicle;
        },

        render: function(){
            if(this.counter <= 1){
                this.vehicle.position.copy(this.spline.getPointAt(this.counter));
                this.tangent = this.spline.getTangentAt(this.counter).normalize();
                this.axis.crossVectors(this.up, this.tangent).normalize();
                var radians = Math.acos(this.up.dot(this.tangent));
                this.vehicle.quaternion.setFromAxisAngle(this.axis, radians);
                this.counter += this.speed;
            } else {
                this.counter = 0;
            }
        }
    };

    window.RingOfGlory = RingOfGlory;
})(window);