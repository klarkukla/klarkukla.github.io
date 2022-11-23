/**
*
* Thomas Lhoest - 2014
*
*/

var PostProcessingManager = (function() {

    var composer = null;

    var m = function(scene, renderer, camera) {

        renderer.autoClear = false;

        var renderTargetParameters = {
            minFilter: THREE.NearestFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBFormat,
            stencilBuffer: true
        };

        var renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, renderTargetParameters);
        composer = new THREE.EffectComposer(renderer, renderTarget);

        var renderModel = new THREE.RenderPass(scene, camera);
        composer.addPass(renderModel);

        /*
        *
        * EFFECTS
        *
        * */

        //var glitch = new THREE.GlitchPass();
        //glitch.goWild = true;
        //composer.addPass(glitch);

        var film = new THREE.FilmPass(0.15, 0.025, 648, false);
        composer.addPass(film);

        var effectDither = new THREE.ShaderPass( THREE.DitherShader );
        var effectC64 = new THREE.ShaderPass( THREE.C64Shader );
        //composer.addPass( effectDither );
        //composer.addPass( effectC64 );

        var bloom = new THREE.BloomPass(0.8);
        composer.addPass(bloom);

        /*var vignette = new THREE.ShaderPass(THREE.VignetteShader);
        vignette.uniforms['darkness'].value = 1;
        vignette.uniforms['offset'].value = 1;*/

        var dpr = 1;
        var FXAA = new THREE.ShaderPass(THREE.FXAAShader);
        FXAA.uniforms['resolution'].value.set(1 / (window.innerWidth * dpr), 1 / (window.innerHeight * dpr));
        FXAA.renderToScreen = true;
        composer.addPass(FXAA);
    };

    m.prototype = {

        render: function() {
            composer.render(0.1);
        }
    };

    return m;
})();