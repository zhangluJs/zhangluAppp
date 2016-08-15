var registerTpl=require("../templates/register.string");
//定义视图
SPA.defineView("register",{
	html:registerTpl,
	styles:{//改变样式
		background:"transparent!important"
	},
	plugins:["delegated"],
	bindActions:{
		"yes":function(){
			function name(){
				var reg=/(^1(3[4-9]|4[7]|5[0-27-9]|7[8]|8[2-478])\\d{8}$)|(^1705\\d{7}$)/;
				return reg.test($(".yo-input").eq(0).val());
			}
			if(name()){
				
			}
		}
	}
})