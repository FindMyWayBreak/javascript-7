<template>
<div id="buyShop">
  <x-header :left-options="{preventGoBack: true}" class="xheader">退款方式</x-header>
  <div style="padding-bottom:0em;">
    <div   class="biankuang">
          <div style="width:49%;float:left;">
        <img class="img" :src="goods.goodsSmallImg"/>
         <div class="only">{{goods.goodsName}}</div>
         </div>
    </div>
     <cell @click.native="pageProp('1')" style="font-size:14px;line-height:60px;background:white;padding:0px">
       <i class="iconfont icon" slot="icon">
         <div style="margin-top:10px;margin-left:20px;float:left;">
          <img style="width:15px;height:15px;line-height:20px;float:left;margin-top:-3px" src="../../../static/images/tubiao/评价.png"/>
         <div style="margin-left:-60px;">
             <div style="width:50px;color:black;margin-top:-27px;margin-left:83px">仅退款</div>
          <div style="width:200px;height:45px;color:black;margin-top:-30px;margin-left:83px;color:#b2b2b2;">未收到货（含未签收）</div>
         </div>
          <div><img style="width:20px;height:20px;float:right;line-height:20px;margin-top:-35px;margin-left:360px" src="../../../static/images/more-gray.png"/></div>
         </div>
        </i>
      </cell>
     <cell @click.native="pageProp('2')" style="font-size:14px;line-height:60px;background:white;padding:0px">
       <i class="iconfont icon" slot="icon">
         <div style="margin-top:10px;margin-left:20px;float:left;">
          <img style="width:15px;height:15px;line-height:20px;float:left;margin-top:-3px" src="../../../static/images/tubiao/评价.png"/>
         <div style="margin-left:-60px;">
             <div style="width:100px;color:black;margin-top:-27px;margin-left:83px">退货退款</div>
          <div style="width:300px;height:45px;color:black;margin-top:-30px;margin-left:83px;color:#b2b2b2;">已收货，需要退换已收到的货物</div>
         </div>
          <div><img style="width:20px;height:20px;float:right;line-height:20px;margin-top:-35px;margin-left:360px" src="../../../static/images/more-gray.png"/></div>
         </div>
        </i>
      </cell>
  </div>
    <lodingweixin ref="weixin" ></lodingweixin>
 </div>
</template>
<script>
  import { Swiper, Grid, GridItem, XHeader, Cell, Group, XButton, XNumber, XSwitch, Divider, XInput, Panel, Radio, Card, Tab, TabItem, LoadMore } from 'vux'
  import lodingweixin from '../../components/base/LodingWeiXin'
  import constant from '../../js/constant.js'
  import wx from 'weixin-js-sdk'
  export default {
    components: {
      // Icon,
      Swiper,
      Grid,
      GridItem,
      lodingweixin,
      constant,
      XHeader,
      Cell,
      Group,
      XButton,
      XNumber,
      XSwitch,
      Divider,
      XInput,
      Panel,
      Radio,
      Card,
      Tab,
      TabItem,
      LoadMore
      // bars
    },
    data () {
      return {
        orderNo: '',
        token: '',
        user: {},
        goods: '',
        order: ''
      }
    },
    methods: {
      pageProp (i) {
        this.$router.push({path: '/ordersecond', query: {record: i, order: JSON.stringify(this.order), goods: JSON.stringify(this.goods)}})
      }, // 点击后进入 ordersecond，向它传递order，goods参数
      toConfig (configParams) {
        wx.config(configParams)
        this.config = configParams
        wx.ready(function () {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        })
        wx.error(function (res) {
          alert(JSON.stringify(res))
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        })
        // console.log(configParams)
        // console.log('111:' + JSON.stringify(configParams))
      }
    },
    mounted () {
      var user = sessionStorage.getItem('user')
      this.shopId = this.$route.query.shopId
      if (user) {
        user = JSON.parse(user)
        this.token = user.token
        this.user = user.account
        this.goods = JSON.parse(this.$route.query.goods)
        this.order = JSON.parse(this.$route.query.order)
        // console.log(this.goods)
        // console.log(this.order)
        // SDK
        this.$refs.weixin.getAccessToken()
        // this.init()
      } else {
        this.$refs.weixin.weiXinLogin()
      }
    },
    beforeRouteEnter (to, from, next) {
      var u = navigator.userAgent
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      // XXX: 修复iOS版微信HTML5 History兼容性问题
      if (isiOS && to.path !== location.pathname) {
        // 此处不可使用location.replace
        location.assign(to.fullPath)
      } else {
        next()
      }
    }
  }
</script>


<style scoped>
.biankuang {
  margin-bottom: 2px;
  overflow: hidden;
  background: #fff;
  padding: 10px;
  font-size:17px;
}
.btn {
    width:100%;
    background-color:green;
    color:white;
    border-radius:5px;
    padding:10px 15px;
    font-size:10px;
    margin-top:300px;
}
.img {
  width:80px;
  height:60px;
  line-height:15px;
  float:left;
}
.frame {
  margin-bottom:2px;
  height:120px;
  overflow: hidden;
  color:grey;
  background: #fff;
  padding: 10px;
}
.only {
  float:left;
  margin-top:15px;
  font-size:12px;
}
.text {
  float:left;
  padding:0px;
  font-size:12px;
}
</style>
