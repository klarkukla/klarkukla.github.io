'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
*
@class Shades
------------
Post-Processing effects composer with GUI & load/save functions
Depends on many THREE (GLSL) shaders + dat.GUI
------------------------
tlhoest@gmail.com - 2016
------------------------

 todo: OSC mapper
 todo: inject key binder in params
 todo: localStorage array list for presets management

*
**/

var Shades = (function () {

    /*
    *
    *
    *
    * */

    function Shades(params) {
        _classCallCheck(this, Shades);

        //--------------------------------------------------

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        //--------------------------------------------------

        this.composer = null;
        this.renderPass = null;
        this.copyPass = null;
        this.effects = {};
        this.presets = {};

        //--------------------------------------------------

        this.gui = new dat.GUI();
        this.gui.close();

        //--------------------------------------------------

        var renderTarget = new THREE.WebGLRenderTarget(this.width, this.height, {
            minFilter: THREE.NearestFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBFormat,
            stencilBuffer: true
        });
        this.renderPass = new THREE.RenderPass(params.scene, params.camera);
        this.composer = new THREE.EffectComposer(params.renderer, renderTarget);
        this.copyPass = new THREE.ShaderPass(THREE.CopyShader);
        this.copyPass.renderToScreen = true;
        params.renderer.autoClear = false;

        //--------------------------------------------------

        this.loadPresets();

        //--------------------------------------------------
        // listen to "S" keyup

        var that = this;
        document.addEventListener('keyup', function (e) {
            if (e.keyCode == '83') that.savePresets();
        });
    }

    _createClass(Shades, [{
        key: 'setEffects',
        value: function setEffects() {
            for (var preset in this.presets) {
                if (this.presets.hasOwnProperty(preset)) {
                    for (var param in this.presets[preset].params) {
                        if (this.presets[preset].params.hasOwnProperty(param)) {
                            if (preset != 'bloom') {
                                this.effects[preset].uniforms[param].value = this.presets[preset].params[param].val;
                            } else {
                                this.effects[preset].copyUniforms[param].value = this.presets[preset].params[param].val;
                            }
                        }
                    }
                }
            }
        }

        //--------------------------------------------------

    }, {
        key: 'setChain',
        value: function setChain() {
            this.composer.passes = [];
            this.composer.addPass(this.renderPass);
            for (var effect in this.effects) {
                if (this.effects.hasOwnProperty(effect)) {
                    if (this.effects[effect].active) {
                        this.composer.addPass(this.effects[effect]);
                    }
                }
            }
            this.composer.addPass(this.copyPass);
        }

        //--------------------------------------------------

    }, {
        key: 'initEffects',
        value: function initEffects() {

            this.effects.HS = new THREE.ShaderPass(THREE.HueSaturationShader);
            this.effects.HS.active = this.presets.HS.active;
            var HS = this.gui.addFolder(this.presets.HS.title);
            HS.add(this.effects.HS, 'active').name('Activate').onChange(this.setChain.bind(this));
            HS.add(this.effects.HS.uniforms.hue, 'value', 0.00, 2.00).name('Hue');
            HS.add(this.effects.HS.uniforms.saturation, 'value', 0.00, 1.00).name('Saturation');

            this.effects.BC = new THREE.ShaderPass(THREE.BrightnessContrastShader);
            this.effects.BC.active = this.presets.BC.active;
            var BC = this.gui.addFolder(this.presets.BC.title);
            BC.add(this.effects.BC, 'active').name('Activate').onChange(this.setChain.bind(this));
            BC.add(this.effects.BC.uniforms.brightness, 'value', -1.00, 1.00).name('Brightness');
            BC.add(this.effects.BC.uniforms.contrast, 'value', -1.00, 1.00).name('Contrast');

            this.effects.technicolor = new THREE.ShaderPass(THREE.TechnicolorShader);
            this.effects.technicolor.active = this.presets.technicolor.active;
            var technicolor = this.gui.addFolder('Technicolor');
            technicolor.add(this.effects.technicolor, 'active').name('Activate').onChange(this.setChain.bind(this));

            this.effects.bleach = new THREE.ShaderPass(THREE.BleachBypassShader);
            this.effects.bleach.active = this.presets.bleach.active;
            var bleach = this.gui.addFolder('Bleach');
            bleach.add(this.effects.bleach, 'active').name('Activate').onChange(this.setChain.bind(this));
            bleach.add(this.effects.bleach.uniforms.opacity, 'value', 0.0, 1.0).name('Opacity');

            this.effects.RGBShift = new THREE.ShaderPass(THREE.RGBShiftShader);
            this.effects.RGBShift.active = this.presets.RGBShift.active;
            var RGBShift = this.gui.addFolder('RGB Shift');
            RGBShift.add(this.effects.RGBShift, 'active').name('Activate').onChange(this.setChain.bind(this));
            RGBShift.add(this.effects.RGBShift.uniforms.amount, 'value', 0.000, 0.100).name('Amount');
            RGBShift.add(this.effects.RGBShift.uniforms.angle, 'value', 0.0, 7.0).name('Angle');

            this.effects.C64 = new THREE.ShaderPass(THREE.C64Shader);
            this.effects.C64.active = this.presets.C64.active;
            var C64 = this.gui.addFolder('C64');
            C64.add(this.effects.C64, 'active').name('Activate').onChange(this.setChain.bind(this));

            this.effects.dither = new THREE.ShaderPass(THREE.DitherShader);
            this.effects.dither.active = this.presets.dither.active;
            var dither = this.gui.addFolder('Dithering');
            dither.add(this.effects.dither, 'active').name('Activate').onChange(this.setChain.bind(this));

            this.effects.vignette = new THREE.ShaderPass(THREE.VignetteShader);
            this.effects.vignette.active = this.presets.vignette.active;
            var vignette = this.gui.addFolder('Vignetting');
            vignette.add(this.effects.vignette, 'active').name('Activate').onChange(this.setChain.bind(this));
            vignette.add(this.effects.vignette.uniforms.darkness, 'value', 0.0, 10.0).name('Darkness');
            vignette.add(this.effects.vignette.uniforms.offset, 'value', 0.0, 10.0).name('Offset');

            this.effects.bloom = new THREE.BloomPass();
            this.effects.bloom.active = this.presets.bloom.active;
            var bloom = this.gui.addFolder('Bloom');
            bloom.add(this.effects.bloom, 'active').name('Activate').onChange(this.setChain.bind(this));
            bloom.add(this.effects.bloom.copyUniforms.opacity, 'value', 0.0, 2.0).name('Opacity');

            this.effects.film = new THREE.FilmPass();
            this.effects.film.active = this.presets.film.active;
            var film = this.gui.addFolder('Film');
            film.add(this.effects.film, 'active').name('Activate').onChange(this.setChain.bind(this));
            film.add(this.effects.film.uniforms.nIntensity, 'value', 0.00, 2.00).name('Noise');
            film.add(this.effects.film.uniforms.sIntensity, 'value', 0.0, 2.0).name('Scanlines intensity');
            film.add(this.effects.film.uniforms.sCount, 'value', 0, 10).name('Scanlines count');
            film.add(this.effects.film.uniforms.grayscale, 'value').name('Grayscale');

            this.effects.HTS = new THREE.ShaderPass(THREE.HorizontalTiltShiftShader);
            this.effects.HTS.uniforms['h'].value = 1 / this.width;
            this.effects.HTS.active = this.presets.HTS.active;
            var HTS = this.gui.addFolder('HorizontalTiltShift');
            HTS.add(this.effects.HTS, 'active').name('Activate').onChange(this.setChain.bind(this));
            HTS.add(this.effects.HTS.uniforms.r, 'value', 0.0, 3.0).name('Focus');

            this.effects.VTS = new THREE.ShaderPass(THREE.VerticalTiltShiftShader);
            this.effects.VTS.uniforms['v'].value = 1 / this.height;
            this.effects.VTS.active = this.presets.VTS.active;
            var VTS = this.gui.addFolder('VerticalTiltShift');
            VTS.add(this.effects.VTS, 'active').name('Activate').onChange(this.setChain.bind(this));
            VTS.add(this.effects.VTS.uniforms.r, 'value', 0.0, 3.0).name('Focus');

            this.effects.pixelate = new THREE.ShaderPass(THREE.PixelateShader);
            this.effects.pixelate.uniforms['size'].value.x = this.width;
            this.effects.pixelate.uniforms['size'].value.y = this.height;
            this.effects.pixelate.active = this.presets.pixelate.active;
            var pixelate = this.gui.addFolder('Pixelate');
            pixelate.add(this.effects.pixelate, 'active').name('Activate').onChange(this.setChain.bind(this));
            pixelate.add(this.effects.pixelate.uniforms.pixelSize, 'value', 1.0, 300).name('Pixel size');

            this.effects.focus = new THREE.ShaderPass(THREE.FocusShader);
            this.effects.focus.uniforms['screenWidth'].value = this.width;
            this.effects.focus.active = this.presets.focus.active;
            var focus = this.gui.addFolder('Focus');
            focus.add(this.effects.focus, 'active').name('Activate').onChange(this.setChain.bind(this));
            focus.add(this.effects.focus.uniforms.sampleDistance, 'value', 0.0, 2.0).name('Sample distance');
            focus.add(this.effects.focus.uniforms.waveFactor, 'value', 0.00, 0.01).name('Wave factor');

            this.effects.FXAA = new THREE.ShaderPass(THREE.FXAAShader);
            this.effects.FXAA.uniforms['resolution'].value.set(1 / this.width, 1 / this.height);
            this.effects.FXAA.active = this.presets.FXAA.active;
            var FXAA = this.gui.addFolder('FXAA');
            FXAA.add(this.effects.FXAA, 'active').name('Activate').onChange(this.setChain.bind(this));

            //

            this.setChain();
            this.setEffects();
        }

        //--------------------------------------------------

    }, {
        key: 'loadPresets',
        value: function loadPresets() {
            if (localStorage.getItem('presets') != null) {
                var p = localStorage.getItem('presets');
                this.presets = JSON.parse(p);
                this.initEffects();
            } else {
                var loadJSON = function loadJSON(callback) {
                    var xobj = new XMLHttpRequest();
                    xobj.overrideMimeType("application/json");
                    xobj.open('GET', 'presets/p0.json', true);
                    xobj.onreadystatechange = function () {
                        if (xobj.readyState == 4 && xobj.status == "200") {
                            callback(xobj.responseText);
                        }
                    };
                    xobj.send(null);
                };

                var that = this;
                loadJSON(function (p) {
                    that.presets = JSON.parse(p);
                    that.initEffects();
                });
            }
        }

        //--------------------------------------------------

    }, {
        key: 'savePresets',
        value: function savePresets() {
            for (var preset in this.presets) {
                if (this.presets.hasOwnProperty(preset)) {
                    for (var param in this.presets[preset].params) {
                        if (this.presets[preset].params.hasOwnProperty(param)) {
                            if (preset != 'bloom') {
                                this.presets[preset].params[param].val = this.effects[preset].uniforms[param].value;
                            } else {
                                this.presets[preset].params[param].val = this.effects[preset].copyUniforms[param].value;
                            }
                        }
                    }
                    this.presets[preset].active = this.effects[preset].active;
                }
            }

            //--------------------------------------------------

            var p = JSON.stringify(this.presets);
            localStorage.setItem('presets', p);

            //--------------------------------------------------

            alert('saved');
        }

        //--------------------------------------------------

    }, {
        key: 'render',
        value: function render() {
            this.composer.render(0.1);
        }
    }]);

    return Shades;
})();

//# sourceMappingURL=shades-compiled.js.map