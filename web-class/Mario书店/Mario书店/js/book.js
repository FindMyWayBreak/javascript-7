   /*购物车的拖拽*/
   var oData = {};
   var n=0;
   var enter="<br/><br/><br/><br/><br/><br/>";/*相当于回车键*/
  	var head="商品名称---------------------金额<br/>-----------------------------------<br/>";
  	var line="-----------------------------------<br/>";
  	var Tline="总计----------------------------¥";
  	var total=0;//要赋初值 否则没有用
function allowDrop(ev)
{
	ev.preventDefault();//阻止默认事件ondrop才会起作用
}
function dragStart(event) {
    event.dataTransfer.setData("name", event.target.id);
    event.dataTransfer.setData("money", event.target.name);
}
function drag(ev)
{
	ev.preventDefault();//阻止默认事件，防止图片在新窗口打开
	var idname=ev.dataTransfer.setData("name",ev.target.id);/*将拖拽的id设置为text类型*/
}

function drop(ev)//放鼠标
{
	ev.preventDefault();
	var name=ev.dataTransfer.getData("name");/*获取拖拽元素的Id*/
	var money=ev.dataTransfer.getData("money");/*获取拖拽元素的Id*/
	total+= parseFloat(money);//计算总金额
	//ev.target.appendChild(document.getElementById(data));
	//var img=document.getElementById(data);
	//var idname=ev.dataTransfer.setData("Text",ev.target.id);/*将拖拽的id设置为text类型*/
	oData[n++]=name+'----------¥'+money+'<br/>';
	 var str="";
	for(var i=0;i<n;i++)
	str+=oData[i];
	document.getElementById("buycar").innerHTML=enter+head+str+line+Tline+total;//在购物车的div里输出idname
	
}
/*倒计时*/
function leftTimer(year,month,day,hour,minute,second){
  var leftTime = (new Date(year,month-1,day,hour,minute,second)) - (new Date()); //计算剩余的毫秒数 
  var days = parseInt(leftTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数 
  var hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时 
  var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
  var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数 
  days = checkTime(days); 
  hours = checkTime(hours); 
  minutes = checkTime(minutes); 
  seconds = checkTime(seconds); 
  setInterval("leftTimer(2018,7,1,11,11,11)",1000); 
  document.getElementById("time").innerHTML ="倒计时:"+days+"天" + hours+"小时" + minutes+"分"+seconds+"秒";  
} 
function checkTime(i){ //将0-9的数字前面加上0，例1变为01 
  if(i<10) 
  { 
    i = "0" + i; 
  } 
  return i; 
} 

