//author:caibaojian
//website:http://caibaojian.com
//weibo:http:weibo.com/kujian
//兼容UC竖屏转横屏出现的BUG
自定义设计稿的宽度：designWidth
最大宽度:maxWidth
;(function(designWidth, maxWidth) {
	var doc = document,
		win = window;
	var docEl = doc.documentElement;
	var tid;
	var rootItem,rootStyle;

	function refreshRem() {
		var width = docEl.getBoundingClientRect().width;
		if (!maxWidth) {
			maxWidth = 540;
		};
		if (width > maxWidth) {
			width = maxWidth;
		}
		var rem = width * 100 / designWidth;
		//兼容UC开始
		rootStyle="html{font-size:"+rem+'px !important}';
		rootItem = document.getElementById('rootsize') || document.createElement("style");
		if(!document.getElementById('rootsize')){
		document.getElementsByTagName("head")[0].appendChild(rootItem);
		rootItem.id='rootsize';
		}
		if(rootItem.styleSheet){
		rootItem.styleSheet.disabled||(rootItem.styleSheet.cssText=rootStyle)
		}else{
		try{rootItem.innerHTML=rootStyle}catch(f){rootItem.innerText=rootStyle}
		}
		//兼容UC结束
		docEl.style.fontSize = rem + "px";
	};
	refreshRem();

	win.addEventListener("resize", function() {
		clearTimeout(tid); //·ÀÖ¹Ö´ÐÐÁ½´Î
		tid = setTimeout(refreshRem, 300);
	}, false);

	win.addEventListener("pageshow", function(e) {
		if (e.persisted) { // ä¯ÀÀÆ÷ºóÍËµÄÊ±ºòÖØÐÂ¼ÆËã
			clearTimeout(tid);
			tid = setTimeout(refreshRem, 300);
		}
	}, false);

	if (doc.readyState === "complete") {
		doc.body.style.fontSize = "16px";
	} else {
		doc.addEventListener("DOMContentLoaded", function(e) {
			doc.body.style.fontSize = "16px";
		}, false)
	}
})(640, 640);
