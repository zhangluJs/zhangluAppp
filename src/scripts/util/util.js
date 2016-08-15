var setFocus={
		util:function(e,mycalss){
			e.addClass(mycalss).siblings().removeClass(mycalss);
		}
}

module.exports=setFocus;