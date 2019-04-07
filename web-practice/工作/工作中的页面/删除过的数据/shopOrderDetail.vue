<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" class="xheader">商城订单详情</x-header>
    <!-- 订单信息 -->
    <div style="background:white;padding:5px 8px;font-size:15px;">
      <img style="margin-top: 2px;margin-left: 13px;" src="../../../static/images/3333.png"/>
      <span style="float:right;margin-top: 5px;margin-right:35%;width: 55%;font-size:14px;">订单状态：<span style="color:red;font-weight:bold">{{state(order.orderState)}}</span></span>
    </div>
    <div style="width: 100%;overflow-y: scroll;">
      <!-- 普通商品显示 -->
      <div>
        <!-- 收件人信息 -->
        <div style="background:white;margin-top:10px;border-bottom:1px #f3f3f3 solid;font-size:14px;padding-top:5px" v-if="order.sendType === 'tc' || order.sendType === 'express'">
          <span style="color:#A9A9A9;margin-left:10px;font-weight:bold;color:#666;">配送信息</span>
          <div style="background:white;padding:2px 15px 10px 15px;font-size:12px;border-top:1px solid rgba(183, 173, 173, 0.72);">
            <span style="display:block;line-height:30px;color:#666;">配送方式：<span style="color: black;" v-if="order.sendType === 'tc'">同城配送</span><span style="color: black;" v-if="order.sendType === 'express'">快递发货</span></span>
            <span style="display:block;line-height:30px;color:#666;">客户姓名：<span style="color: black;">{{order.addressee}}</span></span>
            <span style="display:block;line-height:30px;color:#666;">手机号码：<span style="color: black;">{{order.addresseePhone}}</span></span>
            <span style="display:block;line-height:30px;color:#666;">配送地址：<span style="color: black;">{{order.address}}</span></span>
            <span style="display:block;line-height:30px;color:#666;">快递单号：<span style="color: black;">{{order.expressOrderNo}}</span></span>
            <span style="display:block;line-height:30px;color:#666;">快递公司：<span style="color: black;">{{order.expressName}}</span></span>

          </div>
        </div>
        <div style="background:white;line-height:30px;margin-top:10px;border-bottom:1px #f3f3f3 solid;font-size:14px;padding-top:5px" v-if="order.sendType === 'md'">
          <span style="color:#A9A9A9;margin-left:10px;font-weight:bold;color:#666;">预约信息</span>        
          <div style="background:white;padding:2px 15px 10px 15px;font-size:12px;border-top:1px solid rgba(183, 173, 173, 0.72);">
            <span style="display:block;line-height:30px;color:#666;">客户姓名：<span style="color: black;">{{order.addressee}}</span></span>
            <span style="display:block;line-height:30px;color:#666;">手机号码：<span style="color: black;">{{order.addresseePhone}}</span></span>
            <span style="display:block;line-height:30px;color:#666;">到店时间：<span style="color: black;">{{order.pickTime}}</span></span>
            <span style="display:block;line-height:30px;color:#666;">店铺名称：<span style="color: black;">{{shopName}}</span></span>
          </div>
        </div>
      </div>
      <!-- 详情展示 -->

      <div style="background:white;padding:10px 15px;margin-top:10px;font-size:12px;">
        <div style="float:left;">
          <span style="display:block;color:#666;line-height:30px;">订单编号：<span style="color: black;">{{order.orderNo}}</span></span>
          <span style="display:block;color:#666;line-height:30px;">预订时间：<span style="color: black;">{{createTimeStr(order.createTime)}}</span></span>
          <span style="display:block;color:#666;line-height:30px;">支付时间：<span style="color: black;">{{createTimeStr(order.payTime)}}</span></span>
          <span style="display:block;color:#666;line-height:30px;">留言：<span style="color: black;">{{order.message}}</span></span>
        </div>
        <div style="float:right;">
          <div id="qrcode" ref="qrcode"></div>
        </div>
        <div style="clear:both;"></div>
      </div>
      <div style="background:white;padding:10px 15px;height:300px;margin-top:10px;font-size:14px;">
        <span style="display:block;color:#666;"><img style="width:25px;height:25px;" src="../../../static/images/shop/shop_icon.png"/><span style="margin-left: 30px;margin-top: -26px;display: block;height: 20px;font-size:14px">{{shopName}}</span></span>
        <hr style="margin-bottom:10px;margin-top: 0px;"/>
        <div v-for="(item,index) in goods" :key="index">
          <span style="display:block;color:#666;">
            <img style="width:100px;height:100px;" :src="purl + item.goodsSmallImg"/>
            <span style="margin-left:105px;margin-top: -100px;display: block;height: 100px;width:200px;color: black;font-size:12px">{{item.goodsName}}</span>
            <span style="margin-right:0px;margin-top: -100px;display: block;float: right;font-size:12px">￥{{item.price}}</span>
            <span style="margin-right:0px;margin-top: -60px;display: block;float: right;font-size:12px">×{{item.count}}</span>
          </span>
          <x-button mini v-if="item.orderState===0 && item.orderState===3  && item.orderState===4 && item.orderState===5" @click.native="bindToRefund(item)" style="width: 25%;float: right;margin-top: -30px;">退款</x-button>
          <x-button mini disabled v-if="item.state===1" style="width: 25%;float: right;margin-top: -30px;">审核中</x-button>
          <x-button mini disabled v-if="item.state===2" style="width: 25%;float: right;margin-top: -30px;">待退款</x-button>
          <x-button mini disabled v-if="item.state===3" style="width: 25%;float: right;margin-top: -30px;">退款成功</x-button>
        </div>     
        <span style="display:block;color:#666;margin-top:15px;line-height:40px;border-top:1px solid rgba(183, 173, 173, 0.72);font-size:12px">商品总价：<span style="float: right;font-size:12px">￥{{order.goodsTotalPrice}}</span></span>
        <span style="display:block;color:#666;line-height:40px;font-size:12px" v-if="order.sendType === 'tc' || order.sendType === 'express'">运费金额<span style="float: right;font-size:12px">￥{{order.expressPrice}}</span></span>
        <span style="display:block;color:#666;line-height:40px;font-size:12px" v-if="order.discountPrice > 0">优惠金额<span style="float: right;font-size:12px">￥-{{order.discountPrice}}</span></span>
        <span style="display:block;color:#666;line-height:40px;border-top:1px solid rgba(183, 173, 173, 0.72);"><span style="float: right;font-size:12px;">实付金额：<span style="color:red">￥{{order.finalPrice}}</span></span></span>
        <div style="clear:both;height:0;font-size: 1px;line-height: 0px;"></div>
      </div>
      <!-- 按钮控制 -->
      <div v-if="order.orderState===0" class="bottom-btn" style="z-index:10;">
        <div class="bottom-btn__text"  @click="cancelOrder(order.id)" style="background-color:#F9FAFC;width: 50%;float: left" >取消</div>
        <div class="bottom-btn__text c1" @click="bindToPay(order.id)" style="background-color:#FF8C00;background-color:#FF8C00;width: 50%;color:white;" >支付</div>
      </div>
      <div class="clear" style="text-align: center;/*padding-bottom: 60px;position: fixed*/;width: 100%">
        <x-button  v-if="order.orderState===2" @click.native="bindToSure(order.id)" style="background-color: orange;color: #FFFFFF;width: 95%;/*margin-bottom: 60px;*/">确认收货</x-button>
      </div>
    </div>
    <!-- <toast v-model="showToast" type="text" width="15em" :text="info"></toast> -->
      <lodingweixin ref="weixin"></lodingweixin>
  </div>
