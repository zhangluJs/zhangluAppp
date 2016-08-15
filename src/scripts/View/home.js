var homeTpl=require("../templates/home.string");
var util=require("../util/util");
//定义视图
SPA.defineView("home",{
	html:homeTpl,//定义页面内容
	plugins:["delegated",{//plugins第二个参数，配置插件，这个对象name是为了引入avalon，第二个参数中是为了定义vm.livedata为一个参数
		name:"avalon",
		options:function(vm){
			vm.livedata=[];
		}
	}],
	init:{
		mySlider:null,
		livelistArr:[],
		container:null,
		formData:function(data){//该方法的作用是，将一维数组，加工成为二维数组，并且这个二维数组中每个有两个值
			var d=[];
			for(var i=0,len=Math.ceil(data.length/2);i<len;i++){
				d[i]=[];
				d[i].push(data[2*i]);
				d[i].push(data[2*i+1]);
			}
			return d;
		}
	},
	bindEvents:{//绑定视图事件
		beforeShow:function(){
			// 获取视图
		   var that = this;
		   // 获取vm
		   that.vm = this.getVM();
			$.ajax({
				//url:"/mock/livelist.json",
           	    url:"/api/getLivelist.php",
                type:"get",
                data:{
               	   rtype:"origin" 
                },
				async:true,
				success:function(e){
					that.vm.livedata=that.formData(e.data);//调用在init方法中的formData方法修改json数据中的数据，方便渲染,并赋值给vm.livedata
				},
				error:function(){
					alert("错误");
				}
			});
		},
		show:function(){//页面加载完成后执行该回调函数，执行ajax
			var that = this;
			this.mySlider=new Swiper('#swiper-slide',{
				loop:false,
				onSlideChangeStart:function(swiper){//回调函数，滑块释放时如果触发slider切换则执行该函数。
					util.util($("nav li").eq(swiper.activeIndex),"active");//swiper.activeIndex 返回当前活动块的索引
				}
			});
			this.container=new Swiper('#container',{
				loop:false,
				onSlideChangeStart:function(swiper){//回调函数，滑块释放时如果触发slider切换则执行该函数。
					util.util($("#home-ul li").eq(swiper.activeIndex),"active");//swiper.activeIndex 返回当前活动块的索引
				}
			});
			var myScroll = new IScroll('#s', {
		        probeType: 3,
		        mouseWheel: true
		      });
			var ptrHeight=35,
				scrollSize=30,
				head=$('.head img'),
		        foot=$('.foot img'),
		        loaderImg='/images/ajax-loader.gif',
		        arrowImg='/images/arrow.png',
          		topImgHasClass=head.hasClass("up"),
          		bottomImgHasClass = foot.hasClass('down'); 
				myScroll.scrollBy(0,-scrollSize);	
          	myScroll.on("scroll",function(){
		        var y=this.y,
		            maxY=this.maxScrollY-y;
	            if(y>=0){
	                 !topImgHasClass && head.addClass("up");
	                 return "";
	            }
	            if(maxY>=0){
	                 !bottomImgHasClass && foot.addClass("down");
	                 return "";
	            }
		    })
	      	myScroll.on("scrollEnd",function(){
		        if(this.y>=-scrollSize && this.y<0){
		            ////myScroll.scrollTo(0,-scrollSize);
		            head.removeClass("up");
		        }else if(this.y>=0){
		            head.attr("src","/images/ajax-loader.gif");
		            $.ajax({
		                  //url:"/mock/livelist.json",  mock数据
		                  url:"/api/getLivelist.php",
		                  type:"get",
		                  data:{
		                     rtype:"refresh"
		                  },
		                  success:function(rs){
							 that.list = rs.data.concat(that.list);
		                     that.vm.livedata = that.formData(that.list);   
		                     myScroll.refresh();
		                     ////myScroll.scrollBy(0,-scrollSize);
		                 	 head.removeClass("up");
		                	 head.attr("src","/images/arrow.png");
		                  }
		              })
		       	}
		        var maxY=this.maxScrollY-this.y;
		        var self=this;
		        if(maxY>-scrollSize && maxY<0){
		            //  myScroll.scrollTo(0,self.maxScrollY+scrollSize);
		              foot.removeClass("down");
		        }else if(maxY>=0){
		            foot.attr("src","/images/ajax-loader.gif")
		              // 请求加载数据
		              $.ajax({
		                  //url:"/mock/livelist.json",  mock数据
		                  url:"/api/getLivelist.php",
		                  type:"get",
		                  data:{
		                    	rtype:"more"
		                  },
		                  success:function(rs){
								that.livelistArr = that.livelistArr.concat(rs.data);
                    			that.vm.livedata = that.formData(that.livelistArr);   
			                    myScroll.refresh();
			                  //myScroll.scrollTo(0,self.y+30);
			                    foot.removeClass("down");
			                    foot.attr("src","/images/arrow.png")
		                  }
		              })
		        }
		    })
		}
	},
	bindActions:{
		"tap.slide":function(e){
			var index=$(e.el).index();
			this.mySlider.slideTo(index);//执行过渡到索引下标数字等于传入参数index的页面
		},
		"ul.slide":function(e){
			var index=$(e.el).index();
			this.container.slideTo(index);//执行过渡到索引下标数字等于传入参数index的页面
		},
		"goto.detail":function(e,data){
			SPA.open("detail",{
				param:data
			});
		}
	}
})