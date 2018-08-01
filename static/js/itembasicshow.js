//设置图片，跳转绝对路径
$(function(){
	//a标签路径
	var item_id = $(".main_out .item_id");
	var itemshow_url = $(".main_out .itemshow_url");
	for(let i=0;i<item_id.length;i++){
		$(itemshow_url[i]).attr("href" , site_url_item + "product/itemshow?id=" + $(item_id[i]).val());
	}
	//图片路径
	$(".main_out .zoom").css("background" , "url(" + site_url_item + "img/zoom.png)");
	$(".main_out .icon_nyusatsu").attr("src" , site_url_item + "img/icon_nyusatsu.png");
	$(".main_out .icon_time").attr("src" , site_url_item + "img/icon_time.png");
})
//zoom
$('[data-magnify]').magnify({
	fixedContent: false,
	title: false
});