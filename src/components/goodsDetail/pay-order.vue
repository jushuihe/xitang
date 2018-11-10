<template>
  <div class="page">
      <!-- 这里需要一个订单编号  -->
      <mt-header title="支付订单" class='page-header'>
          <a @click='goBack' slot="left">
            <img class='img-item' src="./../../assets/img/back.png" alt="">
          </a>
      </mt-header>
      <div class='main-content'>
        <div class='order-content'>
          <div class='success-msg'>
            <img class='order-success' src="./../../assets/img/goods/order-success.png" alt="">
            &nbsp;&nbsp;订单已提交成功
          </div>
          <div class='order-msg'>
            <p>订单金额</p>
            <h3>
              <strong style='font-size:46px;'>{{totalPrice.toFixed(2)}}</strong>
              元
            </h3>
            <p>请选择支付方式，并在120分钟内完成支付</p>
          </div>
        </div>
        <div class='gray-content'></div>
        <!-- 付款的时候如果是线下商品绑定店员ID的组件 -->
        <div v-if='!isOnlineGoods' class='bank-salesclerk'>
          <div class='bank-salesclerk-title'>
            <span class='bank-salesclerk-text'>
              推荐人：
            </span>
          </div>
          <div class='bank-salesclerk-content'>
            <span class='bank-salesclerk-text'>
              {{choicedSalerName}}
            </span>
          </div>
          <div class='bank-salesclerk-btn'>
            <mt-button type="primary" @click.native='getTheSaoYiSao'  size="small" class='btn'>获取</mt-button>
          </div>
        </div>
        <div v-if='!isOnlineGoods' class='gray-content'></div>
        <ul class='pay-mode'>
          <li @click='choicedThePayMode(1)'>
            <div class='selected-img'>
              <img v-if='choicedPayMode==1' class='img-item' src='./../../assets/img/selected.png'>
              <img v-if='choicedPayMode!=1' class='img-item' src='./../../assets/img/unselected.png'>
            </div>
            <div class='pay-mode-item three' >
              微信支付
            </div>
          </li>
        </ul>
      </div>
      <div class='footer'>
        <mt-button type="primary" @click.native='payTheOrder'  size="large" class='submit-order'>立即支付</mt-button>
      </div>
  </div>
</template>

<script>
var wx = require('weixin-js-sdk')
var pingpp = require('pingpp-js')
export default {
  name: 'payOrder',
  data () {
    return {
      // 当前选中的支付方式 1 为余额   2为支付宝方式  3 为微信支付
      choicedPayMode: 1,
      // 当前页面订单集合的几个订单的总额
      totalPrice: 0.00,
      // 默认都是线上商品
      isOnlineGoods: true,
      choicedSalerName: '',
      choicedSalerId: ''
    }
  },
  created () {
    this.getOrderDetailById(this.orderId)
    this.judgeTheErweimaMsg()
  },
  methods: {
    // 1、通过订单表ID获取订单详情
    async getOrderDetailById (orderId) {
      let param = {
        rowId: orderId
      }
      this.Indicator.open()
      let result = await this.goodsAPI.getOrderDetailById(param)
      result = this.show.dealResult(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        // isOnline 是否线上商品(0线下，1线上)
        this.isOnlineGoods = result.isOnline
        this.totalPrice = result.totalPrice
      }
    },
    // 2、通过订单表ID获取订单详情
    async pingxxGetCharge () {
      let param = {
        order_id: this.orderId,
        pay_mode: 1,
        open_id: this.openId
      }
      this.Indicator.open()
      let result = await this.goodsAPI.pingxxGetCharge(param)
      this.Indicator.close()
      pingpp.createPayment(result, (result, err) => {
        if (result === 'success') {
          // 成功之后跳转到订单列表页面
          this.$router.push({name: 'OrderList'})
        } else if (result === 'fail') {
          this.Toast('支付失败')
        } else if (result === 'cancel') {
        }
      })
    },
    // 3、获取微信js-sdk的config
    async getWxinfoConfig () {
      let param = {
        url: window.location.href
      }
      this.Indicator.open()
      let result = await this.goodsAPI.getWxinfoConfig(param)
      this.Indicator.close()
      this.wxjsMain(result)
    },
    // 获取到微信SDK之后调用wx的方法调起扫一扫功能
    wxjsMain (cfgObj) {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx57127d6c1d11d825', // 必填，公众号的唯一标识
        timestamp: cfgObj.timestamp, // 必填，生成签名的时间戳
        nonceStr: cfgObj.noncestr, // 必填，生成签名的随机串
        signature: cfgObj.signature, // 必填，签名
        jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
      })
      wx.ready(function () {
        wx.scanQRCode({
          desc: 'scanQRCode desc',
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            sessionStorage.setItem('erweimaCodeMsg', res.resultStr)
            location.reload(true)
          },
          error: function (res) {
            if (res.errMsg.indexOf('function_not_exist') > 0) {
              alert('版本过低请升级')
            }
          }
        })
      })
      /**
       * config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
       * */
      wx.error(function (res) {
        console.log(res)
      })
    },
    goBack () {
      this.MessageBox.confirm('确定取消支付吗?').then(action => {
        this.$router.go(-1)
      }).catch(data => {
        console.log(2)
      })
    },
    payTheOrder () {
      if (this.isOnlineGoods) {
        this.pingxxGetCharge()
      } else {
        if (this.choicedSalerId) {
          this.pingxxGetCharge()
        } else {
          this.Toast('支付线下商品必须要有推荐人')
        }
      }
    },
    // 切换付款方式
    choicedThePayMode (index) {
      // this.choicedPayMode = index
    },
    // 打开微信扫一扫功能，获取扫描到的店员的二维码
    getTheSaoYiSao () {
      console.log(1)
      this.getWxinfoConfig()
    },
    // 判断是否有商品信息，如果有商品信息，直接跳转到商品的详情页面
    judgeTheErweimaMsg () {
      if (this.erweimaCodeMsg) {
        let obj = JSON.parse(decodeURI(this.erweimaCodeMsg))
        if (obj && Object.keys(obj).length > 0) {
          if (obj.type === 1) {
            this.choicedSalerName = obj.nickname
            this.choicedSalerId = obj.userId
          } else {
            this.Toast('请扫描店员二维码')
          }
        }
      }
    }
  },
  computed: {
    orderId () {
      return this.$route.params.orderId
    },
    openId () {
      return this.str.readS('openId')
    },
    erweimaCodeMsg () {
      return sessionStorage.getItem('erweimaCodeMsg')
    }
  },
  watch: {
  }
}
</script>

