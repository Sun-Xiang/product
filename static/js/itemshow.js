function itembid(){
	
	let bidPrice = $("#bidPrice").val();
	let bidPrice_check = parseFloat($("#bidPrice_check").val());
	let startPrice = parseFloat($("#startPrice").val());
	
	//拦截器，目前后天不支持ajax请求，所有用前台js模拟
	if (!check_user){
		window.location = site_url_sso+"page/login.html?re="+window.location.href;
		return;
	}
	
	if(bidPrice <= bidPrice_check && bidPrice_check){
		alert("出价不能少于现价");
		return;
	}else if(startPrice > bidPrice){
		alert("出价不能少于起拍价");
		return;
	}
	if(isNaN(bidPrice)){
		alert("请出价");
		return;
	}
	$.ajax({
		url:site_url_item+"productrest/userBid/"+$("#userId").val()+"/"+$("#id").val()+"/"+$("#bidPrice").val(),
		dataType:'json',
		type:'get',
		success:function (data) {
			if(data.status=="ok"){
				//获取窗口的高度 
				var windowHeight; 
				//获取窗口的宽度 
				var windowWidth; 
				//获取弹窗的宽度 
				var popWidth; 
				//获取弹窗高度 
				var popHeight; 
				$("#popContent").html("竞拍成功，竞拍价格："+bidPrice+"元");
				function init(){ 
				   windowHeight=$(window).height(); 
				   windowWidth=$(window).width(); 
				   popHeight=$("#popWindow").height(); 
				   popWidth=$("#popWindow").width(); 
				}
				function closeWindow(){
					$("#popClose span").click(function(){
						$(this).parent().parent().hide(); 
						location.reload()
					});
				}
				$(function popCenterWindow(){
				    init(); 
				    //计算弹出窗口的左上角Y的偏移量 
					const popY=(windowHeight-popHeight)/2; 
					const popX=(windowWidth-popWidth)/2;
					$("#popWindow").css("top",popY).css("left",popX).slideToggle("slow");  
					closeWindow();
				});
			}
		}
	});
};

function sendMessage(){
	//拦截器，目前后天不支持ajax请求，所有用前台js模拟
	if (!check_user){
		window.location = site_url_sso+"page/login.html?re="+window.location.href;
		return;
	}
	
	let salerId = $("#salerId").val();
	let message = $("#message").val();
	
	if(!message){
		alert("请填写消息");
		return;
	}
	
	$.ajax({
		url:site_url_item+"messagerest/info/frombuyertosaler?productId=" + $("#id").val() + "&message=" + $("#message").val() +"&questionerId=" + $("#userId").val() + "&salerId=" + $("#salerId").val(),
		dataType:'json',
		type:'post',
		success:function (data) {
			if(data.status=="ok"){
				//获取窗口的高度 
				var windowHeight; 
				//获取窗口的宽度 
				var windowWidth; 
				//获取弹窗的宽度 
				var popWidth; 
				//获取弹窗高度 
				var popHeight; 
				$("#popContent").html("消息发送成功");
				function init(){ 
				   windowHeight=$(window).height(); 
				   windowWidth=$(window).width(); 
				   popHeight=$("#popWindow").height(); 
				   popWidth=$("#popWindow").width(); 
				}
				function closeWindow(){
					$("#popClose span").click(function(){
						$(this).parent().parent().hide(); 
						location.reload()
					});
				}
				$(function popCenterWindow(){
				    init(); 
				    //计算弹出窗口的左上角Y的偏移量 
					const popY=(windowHeight-popHeight)/2; 
					const popX=(windowWidth-popWidth)/2;
					$("#popWindow").css("top",popY).css("left",popX).slideToggle("slow");  
					closeWindow();
				});
			}
		}
	});
}

/*
 *用户留言LIST 
 */

window.onload=function(){
	$("#productMessege").attr("src",site_url_item+"message/messageasproduct?productId="+productId+"&pageSize=5&page=0");
}


