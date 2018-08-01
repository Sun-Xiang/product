function pageChange(select){
	getSize=select.value;
	reUrl();
}
function mostPoint(){
	if(mostPointSort==1){
		mostPointSort=0;
	}else{
		mostPointSort=1;
	}
	reUrl();
}
function price(){
	if(priceSort==1){
		priceSort=0;
	}else{
		priceSort=1;
	}
	reUrl();
}
function totalBid(){
	if(totalBidSort==1){
		totalBidSort=0;
	}else{
		totalBidSort=1;
	}
	reUrl();
}
function endDateTime(){
	if(endDateTimeSort==1){
		endDateTimeSort=0;
	}else{
		endDateTimeSort=1;
	}
	reUrl();
}
function reUrl(){
	window.location="?categoryCode="+categoryCode+"&pageSize="+getSize+"&page=0&mostPointSort="+mostPointSort+"&priceSort="+priceSort+"&totalBidSort="+totalBidSort+"&endDateTimeSort="+endDateTimeSort;
}