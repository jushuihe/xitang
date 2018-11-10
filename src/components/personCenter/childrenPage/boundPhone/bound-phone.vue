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
                <input id='phoneInput' v-model='phoneNum'  type="text" placeholder="请输入手机号">
              </div>
          </div>
          <div class='input-content'>
              <label for="securityCodeInput">验证码</label>
              <div>
                <input type="text" id='securityCodeInput' v-model='securityCodeNum' class='securityCodeInput' placeholder="请输入验证码">
              </div>
              <mt-button @click.native='sendTheSecurityCode' v-if='showSendCodeBtn' type='default' class='send-btn' size='small'>发送验证码</mt-button>
              <mt-button disabled v-if='!showSendCodeBtn' type='default' class='send-btn' size='small'>等待中({{intervalTime}}S)</mt-button>
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
      savePhoneNum: '',
      intervalTime: 10,
      showSendCodeBtn: true
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
      if (this.phoneNum.length !== 11) {
        this.Toast('电话号码不正确')
        return
      }
      this.Indicator.open()
      let result = await this.goodsAPI.smsGetCode(param)
      this.Indicator.close()
      if (result.status === 0) {
        this.saveCode = result.code
        this.savePhoneNum = this.phoneNum
        this.showSendCodeBtn = false
        this.reduceTheIntervalTime()
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
      result = this.show.dealResult1(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        this.Toast('绑定成功')
        let t = Date.now()
        this.sleep(t, 1000)
        this.goBack()
      }
    },
    // 3、每隔一秒减少等待时间
    reduceTheIntervalTime () {
      var that = this
      let timer = setTimeout(function fn (that) {
        if (that.intervalTime > 1) {
          that.intervalTime--
          setTimeout(fn, 1000, that)
        } else {
          that.showSendCodeBtn = true
          clearTimeout(timer)
        }
      }, 1000, that)
    },
    goBack () {
      this.$router.back()
    },
    // 发送验证码
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
    },
    // 休眠函数
    sleep (t, d) {
      while (Date.now() - t <= d);
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
