/**
*
@class Shades
-------------
Post-Processing effects composer
Depends on several GLSL shaders
------------------------
tlhoest@gmail.com - 2016
------------------------
*
**/

class Shades{

    /**
    *
    * @param params:Object : renderer, scene, camera
    *
    * */
    constructor(params){

        //--------------------------------------------------

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        //--------------------------------------------------

        this.composer = null;
        this.renderPass = null;
        this.copyPass = null;

        this._effects = {};
        this._presets = null;

        //--------------------------------------------------

        this.renderer = params.renderer;
        this.scene = params.scene;
        this.camera = params.camera;

        var renderTarget = new THREE.WebGLRenderTarget(this.width, this.height, {
            minFilter: THREE.NearestFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBFormat,
            stencilBuffer: true
        });
        this.renderPass = new THREE.RenderPass(this.scene, this.camera);
        this.composer = new THREE.EffectComposer(this.renderer, renderTarget);
        this.copyPass = new THREE.ShaderPass(THREE.CopyShader);
        this.copyPass.renderToScreen = true;
        this.renderer.autoClear = false;
    }

    //--------------------------------------------------

    get effects(){
        return this._effects;
    }

    //--------------------------------------------------

    get presets(){
        return this._presets;
    }

    set presets(presets){
        this._presets = presets;
    }

    //--------------------------------------------------

    toggleEffect(effectKey, active){
        this._effects[effectKey].active = active;
        this.setChain();
    }

    //--------------------------------------------------

    setParam(effectKey, paramKey, value){
        this._effects[effectKey].uniforms[paramKey].value = value;
    }

    //--------------------------------------------------

    setEffects(){
        for(var preset in this._presets){
            if(this._presets.hasOwnProperty(preset)){
                this._effects[preset].active = this._presets[preset].active;
                for(var param in this._presets[preset].params){
                    if(this._presets[preset].params.hasOwnProperty(param)){
                        this._effects[preset].uniforms[param].value = this._presets[preset].params[param].val;
                    }
                }
            }
        }
    }

    //--------------------------------------------------

    setChain(){
        this.composer.passes = [];
        this.composer.addPass(this.renderPass);
        for(var effect in this._effects){
            if(this._effects.hasOwnProperty(effect)){
                if(this._effects[effect].active){
                    this.composer.addPass(this._effects[effect]);
                }
            }
        }
        this.composer.addPass(this.copyPass);
    }

    //--------------------------------------------------

    initEffects(presets){

        this._presets = presets;

        if(this._presets === null || this._presets === undefined){
            throw new Error('Set presets to initialize effects');
        }

        this._effects.HS = new THREE.ShaderPass(THREE.HueSaturationShader);
        this._effects.BC = new THREE.ShaderPass(THREE.BrightnessContrastShader);
        this._effects.technicolor = new THREE.ShaderPass(THREE.TechnicolorShader);
        this._effects.bleach = new THREE.ShaderPass(THREE.BleachBypassShader);
        this._effects.RGBShift = new THREE.ShaderPass(THREE.RGBShiftShader);
        this._effects.C64 = new THREE.ShaderPass(THREE.C64Shader);
        this._effects.dither = new THREE.ShaderPass(THREE.DitherShader);
        this._effects.vignette = new THREE.ShaderPass(THREE.VignetteShader);
        this._effects.bloom = new THREE.BloomPass();

        this._effects.film = new THREE.FilmPass();
        this._effects.film.uniforms['grayscale'].value = false;

        this._effects.HTS = new THREE.ShaderPass(THREE.HorizontalTiltShiftShader);
        this._effects.HTS.uniforms['h'].value = 1 / this.width;

        this._effects.VTS = new THREE.ShaderPass(THREE.VerticalTiltShiftShader);
        this._effects.VTS.uniforms['v'].value = 1 / this.height;

        this._effects.pixelate = new THREE.ShaderPass(THREE.PixelateShader);
        this._effects.pixelate.uniforms['size'].value.x = this.width;
        this._effects.pixelate.uniforms['size'].value.y = this.height;

        this._effects.focus = new THREE.ShaderPass(THREE.FocusShader);
        this._effects.focus.uniforms['screenWidth'].value = this.width;

        this._effects.FXAA = new THREE.ShaderPass(THREE.FXAAShader);
        this._effects.FXAA.uniforms['resolution'].value.set(1 / this.width, 1 / this.height);

        //-----------------------------

        this.setEffects();
        this.setChain();
    }

    //--------------------------------------------------

    render(){
        this.composer.render(0.1);
    }
}