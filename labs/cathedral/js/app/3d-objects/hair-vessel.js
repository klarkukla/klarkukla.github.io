"use strict";

 var HairVessel = (function(){
    /**
    *
    * @object HairVessel
    * @param parameters:Object -> parameters
    * hairSpline : THREE.CatmullRomCurve3
    *
    * */
    function _(parameters){

        this.hairSpline = parameters.hairSpline;
        this.hairColor = parameters.hairColor;
        this.vesselColor = parameters.vesselColor;
        this.vesselTexture = parameters.vesselTexture;
        this.vesselSpeed = parameters.vesselSpeed;

        this.mesh = new THREE.Object3D();

        this.tangent = new THREE.Vector3();
        this.axis = new THREE.Vector3();
        this.up = new THREE.Vector3(0, 1, 0);
        this.counter = 0;

        // hair

        var geometry = new THREE.Geometry();
        var splinePoints = this.hairSpline.getPoints(150);
        for(var i = 0; i < splinePoints.length; i++){
            geometry.vertices.push(splinePoints[i]);
        }
        this.hair = new THREE.Line(geometry, new THREE.MeshBasicMaterial({color: this.hairColor}));
        this.mesh.add(this.hair);

        // vessel

        this.vessel = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(50, 50),
            new THREE.MeshBasicMaterial({
                color: this.vesselColor,
                map: this.vesselTexture,
                side: THREE.DoubleSide,
                transparent: true
            })
        );
        this.vessel.rotation.x = Math.PI / 2;
        this.vesselShell = new THREE.Object3D();
        this.vesselShell.add(this.vessel);
        this.mesh.add(this.vesselShell);

        scene.add(this.mesh);
    }

    _.prototype = {

        render: function(){
            if(this.counter <= 1){
                this.vesselShell.position.copy(this.hairSpline.getPointAt(this.counter));
                this.tangent = this.hairSpline.getTangentAt(this.counter).normalize();
                this.axis.crossVectors(this.up, this.tangent).normalize();
                var radians = Math.acos(this.up.dot(this.tangent));
                this.vesselShell.quaternion.setFromAxisAngle(this.axis, radians);
                this.counter += this.vesselSpeed;
            } else {
                this.counter = 0;
            }
        }
    };

    return _;
})();