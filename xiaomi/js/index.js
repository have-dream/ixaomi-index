$(function() {
	//购物车
	$("#cart-container").hover(function() {
		$("#cart-count").prev().css("backgroundPosition","0 -18px").parent().css({backgroundColor:"#fff",color:"#f60"});
	},function() {
		$("#cart-count").prev().removeAttr("style").parent().removeAttr("style");
	});
	
	// nav导航
	$("#want-show").hover(function() {
		$("#nav-con").css("display","block").stop(true).animate({height:229},400);
	},function() {
		$("#nav-con").stop(true).animate({height:0},400,function() {
			$(this).css("display","none");
		});
		$("#nav-con").hover(function() {
			$(this).stop(true).css({height: 229, display: "block"});
		},function() {
			$(this).stop(true).animate({height:0},400,function() {
				$(this).css("display","none");
			});
		});
	});
	
	$("#want-show").on("mouseover","li",function() {
		var num = $(this).index();
		if (num <= 6) {
			$("#nav-con").children().eq(num).css("display","block").siblings().css("display","none");
		};
	});
	
	// search
	$("#search-val").focus(function() {
		$(this).css("borderColor","#f60").next().css("borderColor","#f60").next().css("display","none").next().css("display","block");
	});
	$("#search-val").blur(function() {
		$(this).css("borderColor","#e0e0e0").next().css("borderColor","#e0e0e0").next().css("display","block").next().css("display","none");
	});
	
	/*****************轮播图********************/
	var $oImgs = $("#ban-con").children("img");
	var thisLen = $oImgs.size();
	var thisIndex = 0;
	var nextIndex = 1;
	var flag = 0;
	
	var swapTimer = setInterval(goRight,2000);
	function goRight() {
		if (flag == 1) {
			flag = 0;
			thisIndex++;
			nextIndex++;
		}
		if (thisIndex >= thisLen) {
			thisIndex = 0;
		};
		if (nextIndex >= thisLen) {
			nextIndex = 0;
		};
		$oImgs.eq(thisIndex).fadeOut(400);
		$oImgs.eq(nextIndex).fadeIn(400);
		followSwap();
		thisIndex++;
		nextIndex++;
	};
	
	function goLeft() {
		if (flag == 0) {
			flag = 1;
			thisIndex--;
			nextIndex--;
		};
		if (thisIndex < 0) {
			thisIndex = thisLen - 1;
		};
		if (nextIndex < 0) {
			nextIndex = thisLen - 1;
		};
		$oImgs.eq(nextIndex).fadeOut(400);
		$oImgs.eq(thisIndex).fadeIn(400);
		followSwap();
		thisIndex--;
		nextIndex--;
	};
	
	// 下标跟随效果
	var $smallLis = $("#small-link").children("li");
	function followSwap() {
		if (flag == 0) {
			$smallLis.eq(nextIndex).addClass("first-li").siblings().removeClass("first-li");
		} else {
			$smallLis.eq(thisIndex).addClass("first-li").siblings().removeClass("first-li");
		};
		
	};
	
	// 鼠标划入停止
	$("#ban-con").hover(function() {
		clearInterval(swapTimer);
	},function() {
		swapTimer = setInterval(goRight,2000);
	});
	// 点击事件
	$("#go-left").click(function() {
		goLeft();
	});
	$("#go-right").click(function() {
		goRight();
	});
	
	$("#small-link").on("click","li",function() {
		$(this).addClass("first-li").siblings().removeClass("first-li");
		nextIndex = $(this).index();
		goRight();
		thisIndex = nextIndex - 1;
	});
	
	/******************侧边导航栏**************/
	var $oLis = $("#aside-items").children("li");
	var $oNavLis = $("#categoryList").children("li");
	$("#categoryList").on("mouseover","li",function() {
		$(this).children("a").addClass("change-bg").parent().siblings().children("a").removeClass("change-bg");
		$("#aside-items").css("display","block");
		var nowIndex = $(this).index();
		$oLis.eq(nowIndex).css("display","block").siblings().css("display","none");
	});
	$("#categoryList").mouseleave(function() {
		$("#aside-items").css("display","none");
		$oNavLis.children("a").removeClass("change-bg");
	});
	$("#aside-items").on("mouseover","li",function() {
		$(this).parent().css("display","block");
		var prevIndex = $(this).find("input[type=hidden]").val();
		$oNavLis.eq(Number(prevIndex)).children("a").addClass("change-bg").parent().siblings().children("a").removeClass("change-bg");
	});
	$("#aside-items").mouseleave(function() {
		$(this).css("display","none");
		$oNavLis.children("a").removeClass("change-bg");
	});
	
	
	/********************明星产品小轮播********************/
	$("#goods-go-where").on("click","a",function() {
		if ($(this).attr("class") == "right-bg") {
			$(this).attr("class","right-disabled").prev().attr("class","left-bg");
			$("#goods-pic-change").css("marginLeft",-1240);
		} else if ($(this).attr("class") == "left-bg") {
			$(this).attr("class","left-disabled").next().attr("class","right-bg");
			$("#goods-pic-change").css("marginLeft",0);
		};
	});
	
	var mLeft = 0;
	var starTimer = setInterval(starPicSwap,5000);
	function starPicSwap() {
		if (mLeft == 0) {
			mLeft = -1240;
			$("#goods-go-where").children("a").eq(0).removeClass().addClass("left-bg").next().removeClass().addClass("right-disabled");
		} else {
			mLeft = 0;
			$("#goods-go-where").children("a").eq(0).removeClass().addClass("left-disabled").next().removeClass().addClass("right-bg");
		};
		$("#goods-pic-change").css("marginLeft",mLeft);
	};
	
	$("#goods-pic-change").hover(function() {
		clearInterval(starTimer);
	},function() {
		starTimer = setInterval(starPicSwap,5000);
	});
	
	$("#goods-go-where").hover(function() {
		clearInterval(starTimer);
	},function() {
		starTimer = setInterval(starPicSwap,5000);
	});
	
});