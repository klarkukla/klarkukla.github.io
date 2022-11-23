"use strict";

var CCCC = (function(){
    /**
    *
    * @param material:THREE.Material
    *
    * */
    function _(material){
        this.material = material;
        this.mesh = new THREE.Object3D();
        this.mesh.rotation.x = Math.PI / 2;
        this.rings = [];

        for(var i = 0; i < 4; i++){
            var geometry = new THREE.TorusGeometry(200 - (i*60), 1, 3, 3, 3);
            this.rings[i] = new THREE.Mesh(
                geometry,
                this.material
            );
            this.mesh.add(this.rings[i]);
        }
    }

    _.prototype = {
        render: function(speed){
            for(var i = 0; i < 4; i++){
                this.rings[i].rotation.x += 0.0048;
                this.rings[i].rotation.y += 0.0059 * i;
                this.rings[i].rotation.z += 0.0062 * i * 2;
            }
        }
    };

    return _;
})();