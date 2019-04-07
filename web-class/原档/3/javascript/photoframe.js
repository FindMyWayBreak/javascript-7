// JavaScript Document
function allowDrop(ev){
		//解禁当前元素为可放置被拖拽元素的区域
		ev.preventDefault();
		
	}
function Drop(ev){
		ev.preventDefault();
	    var output=document.getElementById("output");//获得图片展示区域
	    output.innerHTML="";//清空图片展示区域
	    var files = ev.dataTransfer.files
        //使用for循环遍历所有文件
        for (var i = 0; i<files.length; i++) {
			var f=files[i];
			var imgURL = window.webkitURL.createObjectURL(f);//获取当前图片文件的URL来源
			var img=document.createElement("img");//创建图片对象
			//设置图片对象img的src属性为当前图片文件的URL地址
            img.setAttribute("src", imgURL);
            img.setAttribute("width", "330");
            img.setAttribute("height", "270");
			
			var xiangkuang=document.createElement("div");//创建相框对象
			xiangkuang.setAttribute("class","photoframe");
			xiangkuang.appendChild(img);//添加图片到相框
			
			output.appendChild(xiangkuang);//在区域显示效果
			
			var img2 = document.createElement("img");
					//设置图片对象img2的class="block"
					img2.setAttribute("class", "block");
					//将图片2也添加到相框元素中
                    xiangkuang.appendChild(img2);
					
					//添加相框和相片效果
					output.appendChild(xiangkuang);

			
			//添加图片说明信息。，
			var status = document.createElement("div");
			var lastModified = f.lastModifiedDate;
			var lastModifiedStr=lastModified.toLocaleDateString();
			var tet = '文件名称： ' + f.name +'<br/>文件类型： ' + f.type +'<br/>文件大小: '+ f.size +' 字节<br/>修改时间： ' +lastModifiedStr + '<br/><br/>';
			
			status.innerHTML = tet;
			output.appendChild(status);
	
			
		}
	}
