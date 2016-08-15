require("./lib/spa.min");//require引入其他JS文件，如果后缀是JS可以省略不写
require("./lib/swiper-3.3.1.min");
require("./View/index");
require("./View/home");
require("./View/find");
require("./View/my");
require("./View/guide");
require("./View/detail");
require("./View/register");


SPA.config({//默认配置
	 indexView: 'guide'//默认刚开始进入的首页
})