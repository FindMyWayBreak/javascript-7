"use strict";

/*
* 运动框架 （需要babel进行语法兼容处理）
* param:
*       ele - object 必须 表示要进行运动的节点
*       attr - string 必须 表示要改变的css属性
*       target - number 必须 表示属性的终点值
*       step - number 选填 表示运动速度的正数，默认5
* return:
*       undefined
*/
// window.MOVE为函数自执行 得到的是返回值 返回值是一个函数 赋值给window.move 不用多次执行
window.Move = function () {
    window.requestAnimationFrame = window.requestAnimationFrame || function (f) {return setTimeout(f, 1000 / 60)};
    window.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;//代码执行一次

    return function (ele, attr, target) {
        var step = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5;//step默认值yongbabel来转es
		

        //console.log(  getComputedStyle(ele)   );//存储着这个节点所有样式的对象但其他浏览器没有currentstyle
        //console.log( ele.currentStyle );//ie8及其以下中使用 ie11也可以//获取的是字符串 要转为数字
		//ele。style只显示行内样式 不显示初始值

        /*var cssObj=null;
        if( window.getComputedStyle ){//window对象上的属性
            cssObj = getComputedStyle(ele);
        }else{
            cssObj = ele.currentStyle;
        }*/

        //获取存储着ele展示样式的对象
        var cssObj = ele.currentStyle || getComputedStyle(ele);
        //初始的值
        var sVal = parseFloat(cssObj[attr]);
        if( attr === "opacity" && isNaN(sVal) )sVal = 1;//没有设置初始值 并且它的值为nan
        //考虑初始值与目标值大小的问题
        var bool = sVal > target;
        if (sVal > target) {
            step = -Math.abs(step);
        } else if (sVal < target) {
            step = Math.abs(step);
        } else {
            return;
        }

        function f() {
            sVal += step; // sVal += -step

            //判断是否到达目标值
            var xBool = bool ? sVal <= target : sVal >= target;
            sVal = xBool ? target : sVal;//是的话给target 没到的话输入现在的sval

            if (attr === "opacity") {
                ele.style.opacity = sVal;
                ele.style.filter = "alpha(opacity="+sVal*100+")";
            } else if( attr === "zIndex" ){
                ele.style.zIndex = sVal;
            } else{
                ele.style[attr] = sVal + 'px';
            }

            xBool || requestAnimationFrame(f);
        }
        requestAnimationFrame(f);
    };
}();