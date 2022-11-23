/**
*
* Thomas Lhoest - 2014
*
*/

define([

    'modules/shaders/ConvolutionShader',
    'modules/shaders/CopyShader',
    'modules/shaders/HorizontalTiltShiftShader',
    'modules/shaders/VerticalTiltShiftShader',
    'modules/shaders/FXAAShader',
    'modules/shaders/VignetteShader',

    'modules/postprocessing/EffectComposer',
    'modules/postprocessing/RenderPass',
    'modules/postprocessing/ShaderPass',
    'modules/postprocessing/BloomPass',
    'modules/postprocessing/MaskPass',
    'modules/postprocessing/SavePass'

], function () {

    var m = function(scene, renderer, camera) {

        renderer.autoClear = false;
        var renderTargetParameters = {
            minFilter: THREE.NearestFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBFormat,
            stencilBuffer: true
        };
        var renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, renderTargetParameters);
        var renderModel = new THREE.RenderPass(scene, camera);

        /*
        *
        * bloom
        *
        * */
        var effectBloom = new THREE.BloomPass(0.8);

        /*
        *
        * vignette
        *
        * */
        var vignette = new THREE.ShaderPass(THREE.VignetteShader);
        vignette.uniforms['darkness'].value = 0.8;
        vignette.uniforms['offset'].value = 0.8;

        /*
        *
        * antialiasing
        *
        * */
        var dpr = 1;
        var effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
        effectFXAA.uniforms['resolution'].value.set(1 / (window.innerWidth * dpr), 1 / (window.innerHeight * dpr));
        effectFXAA.renderToScreen = true;

        /*
        *
        * composer
        *
        * */
        this.composer = new THREE.EffectComposer(renderer, renderTarget);

        this.composer.addPass(renderModel);
        this.composer.addPass(vignette);
        this.composer.addPass(effectBloom);
        this.composer.addPass(effectFXAA);
    };

    m.prototype = {

        render: function() {
            this.composer.render(0.1);
        }
    };

    return m;
});