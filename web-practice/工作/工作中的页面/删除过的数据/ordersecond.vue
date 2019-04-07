<template>
<div id="buyShop">
  <x-header :left-options="{preventGoBack: true}" class="xheader">申请退款</x-header>
  <div style="padding-bottom:0em;">
    <div   class="biankuang">
          <div style="width:49%;float:left;">
        <img class="img" :src="goods.goodsSmallImg"/>
         <div class="only">{{goods.goodsName}}</div>
         </div>
    </div>
    <div style="padding-bottom:3.5px;padding-top:7px;">
    <popup-picker style="background:white;font-size:12px;" title="货物状态" :data="list2" ，list2需要自己写一个数组，把list2中的数组绑定到组件上的的下拉列表中 @on-change="onChange" 触发选择未收货已收货各自分开的事件六，三事件 v-if="record==='2'" disabled v-model="goodStatutus" 这上面的值就是placeholder的值，实现双向绑定把placeholder上的值于list1绑定在一起  placeholder="请选择"></popup-picker> //用v-if来判断输入的record几
    就显示这一行
    <popup-picker style="background:white;font-size:12px;" title="货物状态" :data="list2" @on-change="onChange"  v-if="record==='1'" v-model="goodStatutus"  placeholder="请选择"></popup-picker>
    <popup-picker style="background:white;font-size:12px;" title="退款原因" :data="list1" @on-change="onChange"  v-if="record==='1'" v-model="refundReason" placeholder="请选择"></popup-picker>
    <popup-picker style="background:white;font-size:12px;" title="退款原因" :data="list3"   v-if="record==='2'" v-model="refundReason" placeholder="请选择"></popup-picker>
    <!-- <popup-picker style="background:white;font-size:12px;"  v-model="goodStatutus" title="货物状态" :data="list2"></popup-picker>
    <popup-picker style="background:white;font-size:12px;" v-model="refundReason" title="退款原因" :data="list1"></popup-picker> -->
    </div >
     <div style="padding-bottom:7px;padding-top:3.5px;"><x-input  text-align="center" title="退款金额" placeholder="请输入金额" disabled 禁用属性 v-model="order.payPrice" 直接实现传参的数据order.payPrice绑定 style="font-size:12px;" class="biankuang"></x-input></div>
      <div style="padding:5px;"  class="biankuang" >
          <div style="font-size:12px;margin-left:5px;" >退款说明:</div>
    </div>
    <div class="frame" >
        <x-input v-model="buyRefundRemark" class="text" title="请输入文本" ></x-input>
    </div>
     <div>
    <button @click="Applyrefund" class="btn">提交</button>
    </div>
  </div>
    <lodingweixin ref="weixin" @wxConfig='toConfig'></lodingweixin>
 </div>
</template>
<script>
  import { Swiper, Grid, GridItem, PopupPicker, XHeader, Cell, Group, XButton, XNumber, XSwitch, Divider, XInput, Panel, Radio, Card, Tab, TabItem, LoadMore } from 'vux'
  import lodingweixin from '../../components/base/LodingWeiXin'
  import constant from '../../js/constant.js'
  import wx from 'weixin-js-sdk'
  export default {
    components: {
      // Icon,
      Swiper,
      Grid,
      PopupPicker,
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
        memberId: '',
        refundType: '',
        refundReason: ['退运费'], // 声明
        buyRefundRemark: '',
        goodStatutus: ['已收货'],
        goodsId: '',
        ggId: '',
        goods: {},
        order: '',
        record: '',
        list1: [['退运费', '商品参数不符', '质量问题', '少件/漏发', '收到商品损坏', '假冒品牌', '不想要了', '快递一直未到', '空包裹']],
        list2: [['已收货', '未收货']],
        list3: [['退运费', '商品参数不符', '质量问题', '少件/漏发', '收到商品损坏', '假冒品牌']]
      }
    },
    methods: {
      onChange (val) {
        if (val[0] === '已收货') {
          this.list1 = [['退运费', '商品参数不符', '质量问题', '少件/漏发', '收到商品损坏', '假冒品牌']]
        } else {
          this.list1 = [['不想要了', '快递一直未到', '空包裹']]
        }
      }, // if else 语句实例，实现功能已收货只显示六个，未收货只显示三个。通过v-on实现触发这个onChange（）
      Applyrefund () {
        var that = this
        var refundnum = ''
        if (this.refundReason[0][0] === '退运费') {
          refundnum = 0
        } else if (this.refundReason[0][1] === '商品参数不符') {
          refundnum = 1
        } else if (this.refundReason[0][2] === '质量问题') {
          refundnum = 2
        } else if (this.refundReason[0][3] === '少件/漏发') {
          refundnum = 3
        } else if (this.refundReason[0][4] === '收到商品损坏') {
          refundnum = 4
        } else if (this.refundReason[0][5] === '假冒品牌') {
          refundnum = 5
        } else if (this.refundReason[0][6] === '不想要了') {
          refundnum = 6
        } else if (this.refundReason[0][7] === '快递一直未到') {
          refundnum = 7
        } else if (this.refundReason[0][8] === '空包裹') {
          refundnum = 8
        }
        var refnum = ''
        if (this.refundType[0][0] === '仅退款') {
          refnum = 0
        } else if (this.refundType[0][1] === '退货退款') {
          refnum = 1
        }
        var state = ''
        if (this.goodStatutus[0][0] === '已收货') {
          refnum = 0
        } else if (this.goodStatutus[0][1] === '未收货') {
          refnum = 1
        } // 传递给后台的参数改变从文字’已收货‘变成0，以及if else语句的使用
        var param = {
          token: this.token,
          refundType: refnum,
          refundReason: refundnum,
          buyRefundRemark: this.buyRefundRemark,
          goodStatutus: state,
          goodsId: this.goods.goodsId, // 从现文档底下mounted，被orderthird传递，现文档接收的goods参数
          ggId: this.goods.ggId, // 从现文档底下mounted，被orderthird传递，现文档接收的goods参数
          payPrice: this.order.payPrice, // 从现文档底下mounted，被orderthird传递，现文档接收的order参数
          orderNo: this.order.orderNo, // 从现文档底下mounted，被orderthird传递，现文档接收的order参数
          memberId: this.order.memberId // 从现文档底下mounted，被orderthird传递，现文档接收的order参数
        }
        this.$http.post('/mlm/shop/order/applyRefund.htm', param).then(response => { // 传递的后台地址
          var resBody = response.body
          if (resBody.isSuccess === 0) {
            that.$vux.alert.show({
              title: '操作提示',
              content: '申请退款成功'
            })
          } else {
            that.$vux.alert.show({
              title: '操作提示',
              content: resBody.errorMsg
            })
          }
        })
      },
      toConfig (configParams) { // 点击触发的事件调用
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
        this.goods = JSON.parse(this.$route.query.goods) // 从third中接受goods参数
        // console.log(this.goods)
        this.order = JSON.parse(this.$route.query.order) // 从third中接受order参数
        // console.log(this.order)
        this.record = this.$route.query.record // 从third中接受order参数，是为了判断record的数字record=1，record=2.
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
