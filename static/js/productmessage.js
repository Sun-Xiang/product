var userId=window.parent.document.getElementById("userId").value;
var salerId=window.parent.document.getElementById("salerId").value;
var productId=window.parent.document.getElementById("id").value;
function sendMessage(messageNum,messageId){
	//拦截器，目前后天不支持ajax请求，所有用前台js模拟
	if(messageNum==0){
		var message = $("#text_send").val();
	}else if(messageNum==1){
		var message = $("#con_back"+messageId).val();
	}
	if(messageId){
		messageId=messageId;
	}else{
		messageId="";
	}
	if(!message){
		alert("请填写消息");
		return;
	}
	
	var messageInfo = {
			"productId":productId,
			"message":message,
			"questionerId":userId,
			"salerId":salerId,
			"parentId":messageId
	}
	$.ajax({
		url:site_url_item+"messagerest/info/frombuyertosaler",
		dataType:'json',
		contentType:"'application/json;charset=utf-8",
		type:'post',
		data:JSON.stringify(messageInfo),
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
				$("#popContent",parent.document).html("消息发送成功");
				function init(){ 
				   windowHeight=$(window,parent.document).height(); 
				   windowWidth=$(window,parent.document).width(); 
				   popHeight=$("#popWindow",parent.document).height(); 
				   popWidth=$("#popWindow",parent.document).width(); 
				}
				function closeWindow(){
					$("#popClose span",parent.document).click(function(){
						$(this).parent().parent().hide(); 
						location.reload()
					});
				}
				$(function popCenterWindow(){
				    init(); 
				    //计算弹出窗口的左上角Y的偏移量 
					const popY=(windowHeight-popHeight)/2; 
					const popX=(windowWidth-popWidth)/2;
					$("#popWindow",parent.document).css("top",popY).css("left",popX).slideToggle("slow");  
					closeWindow();
				});
			}
		}
	});
}

function updateMessage(messageId){
	var message=$("#con_backUp"+messageId).val();
	if(!message){
		alert("请填写消息");
		return;
	}
	$.ajax({
		url:site_url_item+"messagerest/info/update",
		dataType:'json',
		contentType:"'application/json;charset=utf-8",
		type:'post',
		data:"{\"id\":\""+messageId+"\",\"message\":\""+message+"\"}",
		success:function (data) {
			if(data.status=="ok"){
				$(".con_back").text("");
				//获取窗口的高度 
				var windowHeight; 
				//获取窗口的宽度 
				var windowWidth; 
				//获取弹窗的宽度 
				var popWidth; 
				//获取弹窗高度 
				var popHeight; 
				$("#popContent",parent.document).html("消息修改成功");
				function init(){ 
				   windowHeight=$(window,parent.document).height(); 
				   windowWidth=$(window,parent.document).width(); 
				   popHeight=$("#popWindow",parent.document).height(); 
				   popWidth=$("#popWindow",parent.document).width(); 
				}
				function closeWindow(){
					$("#popClose span",parent.document).click(function(){
						$(this).parent().parent().hide(); 
						location.reload()
					});
				}
				$(function popCenterWindow(){
				    init(); 
				    //计算弹出窗口的左上角Y的偏移量 
					const popY=(windowHeight-popHeight)/2; 
					const popX=(windowWidth-popWidth)/2;
					$("#popWindow",parent.document).css("top",popY).css("left",popX).slideToggle("slow");  
					closeWindow();
				});
			}
		}
	});
}

function updateMessageText(obj,messageId){
	$(obj).parents(".tent_info").find(".content_textUp").remove();
	let messageInfoId="messageInfo"+messageId;
	let htmlUpdate="";
	htmlUpdate='<div class="col-md-12 col-sm-12 col-xl-12 content_textUp one three">'+
					'<textarea class="col-md-10 col-sm-10 col-xl-10 con_back" id="con_backUp'+messageId+'">'+$("#"+messageInfoId).text()+'</textarea>'+
					'<div class="col-md-2 col-sm-2 col-xl-2 btn btn_back" onclick="updateMessage('+messageId+')">提交</div>'+
				'</div>';
	$("#"+messageInfoId).parents(".replyDiv").append(htmlUpdate);
	
}
function messageReply(obj){
	$(obj).parents(".tent_info").find(".content_text").hide();
	$(obj).parent(".contentReply").next(".content_text").show();
}

function loginFrame(){
	var mainFrame = $("#productMessege",parent.document);
	var iframeHeight = document.body.clientHeight;
	$(mainFrame).attr("height",iframeHeight + 'px');
}

window.setInterval("loginFrame()", 500);

if(userId==salerId){
	$(".contentReply").show();
	$(".content_text").hide();
}else{
	$(".contentReply").hide();
	$(".content_text").hide();
}
