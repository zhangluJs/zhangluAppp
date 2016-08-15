var indexTpl=require("../templates/index.string");

var util=require("../util/util");


SPA.defineView("index",{
	html:indexTpl,
	//引入delegated插件，用于定义tap事件，bindActions中操作；
	plugins:["delegated"],
	//定义子视图
	modules:[{
		name:"content",//子视图的名称，用于引用的句柄
		defaultTag:"home",//默认的子视图
		views:["home","find","my"],//定义子视图集
		container:".m-wrapper"//主视图的容器，将子视图的内容渲染到主视图的容器中
	}],
	//绑定视图事件
	bindEvents:{
		//子视图加载完成前执行的回调函数
		beforeShow:function(){

		},
		//子视图加载完成后执行的回调函数
		show:function(){

		}
	},
	//DOM元素绑定事件，注意上面没有引用plugins:["delegated"],是无法使用这个对象的
	bindActions:{
		"switch.tabs":function(e,data){//这里的"switch.tabs"，是在具体元素上写了自定义属性action-type="switch.tabs"，使用时用自己定义的名字，在这里是"switch.tabs"
		//data-tag="home" 这个自定义属性是用来做跳转使用的，配合函数中的参数data，这个自定义属性值要和自己定义的string的名字一一对应
			//$(e.el).addClass("active").siblings().removeClass("active");
			//var index=$(e.el).index();
			util.util($(e.el),"active");
			this.modules.content.launch(data.tag);//这里的content是上面modules中的name，这里的格式是固定的。data后面要跟.tag获取
			//另一种跳转方法是，SPA.open("index")，是直接跳转到固定页面
		},
		"goto.my":function(){
			SPA.open("my",{
				ani:{
					name:"dialog",
					width:280,
					height:200
				}
			})
		}
	}
})