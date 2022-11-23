require.config({

    waitSeconds: 0,

    paths: {
    	'jquery': 'libs/zepto.min',
        'handlebars': 'libs/handlebars-min',
        'underscore': 'libs/underscore.min',
        'backbone': 'libs/backbone.min',
        'localstorage': 'libs/backbone.localStorage-min',
        'three': 'libs/three.min',
        'modernizr': 'libs/modernizr'
    },
    
    shim: {
        'jquery': {
            exports: '$'
        },

        'underscore': {
            exports: '_'
        },

        'handlebars': {
            exports: 'Handlebars'
        },

        /*
        *
        * three
        *
        * */

        'three': {
            exports: 'THREE'
        },

        'modules/shaders/ConvolutionShader': {
            deps: ['three']
        },

        'modules/shaders/CopyShader': {
            deps: ['three']
        },

        'modules/shaders/HorizontalTiltShiftShader': {
            deps: ['three']
        },

        'modules/shaders/VerticalTiltShiftShader': {
            deps: ['three']
        },

        'modules/shaders/FXAAShader': {
            deps: ['three']
        },

        'modules/shaders/VignetteShader': {
            deps: ['three']
        },

        'modules/3d/PointerLockControls': {
            deps: ['three']
        },

        'modules/postprocessing/EffectComposer': {
            deps: ['three']
        },

        'modules/postprocessing/RenderPass': {
            deps: ['three']
        },

        'modules/postprocessing/BloomPass': {
            deps: ['three']
        },

        'modules/postprocessing/ShaderPass': {
            deps: ['three']
        },

        'modules/postprocessing/MaskPass': {
            deps: ['three']
        },

        'modules/postprocessing/SavePass': {
            deps: ['three']
        },

        /*
        *
        *
        *
        * */

        'backbone': {
            deps: ['jquery', 'handlebars', 'underscore'],
            exports: 'Backbone'
        },

        'modernizr': {
            exports: 'Modernizr'
        }
    }
});

require(['modernizr', 'app'], function (Modernizr, App) {

    if (Modernizr.webgl){

        var app = new App();

    } else {

        window.location.href = 'http://get.webgl.org/';
    }
});