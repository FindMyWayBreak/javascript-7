<template>
<div id="buyShop">
  <x-header :left-options="{preventGoBack: true}" class="xheader">申请退款</x-header>
  <div style="padding-bottom:0em;">
    <div   class="biankuang">
          <div style="width:49%;float:left;">
        <img class="img" :src="purl + goods.goodsSmallImg"/>
         <div class="only">{{goods.goodsName}}</div>
         </div>
    </div>
    <div style="padding-bottom:3.5px;padding-top:7px;">
    <popup-picker style="background:white;font-size:12px;" title="货物状态" :data="list2" @on-change="onChange"  v-if="record==='2'" disabled v-model="goodStatutus"  placeholder="请选择"></popup-picker>
    <popup-picker style="background:white;font-size:12px;" title="货物状态" :data="list2" @on-change="onChange"  v-if="record==='1'" v-model="goodStatutus"  placeholder="请选择"></popup-picker>
    <popup-picker style="background:white;font-size:12px;" title="退款原因" :data="list1" @on-change="onChange"  v-if="record==='1'" v-model="refundReason" placeholder="请选择"></popup-picker>
    <popup-picker style="background:white;font-size:12px;" title="退款原因" :data="list3"   v-if="record==='2'" v-model="refundReason" placeholder="请选择"></popup-picker>
    <!-- <popup-picker style="background:white;font-size:12px;"  v-model="goodStatutus" title="货物状态" :data="list2"></popup-picker>
    <popup-picker style="background:white;font-size:12px;" v-model="refundReason" title="退款原因" :data="list1"></popup-picker> -->
    </div >
     <div style="padding-bottom:7px;padding-top:3.5px;"><x-input  text-align="right" title="退款金额" placeholder="" disabled v-model="price" style="font-size:12px;" class="biankuang"></x-input></div>
      <div style="padding:5px;"  class="biankuang" >
          <div style="font-size:12px;margin-left:5px;" >退款说明:</div>
    </div>
    <div class="frame" >
      <x-textarea :max="50" v-model="buyRefundRemark" placeholder=""></x-textarea>
      <!-- <x-input v-model="buyRefundRemark" class="text" aria-placeholder="退款原因" ></x-input> -->
    </div>
     <div>    
    <x-button @click.native="Applyrefund" type="primary" style="margin-top:25px;width:95%;background-color: orange;">提交</x-button>
    </div>
  </div>
    <lodingweixin ref="weixin" @wxConfig='toConfig'></lodingweixin>
 </div>
</template>
<script>
  import { Swiper, Grid, GridItem, XTextarea, PopupPicker, XHeader, Cell, Group, XButton, XNumber, XSwitch, Divider, XInput, Panel, Radio, Card, Tab, TabItem, LoadMore } from 'vux'
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
      XTextarea,
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
        refundReason: ['退运费'],
        buyRefundRemark: '',
        goodStatutus: ['已收货'],
        goodsId: '',
        ggId: '',
        goods: {},
        price: '',
        order: '',
        record: '',
        purl: constant.staticDomain,   // 图片前缀地址
        list1: [['退运费', '商品参数不符', '质量问题', '少件/漏发', '收到商品损坏', '假冒品牌', '不想要了', '快递一直未到', '空包裹']],
        list2: [['已收货', '未收货']],
        list3: [['退运费', '商品参数不符', '质量问题', '少件/漏发', '收到商品损坏', '假冒品牌']]
      }
    },
    methods: {
      goodImgUrlProp (url) {
        return constant.staticDomain + url
      },
      onChange (val) {
        if (val[0] === '已收货') {
          this.list1 = [['退运费', '商品参数不符', '质量问题', '少件/漏发', '收到商品损坏', '假冒品牌']]
        } else {
          this.list1 = [['不想要了', '快递一直未到', '空包裹']]
        }
      },
      Applyrefund () {
        var that = this
        var refundnum = ''
        if (this.refundReason[0] === '退运费') {
          refundnum = '0'
        } else if (this.refundReason[0] === '商品参数不符') {
          refundnum = '1'
        } else if (this.refundReason[0] === '质量问题') {
          refundnum = '2'
        } else if (this.refundReason[0] === '少件/漏发') {
          refundnum = '3'
        } else if (this.refundReason[0] === '收到商品损坏') {
          refundnum = '4'
        } else if (this.refundReason[0] === '假冒品牌') {
          refundnum = '5'
        } else if (this.refundReason[0] === '不想要了') {
          refundnum = '6'
        } else if (this.refundReason[0] === '快递一直未到') {
          refundnum = '7'
        } else if (this.refundReason[0] === '空包裹') {
          refundnum = '8'
        }
        var refnum = ''
        if (this.record === '1') {
          refnum = '0'
        } else if (this.record === '2') {
          refnum = '1'
        }
        var state = ''
        if (this.goodStatutus[0] === '已收货') {
          state = '0'
        } else if (this.goodStatutus[0] === '未收货') {
          state = '1'
        }
        var param = {
          token: this.token,
          refundType: refnum,
          refundReason: refundnum,
          buyRefundRemark: this.buyRefundRemark,
          goodStatus: state,
          goodsId: this.goods.goodsId,
          ggId: this.goods.ggId,
          payPrice: this.order.payPrice,
          orderNo: this.order.orderNo,
          memberId: this.order.memberId
        }
        this.$http.post('/mlm/shop/order/applyRefund.htm', param).then(response => {
          var resBody = response.body
          if (resBody.isSuccess === 0) {
            that.$vux.alert.show({
              title: '操作提示',
              content: '申请退款成功'
            })
            this.$router.push({ path: '/shopOrderDetail/' + this.order.id })
          } else {
            that.$vux.alert.show({
              title: '操作提示',
              content: resBody.errorMsg
            })
          }
        })
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
      //需要传递的的参数
      var user = sessionStorage.getItem('user')
      this.shopId = this.$route.query.shopId
      if (user) {
        user = JSON.parse(user)
        this.token = user.token
        this.user = user.account
        this.goods = JSON.parse(this.$route.query.goods)
        this.price = parseInt(this.goods.count) * parseFloat(this.goods.price)
        this.order = JSON.parse(this.$route.query.order)
        // console.log(this.order)
        this.record = this.$route.query.record
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
  margin-bottom: 1px;
  overflow: hidden;
  background: #fff;
  padding: 10px;
  font-size:17px;
}
.btn {
    width:98%;
    background-color:orange;
    color:white;
    border-radius:5px;
    padding:10px 15px;
    font-size:10px;
    margin-top:40px;
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
