<template>
<div id="buyShop">
  <div style="padding-bottom:0em;">
   <div style="background:white;padding:10px 8px;font-size:15px;">
      <img style="margin-top: 2px;margin-left: 13px;" src="../../../static/images/3333.png"/>
      <span class="orderstate">订单状态：<span style="color:red;font-weight:bold">{{state(order.orderState)}}</span></span><br>
      <span style="padding-left:12px;">{{createTimeStr(time)}}</span>
    </div>
         <div style="padding-bottom:5px;padding-top:7px;">
     <x-input  text-align="right" title="退款总金额" placeholder="￥3" v-model="price" disabled  style="font-size:16px;" class="biankuang1"></x-input></div>
     <x-input class="message" title="退款信息" disabled ></x-input>
      <div   class="biankuang2">
          <div style="width:49%;float:left;">
        <img class="img" :src="purl + goods.goodsSmallImg"/>
         <div class="only">{{goods.goodsName}}</div>
         </div>
    </div>
      <div class="lastframe">
<div style="width:300px;clear:both">
    <span style="float:left;">退款原因：</span>
    <span style="float:left;" >{{Arefund(refund)}}</span>
</div><br>
<div style="width:300px">
    <span style="float:left;">退款金额：</span>
    <span style="float:left;" >{{price}}</span>
</div><br>
<div style="width:300px">
    <span style="float:left;">申请件数：</span>
    <span style="float:left;" >{{goods.count}}</span>
</div><br>
<div style="width:300px">
    <span style="float:left;">申请时间：</span>
    <span style="float:left;" >{{createTimeStr(time)}}</span>
</div><br>
<div style="width:300px">
    <span style="float:left;">退款编号：</span>
    <span style="float:left;" >{{No}}</span>
</div>
      </div>
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
        order: '',
        purl: constant.staticDomain,
        price: '',
        memberId: '',
        id: '',
        refund: '',
        refundReason: '',
        time: '',
        createTime: '',
        No: ''
      }
    },
    methods: {
      Applyrefund () {
        var that = this
        var param = {
          token: this.token,
          id: this.goods.refundId,
          memberId: this.order.memberId
        //   createTime: this.order.createTime,
        //   refundReason: this.refundReason
        // }
        }
        this.$http.post('/mlm/shop/order/getRefundResult.htm', param).then(response => {
          var resBody = response.body
          if (resBody.isSuccess === 0) {
            console.log(resBody)
            this.refund = resBody.result.refundReason
            this.time = resBody.result.createTime
            this.No = resBody.result.orderNo
          } else {
            that.$vux.alert.show({
              title: '操作提示',
              content: resBody.errorMsg
            })
          }
        })
      },
            // 订单状态
      state (orderState) {
        if (orderState === 0) {
          return '待付款'
        } else if (orderState === 1) {
          return '待发货'
        } else if (orderState === 2) {
          return '待收货'
        } else if (orderState === 3) {
          return '已完成'
        } else if (orderState === 4) {
          return '已关闭'
        } else if (orderState === 5) {
          return '待退款'
        } else if (orderState === 6) {
          return '已退款'
        } else if (orderState === 7) {
          return '退款失败'
        } else if (orderState === 8) {
          return '确认失败'
        } else if (orderState === 9) {
          return '退款中'
        } else if (orderState === 10) {
          return '待出单'
        } else if (orderState === 11) {
          return '待使用'
        } else if (orderState === 12) {
          return '退款审核失败'
        } else if (orderState === 13) {
          return '部分退款审核成功'
        } else if (orderState === 14) {
          return '支付待审核'
        } else if (orderState === 15) {
          return '待使用'
        } else if (orderState === 16) {
          return '待评价'
        } else if (orderState === 17) {
          return '已完成待评价'
        } else if (orderState === 18) {
          return '申请退款'
        } else {
          return ''
        }
      },
      // 时间格式化 传递过来的是像电话号码类别的数字所以要格式化
      createTimeStr (operationtime) {
        if (operationtime) {
          var d = new Date(operationtime)
          var year = d.getFullYear()
          var month = ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1))
          var date = (d.getDate() < 10 ? '0' + d.getDate() : d.getDate())
          var hour = (d.getHours() < 10 ? '0' + d.getHours() : d.getHours())
          var minute = (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes())
          var second = (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds())
          return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
        } else {
          return ''
        }
      },
      // 退款原因
      Arefund (refund) {
        if (refund === 0) {
          return '退运费'
        } else if (refund === 1) {
          return '商品参数不符'
        } else if (refund === 2) {
          return '质量问题'
        } else if (refund === 3) {
          return '少件/漏发'
        } else if (refund === 4) {
          return '收到商品损坏'
        } else if (refund === 5) {
          return '假冒品牌'
        } else if (refund === 6) {
          return '不想要了'
        } else if (refund === 7) {
          return '快递一直未到'
        } else if (refund === 8) {
          return '空包裹'
        }
      },
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
        this.price = parseInt(this.goods.count) * parseInt(this.goods.price)
        console.log(this.goods)
        console.log(this.order)
        this.Applyrefund()
        // SDK
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
  overflow: hidden;
  background: #fff;
  padding: 20px;
  font-size:17px;
  background-color: lightgreen;
  color:white;
}
.biankuang1 {
  overflow: hidden;
  padding: 16px;
  font-size:17px;
  background-color: white;
  color:black;
}
.biankuang2 {
  margin-bottom: 2px;
  overflow: hidden;
  padding: 20px;
  font-size:17px;
  color:white;
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
.lastframe {
  height:160px;
  background-color:white;
  color:grey;
  padding-top:20px;
  padding-left:20px;
}
.only {
  float:left;
  margin-top:15px;
  margin-left:3px;
  font-size:12px;
  color: black;
}
.text {
  float:left;
  padding:0px;
  font-size:12px;
}
.orderstate {
  float:right;
  margin-top: 5px;
  margin-right:35%;
  width: 55%;
  font-size:14px;
}
.message {
 background:white;
 padding-bottom:10px;
 padding-top:10px;
 margin-top:3px
}
</style>
