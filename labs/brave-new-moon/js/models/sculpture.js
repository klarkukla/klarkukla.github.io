define([
    'backbone',
    'localstorage',
    'modules/utils'
],
function(Backbone, LocalStorage, Utils) {

    var model = Backbone.Model.extend({

        defaults: {
            //id for localStorage
            id: 0,
            objects: [],
            nbObjects: 60,
            basePath: 'assets/img/objects/'
        },

        localStorage: new Backbone.LocalStorage("sculpture"),

        initialize: function() {
            _.bindAll(this, 'generate');
        },

        generate: function() {

            var w = this.get('objects');
            var nbObjects= this.get('nbObjects');
            var basePath = this.get('basePath');

            for (var i = 0; i < nbObjects; i++) {

                var s = 35 - (i/4);
                var s2 = 30 + (i/5);

                w.push({
                    src: basePath+i+'.png',
                    position: {
                        x: Math.floor(Math.random() * s - (s*0.5)) * s,
                        y: Math.floor(Math.random() * s2) * s2 + (s2*0.5),
                        z: Math.floor(Math.random() * s - (s*0.5)) * s
                    },
                    rotation: {
                        x: Math.random() * 360,
                        y: Math.random() * 360,
                        z: Math.random() * 360
                    }
                });
            }

            w.shuffle = function(n) {
                if(!n) {
                    n = this.length;
                }
                if(n > 1) {
                    var i = Utils.randomInt(0, n-1);
                    var tmp = this[i];
                    this[i] = this[n-1];
                    this[n-1] = tmp;
                    this.shuffle(n-1);
                }
            };
            w.shuffle();
            w.join();

            this.set({objects:w});
        }
    });
    
    return model;
});