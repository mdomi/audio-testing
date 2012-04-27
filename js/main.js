require.config({
	paths: {
		jQuery: 'loaders/jquery',
		Handlebars: 'loaders/handlebars',
		Underscore: 'loaders/underscore',
		Backbone: 'loaders/backbone',
	}
});
require([
	'jQuery', 'app'
], function($, app) {

    $(function () {
        var model = new app.models.AudioModel({
            filename: 'audio/test.ogg'
        });
        
        var view = new app.views.AudioView({
            model: model,
            el : $('#app')
        }).render();
        
    });
});




