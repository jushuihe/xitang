<template>
  <div class="page">
      <mt-header title="确认订单" class='page-header'>
          <a @click='goBack' slot="left">
            <img class='img-item' src="./../../assets/img/back.png" alt="">
          </a>
      </mt-header>
      <div class='main-content'>
        <!-- 当前选中的收货地址 -->
        <div class='choicedAddress' @click='goToTheAddressPage'>
            <div class='choiced-address-img'></div>
            <div class='choiced-address-msg'>
                <h2>收件人：
                    <span>吕小布</span>
                    <span style='float:right;margin-right:10px'>18677777777</span>
                </h2>
                <p>收货地址：
                    <span>湖北省武汉市洪山区光谷一路佛祖岭湖口一路湖口社区13栋2209号</span>
                </p>
            </div>
            <div class='choiced-address-footer'></div>
        </div>
        <div class='gray-content'></div>
        <!-- 选中的商品列表 -->
        <ul class='goods-list'>
            <li v-for='item in 4' :key='item'>
                <div class='goods-img'>
                    <img src='./../../assets/img/goods/4.png' class='img-item'>
                </div>
                <div class='goods-msg'>
                    <h2>文玩铜锈貔貅摆件</h2>
                    <p>规格：<span>铜制小貔貅</span></p>
                    <h6>
                        <span class='goods-price'>￥<strong style='font-size:20px;'>59</strong></span>
                        <span style='text-decoration-line:line-through;'>￥99</span>
                        <span style='float:right'>X <span>2</span></span>
                    </h6>
                </div>
                <div class='gray-content'></div>
            </li>
        </ul>
        <!-- 运费以及留言 -->
        <div class='freight-addition'>
            <div>
                <span>运费</span>
                <span style='float:right;margin-right:1.5rem'>￥8</span>
            </div>
            <div>
                <span>留言</span>
                <input class='right-input' type='text' placeholder='给商家留言'>
            </div>
        </div>
      </div>
      <!-- 固定在底部的提交订单的部分 -->
      <div class='footer'>
        <span>合计：
            <span class='goods-price'>￥<strong style='font-size:20px;'>118.00</strong></span>
        </span>
        <div>
            <mt-button type="primary" @click.native='submitTheOrder'  size="large" class='submit-order'>提交订单</mt-button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'confirmOrder',
  data () {
    return {}
  },
  created () {
    console.log(this.goodsMsg)
    console.log(this.goodsId)
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    submitTheOrder () {
      this.$router.push({name: 'PayOrder', params: { 'orderId': 1 }})
    },
    // 跳转到收货地址的页面
    goToTheAddressPage () {
      this.$router.push({name: 'ShippingAddress'})
    }
  },
  computed: {
    goodsMsg () {
      return this.$route.query.goodsMsg
    },
    goodsId () {
      return this.$route.query.goodsId
    }
  }
}
</script>

<style scoped lang='stylus'>
@import './../../assets/css/base-style.styl'
.page{
    .page-header{
        position:fixed;
        top:0px;
        width:100vw;
    }
    .main-content{
        background:#ececec;
        padding-top:40px;
        padding-bottom:50px;
        box-sizing border-box
        min-height 100vh
        .choicedAddress{
            background:#fff;
            .choiced-address-img{
                float:left;
                width:5rem;
                height:8rem;
                background:url('./../../assets/img/goods/address.png') no-repeat center;
                background-size:24px 24px;
            }
            .choiced-address-msg{
                margin-left:5rem;
                margin-right:1rem;
                padding-right:1rem;
                min-height:5rem;
                text-align left;
                background:url('./../../assets/img/addMore.png') no-repeat center right;
                background-size:12px 20px;
                h2{
                    line-height 50px;
                }
                p{
                    line-height 20px
                    margin-bottom:20px
                    white-space normal
                }
            }
            .choiced-address-footer{
                width:100vw;
                height:3px;
                background:url('./../../assets/img/goods/footer.png') repeat;
            }
        }
        .goods-list{
            list-style none
            &>li{
                background:#fff;
                padding-top:1.5rem;
                .goods-img{
                    float: left;
                    width: 6.6rem;
                    height: 6.6rem;
                    margin-left:1.5rem;
                    text-align left
                }
                .goods-msg{
                    margin-left:9.6rem;
                    margin-right:1.5rem;
                    min-height:7rem;
                    text-align left;
                    margin-bottom:1.5rem;
                    >h2{
                        font-size:16px;
                        color:#4a4a4a;
                        line-height 3rem;
                    }
                    >p{
                        font-size:12px;
                        color:#aaa;
                        line-height:1.6rem
                    }
                    >h6{
                        font-size:12px;
                        color:#aaa;
                        line-height:2rem
                        .goods-price{
                            color:$base-color;
                            font-weight:600;
                        }
                    }
                }
            }
        }
        .freight-addition{
            font-size:14px;
            color:#4a4a4a;
            line-height 45px;
            background:#fff;
            margin-bottom:5rem;
            >div{
                margin-left:1.5rem;
                border-bottom:1px solid #eee;
                text-align left
                .right-input{
                    float:right;
                    margin-right:1.5rem;
                    height:45px;
                    text-align right
                    outline none
                    border 0px
                }
            }
        }
    }
    .footer{
        width:100vw;
        position fixed;
        height:50px;
        bottom:0px;
        text-align left;
        box-sizing border-box
        padding-left:1rem;
        background:#fff;

        &>span{
            font-size:15px;
            color:#4a4a4a;
            line-height:50px;
            .goods-price{
                color:$base-color;
            }
        }
        &>div{
            position:absolute;
            width:9.2rem;
            height:50px;
            right:0px;
            top:0px;
            .submit-order{
                background:$base-color;
                height:100%;
                border-radius 0px
                border:0px;
                box-shadow none;
            }
        }
    }
}
</style>
