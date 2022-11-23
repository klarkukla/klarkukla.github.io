/**
* |||||||||||||||||||||||||||||||||
* Thomas Lhoest - tlhoest@gmail.com
* |||||||||||||||||||||||||||||||||
* source : @iwebst
*/

var SkyDome = (function(){

    var m = function(texture, size) {

        var geometry = new THREE.SphereGeometry(size, 60, 40);

        var material = new THREE.ShaderMaterial({

            uniforms: {
                texture: {type: 't', value: THREE.ImageUtils.loadTexture(texture)}
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

        var skydome;
        skydome = new THREE.Mesh(geometry, material);
        skydome.scale.set(-1, 1, 1);
        skydome.rotation.order = 'XZY';
        skydome.position.y = size/2;

        return skydome;
    };

    return m;
})();