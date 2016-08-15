var guideTpl=require("../templates/guide.string");

SPA.defineView("guide",{
	html:guideTpl,
	plugins:["delegated"],
	bindEvents:{
		show:function(){//视图加载完成后调用swiper
			var mySwiper=new Swiper('.swiper-container',{
				autoplay:3000,
			});
		}
	},
	bindActions:{
		"go.home":function(e){
			SPA.open("index");//使用open直接跳转
		}
	}
})