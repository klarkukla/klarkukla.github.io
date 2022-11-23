"use strict";

var Lung = (function(){
    /**
    *
    * @object Lung
    * @param parameters:Object -> parameters
    *
    * */
    function _(parameters){

        this.textures = parameters.textures;
        this.textureOffsetSpeed = parameters.textureOffsetSpeed;
        this.pumpSpeed = parameters.pumpSpeed;

        this.mesh = new THREE.Object3D();
        this.mesh.rotation.x = Math.PI / 2;
        this.rings = [];

        for(var i = 0; i < 4; i++){

            this.textures[i].minFilter = THREE.NearestFilter;
            this.textures[i].wrapS = this.textures[i].wrapT = THREE.RepeatWrapping;
            //this.texture.repeat.set(2, 2);

            var geometry = new THREE.RingGeometry(200 - (i*60), 210 - (i*50), 50);

            try{
                Morpheus.generateMorphTargets(geometry);
            } catch(e) {
                throw e + ' ---> Lung depends on Morpheus';
            }

            this.rings[i] = new THREE.Mesh(
                geometry,
                new THREE.MeshBasicMaterial({
                    side: THREE.DoubleSide,
                    map: this.textures[i],
                    morphTargets: true
                }));
            this.rings[i].material.needsUpdate = true;
            this.mesh.add(this.rings[i]);
        }
    }

    _.prototype = {
        render: function(t, offset){
            for(var i = 0; i < 4; i++){
                this.rings[i].material.map.offset.x += this.textureOffsetSpeed + (i*0.00001);
                this.rings[i].material.map.offset.y += this.textureOffsetSpeed + (i*0.00001);
                this.rings[i].position.z = Math.sin(t*0.001 + (i*0.9) + offset) * 40;
                this.rings[i].morphTargetInfluences[0] = (1 + Math.sin(t*0.001)) / 10;
            }
        }
    };

    return _;
})();