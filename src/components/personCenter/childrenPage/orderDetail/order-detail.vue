<template>
  <div class="page">
      <mt-header title="订单详情" class='page-header'>
          <a @click='goBack' slot="left">
            <img class='img-item' src="./../../../../assets/img/back.png" alt="">
          </a>
      </mt-header>
      <!-- 订单分为不同的状态 带付款状态  带收货状态 退款售后状态  -->
      <div class='main-content'>
        <!-- 订单状态 -->
        <div class='main-content-title'>
          <span v-if='orderType==1'>代付款</span>
          <span v-if='orderType==2'>代收货</span>
          <span v-if='orderType==3'>退款售后</span>
          <span v-if='orderType==4'>已收货</span>
          <div class='main-content-title-img'>
            <img class='img-item' v-if='orderType==1' src="./../../../../assets/img/order/step1.png">
            <img class='img-item' v-if='orderType==2' src="./../../../../assets/img/order/step2.png">
            <img class='img-item' v-if='orderType==3' src="./../../../../assets/img/order/step3.png">
            <img class='img-item' v-if='orderType==4' src="./../../../../assets/img/order/step4.png">
          </div>
        </div>
        <div class='gray-content'></div>
        <!-- 商品的信息 -->
        <div class='goods-msg'>
          <div class='goods-msg-logistics'>
            <span>订单编号：</span>
            <span>201803249521</span>
            <span class='contactTheServer' @click='contactTheServer'>
              联系客服
            </span>
          </div>
          <ul class='goods-msg-list'>
            <li v-for='item in 4' :key='item'>
              <div class='goods-msg-img'>
                <img class='img-item' src="./../../../../assets/img/goods/4.png" alt="">
              </div>
              <div class='goods-msg-msg'>
                <h3>文玩铜锈貔貅摆件
                  <span class='goods-price'>￥59</span>
                </h3>
                <p>规格：铜制小貔貅
                  <span class='goods-num'>x1</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div class='gray-content'></div>
        <!-- 订单信息 -->
        <div class='logistics-msg'>
          <!-- 订单信息 -->
          <div class='logistics-msg-content'>
            <p>
              <span class='item-title'>订单编号:</span>
              <span class='item-content'>20184749174</span>
            </p>
            <p>
              <span class='item-title'>下单时间:</span>
              <span class='item-content'>2018-05-24 22:32:43</span>
            </p>
            <p>
              <span class='item-title'>支付方式:</span>
              <span class='item-content'>未支付</span>
            </p>
            <p>
              <span class='item-title'>支付时间:</span>
              <span class='item-content'>2018-05-24 22:32:43</span>
            </p>
          </div>
          <!-- 收货地址 -->
          <div class='logistics-msg-address'>
            <h3>吕小布  &nbsp;&nbsp; 1862777777</h3>
            <p>地址：湖北省 武汉市 洪山区 关谷一路 湖口一路 湖口社区</p>
          </div>
          <!-- 订单金额 -->
          <div class='logistics-msg-money'>
            <div class='logistics-msg-money-item'>
              <div class='item-title'>
                商品金额：
              </div>
              <strong class='item-value'>￥118.00</strong>
            </div>
            <div class='logistics-msg-money-item'>
              <div class='item-title'>
                运费：
              </div>
              <strong class='item-value'>+￥10.00</strong>
            </div>
          </div>
          <div class='gray-content'></div>
        </div>
      </div>
      <div class='footer'>
        <mt-button @click.native='payTheOrder' type='primary' class='footer-btn' size='small'>付款 30:24</mt-button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'coupon',
  data () {
    return {
      orderType: 1
    }
  },
  created () {},
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  },
  computed: {
    goodsId () {
      return this.$router.params.goodsId
    }
  }
}
</script>

<style scoped lang='stylus'>
@import './../../../../assets/css/base-style.styl'
.page{
  .main-content{
    .main-content-title{
      height: 60px;
      line-height: 60px;
      font-size: 24px;
      color: $base-color;
      background:#fff;
      text-align left;
      padding-left:1.5rem;
      .main-content-title-img{
        float:right;
        width:93px;
        height:50px;
        margin-top:5px;
        margin-right:1.5rem;
      }
    }
    .goods-msg{
      background:#fff;
      .goods-msg-logistics{
        height:40px;
        font-size:14px;
        margin-left:1.5rem;
        border-bottom 1px solid #eee;
        text-align left;
        line-height 40px
        .contactTheServer{
          background:url('./../../../../assets/img/person/contact-server.png') no-repeat left center;
          background-size:18px 18px
          float:right;
          padding-left:26px;
          margin-right:1.5rem;
          color:$base-color;
        }
      }
      .goods-msg-list{
        li{
          padding-top:0.6rem;
          padding-bottom:0.6rem;
          border-bottom:1px solid #eee;
          .goods-msg-img{
            float:left;
            margin-left:1.5rem;
            width:6rem;
            height:6rem;
          }
          .goods-msg-msg{
            margin-left:9rem;
            height:6rem;
            text-align left;
            >h3{
              line-height 30px;
              font-size:16px;
              .goods-price{
                float:right;
                color:$base-color;
                margin-right:1.5rem;
              }
            }
            >p{
              line-height 20px
              .goods-num{
                float:right;
                margin-right:1.5rem;
              }
            }
          }
        }
      }
    }
    .logistics-msg{
      background:#fff;
      text-align left
      .logistics-msg-content{
        padding-top:1.5rem;
        padding-bottom:1.5rem;
        border-bottom 1px solid #eee;
        margin-left:1.5rem;
        >p{
          line-height:24px;
          .item-title{
            color:#9b9b9b;
          }
          .item-content{
            margin-left:1rem;
          }
        }

      }
      .logistics-msg-address{
        border-bottom: 1px solid #eee;
        padding-bottom: 1.5rem;
        padding-top: 1rem;
        margin-left:1.5rem;
        >h3{
          font-size:16px;
          line-height:36px;
        }
        >p{
          line-height:24px;
          margin-right:1.5rem;
        }
      }
      .logistics-msg-money{
        padding-bottom: 1rem;
        padding-top: 1rem;
        margin-left:1.5rem;
        .logistics-msg-money-item{
          line-height:30px;
          .item-title{
            display inline-block;
            width:60px;
            text-align:right;
            color:#9b9b9b;
          }
          .item-value{
            float:right;
            margin-right:1.5rem;
          }
        }
      }
    }
  }
}
</style>
