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
            <span style="display:block;line-height:30px;color:#666;">店铺地址：<span style="color: black;">{{shopaddress}}</span></span>
            <span style="display:block;line-height:30px;color:#666;">店铺电话：<span style="color: black;">{{shopphone}}</span></span>
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
        <span style="display:block;color:#666;border-bottom:1px solid rgba(183, 173, 173, 0.72);margin-bottom:15px;"><img style="width:25px;height:25px;margin:10px 0" src="../../../static/images/shop/shop_icon.png"/><span style="margin-left: 30px;margin-top: -35px;display: block;height: 25px;font-size:14px;">{{shopName}}</span></span>
        <div v-for="(item,index) in goods" :key="index">
          <span style="display:block;color:#666;">
            <img style="width:100px;height:100px;" :src="purl + item.goodsSmallImg"/>
            <span style="margin-left:105px;margin-top: -100px;display: block;height: 100px;width:200px;color: black;font-size:12px">{{item.goodsName}}</span>
            <span style="margin-right:0px;margin-top: -100px;display: block;float: right;font-size:12px">￥{{item.price}}</span>
            <span style="margin-right:0px;margin-top: -60px;display: block;float: right;font-size:12px">×{{item.count}}</span>
          </span>
          <x-button mini v-if="(item.state===0 || item.state===3  || item.state===4 || item.state===5) && (order.orderState!==3 && order.orderState!==4 && order.orderState!==0) && type === '1'" @click.native="bindToRefund(item)" style="width: 25%;float: right;margin-top: -30px;">退款</x-button>
          <x-button mini @click.native="bindTodetails(item)" v-if="item.state===1 && type === '1'" style="width: 25%;float: right;margin-top: -30px;">审核中</x-button>
          <x-button mini @click.native="bindTodetails(item)" v-if="item.state===2 && type === '1'" style="width: 25%;float: right;margin-top: -30px;">待退款</x-button>
          <x-button mini @click.native="bindTodetails(item)" v-if="item.state===3 && type === '1'" style="width: 25%;float: right;margin-top: -30px;">退款成功</x-button>
        </div>     
        <span style="display:block;color:#666;margin-top:15px;line-height:40px;border-top:1px solid rgba(183, 173, 173, 0.72);font-size:12px">商品总价：<span style="float: right;font-size:12px">￥{{order.goodsTotalPrice}}</span></span>
        <span style="display:block;color:#666;line-height:40px;font-size:12px" v-if="order.sendType === 'tc' || order.sendType === 'express'">运费金额<span style="float: right;font-size:12px">￥{{order.expressPrice}}</span></span>
        <span style="display:block;color:#666;line-height:40px;font-size:12px" v-if="order.discountPrice > 0">优惠金额<span style="float: right;font-size:12px">￥-{{order.discountPrice}}</span></span>
        <span style="display:block;color:#666;line-height:40px;border-top:1px solid rgba(183, 173, 173, 0.72);"><span style="float: right;font-size:12px;">实付金额：<span style="color:red">￥{{order.finalPrice}}</span></span></span>
        <div style="clear:both;height:0;font-size: 1px;line-height: 0px;"></div>
      </div>
      <!-- 消费者按钮控制 -->
      <div v-if="order.orderState===0 && type === '1'" class="bottom-btn" style="z-index:10;">
        <div class="bottom-btn__text"  @click="cancelOrder(order.id)" style="background-color:#F9FAFC;width: 50%;float: left" >取消</div>
        <div class="bottom-btn__text c1" @click="bindToPay(order)" style="background-color:#FF8C00;background-color:#FF8C00;width: 50%;color:white;" >支付</div>
      </div>
      <div class="clear" style="text-align: center;/*padding-bottom: 60px;position: fixed*/;width: 100%">
        <x-button  v-if="order.orderState===2 && type === '1'" @click.native="bindToSure(order)" style="background-color: orange;color: #FFFFFF;width: 95%;/*margin-bottom: 60px;*/">确认收货</x-button>
      </div>
      <div class="clear" style="text-align: center;/*padding-bottom: 60px;position: fixed*/;width: 100%">
        <x-button v-if="order.orderState===3 && order.evaluate==='false' && type === '1'" @click.native="bindToestimate()" style="background-color: orange;color: #FFFFFF;width: 95%;/*margin-bottom: 60px;*/">去评价</x-button>
      </div>
      <!-- 商家按钮控制 -->
      <div class="clear" style="text-align: center;/*padding-bottom: 60px;position: fixed*/;width: 100%">
        <x-button v-if="(order.orderState===1 || order.orderState=== 11 || order.orderState=== 15) && (order.sendType === 'md' || order.sendType === 'wu' || order.sendType === 'tc' || order.sendType === 'express') && type === '2'" @click="refuse(order)" style="background-color: orange;color: #FFFFFF;width: 95%;/*margin-bottom: 60px;*/">拒绝发货</x-button>
        <x-button v-if="(order.orderState===1 || order.orderState=== 11 || order.orderState=== 15) && (order.sendType === 'md' || order.sendType === 'wu') && type === '2'" @click="butupdate('1', order)" style="background-color: orange;color: #FFFFFF;width: 95%;/*margin-bottom: 60px;*/">订单确认</x-button>
        <x-button v-if="(order.orderState===1 || order.orderState=== 11 || order.orderState=== 15) && (order.sendType === 'tc' || order.sendType === 'express') && type === '2'" @click="butupdate('2', order)" style="background-color: orange;color: #FFFFFF;width: 95%;/*margin-bottom: 60px;*/">发货确认</x-button>
        <x-button v-if="(order.orderState===5 || order.orderState===18) && type === '2'" @click="refunds(order)" style="background-color: orange;color: #FFFFFF;width: 95%;/*margin-bottom: 60px;*/">退款确认</x-button>
      </div>
    </div>
    <div>
      <confirm v-model="show1" title="操作" @on-cancel="onCancel1" @on-confirm="onConfirm3">
        <p style="text-align:center;">确认操作吗？</p>
      </confirm>
    </div>
    <div>
      <confirm v-model="show" title="操作" @on-cancel="onCancel1" @on-confirm="onConfirm1">
        <p style="text-align:center;">确认操作吗？</p>
      </confirm>
    </div>
    <div>
      <confirm v-model="show5" ref="confirm5" title="" @on-cancel="onCancel1" @on-confirm="onConfirm5">
        <x-input v-model="expressName" title="快递公司："></x-input>
        <x-input v-model="expressOrderNo" title="快递单号："></x-input>
      </confirm>
    </div>
    <div>
      <confirm v-model="show2" ref="confirm5" title="确认退款" @on-cancel="onCancel1" @on-confirm="onConfirm2">
        <selector style="margin-left: -15px;" ref="defaultValueRef" title="审核结果" :options="optionlist" v-model="option"></selector>
        <x-input v-model="refundPrice" title="退款金额："></x-input>
        <x-textarea style="margin-left: 10px;" v-model="refundRemark" :max="200" name="description" placeholder="退款说明"></x-textarea>
      </confirm>
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
        show1: false,
        show: false,
        show2: false,
        show5: false,
        expressName: '',
        expressOrderNo: '',
        refundPrice: '',
        refundRemark: '',
        optionlist: ['同意', '不同意'],
        option: '同意',
        id: '',
        order: {},
        goods: {},
        shopId: '',
        shopName: '',
        purl: constant.staticDomain,
        shopaddress: '',
        shopphone: '',
        type: '',
        refundlist: '',
        orderlist: ''
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
            // this.sellerRemark = ''
            // if (resBody.result.order.message !== '') {
            //   var ms = JSON.parse(resBody.result.order.message)
            //   for (var i = 0; i < ms.length; i++) {
            //     if (ms[i].state !== false) {
            //       this.sellerRemark = ms[i].sellerRemark
            //     }
            //   }
            // }
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
            this.shopaddress = resBody.result.address
            this.shopphone = resBody.result.phone
          }
        })
      },
      // 去评价
      bindToestimate () {
        this.$router.push({path: '/Shopevaluation', query: {order: JSON.stringify(this.order)}})
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
      // 退款详情
      bindTodetails (item) {
        this.$router.push({path: '/orderfirst', query: {order: JSON.stringify(this.order), goods: JSON.stringify(item)}})
      },
      // 拒绝发货弹框
      refuse (item) {
        this.show1 = true
        this.refundlist = item
      },
      // 订单确认和确认发货
      butupdate (i, item) {
        if (i === '1') {
          this.show = true
          this.orderlist = item
        } else if (i === '2') {
          this.show5 = true
          this.orderlist = item
        }
      },
      // 确认退款
      refunds (item) {
        this.show2 = true
        this.refundlist = item
        console.log(item)
      },
      onCancel1 () {
        console.log('on cancel')
      },
      onConfirm1 () {
        this.updateState('3')
      },
      onConfirm5 () {
        this.updateState('2')
      },
      updateState (orderState) {
        this.loading = true
        var that = this
        var params = {}
        if (orderState === '2') {
          params = {
            token: this.token,
            id: this.orderlist.id,
            orderState: orderState,
            expressName: this.expressName,
            expressOrderNo: this.expressOrderNo
          }
        } else {
          params = {
            token: this.token,
            id: this.orderlist.id,
            orderState: orderState,
            expressName: '',
            expressOrderNo: ''
          }
        }
        this.$http.post('/mlm/shop/order/updateState.htm', params).then(response => {
          var resBody = response.body
          if (resBody.isSuccess === 0) {
            that.$vux.alert.show({
              title: '操作提示',
              content: '确认成功'
            })
            this.select()
          } else {
            that.$vux.alert.show({
              title: '操作提示',
              content: resBody.errorMsg
            })
          }
        })
      },
      onConfirm2 () {
        this.loading = true
        var that = this
        var option = ''
        if (this.option === '同意') {
          option = 'yes'
        } else {
          if (this.refundRemark) {
            that.$vux.alert.show({
              title: '操作提示',
              content: '请输入拒绝退款原因'
            })
            return false
          }
          option = 'no'
        }
        var goods = JSON.parse(this.refundlist.goods)
        var params = {
          token: this.token,
          id: goods[0].refundId,
          option: option,
          refundPrice: this.refundPrice,
          refundRemark: this.refundRemark,
          type: this.user.type
        }
        this.$http.post('/mlm/shop/order/examineAndVerify.htm', params).then(response => {
          var resBody = response.body
          if (resBody.isSuccess === 0) {
            that.$vux.alert.show({
              title: '操作提示',
              content: '确认成功'
            })
            this.select()
          } else {
            that.$vux.alert.show({
              title: '操作提示',
              content: resBody.errorMsg
            })
          }
        })
      },
      // 二维码
      qrcode () {
        let qrcode = new QRCode('qrcode', {
          width: 88.88,  // 设置宽度
          height: 88.88, // 设置高度
          text: this.order.orderNo + '|' + this.order.shopId
        })
        console.log(qrcode)
      },
      // 申请退款按钮
      bindToRefund (item) {
        this.$router.push({path: '/orderthird', query: {order: JSON.stringify(this.order), goods: JSON.stringify(item)}})
      },
      // 拒绝发货
      onConfirm3 () {
        var that = this
        var params = {
          token: this.token,
          id: this.refundlist.id,
          refundPrice: this.refundlist.finalPrice,
          OrderNo: this.refundlist.orderNo,
          type: '3'
        }
        this.$http.post('/mlm/shop/order/refuseorder.htm', params).then(response => {
          var resBody = response.body
          if (resBody.isSuccess === 0) {
            that.$vux.alert.show({
              title: '操作提示',
              content: '确认成功'
            })
            this.select()
          } else {
            that.$vux.alert.show({
              title: '操作提示',
              content: resBody.errorMsg
            })
          }
        })
      },
      // 确认收货弹出层
      bindToSure (order) {
        var that = this
        this.$vux.confirm.show({
          title: '操作提示',
          content: '确定确认收货？',
          onCancel () {
            console.log('cancel')
          },
          onConfirm () {
            that.doSure(order)
          }
        })
      },
      // 执行方法-确认收货
      doSure (order) {
        var that = this
        var params = {
          token: this.token,
          orderNo: order.orderNo,
          shopId: order.shopId
        }
        this.$http.post('/mlm/shop/order/confirmOrder.htm', params).then(response => {
          var resBody = response.body
          if (resBody.isSuccess === 0) {
            this.$vux.alert.show({
              title: '提示',
              content: '已确认收货！',
              onHide () {
                // 刷新详情
                that.loading = true
                that.getOrder()
              }
            })
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
              content: resBody.result,
              onHide () {
                console.log(resBody.errorMsg)
              }
            })
          }
        })
      },
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
      },
      // 跳转支付
      bindToPay (order) {
        this.$router.push({path: '/pay', query: {price: order.goodsTotalPrice, shopOrder: order.orderNo, shareAmount: 0, shopId: order.shopId}})
      },
      // 订单取消
      cancelOrder (id) {
        var that = this
        this.$vux.confirm.show({
          title: '操作提示',
          content: '确定取消订单？',
          onCancel () {
            console.log('cancel')
          },
          onConfirm () {
            that.doCancel(id)
          }
        })
      },
      // 执行取消订单
      doCancel (id) {
        var params = {
          token: this.token,
          id: id
        }
        var that = this
        this.$http.post('/mlm/shop/order/cancelOrder.htm', params).then(response => {
          var resBody = response.body
          if (resBody.isSuccess === 0) {
            that.$vux.alert.show({
              title: '操作提示',
              content: '取消成功'
            })
            this.getOrder()
          } else {
            that.$vux.alert.show({
              title: '操作提示',
              content: resBody.errorMsg
            })
          }
          this.loading = false
          this.$vux.loading.hide()
        })
      }
    },
    mounted () {
      var user = sessionStorage.getItem('user')
      if (user) {
        user = JSON.parse(user)
        this.account = user.account
        this.token = user.token
        this.id = this.$route.query.id
        this.type = this.$route.query.type
        console.log(this.id)
        console.log(this.type)
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
