<template>
  <div class='page'>
      <mt-header title='绑定手机号' class='page-header'>
          <a @click='goBack' slot='left'>
            <img class='img-item' src='./../../../../assets/img/back.png' alt=''>
          </a>
      </mt-header>
      <div class='main-content'>
          <div class='input-content'>
              <label for="phoneInput">手机号</label>
              <div>
                <input id='phoneInput' v-model='phoneNum' type="text" placeholder="请输入手机号">
              </div>
          </div>
          <div class='input-content'>
              <label for="securityCodeInput">验证码</label>
              <div>
                <input type="text" id='securityCodeInput' v-model='securityCodeNum' class='securityCodeInput' placeholder="请输入验证码">
              </div>
              <mt-button @click.native='sendTheSecurityCode' type='default' class='send-btn' size='small'>发送验证码</mt-button>
          </div>
          <div class='footer-btn-content'>
              <mt-button @click.native='boundThePhone' type='primary' class='footer-btn' size='large'>绑定手机号</mt-button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionDetail',
  data () {
    return {
      phoneNum: '',
      securityCodeNum: '',
      saveCode: '',
      savePhoneNum: ''
    }
  },
  components: {},
  created () {
  },
  methods: {
    // 1、发送验证码
    async smsGetCode () {
      let param = {
        phone: this.phoneNum,
        type: 0
      }
      this.Indicator.open()
      let result = await this.goodsAPI.smsGetCode(param)
      this.Indicator.close()
      if (result.status === 0) {
        this.saveCode = this.result.code
        this.savePhoneNum = this.phoneNum
      } else {
        this.Toast(result.msg)
      }
    },
    // 2、绑定微信用户
    async wechatBindUser () {
      let param = {
        phone: this.savePhoneNum,
        wechatName: this.wechatName
      }
      this.Indicator.open()
      let result = await this.userAPI.wechatBindUser(param)
      result = this.show.dealResult(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        this.Toast('绑定成功')
        this.goBack()
      }
    },
    goBack () {
      this.$router.back()
    },
    sendTheSecurityCode () {
      this.smsGetCode()
    },
    // 绑定用户的按钮
    // 先验证输入的验证码是否和接口返回的验证码是一样的
    boundThePhone () {
      if (Number(this.securityCodeNum) === Number(this.saveCode)) {
        this.wechatBindUser()
      } else {
        this.Toast('输入的验证码不一致')
      }
    }
  },
  computed: {
  }
}
</script>

<style scoped lang='stylus'>
@import './../../../../assets/css/base-style.styl'
.page {
  font-size: 1.2rem
  .main-content{
    text-align left
    .input-content{
        background:#fff;
        position:relative;
        padding-bottom:0.5rem;
        &>label{
            line-height: 40px;
            font-size: 14px;
            padding-left: 1.5rem;
            float:left;
        }
        &>div {
            margin-right:1rem;
            margin-left:70px;
            line-height: 40px;
            font-size: 14px;
            &>input{
                width:95%;
                height:30px;
                padding-left:1rem;
                border: 1px solid #eee;
                border-radius: 5px;
                outline none;
                &.securityCodeInput{
                    width:60%;
                }
            }
        }
        .send-btn{
            position:absolute;
            right:1rem;
            top:5px;
        }
    }
    .footer-btn-content{
        padding:1rem;
        background:#fff;
        .footer-btn{
            background:$base-color;
        }
    }
  }
}
</style>
