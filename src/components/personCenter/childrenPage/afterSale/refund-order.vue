<template>
  <div class='page'>
      <mt-header title='退款订单' class='page-header'>
          <a @click='goBack' slot='left'>
            <img class='img-item' src='./../../../../assets/img/back.png' alt=''>
          </a>
      </mt-header>
      <div class='main-content'>
        <!-- 顶部的商品信息 部分 -->
        <div class='goods-msg'>
          <div class='goods-msg-logistics'>
            <span>订单编号：</span>
            <span>201803249521</span>
            <span class='contactTheServer' @click='contactTheServer'>
              退款中
            </span>
          </div>
          <ul class='goods-msg-list'>
            <li v-for='item in 1' :key='item'>
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
        <div class='return-money'>
            <span>退款金额：</span>
            <strong class='goods-price'>￥<span>118.00</span></strong>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  components: {},
  created () {
    // this.getTheGoodsComment()
  },
  methods: {
    goBack () {
      this.$router.back()
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
              .goods-price{
                float:right;
                margin-right:1.5rem;
                font-weight:500;
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
    .return-money{
        line-height 40px;
        height:40px;
        color:#9b9b9b;
        font-size:14px;
        background:#fff;
        text-align:left;
        padding-left:1.5rem;
        .goods-price{
            color:$base-color;
            >span{
                font-size:18px;
            }
        }
    }
  }
}
</style>
