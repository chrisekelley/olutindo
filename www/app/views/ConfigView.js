var ConfigView = Backbone.View.extend({
	template: loadTemplate("config.template.html"),

	initialize: function() {
		return this;
	},
	events: {
		"click #submitSignin " : "signinSubmit"
	},
	reseted: function() {
		console.log("reseted.");
	},
	remove: function() {
		console.log("remove the view in homeView");
		$(this.el).remove();
	},
  signinSubmit: function() {
    handleSignInSubmit();
		FORMY.router.navigate('home', true);
    return false;
	},
	orientation: "horiz",
	render: function() {
		this.html = this.template(this.model.toJSON());
		console.log("rendering ConfigView");
		//$("body").html(viewHtml);
		return this;
	}
});