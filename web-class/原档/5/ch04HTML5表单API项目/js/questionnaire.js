function checkBox(name){
	//用于统计被勾选的选项数量
	var j=0;
	//获取指定name名称的同组所有复选框元素
	var checkbox = document.getElementsByName(name);
	//遍历选项组中的所有选项
	for(var i=0; i<checkbox.length;i++){
		//判当前断是否有选中的选项
		if(checkbox[i].checked){
			j++;
			//如果有选项为选中状态直接跳出遍历循环
			break;
		}	   
	}	
	if(j==0)return false;
	return true;
}

function check(){
	//调用checkBox(name)函数判断第4题的情况
	var q4 = checkBox("q4");		
	if(q4==false){
		alert("第4题起码要选择一个选项。");
		return false;
	}	
	//调用checkBox(name)函数判断第5题的情况	
	var q5 = checkBox("q5");	
	if(q5==false){
		alert("第5题起码要选择一个选项。");
		return false;
	}		
	return true;
}