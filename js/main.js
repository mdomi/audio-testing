require.config({
	paths: {
		jQuery: 'loaders/jquery',
		Handlebars: 'loaders/handlebars',
		Underscore: 'loaders/underscore',
		Backbone: 'loaders/backbone',
	}
});
require([
	'jQuery', 'Underscore', 'Backbone', 'Handlebars'
], function($, _, Backbone, Handlebars) {
	console.log($, _, Backbone, Handlebars);
});




