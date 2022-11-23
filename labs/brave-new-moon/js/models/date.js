define([
    'backbone',
    'localstorage'
],
function(Backbone, LocalStorage) {

    var model = Backbone.Model.extend({

        defaults: {
            //id for localStorage
            id: 1,
            month: 0
        },

        localStorage: new Backbone.LocalStorage("month"),
    });
    
    return model;
});