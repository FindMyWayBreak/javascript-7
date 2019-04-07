<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menu">
        <ul type="none">
          <li class="menu-item" v-for="(item,index) in goods" :key="index" :class="{active:currentIndex===index}" @click="scrollTo(index)">
            <span class="text border-1px">
              <span v-if="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foods">
        <ul type="none">
          <li v-for="(item,index) in goods" :key="index" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul type="none">
              <li v-for="(food,index) in item.shopGoods" :key="index" @click="selectFood(food)" class="food-item border-1px">
                <div class="icon">
                  <img width="57" height="57" :src="purl + food.goodsImg">
                </div>
                <div class="content">
                  <h2 class="name">{{food.goodsName}}</h2>
                  <p class="description">{{food.goodsIntroduce}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.saleCount}}份</span>
                    <!-- <span class="">好评率{{food.rating}}%</span> -->
                  </div>
                  <div class="price">
                    ￥
                    <span class="now">{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <load-more tip="loading" v-if="loading"></load-more>
    <div style="margin-left: 40%;margin-top: 20%;" v-if="goods.length===0 && !loading">
      <img src="../../../static/images/nodata.png" style="width:80px;height:80px;vertical-align:middle;margin-right:6px" /><br/>
    </div>
    <food :food="selectedFood" ref="food"></food>
    <toast v-model="showToast" type="text" position="bottom" width="15em" :text="info"></toast>
    <lodingweixin ref="weixin"></lodingweixin>
  </div>
</template>

<script>
import { Toast, Loading, LoadMore } from 'vux'
import Iscroll from '../../../node_modules/iscroll/build/iscroll-probe'
// import bscroll from 'better-scroll'
import shopcart from './shopcart'
import cartcontrol from './cartcontrol'
import lodingweixin from '../../components/base/LodingWeiXin.vue'
import food from './food'
import constant from '../../js/constant.js'
// var appData = require('../../../data.json')

// const ERR_OK = 0
export default {
  components: {
    shopcart,
    cartcontrol,
    food,
    Toast,
    Loading,
    LoadMore,
    constant,
    lodingweixin
  },
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      token: '',
      purl: constant.staticDomain,   // 图片前缀地址
      shopId: '',    // 传参 店铺id
      memberId: '',
      goods: [],
      foodListHeights: [],
      currentY: 0,
      selectedFood: {},
      info: '',
      showToast: false,
      loading: false    // 等待动画
      // isiOS: true// 是否苹果设备
    }
  },
  mounted () {
    var user = sessionStorage.getItem('user')
    if (user) {
      user = JSON.parse(user)
      this.user = user.account
      this.token = user.token
      this.lodingPop()
    } else {
      console.log('000000000')
      var _this = this
      this.$refs.weixin.weiXinLogin(function () {
        var user = sessionStorage.getItem('user')
        user = JSON.parse(user)
        _this.user = user.account
        _this.token = user.token
        console.log('11111111')
        _this.lodingPop()
      })
    }
  },
  watch: {
    selectFoods: function () { }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.foodListHeights.length - 1; i++) {
        let heightBottom = this.foodListHeights[i]
        let heightTop = this.foodListHeights[i + 1]
        // 对滑动后currentY值不足的情况进行修正
        let diff = Math.abs(this.currentY - heightTop)
        if (diff < 5) {
          this.currentY = heightTop
        }
        // 判断currentY当前所在的区间
        if (this.currentY < heightTop && this.currentY >= heightBottom) {
          return i
        }
      }
    },
    selectFoods () {
      let foods = []
      this.goods.forEach(good => {
        good.shopGoods.forEach(food => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      this.$store.commit({
        type: 'changeFoods',
        foodList: foods
      })
    }
  },
  methods: {
    lodingPop () {
      let _this = this
      this.memberId = constant.getUrlParam('memberId')
      console.log('aaa')
      if (this.memberId) {
        this.bandMember()
      }
      this.shopId = constant.getUrlParam('shopId')
      if (!this.shopId) {
        this.shopId = localStorage.getItem('shopId')
      }
      console.log('bbb')
      console.log('店铺id' + this.shopId)
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      // var goods = appData.goods
      this.loading = true
      var url = '/mlm/shop/shop/getShopDetail.htm'
      var params = {
        token: _this.token,
        id: this.shopId
      }
      this.$http.post(url, params).then(response => {
        console.log('ccc')
        var resBody = response.body
        console.log(resBody.isSuccess)
        if (resBody.isSuccess === 0) {
          _this.goods = resBody.result
          this.loading = false
        } else {
          this.showToast = true
          this.info = resBody.errorMsg
        }
        _this.$nextTick(() => {
          _this.initScroll()
          _this.calcHeight()
        })
      }, response => {
        console.log('error,no data')
      })
    },
    // 会员锁定
    bandMember () {
      var url = '/mlm/shop/memberLock/memberBound.htm'
      var params = {
        token: this.token,
        memberId: this.memberId
      }
      this.$http.post(url, params).then(response => {
        console.log(response.body)
        var resBody = response.body
        if (resBody.isSuccess === 0) {}
      }, response => {
        console.log('error,no data')
      })
    },
    // 滚动插件初始化
    initScroll () {
      var userAgent = navigator.userAgent
      var isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      this.menuScroll = new Iscroll(this.$refs.menu, {
        // click: true
        click: !isiOS
      })
      this.foodsScroll = new Iscroll(this.$refs.foods, {
        probeType: 3,
        // click: true
        click: !isiOS
      })
      let _this = this
      this.foodsScroll.on('scroll', function () {
        _this.currentY = Math.abs(Math.round(this.y))
      })
    },
    // 计算每一个foodlist元素的高度，累加并输出为一个数组
    calcHeight () {
      let foodList = this.$refs.foods.getElementsByClassName('food-list-hook')
      let height = 0
      this.foodListHeights.push(height)
      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i].clientHeight
        this.foodListHeights.push(height)
      }
    },
    scrollTo (index) {
      let target = this.foodListHeights[index]
      this.foodsScroll.scrollTo(0, -target, 300)
    },
    selectFood (food) {
      // alert('点击进入视频详情')
      this.selectedFood = food
      this.$refs.food.show()
    }
  },
  created () {}
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixin.styl"
  .goods
    display: flex
    position: absolute
    top: 175px
    bottom: 48px
    width: 100%
    overflow: hidden
    .menu-wrapper
      touch-action: none
      position: relative
      // flex: 0 0 80px
      // width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        padding: 0 12px
        font-size: 0
        color: rgb(20,20,20)
        &:last-child > .text
          border-none()
        &.active
          position: relative
          margin-top: -1px
          background: #F2F2F2
          z-index: 10
          width: 80px
          box-sizing: border-box
          border-radius 0
          .text
            border-none()
            font-weight: 700
        .text
          display: table-cell
          vertical-align: middle
          line-height: 14px
          width: 56px
          font-size: 12px
          border-1px(rgba(7,17,27,0.2))
          .icon
            display: inline-block
            width: 12px
            height: 12px
            margin-top: 1px
            margin-right: 2px
            vertical-align: top
            background-size: 12px 12px
            background-repeat: no-repeat
            &.discount
              bg-image("discount_3")
            &.decrease
              bg-image("decrease_3")
            &.guarantee
              bg-image("guarantee_3")
            &.invoice
              bg-image("invoice_3")
            &.special
              bg-image("special_3")
        .title
          font-size: 10px
    .foods-wrapper
      touch-action: none
      position: relative
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        border-left: 2px solid #d0dde1
        line-height: 26px
        font-size: 12px
        color: rgb(147,153,159)
        background: #f3f5f7
      .food-item
        display: flex
        padding-bottom: 16px
        margin: 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7,17,27)
          .description, .extra
            line-height: 12px
            font-size: 10px
            color: rgb(147,153,159)
          .description
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            line-height: 24px
            font-size: 10px
            font-weight: 700
            color: rgb(240,20,20)
            .now
              margin-right: 8px
              font-size: 14px
            .old
              text-decoration: line-through
              color: rgb(147,153,159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
