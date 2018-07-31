
let parentId = 1;
let categoryCode = "0000";
let categoryLevel1 = getCatgoryList(parentId);
let categorySelectedName;
let categorySelectedId=$("#categoryCode");

function getCatgoryList(parentId){
    let thisDate
    $.ajax({
        url: site_url_item+"/productrest/category/list?parentId="+parentId,
        type: "POST",
        dataType: "json",
        async: false,
    }).done(function(res) {
        thisDate = res;    //需要返回thisDate
    })
    return thisDate;
}


for(let i=0;i<categoryLevel1.result.length;i++){
	$("#category1_text").append("<li onclick='categoryChanged(this)' data-id='"+categoryLevel1.result[i].id+"'>"+categoryLevel1.result[i].name+"</li>");
}

function categoryChanged(obj){
	let categoryLevel2;
	let categoryLeve1Id=obj.getAttribute("data-id");
	let category_ul=$(obj).parent();
	let length = categoryLeve1Id.length;
	
	$(obj).siblings().removeClass("catcheck");
	$(obj).addClass("catcheck");
	categoryCode="0000";
	for(let i = 0; i < 4-length; i++){
		categoryCode += 0
	}
	
	categoryCode += categoryLeve1Id;
	$(category_ul).nextAll().remove();
	categoryLevel2= getCatgoryList(categoryLeve1Id);
	$(category_ul).after("<ul id='category2_text'></ul>");
	
	for(let i=0;i<categoryLevel2.result.length;i++){
		$(category_ul).next().append("<li onclick='categorySelected(this)' data-id='"+categoryLevel2.result[i].id+"'>"+categoryLevel2.result[i].name+"</li>");
	}
}

function categorySelected(obj){
	let categoryCode2="";
	let length = obj.getAttribute("data-id").length;
	
	$(obj).siblings().removeClass("catcheck");
	$(obj).addClass("catcheck");
	for(let i = 0; i < 4-length; i++){
		categoryCode2 += 0
	}
	categoryCode2 += obj.getAttribute("data-id");
	$("#categoryCode").val(categoryCode+categoryCode2);
	categorySelectedName = $(obj).text();
}

$(function(){
	resaleChange();
})

function resaleChange(){
	let autoPrice=$("#autoPriceReduction_div select");
	let autoPrice_tite=$("#autoPriceReduction_div .autoPriceReduction_title");
	let selectNum=$("#autoResale").val();
	let i=0;
	for(i;i < selectNum;i++){
		$(autoPrice[i]).css("display","block");
		$(autoPrice_tite[i]).css("display","block");
	}
	for(i;i<autoPrice.length;i++){
		$(autoPrice[i]).css("display","none");
		$(autoPrice_tite[i]).css("display","none");
		$(autoPrice[i]).val(0);
	}
}

function additemnext(){
	let img=$("#div_imglook img");
	let img_src="";
	
	if($("#categoryCode").val()==""){
		alert("请选择分类");
		return;
	}
	if(img.length==0){
		alert("请选择图片");
		return;
	}
	if($("#name").val()==""){
		alert("请输入产品名");
		$("#name").focus();
		return;
	}
	if($("#basicPrice").val()==""||$("#basicPrice").val()==0){
		alert("请输入起拍价");
		$("#description").focus();
		return;
	}
	if($("#directPrice").val()==""||$("#directPrice").val()==0){
		alert("请输入一口价");
		$("#directPrice").focus();
		return;
	}
	if($("#inventory").val()==""){
		alert("请输入库存数量");
		$("#inventory").focus();
		return;
	}
	
	$("#itemadd").css("display","none");
	$("#itemshow").css('display','block'); 
	$("#category_text").html(categorySelectedName);
	
	for(i=0;i<img.length;i++){
		img_src+="<img src='"+img[i].src+"' style='margin-right:15px;height:150px;'/>";
	}
	
	$("#img_text").html(img_src);
	$("#name_text").html($("#name").val());
	$("#description_text").html($("#productDescription").val());
	$("#autoResale_text").html($("#autoResale").val()+"次");
	$("#autoPriceReduction_text1").html($("#autoPriceReduction1").val()+"%");
	$("#autoPriceReduction_text2").html($("#autoPriceReduction2").val()+"%");
	$("#autoPriceReduction_text3").html($("#autoPriceReduction3").val()+"%");
	$("#endDate_text").html($("#dayCount").val()+"天");
	$("#endTime_text").html($("#timeCount").val()+"点");
	if($("#freightBearer").val()==1){
		$("#freightBearer_text").html("卖家负担");
	}else{
		$("#freightBearer_text").html("买家负担");
	}
	$("#basicPrice_text").html($("#basicPrice").val()+"元");
	$("#directPrice_text").html($("#directPrice").val()+"元");
	$("#inventory_text").html($("#inventory").val()+"件");
	$("#points_text").html($("#pointsRate").find("option:selected").text());
}

