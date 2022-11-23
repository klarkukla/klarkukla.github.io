var SkyDome = (function(){

    return function(texture, size){

        var geometry = new THREE.SphereGeometry(size, 60, 40);

        var material = new THREE.ShaderMaterial({

            uniforms: {
                texture: {type: 't', value: texture}
            },

            vertexShader: [
                "varying vec2 vUV;",

                "void main() {",
                    "vUV = uv;",
                    "vec4 pos = vec4(position, 1.0);",
                    "gl_Position = projectionMatrix * modelViewMatrix * pos;",
                "}"
            ].join("\n"),

            fragmentShader: [
                "uniform sampler2D texture;",
                "varying vec2 vUV;",

                "void main() {",
                    "vec4 sample = texture2D(texture, vUV);",
                    "gl_FragColor = vec4(sample.xyz, sample.w);",
                "}"
            ].join("\n")
        });

        var mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(-1, 1, 1);
        mesh.rotation.order = 'XZY';
        mesh.position.y = size/2;

        return mesh;
    };
})();