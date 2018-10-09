<template>
  <div class="page">
      <!-- 这里需要一个订单编号  -->
      <mt-header title="支付成功" class='page-header'>
          <mt-button type="default" slot='right' @click.native='goToHome'  size="small" class='go-to-home'>完成</mt-button>
      </mt-header>
      <div class='main-content'>
        <div class='pay-mode'>
          <img src="./../../assets/img/goods/zhifu.png" alt="">
          <img src="./../../assets/img/goods/weixin.png" alt="">
          <img src="./../../assets/img/goods/yue.png" alt="">
        </div>
        <p>支付成功</p>
        <h6><strong style='font-size:40px;'>118.00</strong>元</h6>
        <div class='pay-msg'>
          <span class='pay-msg-title'>支付信息</span>
          <span class='pay-msg-bank'>招商银行信用卡（0707）</span>
          <strong class='pay-msg-money'>-118.00</strong>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'payOrder',
  data () {
    return {}
  },
  created () {},
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    goToHome () {
      this.$router.push({name: 'Home'})
    }
  },
  computed: {
  }
}
</script>

<style scoped lang='stylus'>
@import './../../assets/css/base-style.styl'
.page{
  .page-header{
    .go-to-home{
      position:absolute;
      top: 0px;
      right: 1rem;
      height: 40px;
    }
  }
  .main-content{
    .pay-mode{
      background: #fff;
      height: 7rem;
      >img{
        width: 3.3rem
        height: 3.3rem
        vertical-align middle
        margin-top: 1.8rem;
        margin-right: 1rem;
        margin-left: 1rem;
      }
    }
    >p{
      background:#fff;
      font-size:14px;
      color:$base-color;
      line-height:30px;
    }
    >h6{
      background:#fff;
      font-size:20px;
      line-height 60px;
      border-bottom:1px solid #eee;
    }
    .pay-msg{
      background:#fff;
      height:50px;
      text-align left
      line-height 50px
      font-size:14px;
      padding-left:1.5rem;
      padding-right:1.5rem;
      .pay-msg-title{
        line-height:50px;
        font-size:14px;
        color:#9b9b9b;
        display inline-block
        vertical-align: top;
      }
      .pay-msg-bank{
        margin-left:2rem;
        display inline-block
        max-width:10rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .pay-msg-money{
        float:right;
        color:$base-color;
      }
    }
  }
}
</style>
