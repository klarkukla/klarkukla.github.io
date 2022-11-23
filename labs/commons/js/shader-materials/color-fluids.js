var ColorFluids = (function(){

    return function(resolutionX, resolutionY){

        var material = new THREE.ShaderMaterial({

            uniforms: {
                time: {
                    type: "f",
                    value: 1.0
                },
                resolution: {
                    type: "v2",
                    value: new THREE.Vector2()
                }
            },

            vertexShader: [

                "uniform vec2 uvScale;",
                "varying vec2 vUv;",

                "void main(){",
                "vUv = uv;",
                "vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);",
                "gl_Position = projectionMatrix * mvPosition;",
                "}"

            ].join("\n"),

            fragmentShader: [

                "uniform float time;",
                "uniform vec2 resolution;",
                "varying vec2 vUv;",

                "void main(void){",
                "vec2 position = vUv / resolution.xy;",
                "float red = abs(sin(position.x * position.y + time / 5.0)) + 0.5;",
                "float green = abs(sin(position.x * position.y + time / 4.0));",
                "float blue = abs(sin(position.x * position.y + time / 3.0));",
                "gl_FragColor = vec4(red, green, blue, 1.0);",
                "}"

            ].join("\n")
        });

        material.uniforms['resolution'].value.x = resolutionX;
        material.uniforms['resolution'].value.y = resolutionY;

        return material;
    };
})();