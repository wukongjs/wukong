// JavaScript Document
//获取class	
function getByClass(oParent,sClass){
var aEle=document.getElementsByTagName('*');
var aResult=[];
var i=0;
for(i=0;i<aEle.length;i++){
	if(aEle[i].className==sClass){
		aResult.push(aEle[i])
		}
	}
return aResult;	
}

//添加事件
function myAddEvent(obj,sEvent,fn){
if(obj.attachEvent){
	obj.attachEvent("on"+sEvent,fn);
	}
else{
	obj.addEventListener(sEvent,fn,false)
	}	
}
//获取样式
function getStyle(obj,attr){
if(obj.currentStyle){
	return obj.currentStyle[attr];
	}
else{
	return getComputedStyle(obj,false)[attr];
	}	
}
//运动		
function startMove(obj, json, fn)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var bStop=true;		//这一次运动就结束了——所有的值都到达了
		for(var attr in json)
		{
			//1.取当前的值
			var iCur=0;
			
			if(attr=='opacity')
			{
				iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
			}
			else
			{
				iCur=parseInt(getStyle(obj, attr));
			}
			
			//2.算速度
			var iSpeed=(json[attr]-iCur)/8;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			
			//3.检测停止
			if(iCur!=json[attr])
			{
				bStop=false;
			}
			
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}
			else
			{
				obj.style[attr]=iCur+iSpeed+'px';
			}
		}
		
		if(bStop)
		{
			clearInterval(obj.timer);
			
			if(fn)
			{
				fn();
			}
		}
	}, 30)
}	


//获取cookie

function setCookie(name, value, iDay)
{
	var oDate=new Date();
	
	oDate.setDate(oDate.getDate()+iDay);
	
	document.cookie=name+'='+value+';expires='+oDate;
}

function getCookie(name)
{
	//'username=abc; password=123456; aaa=123; bbb=4r4er'
	var arr=document.cookie.split('; ');
	var i=0;
	
	//arr->['username=abc', 'password=123456', ...]
	
	for(i=0;i<arr.length;i++)
	{
		//arr2->['username', 'abc']
		var arr2=arr[i].split('=');
		
		if(arr2[0]==name)
		{
			return arr2[1];
		}
	}
	
	return '';
}

function removeCookie(name)
{
	setCookie(name, '1', -1);
}


//获取ajax

function ajax(url, fnSucc, fnFaild)
{
	//1.创建ajax对象
	var oAjax=null;
	
	if(window.XMLHttpRequest)
	{
		oAjax=new XMLHttpRequest();
	}
	else
	{
		oAjax=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	//2.连接服务器
	//open(方法, url, 是否异步)
	oAjax.open('GET', url, true);
	
	//3.发送请求
	oAjax.send();
	
	//4.接收返回
	//OnReadyStateChange
	oAjax.onreadystatechange=function ()
	{
		if(oAjax.readyState==4)
		{
			if(oAjax.status==200)
			{
				//alert('成功：'+oAjax.responseText);
				fnSucc(oAjax.responseText);
			}
			else
			{
				if(fnFaild)
				{
					fnFaild();
				}
			}
		}
	}
}		
//  document.createElement 创建元素
//  appendChild 结尾添加元素从结尾插入
//  insertBefore(值,位置)  开始添加元素
//  childNodes子节点
//  parentNode 父节点
//  oEvent.cancelBubble=true;  阻止事件冒泡