<style scoped lang='stylus'>
@import './../../assets/css/base-style.styl'
.page{
  .main-content{
    .order-content{
      background:#fff;
      .success-msg{
        font-size 14px;
        color:#4a4a4a;
        line-height:65px;
        margin-left:1rem;
        border-bottom:1px solid #eee;
        .order-success{
          width:32px;
          height:32px;
          vertical-align: middle;
        }
      }
      .order-msg{
        >p{
          line-height 20px;
          &:first-child{
            margin-top:1.5rem;
          }
          &:last-child{
            color:#D0021B
            padding-bottom:1.5rem;
          }
        }
        h3{
          font-size:20px;
          line-height:60px;
          color:$base-color;
        }
      }
    }
    // 绑定销售人员的部分的样式
    .bank-salesclerk{
      background: #fff;
      height: 40px;
      position: relative;
      .bank-salesclerk-title{
        float:left;
        margin-left:1.5rem;
      }
      .bank-salesclerk-content{
        margin-left:6.5rem;
        text-align:left;
      }
      .bank-salesclerk-btn{
        position:absolute;
        top:5px;
        right:1.5rem;
        .btn{
          height:30px;
          font-size:14px;
          background:$base-color;
        }
      }
      .bank-salesclerk-text{
        font-size:14px;
        line-height:40px;
      }
    }
    .pay-mode{
      list-style none;
      li{
        background:#fff;
        text-align left;
        line-height 50px;
        border-bottom:1px solid #eee;
        position relative
        .selected-img{
          width:1.6rem;
          height:1.6rem;
          float:left;
          margin-left:1.5rem;
          margin-top:-0.8rem;
          position:absolute;
          top:50%;
          border-radius 50%;
          overflow:hidden;
          opacity 0.7
          >img{
            vertical-align top
          }
        }
        .pay-mode-item{
          margin-left:4.4rem;
          padding-left:25px;
          font-size:14px;
          background-size:18px 18px !important;
          &.one{
            background:url('./../../assets/img/goods/yue.png') no-repeat center left;
          }
          &.two{
            background:url('./../../assets/img/goods/zhifu.png') no-repeat center left;
          }
          &.three{
            background:url('./../../assets/img/goods/weixin.png') no-repeat center left;
          }
        }
      }
    }
  }
  .footer{
    background:#ececec !important;
    padding-right:1rem;
    .submit-order{
      background:$base-color;
    }
  }
}
</style>
