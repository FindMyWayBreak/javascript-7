<template>
    <div >
      <x-header @on-click-back="goBack" :left-options="{preventGoBack: true}" class="xheader">订单</x-header>
      <div style="">
        <tab style="width:100%;" :line-width="1" custom-bar-width="60px">
          <tab-item selected @on-item-click="onItemClick('0')" style="font-size: 14px;">待付款</tab-item>
          <tab-item @on-item-click="onItemClick('11')" style="font-size: 14px;">待使用</tab-item>
          <tab-item @on-item-click="onItemClick('1')" style="font-size: 14px;">待发货</tab-item>
          <tab-item @on-item-click="onItemClick('16')" style="font-size: 14px;">待评价</tab-item>
          <tab-item @on-item-click="onItemClick('all')" style="font-size: 14px;">全部</tab-item>
        </tab>
      </div>
      <scroller v-if="leixing==='商城订单'" lock-x scrollbar-y height="auto" @on-pulldown-loading="onScrollTop"
                ref="scroller" @on-scroll-bottom="onScrollBottom" :scroll-bottom-offst="20"
                :pulldown-config="{content:'',downContent:'',upContent:'',loadingContent:'Loading……'}">
        <div>
          <div v-for="(item,index) in mallOrderlist" :key="index" @click="orderdatil(item)">
            <div style="margin-bottom: 10px;padding: 5px;background-color: #FFFFFF;">
                <div style="margin-top: 1em;margin-left: 10px;line-height: 30px;">
                  <p style="float: left;" class="comstyle">
                    <span>订单编号：</span>
                    <span>{{item.orderNo}}</span>
                  </p>
                  <p style="float: right;margin-right: 10px;" class="comstyle">
                    <span style="color: orange;font-weight: bold;">{{tapy(item.orderState)}}</span>
                  </p>
                </div>
                <div style="clear: both;">
                  <!-- <hr style="width: 100%;"/> -->
                </div>
                <div style="margin-top: 0px;" >
                  <div style="width: 60%;display:inline-block;text-align: left;margin-left: 10px;">
                    <p style="font-weight: bold;" class="comstyle">
                      <span style="font-weight: bold;" v-for="(goods, goodsIndex) in JSON.parse(item.goods)" :key="goodsIndex">{{goods.goodsName}}</span>
                    </p>
                    <p class="comstyle">订单价格：￥{{item.finalPrice}}</p>
                    <p class="comstyle">下单时间：{{timetrans(item.createTime)}}</p>
                  </div>
                </div>
              <div class="clearf"  style="width: 100%;margin-right: 3%;display:inline-block;margin-left: 40%;">
                <x-button v-if="item.orderState===3 && item.evaluate==='false'" @click.native.stop="bindToestimate(item)" type="primary" mini>去评价</x-button>
                <x-button v-if="item.orderState===0" @click.native.stop="bindToPay(item)" type="primary" mini>去支付</x-button>
                <x-button v-if="item.orderState===0" @click.native.stop="bindTocancel(item)" type="primary" mini>取消</x-button>
                <x-button v-if="item.orderState===1 || item.orderState===2  || item.orderState===7 || item.orderState===10 || item.orderState===11 || item.orderState===15" @click.native.stop="refund(item)" type="primary" mini>申请退款</x-button>
                <x-button v-if="item.orderState===2" @click.native.stop="confirmation(item)" type="primary" mini>确认收货</x-button>
                <!-- <x-button style="float: right;margin-top: 0px;margin-right: 5px;" @click.native.stop="orderdatil(item)" type="primary" mini>订单详情</x-button> -->
              </div>
              </div>
          </div>
        </div>
        <div style="margin-left: 40%;margin-top: 20%;" v-if="mallOrderlist.length===0&&!loading">
          <img src="../../../static/images/nodata.png" style="width:80px;height:80px;vertical-align:middle;margin-right:6px" /><br/>
        </div>
      </scroller>
      <div v-transfer-dom>
        <confirm v-model="showcancel" title="操作" @on-cancel="onCancel" @on-confirm="onConfirm">
          <p style="text-align:center;">确定取消订单吗？</p>
        </confirm>
      </div>
      <div v-transfer-dom>
        <confirm v-model="showorder" title="操作" @on-cancel="onCancel" @on-confirm="onConfirm1">
          <p style="text-align:center;">是否确认收货，确认后无法退款!</p>
        </confirm>
      </div>
      <div @click="show = true">
        <tabbar>
          <tabbar-item>
            <img slot="icon" src="../../../static/images/shaixuan.png" style="width:20px;height:20px;">
            <span slot="label">订单</span>
          </tabbar-item>
        </tabbar>
      </div>
      <div v-transfer-dom>
        <popup v-model="show">
          <div style="height:200px;background-color: #fff;" class="popup0">
            <div style="margin-top: 8px;margin-left: 6px;font-size: 16px;">商城购物</div>
            <div style="margin-left: 10px;font-size:14px">
              <checker @on-change="show = false" v-model="leixing" default-item-class="demo5-item" selected-item-class="demo5-item-selected">
                <checker-item value="商城订单">商城订单</checker-item>
              </checker>
            </div>
            <div style="margin-top: 8px;margin-left: 6px;font-size: 16px;">交通住宿</div>
            <div style="margin-left: 10px;font-size:14px">
              <checker @on-change="show = false" v-model="leixing" default-item-class="demo5-item" selected-item-class="demo5-item-selected">
                <checker-item value="火车票订单">酒店订单</checker-item>
                <!-- <checker-item value="飞机订单">飞机订单</checker-item>
                <checker-item value="酒店订单">酒店订单</checker-item> -->
              </checker>
            </div>
          </div>
        </popup>
      </div>
      <lodingweixin ref="weixin"></lodingweixin>
    </div>
