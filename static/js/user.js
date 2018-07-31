//取token 。 header添加登入，退出button
var check_user=$.cookie("COOKIE_TOKEN");

$(function(){
	
	if(!check_user){
		return;
	}
	$.ajax({
		url:site_url_sso+"user/token/"+check_user,
		dataType:'json',
		type:'get',
		success:function (data) {
			if (data.status=='ok') {
				let date=new Date(); 
				date.setTime(date.getTime()+60*60*1000);
				document.cookie="COOKIE_TOKEN="+check_user+"; expires="+date.toGMTString()+"; path=/";
				let nickName=data.result.nickName;
				$("#userId").val(data.result.id);
				$("#login_bar").html("<a class='link-btn orange' href='javascript:void(0);' onclick='itemadd()'><span>出售商品</span></a><br></br>"+nickName+",欢迎来到富聿通 <a href='javascript:logout();' style='color:red;'>退出</a>");
			}else{
				return;
			}	
		}
	});
});

//退出登入js
function logout(){
	let check_user=$.cookie("COOKIE_TOKEN");
	$.ajax({
		url:site_url_sso+"user/out/"+check_user,
		dataType:'json',
		type:'get',
		success:function (data) {	

		}
	});
	let date=new Date();
	date.setTime(date.getTime()-10000);
	document.cookie="COOKIE_TOKEN=''; path=/; expires="+date.toGMTString();
	location.reload();
}
