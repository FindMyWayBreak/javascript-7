##第二章:常用css和css规范
---
###一.css选择器
> - **ID选择器**
唯一性,ID可以多次出现,但是相同ID名称只能出现一次
> ```css
> <head>
>  <style>
>   #text1{
>      color:blue;/*字体颜色*/
>   }
>   #text2{
>      color:red;
>  }
>  </style>
> </head>
> <body>
>  <p id='text1'>学习是自己的事情,靠别人是不行的</p>
>  <p id='text2'>学习是自己的事情,靠别人是不行的</p>
></body>
> ```
> - **class类名选择器**
不具有唯一性,同一个类名可以多次出现
> ```css
> <head>
>  <style>
>   .text{
>      color:blue;/*字体颜色*/
>   }
>  </style>
> </head>
> <body>
>  <p class='text'>不懂的,先问问自己到底能不能解决</p>
>  <p class='text'>自己是否真的用力去解决了</p>
></body>
> ```
> - **标签选择器**
> ```css
> <head>
>  <style>
>     p{
>      color:blue;/*字体颜色*/
>   }
>  </style>
> </head>
> <body>
>  <p>学习,学的更多是一种方法</p>
></body>
> ```
###二.样式表
> - **基本属性介绍**
> ```css
> <style>
>	div{
>      width:200px;/*宽度*/
>      height:200px;/*高度*/
>      background-color:skyblue;/*背景颜色*/
>      color:red;/*字体颜色*/
>	}
></style>
> ```
> - **内部样式**
> 把样式表写在`<style></style>`标签里面,再把`<style></style>`标签放在`<head></head>`标签里面
> ```html
> <head>
>  <style>
>	div{
>      width:200px;/*宽度*/
>      height:200px;/*高度*/
>      background-color:skyblue;/*背景颜色*/
>      color:red;/*字体颜色*/
>	}
>  </style>
></head>
> ```
> - **行内样式**
> 抒写在起始标签内部关键字是`style`
> ```html
> <div style='width:200px;height:200px;background-color:red;'></div>
> ```
###三.css命名规范 
使用类选择器,尽量避免使用ID选择器定义样式
ID在一个页面中的唯一性导致了如果以ID为选择器来写CSS,就无法重用.
> - **以字母开头**
> 1. 必须以字母开头命名选择器,这样可保证在所有浏览器下都能兼容;
> 2. 不允许单个字母的类选择器出现;
> 3. 允许命名带有广告等英文的单词,例如ad,adv,adver,advertising,已防止该模块被浏览器当成垃圾广告过滤掉.
> - **全小写,并使用 ` - ` 连字符**
> 1. 下划线 ` _ ` 禁止出现在class命名中,统一使用` - `连字符
> 2. 禁止驼峰式命名
> 3. 不要出现` - `数字连接
###四.组合选择器
> - 后代选择器
中间用空格隔开
>```html
><style>
>  #wrap .content p{
>     width:200px;
>     height:200px;
>     background-color:yellow;
>     color:red;
>  }
></style>
><div id='wrap'>
>  <div class='content'>
>    <p>我是最小的那一个</p>
>  </div>
></div>
>```
> - 子代选择器 `>`
> - 毗邻元素选择器 `+`
> - 兄弟元素选择器 `~`