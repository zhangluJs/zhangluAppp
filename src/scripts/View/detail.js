var detailTpl=require("../templates/detail.string");

SPA.defineView("detail",{
	html:detailTpl,
	plugins:["delegated",{
		name:"avalon",
		options:function(vm){
			vm.img=null;
			vm.title=null;
			vm.details=null;
			vm.isShow=true;
		}
	}],
	bindEvents:{
		show:function(){
			var vm=this.getVM();
			var id=this.param.id;
			$.ajax({
				//url:"/api/getLivelist.php",
				url:"/mock/live.json",
				data:{
					rtype:id
				},
				success:function(rs){
					//var data = rs.data;
					vm.img=rs.img;
					vm.title=rs.title;
					vm.details=rs.details;
					vm.title=rs.title;
					setTimeout(function(){
						vm.isShow=false;
					},1000)
				}
			})
		}
	},
	bindActions:{
		"goto.index":function(e){
			SPA.open("index");//使用open直接跳转
		}
	}
})