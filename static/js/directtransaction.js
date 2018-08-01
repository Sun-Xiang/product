function pointCheckboxOnclick(){
    let checked = $("#isPoints").is(":checked");
    let price = $("#price").val();
    let newPrice = $("#directPrice").text();
    let orignalPoints = $("#orignalPoints").val();
    let points = $("#points").text();
    if(checked) {
    	$("#isPoints").val("1");
    	if(points >= newPrice){
    		$("#directPrice").text("0元");
    		$("#points").text(orignalPoints - price);
    		$("#usedPoints").text(price);
    	}else if(points <= 0){
    		$("#directPrice").text(price);
    		$("#points").text(orignalPoints);
    		$("#usedPoints").text(orignalPoints);
    	}else if(points > 0 || points <= newPrice){
    		$("#directPrice").text(newPrice - points);
    		$("#points").text("0");
    		$("#usedPoints").text(orignalPoints);
    	}
    }else{
    	$("#directPrice").text(price)
    	$("#points").text(orignalPoints)
		$("#usedPoints").text("0")
    }
}