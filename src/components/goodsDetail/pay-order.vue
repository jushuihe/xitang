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
              <strong style='font-size:46px;'>118.00</strong>
              元
            </h3>
            <p>请选择支付方式，并在120分钟内完成支付</p>
          </div>
        </div>
        <div class='gray-content'></div>
        <ul class='pay-mode'>
          <li @click='choicedThePayMode(1)'>
            <div class='selected-img'>
              <img v-if='choicedPayMode==1' class='img-item' src='./../../assets/img/selected.png'>
              <img v-if='choicedPayMode!=1' class='img-item' src='./../../assets/img/unselected.png'>
            </div>
            <div class='pay-mode-item one'>
              余额支付
            </div>
          </li>
          <li @click='choicedThePayMode(2)'>
            <div class='selected-img'>
              <img v-if='choicedPayMode==2' class='img-item' src='./../../assets/img/selected.png'>
              <img v-if='choicedPayMode!=2' class='img-item' src='./../../assets/img/unselected.png'>
            </div>
            <div class='pay-mode-item two'>
              支付宝
            </div>
          </li>
          <li @click='choicedThePayMode(3)'>
            <div class='selected-img'>
              <img v-if='choicedPayMode==3' class='img-item' src='./../../assets/img/selected.png'>
              <img v-if='choicedPayMode!=3' class='img-item' src='./../../assets/img/unselected.png'>
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
export default {
  name: 'payOrder',
  data () {
    return {
      // 当前选中的支付方式 1 为余额   2为支付宝方式  3 为微信支付
      choicedPayMode: 1
    }
  },
  created () {},
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    payTheOrder () {
      console.log('支付当前的订单')
      this.$router.push({name: 'PaySuccess', orderId: 1})
    },
    choicedThePayMode (index) {
      this.choicedPayMode = index
    }
  },
  computed: {
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
