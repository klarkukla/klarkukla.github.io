var Morpheus = (function(){
    return{
        generateMorphTargets: function(geometry){
            var vertices = [];
            var scale = 1;

            for(var i = 0; i < geometry.vertices.length; i ++){

                vertices.push( geometry.vertices[i].clone());

                scale = 1 + Math.random() * 0.9;

                vertices[ vertices.length - 1 ].x *= scale;
                vertices[ vertices.length - 1 ].y *= scale;
                vertices[ vertices.length - 1 ].z *= scale;

                geometry.morphTargets.push({name: "target" + i, vertices: vertices});
            }
        }
    };
})();