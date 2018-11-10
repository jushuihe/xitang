<template>
  <div class='page'>
      <mt-header title='我的推广码' class='page-header'>
          <a @click='goBack' slot='left'>
            <img class='img-item' src='./../../../../assets/img/back.png' alt=''>
          </a>
      </mt-header>
      <div class='main-content'>
        <div class='main-content-container'>
          <div class='main-content-title'>
            <div class='avator'>
              <img :src="wechatHeadImgUrl" alt="">
            </div>
            <div class='userName'>
              <h3>{{userMsg.nickname}}</h3>
            </div>
          </div>
          <div id='qrcode'></div>
        </div>
      </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'TransactionDetail',
  data () {
    return {
      phoneNum: '',
      securityCodeNum: '',
      saveCode: '',
      savePhoneNum: '',
      intervalTime: 10,
      showSendCodeBtn: true,
      userMsg: {},
      getThePromotionUrl: ''
    }
  },
  components: {},
  created () {
  },
  mounted () {
    this.initQrcode()
    this.getMyPromotion()
    this.getShopUserInfo()
  },
  methods: {
    // 1、获取推广码的地址
    async getMyPromotion () {
      let param = {
        open_id: 'oLbvdjtLmUaXJYv5PyoMsmAcz9Jk'
      }
      this.Indicator.open()
      let result = await this.goodsAPI.getMyPromotion(param)
      this.Indicator.close()
      this.getThePromotionUrl = result.url
      if (this.getThePromotionUrl) {
        this.handleQrcode()
      }
    },
    // 1、获取店员的信息
    async getShopUserInfo () {
      let param = {}
      this.Indicator.open()
      let result = await this.userAPI.getShopUserInfo(param)
      result = this.show.dealResult1(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        this.userMsg = result.user
        this.handleQrcode()
      }
    },
    initQrcode () {
      this.qrcode = new QRCode(document.getElementById('qrcode'), {
        width: 300,
        height: 300
      })
    },
    handleQrcode () {
      this.qrcode.clear()
      // 将地址写入二维码中
      this.qrcode.makeCode(this.getThePromotionUrl)
      document.getElementById('qrcode').title = '新生成的二维码'
    },
    goBack () {
      this.$router.back()
    }
  },
  computed: {
    wechatHeadImgUrl () {
      return this.str.readS('wechatHeadImgUrl')
    },
    openId () {
      return this.str.readS('openId')
    }
  }
}
</script>

<style scoped lang='stylus'>
@import './../../../../assets/css/base-style.styl'
.page {
  font-size: 1.2rem
  .main-content{
    background:$base-color;
    .main-content-container{
        width:90%;
        margin:4rem auto;
        background:#fff;
        border-radius:10px;
        padding-bottom:3rem;
        position:relative;
        // padding-top:3rem;
        .main-content-title{
            padding-top:1.5rem;
            padding-bottom:2rem;
            .avator{
                float:left;
                width:4rem;
                height:4rem;
                margin-left:2rem
                position:absolute;
                top:50%;
                margin-top:-2rem;
                margin-left:-2rem;
                left:50%;
                &>img{
                    width:100%;
                    height:100%;
                }
            }
            .userName{
                text-align center;
            }
        }
        #qrcode{
            background:#fff;
            width:300px;
            height:300px;
            margin:0rem auto;
        }
        .hint-content{
            font-size:14px;
            margin-top:2rem;
        }
    }
  }
}
</style>
