var findTpl=require("../templates/find.string");

SPA.defineView("find",{
	html:findTpl,
	plugins:["delegated"],
	bindActions:{
		"cancel":function(e){
			$(e.el).parent().next().show();
		}
	}
})