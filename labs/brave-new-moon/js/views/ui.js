define([
    'backbone'
],
function(Backbone) {

    var view = Backbone.View.extend({

        el: '#ui',

        template: Handlebars.compile($('#ui').html()),

        initialize: function() {
            _.bindAll(this, 'render');
            this.render();
        },

        render: function() {

            var data = this.model.toJSON();

            // age
            if (data.age <= 1) {
                data.postAge = 'day';
            } else {
                data.postAge = 'days';
            }

            // to template
            this.$el.html(this.template(data));
        }
    });

    return view;
});