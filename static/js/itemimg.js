//图片自适应宽的
function loadImg(img){
	var cimg=img;
	var div_w=190;
	var div_h=150;
	var img_w=cimg.width;
	var img_h=cimg.height;
	
	if (img_w>div_w) { //图片宽度大于目标宽度时 
		var w_original=img_w;
		var h_original=img_h;
		
		img_h = img_h * (div_w / img_w); //根据目标宽度按比例算出高度 
		img_w = div_w; //宽度等于预定宽度 
			if (img_h > div_h) { //如果按比例缩小后的高度小于预定高度时 
			  img_w = w_original * (div_h / h_original); //按目标高度重新计算宽度 
			  img_h = div_h; //高度等于预定高度 
			} 
	}else if(img_h>div_h){
		var w_original=img_w;
		var h_original=img_h;
		
		img_w=img_w*(div_h/img_h);
		img_h=div_h
		if (img_w > div_w) { //如果按比例缩小后的高度小于预定高度时 
		  img_h = h_original * (div_w / w_original); //按目标高度重新计算宽度 
		  img_w = div_w; //高度等于预定高度 
		} 
	}
	$(cimg).attr({width:img_w,height:img_h});
}