function itemprev(){
	$("#itemadd").css("display","block");
	$("#itemshow").css("display","none"); 
}

//导入category
let IMG_LENGTH = 1;//图片最大1MB  
let IMG_MAXCOUNT = 5;//最多选中图片张数    
let UP_IMGCOUNT = 0;//上传图片张数记录  

//打开文件选择对话框  
$("#div_imgfile").click(function () {  
	if ($(".lookimg").length >= IMG_MAXCOUNT) {  
		alert("一次最多上传" + IMG_MAXCOUNT + "张图片");  
		return;  
	}  
  
	let _CRE_FILE = document.createElement("input");  
	if ($(".imgfile").length <= $(".lookimg").length) {//个数不足则新创建对象  
		_CRE_FILE.setAttribute("type", "file"); 
		_CRE_FILE.setAttribute("name", "files"); 
		_CRE_FILE.setAttribute("class", "imgfile");  
		_CRE_FILE.setAttribute("accept", ".png,.jpg,.jpeg");  
		_CRE_FILE.setAttribute("num", UP_IMGCOUNT);//记录此对象对应的编号  
		$("#div_imgfile").after(_CRE_FILE);  
	}  
	else { //否则获取最后未使用对象  
		_CRE_FILE = $(".imgfile").eq(0).get(0);  
	}  
	return $(_CRE_FILE).click();//打开对象选择框  
});  
  
//创建预览图，在动态创建的file元素onchange事件中处理  
$(document).on("change",".imgfile", function () {  
	if ($(this).val().length > 0) {//判断是否有选中图片  
  
		//判断图片格式是否正确  
		let FORMAT = $(this).val().substr($(this).val().length - 3, 3);  
		if (FORMAT != "png" && FORMAT != "jpg" && FORMAT != "peg") {  
			alert("文件格式不正确！！！");  
			return;  
		}  
  
		//判断图片是否过大，当前设置1MB  
		var file = this.files[0];//获取file文件对象  
		if (file.size > (IMG_LENGTH * 1024 * 1024)) {  
			alert("图片大小不能超过" + IMG_LENGTH + "MB");  
			$(this).val("");  
			return;  
		}  
		//创建预览外层  
		let _prevdiv = document.createElement("div");  
		_prevdiv.setAttribute("class", "lookimg");  
		//创建内层img对象  
		let preview = document.createElement("img");  
		$(_prevdiv).append(preview);  
		//创建删除按钮  
		let IMG_DELBTN = document.createElement("div");  
		IMG_DELBTN.setAttribute("class", "lookimg_delBtn");  
		IMG_DELBTN.innerHTML = "移除";  
		$(_prevdiv).append(IMG_DELBTN);  
		//创建进度条  
		let IMG_PROGRESS = document.createElement("div");  
		IMG_PROGRESS.setAttribute("class", "lookimg_progress");  
		$(IMG_PROGRESS).append(document.createElement("div"));  
		$(_prevdiv).append(IMG_PROGRESS);  
		//记录此对象对应编号  
		_prevdiv.setAttribute("num", $(this).attr("num"));  
		//对象注入界面  
		$("#div_imglook").children("div:last").before(_prevdiv);  
		UP_IMGCOUNT++;//编号增长防重复  
  
		//预览功能 start  
		let reader = new FileReader();//创建读取对象  
		reader.onloadend = function () {  
			preview.src = reader.result;//读取加载，将图片编码绑定到元素  
		}  
		if (file) {//如果对象正确  
			reader.readAsDataURL(file);//获取图片编码  
		} else {  
			preview.src = "";//返回空值  
		}  
		//预览功能 end  
	}  
});

//删除选中图片  
$(document).on("click",".lookimg_delBtn", function () {  
	$(".imgfile[num=" + $(this).parent().attr("num") + "]").remove();//移除图片file  
	$(this).parent().remove();//移除图片显示  
});  
  
//删除按钮移入移出效果  
$(document).on("mouseover",".lookimg", function () {  
	if ($(this).attr("ISUP") != "1")  
		$(this).children(".lookimg_delBtn").eq(0).css("display", "block");;  
});

$(document).on("mouseout",".lookimg", function () {  
	$(this).children(".lookimg_delBtn").eq(0).css("display", "none");;  
});  