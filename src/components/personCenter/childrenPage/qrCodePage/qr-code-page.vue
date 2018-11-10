<template>
  <div class='page'>
      <mt-header title='我的二维码' class='page-header'>
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
                    <p>{{userMsg.phone}}</p>
                </div>
            </div>
            <div id='qrcode'></div>
            <p class='hint-content'>付款前扫一扫上面的二维码图案，计算业绩</p>
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
      userMsg: {}
    }
  },
  components: {},
  created () {
  },
  mounted () {
    this.getShopUserInfo()
    this.initQrcode()
  },
  methods: {
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
      let user = {
        type: 1,
        userId: this.userMsg.userId,
        phone: this.userMsg.phone,
        nickname: this.userMsg.nickname,
        openId: this.userMsg.openId
      }
      this.qrcode.makeCode(JSON.stringify(user))
      document.getElementById('qrcode').title = '新生成的二维码'
    },
    goBack () {
      this.$router.back()
    }
  },
  computed: {
    wechatHeadImgUrl () {
      return this.str.readS('wechatHeadImgUrl')
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
        .main-content-title{
            padding-top:1.5rem;
            padding-bottom:2rem;
            .avator{
                float:left;
                width:3rem;
                height:3rem;
                margin-left:2rem
                // border:2px solid $base-color;
                border-radius 8px
                overflow hidden
                &>img{
                    width:100%;
                    height:100%;
                }
            }
            .userName{
                text-align left;
                margin-left:6rem;
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
