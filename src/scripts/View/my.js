var myTpl=require("../templates/my.string");

SPA.defineView("my",{
	html:myTpl,
	plugins:["delegated"],
	styles:{//改变样式
		background:"transparent!important"
	},
	bindActions:{
		"my.hide":function(){
			this.hide();
		},
		"goto.register":function(){
			SPA.open("register",{
				ani:{
					name:"actionSheet",
					distance:200
				}
			});
		}
	}
})