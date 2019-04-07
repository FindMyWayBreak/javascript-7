function login()
{  
  var pwd=document.getElementById('password').value;
  var user=document.getElementById('username').value;
  if(user=="" && pwd=="")
  { 
    alert("登录成功"); 
	window.location.href="bookstore.html";
  }
	else
	{ 
    alert("用户名或密码错误");
	}
}