</template>

<script>
  import constant from '../../js/constant.js'
  import lodingweixin from '../../components/base/LodingWeiXin.vue'
  import { XHeader, Group, XInput, XNumber, XTextarea, Selector, XButton, Toast, LoadMore, XDialog, Confirm, Loading } from 'vux'
  import QRCode from 'qrcodejs2'
  export default {
    components: {
      XHeader,
      Group,
      XInput,
      XNumber,
      lodingweixin,
      constant,
      XTextarea,
      Selector,
      XButton,
      Toast,
      LoadMore,
      XDialog,
      Loading,
      Confirm,
      QRCode
    },
    data () {
      return {
        account: {},
        token: '',
        loading: false,
        id: '',
        order: {},
        goods: {},
        shopId: '',
        shopName: '',
        purl: constant.staticDomain
      }
    },
    methods: {
      // 查询订单信息
      getOrder () {
        var that = this
        var params = {
          token: this.token,
          orderId: this.id
        }
        this.$http.post('/mlm/shop/order/getById.htm', params).then(response => {
          var resBody = response.body
          if (resBody.isSuccess === 0) {
            this.order = resBody.result.order
            this.goods = resBody.result.goods
            this.shopId = resBody.result.order.shopId
            this.sellerRemark = ''
            if (resBody.result.order.message !== '') {
              var ms = JSON.parse(resBody.result.order.message)
              for (var i = 0; i < ms.length; i++) {
                if (ms[i].state !== false) {
                  this.sellerRemark = ms[i].sellerRemark
                }
              }
            }
            this.shopdetail()
            this.qrcode()
            // this.initOrderInfo(order)
            this.loadShow = false
            this.loading = false
          } else if (resBody.isSuccess === 2) {
            this.$vux.alert.show({
              title: '提示',
              content: '登录超时，请重新登录！',
              onHide () {
                that.$router.push({path: '/login'})
              }
            })
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: resBody.errorMsg,
              onHide () {
                console.log(resBody.errorMsg)
              }
            })
          }
          this.$vux.loading.hide()
        })
      },
      // 查询店铺名称
      shopdetail () {
        var params = {
          token: this.token,
          id: this.shopId
        }
        this.$http.post('/mlm/shop/shop/getById.htm', params).then(response => {
          var resBody = response.body
          if (resBody.isSuccess === 0) {
            this.shopName = resBody.result.shopName
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
          return '支付中'
        } else if (orderState === 13) {
          return '待出单'
        } else if (orderState === 14) {
          return '待出单'
        } else if (orderState === 15) {
          return '待出单'
        } else if (orderState === 16) {
          return '待出单'
        } else if (orderState === 17) {
          return '待出单'
        } else if (orderState === 18) {
          return '待出单'
        } else {
          return ''
        }
      },
      // 二维码
      qrcode () {
        let qrcode = new QRCode('qrcode', {
          width: 88.88,  // 设置宽度
          height: 88.88, // 设置高度
          text: 'http://' + constant.domain + '/verificationCertificate?orderNo=' + this.order.orderNo
        })
        console.log(qrcode)
      },
      // // 初始化订单信息
      // initOrderInfo (order) {
      //   // 公共订单信息
      //   this.createTime = this.createTimeStr(order.createTime)
      //   this.lastPayTime = this.createTimeStr(order.lastPayTime)
      //   this.payTime = (order.payTime === '' || this.createTimeStr(order.payTime) === '1900-01-01 00:00:00') ? '--' : this.createTimeStr(order.payTime)
      //   this.sendType = this.sendTypeToCn(order.sendType)
      //   var type = order.groupType
      //   this.groupType = type
      //   // 保险参保人信息
      //   if (type === 'flight_insu' || type === 'tour_insu' || type === 'train_insu' || type === 'hotel_insu') { // 保险
      //     let list = []
      //     let name = order.insuranceName // 参保人姓名
      //     let cno = order.cardNo // 证件号
      //     let ino = order.insuranceNo // 保单号
      //     if (name !== null && name !== '') {
      //       let narr = name.split('|')
      //       let carr = cno.split('|')
      //       let iarr = []
      //       if (ino !== null && ino !== '') {
      //         iarr = ino.split('|')
      //       }
      //       for (let i = 0; i < narr.length; i++) {
      //         let ob = {insuranceName: narr[i], cardNo: carr[i], insuranceNo: (iarr.length > 0 ? iarr[i] : '--')}
      //         list.push(ob)
      //       }
      //     }
      //     this.insuList = list
      //     this.length1 = this.insuList.length
      //   }
      //   if (type === 'airport_service' || type === 'train_service') { // 服务
      //     let list = []
      //     let name = ''
      //     let cardNo = ''
      //     if (type === 'airport_service') {
      //       name = order.airportTravelName
      //       cardNo = order.airportTravelCardNo
      //     } else {
      //       name = order.trainTravelName
      //       cardNo = order.trainTravelCardNo
      //     }
      //     let nArr = name.split('|')
      //     let cArr = cardNo.split('|')
      //     for (let i = 0; i < nArr.length; i++) {
      //       let ob = {name: nArr[i], cardNo: cArr[i]}
      //       list.push(ob)
      //     }
      //     this.servicePass = list
      //     this.length2 = this.servicePass.length
      //   }
      //   if (type === 'hotel_agreement') { // 协议酒店
      //     var refundNums = order.refundNum.split('|')
      //     var refundCauses = order.refundCause.split('|')
      //     var RefundhotelPrices = []
      //     console.log(JSON.stringify(order))
      //     if (order.refundhotelPrice !== '') {
      //       RefundhotelPrices = order.refundhotelPrice.split('|')
      //     }
      //     var RefundhotelIntegrals = []
      //     if (order.refundhotelIntegral !== '') {
      //       RefundhotelIntegrals = order.refundhotelIntegral.split('|')
      //     }
      //     for (var i = 0; i < refundNums.length; i++) {
      //       var parm = {
      //         refundNum: refundNums[i],
      //         refundCause: refundCauses[i],
      //         RefundhotelPrice: (RefundhotelPrices[i] !== undefined ? RefundhotelPrices[i] : 0),
      //         RefundhotelIntegral: ((RefundhotelIntegrals[i] !== undefined) ? RefundhotelIntegrals[i] : 0)
      //       }
      //       this.refund.push(parm)
      //     }
      //   }
      // },
      // // 配送方式转换
      // sendTypeToCn (ty) {
      //   var cn = ''
      //   if (ty === 'md') {
      //     cn = '门店自提'
      //   } else if (ty === 'tc') {
      //     cn = '同城配送'
      //   } else {
      //     cn = '快递发货'
      //   }
      //   return cn
      // },
      // 申请退款按钮
      bindToRefund (item) {
        this.$router.push({path: '/orderthird', query: {goods: JSON.stringify(item), order: JSON.stringify(this.order)}})
      },
      // // 机票提交退款
      // doRefund () {
      //   var remark = this.refundRemark
      //   if (remark === null || remark === '') {
      //     this.showToast = true
      //     this.info = '请输入退款备注'
      //     return
      //   }
      //   var that = this
      //   var params = {
      //     token: this.token,
      //     id: this.order.id,
      //     refundRemark: remark,
      //     type: 3
      //   }
      //   this.$http.post('/mlm/shop/order/applyRefund.htm', params).then(response => {
      //     var resBody = response.body
      //     if (resBody.isSuccess === 0) {
      //       this.showFlightRefund = false
      //       this.$vux.alert.show({
      //         title: '提示',
      //         content: '申请退款成功',
      //         onHide () {
      //           // 刷新详情
      //           that.loading = true
      //           that.getOrder()
      //         }
      //       })
      //     } else if (resBody.isSuccess === 2) {
      //       this.$vux.alert.show({
      //         title: '提示',
      //         content: '登录超时，请重新登录！',
      //         onHide () {
      //           that.$router.push({path: '/login'})
      //         }
      //       })
      //     } else {
      //       this.$vux.alert.show({
      //         title: '提示',
      //         content: resBody.result,
      //         onHide () {
      //           console.log(resBody.errorMsg)
      //         }
      //       })
      //     }
      //   })
      // },
      // // 协议酒店退款按钮弹出层
      // hotelToRefund () {
      //   this.showHotelRefund = true
      // },
      // // 协议酒店提交退款
      // hotelRefund () {
      //   var remark = this.hotelRemark
      //   if (remark === null || remark === '') {
      //     this.showToast = true
      //     this.info = '请输入退款备注'
      //     return
      //   }
      //   var that = this
      //   var params = {
      //     token: this.token,
      //     id: this.order.id,
      //     orderNo: this.order.orderNo,
      //     refundRoomRemark: remark,
      //     refundRoomNum: this.hotelNum,
      //     type: 3
      //   }
      //   this.$http.post('/mlm/shop/order/hotelRefund.htm', params).then(response => {
      //     var resBody = response.body
      //     if (resBody.isSuccess === 0) {
      //       this.showHotelRefund = false
      //       this.$vux.alert.show({
      //         title: '提示',
      //         content: '申请退款成功',
      //         onHide () {
      //           // 刷新详情
      //           that.loading = true
      //           that.getOrder()
      //         }
      //       })
      //     } else if (resBody.isSuccess === 2) {
      //       this.$vux.alert.show({
      //         title: '提示',
      //         content: '登录超时，请重新登录！',
      //         onHide () {
      //           that.$router.push({path: '/login'})
      //         }
      //       })
      //     } else {
      //       this.$vux.alert.show({
      //         title: '提示',
      //         content: resBody.result,
      //         onHide () {
      //           console.log(resBody.errorMsg)
      //         }
      //       })
      //       this.showHotelRefund = false
      //     }
      //   })
      // },
      // // 确认收货弹出层
      // bindToSure (id) {
      //   var that = this
      //   this.$vux.confirm.show({
      //     title: '操作提示',
      //     content: '确定确认收货？',
      //     onCancel () {
      //       console.log('cancel')
      //     },
      //     onConfirm () {
      //       that.doSure(id)
      //     }
      //   })
      // },
      // // 执行方法-确认收货
      // doSure (id) {
      //   var that = this
      //   var params = {
      //     token: this.token,
      //     id: id,
      //     type: 3
      //   }
      //   this.$http.post('/mlm/shop/order/confirmSH.htm', params).then(response => {
      //     var resBody = response.body
      //     if (resBody.isSuccess === 0) {
      //       this.$vux.alert.show({
      //         title: '提示',
      //         content: '已确认收货！',
      //         onHide () {
      //           // 刷新详情
      //           that.loading = true
      //           that.getOrder()
      //         }
      //       })
      //     } else if (resBody.isSuccess === 2) {
      //       this.$vux.alert.show({
      //         title: '提示',
      //         content: '登录超时，请重新登录！',
      //         onHide () {
      //           that.$router.push({path: '/login'})
      //         }
      //       })
      //     } else {
      //       this.$vux.alert.show({
      //         title: '提示',
      //         content: resBody.result,
      //         onHide () {
      //           console.log(resBody.errorMsg)
      //         }
      //       })
      //     }
      //   })
      // },
      // // 时间格式化
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
      }
      // // 返回操作事件
      // backToList () {
      //   this.$router.push({path: '/shopOrderList'})
      // },
      // // 跳转支付
      // bindToPay (id) {
      //   this.$router.push({path: '/shopPay/' + id})
      // },
      // // 订单取消
      // cancelOrder (id) {
      //   var that = this
      //   this.$vux.confirm.show({
      //     title: '操作提示',
      //     content: '确定取消订单？',
      //     onCancel () {
      //       console.log('cancel')
      //     },
      //     onConfirm () {
      //       that.doCancel(id)
      //     }
      //   })
      // },
      // // 执行取消订单
      // doCancel (id) {
      //   var that = this
      //   var params = {
      //     token: this.token,
      //     id: id
      //   }
      //   this.$http.post('/mlm/shop/order/cancelOrder.htm', params).then(response => {
      //     var resBody = response.body
      //     if (resBody.isSuccess === 0) {
      //       this.$vux.alert.show({
      //         title: '提示',
      //         content: '订单已取消！',
      //         onHide () {
      //           // 刷新详情
      //           that.loading = true
      //           that.getOrder()
      //         }
      //       })
      //     } else if (resBody.isSuccess === 2) {
      //       this.$vux.alert.show({
      //         title: '提示',
      //         content: '登录超时，请重新登录！',
      //         onHide () {
      //           that.$router.push({path: '/login'})
      //         }
      //       })
      //     } else {
      //       this.$vux.alert.show({
      //         title: '提示',
      //         content: resBody.result,
      //         onHide () {
      //           console.log(resBody.errorMsg)
      //         }
      //       })
      //     }
      //   })
      // },
      // timeStr (time) {
      //   if (this.createTimeStr(time) === '1900-01-01 00:00:00') {
      //     return '--'
      //   } else {
      //     return this.createTimeStr(time)
      //   }
      // }
    },
    mounted () {
      var user = sessionStorage.getItem('user')
      if (user) {
        user = JSON.parse(user)
        this.account = user.account
        this.token = user.token
        this.id = this.$route.params.id
        // this.$vux.loading.show({
        //   text: 'Loading'
        // })
        this.getOrder()
      } else {
        this.$router.push({path: '/login'})
      }
    }
  }
</script>

<style>
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  .clear{
    clear: both;
  }
  .bottom-btn {
    position:fixed;
    bottom:0;
    width:100%;
    text-align:center;
  }
  .bottom-btn__text {
    padding:10px 0;
    text-align:center;
    display:inline-block;
    width: 50%;
  }
  .bottom-btn__text1 {
    padding:10px 0;
    text-align:center;
    display:inline-block;
    width: 100%;
  }
  .bottombtn{
    width: 100%;
    bottom: 0;
    position: fixed;
  }
  .vux-header{
    position: fixed !important;
    top:0px;
    z-index: 2;
    width: 100%;
  }
</style>
