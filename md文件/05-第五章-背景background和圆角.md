## 第五章:背景background
---
### 一.**背景**

> - 背景颜色`background-color`
> 1. 属性值:
> 1) 颜色单词
> 2) 十六进制
> 3) rgb `r:red` `g:green` `b:blue`取值范围都是0-255
> 4) rgba `a:apocity`取值范围0-1
> 5) HSL `H:Hue`色调 取值范围0-360 `S:Saturation`饱和度 取值范围0%-100% `L:Lightness`亮度 取值范围0%-100%
> 6) HSLA
> - 背景图片引入`background-image`
> ```css
> background-image:url();
> ```
> - 背景图片平铺 `background-repeat`
> 1. 属性值 
> 1) `no-repeat`不平铺
> 2) `repeat-x`水平方向平铺
> 3) `repeat-y`垂直方向平铺
> 4) `repeat`默认值
> - 背景图片位置 `background-position`
> 1. 属性值
> 1) 关键词 `top / right / bottom / right / center` 
> 2) 属性值是两个关键词,一个的话第二个就是默认center
> 3) 百分数
> 4) 像素值
> - 背景图片大小 `background-size`
> 1. 属性值
> 1) cover `图片缩放,直到整个背景图片占满背景框`
> 2) contain `图片缩放,直到背景图片有一边触碰到背景边框就停止缩放`
> 3) 像素值,有两个,如果写一个,第二个就默认auto
> 4) 百分数
> - 背景图片关联 `background-attachment`
> 1. 属性值
> 1) scroll `默认值,背景图片随着页面滚动而滚动`
> 2) fixed `背景图片不随着页面滚动而滚动`
> - 背景图片显示基点 `background-origin`
> 1. 属性值
> 1) content-box `背景图像相对于内容边框`
> 2) padding-box `背景图像相对于内边距`
> 3) border-box `背景图像相对于边框`
> - 背景图片裁剪区域 `background-clip`
> 1. 属性值
> 1) content-box `背景被裁剪到内容区域`
> 2) padding-box `背景被裁剪到内边距`
> 3) border-box `背景被裁剪到盒子边框`
> 4) text `相对于文本`

### 二.**圆角`(border-radius)`**

1.**单个角样式**

> 关键词:top left right bottom
> -  border-top-left-radius 
> - border-top-right-radius
> - border-bottom-left-radius
> - border-bottom-right-radius

2.**多个角样式**
> 1. 属性值个数
> 1) 四个值: `左上` `右上` `右下` `左下`
> 2) 三个值:`左上` `右上+左下` `右下`
> 3) 两个值:`左上+右下` `右上+左下`
> 4) 一个值: 所有角
> 2. 单位
> 1) 百分数
> 2) 像素
