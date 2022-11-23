define([
    'backbone',
    'modules/utils'
],
function(Backbone, Utils) {

    var model = Backbone.Model.extend({

        defaults:{
            age: 0,
            pieces: null
        },

        //url:'http://api.burningsoul.in/moon/'+Utils.timestamp,
        //-->using local
        url:'json/moon.json',

        initialize: function() {
            _.bindAll(this, 'processData');
        },

        processData: function() {

            //age
            var _age = Math.floor(this.get('age'));

            //pieces
            var _pieces = _age * 2;

            this.set({
                age: _age,
                pieces: _pieces
            });
        }
    });

    return model;
});
