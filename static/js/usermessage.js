$(function(){
	let itemshow_url = $(".itemshow_url");
	$(itemshow_url).each(function(){
		$(this).attr("href", site_url_item + "product/itemshowRecord?id=" +$(this).attr("data-id") + "&messageId=" +$(this).attr("data-messageid"));
	})
})