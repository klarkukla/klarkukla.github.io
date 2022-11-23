"use strict";

var Materials = (function () {

    //--------------------------------------------------

    var m0 = new THREE.ShaderMaterial({
        uniforms: {
            texture: {
                type: "t",
                value: Textures.t0
            },
            time: {
                type: "f",
                value: 0.0
            }
        },
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
    });

    //--------------------------------------------------

    var m1 = new THREE.ShaderMaterial({
        uniforms: {
            texture: {
                type: "t",
                value: Textures.t1
            },
            time: {
                type: "f",
                value: 0.0
            }
        },
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
    });

    //--------------------------------------------------

    var m2 = new THREE.ShaderMaterial({
        uniforms: {
            texture: {
                type: "t",
                value: Textures.t2
            },
            time: {
                type: "f",
                value: 0.0
            }
        },
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
    });

    //--------------------------------------------------

    var m3 = new THREE.MeshBasicMaterial({
        color: 'rgb(100, 125, 100)',
        morphTargets: true,
        side: THREE.DoubleSide
    });

    //--------------------------------------------------

    var m4 = new THREE.MeshBasicMaterial({
        //color: 0xeee,
        map: Textures.t3
    });

    //--------------------------------------------------

    var vertexShader = ["uniform vec2 uvScale;", "varying vec2 vUv;", "void main(){", "vUv = uv;", "vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);", "gl_Position = projectionMatrix * mvPosition;", "}"].join("\n");

    var fragmentShader = ["uniform float time;", "uniform vec2 resolution;", "varying vec2 vUv;", "void main(void){", "vec2 position = vUv / resolution.xy;", "float red = abs(sin(position.x * position.y + time / 5.0)) + 0.5;", "float green = abs(sin(position.x * position.y + time / 4.0));", "float blue = abs(sin(position.x * position.y + time / 3.0));", "gl_FragColor = vec4(red, green, blue, 1.0);", "}"].join("\n");

    var m5 = new THREE.ShaderMaterial({
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
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });
    m5.uniforms['resolution'].value.x = 0.5;
    m5.uniforms['resolution'].value.y = 0.5;

    //--------------------------------------------------

    return {

        m0: m0,
        m1: m1,
        m2: m2,
        m3: m3,
        m4: m4,
        m5: m5,

        render: function render(t) {
            m0.uniforms['time'].value = t * 0.00005 * (SoundGrabber.getFFT()[0] / 5);
            m1.uniforms['time'].value = t * 0.00002 * (SoundGrabber.getFFT()[100] / 5);
            m2.uniforms['time'].value = t * 0.00002 * (SoundGrabber.getFFT()[150] / 5);

            if (SoundGrabber.getFFT()[0] !== undefined) {
                m5.uniforms['time'].value += SoundGrabber.getFFT()[50];
                m5.uniforms['resolution'].value.x = SoundGrabber.getFFT()[50] + 0.2;
                m5.uniforms['resolution'].value.y = SoundGrabber.getFFT()[100] + 0.2;
            }
        }
    };
})();

//# sourceMappingURL=materials-compiled.js.map