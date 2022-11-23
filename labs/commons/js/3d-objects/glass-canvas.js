"use strict";

var GlassCanvas = (function(){
    /**
    *
    * @object GlassCanvas
    * @param texture:THREE.Texture
    * @param size:int
    *
    * */
    function _(texture, size){
        this.mesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(size, size),
            new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                transparent: true,
                //alphaTest: 0.5,
                map: texture
            })
        );
    }

    return _;
})();