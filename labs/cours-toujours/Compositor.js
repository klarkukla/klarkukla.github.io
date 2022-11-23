var Compositor = function(scene, renderer, camera, gui){

    var renderTargetParameters = {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBFormat,
        stencilBuffer: true
    };

    var renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, renderTargetParameters);
    var composer = new THREE.EffectComposer(renderer, renderTarget);
    composer.addPass(new THREE.RenderPass(scene, camera));

    /*
    *
    * SHADERS
    *
    * */

    var shaders = {};

    shaders.film = new THREE.FilmPass(0.15, 0.025, 648, false);
    composer.addPass(shaders.film);

    shaders.bloom = new THREE.BloomPass(0.8);
    composer.addPass(shaders.bloom);

    shaders.vignette = new THREE.ShaderPass(THREE.VignetteShader);
    shaders.vignette.uniforms['darkness'].value = 1;
    shaders.vignette.uniforms['offset'].value = 1;

    shaders.FXAA = new THREE.ShaderPass(THREE.FXAAShader);
    shaders.FXAA.uniforms['resolution'].value.set(1 / (window.innerWidth), 1 / (window.innerHeight));
    shaders.FXAA.renderToScreen = true;
    composer.addPass(shaders.FXAA);

    // GUI

    var c = gui.addFolder('Film');
    c.add(shaders.film.uniforms['nIntensity'], 'value', 0.00, 2.00).name('Noise');
    c.add(shaders.film.uniforms['sIntensity'], 'value', 0.00, 2.00).name('Intensity');
    c.add(shaders.film.uniforms['grayscale'], 'value').name('Grayscale');
    c.open();
    //gui.remember(shaders);

    return{
        render: function(){
            composer.render(0.1);
        }
    };

};