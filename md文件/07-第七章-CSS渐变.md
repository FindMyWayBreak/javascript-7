## 第七章:CSS渐变

### 一.鼠标样式`(cursor)`

规定要鼠标进入元素内容区域要显示的光标的类型

> 1. 基本样式
> - default 箭头
> - pointer 小手
> - move 可移动
> - [ 参考资料](http://www.w3school.com.cn/cssref/pr_class_cursor.asp)
> 2. 自定义指针样式
> 通过引入自己设定的自指针样式
> ```css
> div{cursor:url(),pointer;}
> ```

### 二. 透明度`(opacity)`

> 设置元素的透明度
>
> 1. 取值范围 `0-1`
>    1.  0 是完全透明
>    2.  1 是完全不透明
> 2. IE滤镜 `filter:alpha(opacity=0-100)`
>    1. 0 是完全透明
>    2. 100是完全不透明

### 三.渐变`(gradient)`

1. 用在所有接受图像的属性上
> linear-gradient： (线性渐变） 创建遮罩图像。 
> radial-gradient： (径向渐变) 创建遮罩图像。 
> repeating-linear-gradient： 重复的(线性渐变) 创建遮罩图像。 
> repeating-radial-gradient： 重复的(径向渐变) 创建遮罩图像。

### 四. 线性渐变  
`linear-gradient`(角度,点,点,点)

>     1) 第一个参数:`起点` `到`什么方向开始渐变
>
>     * to left / to right / to top / to bottom
>
>     * to top left / to top right / to bottom right / to bottom left 
>       角度:deg`(0deg = to top) 顺时针旋转`
>
> 2) 第二个参数`颜色 位置`  
>       什么颜色在那个位置开始发生渐变效果
>     ```css
>     background-image:linear-gradient(to top,red 10%,#00f 100%);
>     ```
>     2. 线性渐变加兼容前缀
>     1) 第一个参数:`起点` `从`什么方向开始
>     ① left / right / top / bottom
>     ② top left / top right / bottom right bottom left
>     ③ 角度:deg`(0deg = left) 逆时针旋转`
>     ```css
>     background-image:-webkit-linear-gradient(left,red 0%,#00f 100%);
>     ```
>     3. 径向渐变`radial-gradient`
>     1) 第一个参数:`形状`
>     ① circle `圆` / ellipse `椭圆`
>     2)第二个参数:`半径`
>     ①圆只有一个半径,椭圆有两个
>     ②closest-slid `圆心到最近的边` / farthest-slid `圆心到最远的边`
>     ③closest-corner `圆心到最近的角` / farthest-corner `圆心到最远的角`
>     ④像素值,百分数
>     3) 第三个参数:`圆心的位置`
>     ①关键词 `left` / `right` / `center` / `top` / `bottom`
>     ②第四个参数:`颜色 位置`
>     ```css
>     background-image:radial-gradient(ellipse 100% 100% at center, #f00 10%,#ff0 20%,#080 100%);
>     ```
>     4. 渐变平铺`repeating-`渐变属性