</template>

<script>
  import { LoadMore, Alert, Confirm, XHeader, Swiper, Group, Grid, GridItem, XInput, XButton, Datetime, Toast, Tab, TabItem, Tabbar, TabbarItem, XAddress, Scroller, Popup, Checker, CheckerItem, TransferDom } from 'vux'
  import constant from '../../js/constant.js'
  import lodingweixin from '../../components/base/LodingWeiXin.vue'
  export default {
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Alert,
      Swiper,
      Group,
      Grid,
      GridItem,
      Confirm,
      XInput,
      XButton,
      Datetime,
      Toast,
      Tabbar,
      TabbarItem,
      XAddress,
      LoadMore,
      Scroller,
      Tab,
      TabItem,
      Popup,
      Checker,
      CheckerItem,
      lodingweixin,
      constant
    },
    data () {
      return {
        account: '',
        token: '',
        loading: false,
        show: false,
        showcancel: false,
        showorder: false,
        leixing: '商城订单',
        mallOrderlist: [],
        commodity: [],
        orderStatusObj: {
          '0': '待付款',
          '1': '待发货',
          '2': '待发货',
          '3': '已完成',
          '4': '已关闭',
          '5': '待退款',
          '6': '已退款',
          '7': '退款失败',
          '8': '确认失败',
          '9': '退款中',
          '10': '待出单',
          '11': '待确认',
          '12': '支付中',
          '13': '确认失败',
          '14': '确认失败',
          '15': '待使用',
          '18': '申请退款中'
        },
        refresh: true,
        usepulldown: true,
        ordertype: 0,
        pageIndex: 1,
        pageSize: 10,
        order: ''
      }
    },
    methods: {
      goBack () {
        this.$router.push({path: '/myInfo'})
      },
      // 去支付
      bindToPay (item) {
        this.$router.push({path: '/pay', query: {price: item.goodsTotalPrice, shopOrder: item.orderNo, shareAmount: 0, shopId: item.shopId}})
      },
      // 去评价
      bindToestimate (item) {
        console.log(item)
        this.$router.push({path: '/Shopevaluation', query: {order: JSON.stringify(item)}})
      },
      // 申请退款
      refund (item) {
        this.$router.push({ path: '/shopOrderDetail/' + item.id })
      },
      // 确认订单
      confirmation (item) {
        this.showorder = true
        this.order = item
      },
      onConfirm1 () {
        this.loading = true
        var that = this
        var params = {
          token: this.token,
          id: this.order.id,
          orderState: '3'
        }
        this.$http.post('/mlm/shop/order/confirmationOrder.htm', params).then(response => {
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
      // 订单详情
      orderdatil (item) {
        this.$router.push({ path: '/shopOrderDetail/' + item.id })
      },
      // 取消订单弹框
      bindTocancel (item) {
        this.showcancel = true
        this.order = item
      },
      onCancel () {
        console.log('on cancel')
      },
      // 取消订单
      onConfirm () {
        var params = {
          token: this.token,
          id: this.order.id
        }
        var that = this
        this.$http.post('/mlm/shop/order/cancelOrder.htm', params).then(response => {
          var resBody = response.body
          if (resBody.isSuccess === 0) {
            that.$vux.alert.show({
              title: '操作提示',
              content: '取消成功'
            })
            this.initTrainOrder()
          } else {
            that.$vux.alert.show({
              title: '操作提示',
              content: resBody.errorMsg
            })
          }
          this.loading = false
          this.$vux.loading.hide()
        })
      },
      // 上拉加载
      onScrollBottom () {
        if (this.refresh) {
          this.refresh = false
          this.pageSize = this.pageSize + 10
          this.mallOrderlist = []
          this.initTrainOrder()
        }
      },
      // 下拉刷新
      onScrollTop () {
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.scroller.donePulldown()
            // 刷新列表
            this.pageIndex = 1
            this.mallOrderlist = []
            this.initTrainOrder()
          }, 2000)
        })
      },
      onItemClick (i) {
        this.ordertype = i
        this.mallOrderlist = []
        this.initTrainOrder()
      },
      initTrainOrder () {
        this.loading = true
        var params = {
          token: this.token,
          tabType: this.ordertype,
          memberId: this.account.id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
        var that = this
        this.$http.post('/mlm/shop/order/getPage.htm', params).then(response => {
          this.refresh = true
          var resBody = response.body
          if (resBody.isSuccess === 0) {
            this.mallOrderlist = []
            if (resBody.result.content) {
              this.mallOrderlist = resBody.result.content
              this.commodity = resBody
            }
          } else {
            that.$vux.alert.show({
              title: '操作提示',
              content: resBody.errorMsg
            })
          }
          this.loading = false
          this.$vux.loading.hide()
        })
      },
      timetrans (long) {
        var date = new Date(long)
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
        return Y + M + D + h + m + s
      },
      tapy (orderState) {
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
          return '待使用'
        } else if (orderState === 16) {
          return '待评价'
        } else if (orderState === 17) {
          return '已完成待评价'
        } else if (orderState === 18) {
          return '申请退款中'
        } else {
          return ''
        }
      }
    },
    mounted () {
      var user = sessionStorage.getItem('user')
      if (user) {
        user = JSON.parse(user)
        this.account = user.account
        this.token = user.token
        // this.$vux.loading.show({
        //   text: 'Loading'
        // })
        this.initTrainOrder()
      } else {
        var that = this
        this.$refs.weixin.weiXinLogin(function () {
          var user = sessionStorage.getItem('user')
          user = JSON.parse(user)
          that.account = user.account // 标识是否第一次进入此页面，是则不用加载定位组件（避免弹两次确认获取定位信息的弹框）
          that.token = user.token
          // _this.$refs.weixin.getAccessToken()
          that.initTrainOrder()
        })
      }
    }
  }
</script>

<style scoped>
  .comstyle{
    font-size:12px;
    line-height:25px;
  }
  .weui-tabbar{
    position: fixed !important;
  }
  .gridclass {
    display: block;
    text-align: center;
    border: none;
  }
  .vux-header{
    position: fixed !important;
    top:0px;
    z-index: 2;
    width: 100%;
  }
  /* .details::after{
      content: '〉';
      position: absolute;
      top: 33px;
      right: 2px;
      color:#999;
      font-weight:bold;
  } */
  .clearf{
    clear: both;

  }
  .demo5-item {
    font-size: 12px;
    width: 100px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-right: 6px;
    margin-top: 8px;
  }
  .demo5-item-selected {
    border-color: #ff4a00;
    margin-top: 8px;
  }
  .icon {
    display: inline-block;
    widows: 100px;
    height: 100px;
    background-image: url("../../../static/images/shaixuan.png");
    background-position: center center;
    background-size: 60px 60px;
  }
  .eui-cells{
    position:unset!important;
  }
</style>
