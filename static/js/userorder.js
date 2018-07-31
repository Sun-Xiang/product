function payMent(orderId,userId){
	let inputBox=$("#userPoint"+orderId);
	if($(inputBox).prop("checked")){
		window.location = site_url_item+"account/userPoints?userId="+userId+"&orderId="+orderId;
	}
}