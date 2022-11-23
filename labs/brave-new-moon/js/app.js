define([
	'backbone',

	'modules/pointerlock',

	'models/moon',
	'models/date',
	'models/sculpture',

	'views/world',
	'views/ui'
], 
function(
    Backbone,

    PointerLock,

    MoonModel,
    DateModel,
    SculptureModel,

    WorldView,
    UIView
) {

	var view = Backbone.View.extend({

		el: $('body'),

		events: {
            "keyup": "showUI",
            "click #click": "hideUI",
            "click #showPopup": "showPopup",
            "click #hidePopup": "hidePopup"
        },

		initialize: function() {
			_.bindAll(this, 'start', 'initSculptureModel', 'initMoonModel', 'initDateModel', 'checkReady');

			// pointer lock
            this.pointerLock = new PointerLock(document.body);

            // event aggregator
            this.eventAgg = _.extend({}, Backbone.Events);
            this.eventAgg.bind("objectsLoaded", this.removePreloader);

            // used to check if all models are populated and ready
            this.models = {};
            this.models.ready = false;

            // moon model
			this.initMoonModel();
		},

		initMoonModel: function() {

			// init
			this.moonModel = new MoonModel();

			// listen (pieces is the last param to be changed)
			this.moonModel.on('change:pieces', this.initDateModel);

			// fetch
			var that = this;
			this.moonModel.fetch({

                success: function() {
                    that.moonModel.processData();
                },
                error: function() {
                    $('#preloader p').html("Error! <br> Please reload the page");
                    $('#loader').hide();
                }
            });
		},

		initDateModel: function() {

			// today
			var today = new Date();
			var currentMonth = today.getMonth();

			// init model
			this.dateModel = new DateModel();

			// fetch
			var that = this;
			this.dateModel.fetch({

                success: function() {

                	var savedMonth = that.dateModel.get('month');

                	if (currentMonth != savedMonth) {
                		// we destroy the sculpture
                		that.initSculptureModel({destroy:true});
                	} else {
                		// no need to destroy anything
                		that.initSculptureModel({destroy:false});
                	}

                	// save
                    that.dateModel.save({month:currentMonth});
                },

                error: function() {

                	// save
                    that.dateModel.save({month:currentMonth});

                    // init sculpture model
                    that.initSculptureModel({destroy:false});
                }
            });
		},

		initSculptureModel: function(data) {

			// init sculpture
			this.sculptureModel = new SculptureModel();

			var age = this.moonModel.get('age');

			if (age != 0) {

                if (data.destroy) {
                	/*_________________*/
            		// new month = destroy
                	this.sculptureModel.destroy();
                }

                // fetch
                var that = this;
	            this.sculptureModel.fetch({

	                success: function() {
	                	//
                        that.models.ready = true;
	                    that.checkReady();
	                },

	                error: function() {
	                	/*_________________*/
            			// REGEN !
	                    that.sculptureModel.generate();
	                    that.sculptureModel.save();

                        that.models.ready = true;
	                    that.checkReady();
	                }
	            });
            } else {
            	/*_________________*/
            	// new moon = destroy
            	this.sculptureModel.destroy();

            	//////
            	$('#preloader p').html("New moon today ! <br> Nothing");
                $('#loader').hide();
            }
		},

        checkReady: function () {
            if (this.models.ready) {
                this.start();
            }
        },

		start: function() {

			var uiView = new UIView({model: this.moonModel});

			var worldView = new WorldView({
                model: this.sculptureModel,
                model2: this.moonModel,
                e: this.eventAgg,
                context: this.context
            });
		},

		/*----------------------------------------*/

		removePreloader: function() {
			$('#preloader-container').hide();
		},

		/*----------------------------------------*/

		hideUI: function(e) {
			e.preventDefault();
			$('#ui-content').css({display:'none'});
			this.eventAgg.trigger("hideUI");
			this.pointerLock.lock();
		},

		showUI: function(e) {
			if (e.which === 27 ){
				$('#ui-content').css({display:'block'});
				this.eventAgg.trigger("showUI");
				this.pointerLock.unlock();
			}
		},

		showPopup: function(e) {
			e.preventDefault();
            $('#ui-content').css({display:'none'});
			$('#popup').removeClass('hide');
		},

		hidePopup: function(e) {
			e.preventDefault();
            $('#ui-content').css({display:'block'});
			$('#popup').addClass('hide');
		}
	});

	return view;
});