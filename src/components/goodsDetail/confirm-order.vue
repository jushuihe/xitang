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
        <div class='shop-content' v-for='item1 in allGoodsList' v-if='item1.shopName' :key='item1.shopId'>
            <div class='shop-content-title'>
                {{item1.shopName}}
            </div>
            <!-- 选中的商品列表 -->
            <ul class='goods-list'>
                <li v-for='item in item1.carts' v-if='item.goodsName' :key='item.goodsId'>
                    <div class='goods-img'>
                        <img src='./../../assets/img/goods/4.png' class='img-item'>
                    </div>
                    <div class='goods-msg'>
                        <h2>{{item.goodsName}}</h2>
                        <p>规格：<span>{{item.goodsSpecsName}}</span></p>
                        <h6>
                            <span class='goods-price'>￥<strong style='font-size:20px;'>{{item.price}}</strong></span>
                            <span style='text-decoration-line:line-through;'>￥{{item.priceShow}}</span>
                            <span style='float:right'>X <span>{{item.orderNumber}}</span></span>
                        </h6>
                    </div>
                    <div class='gray-content'></div>
                </li>
            </ul>
        </div>
        <!-- 运费以及留言 -->
        <div class='freight-addition'>
            <div>
                <span>运费</span>
                <span style='float:right;margin-right:1.5rem'>￥8</span>
            </div>
            <div>
                <span>留言</span>
                <input class='right-input' type='text' v-model='orderRemark' placeholder='给商家留言'>
            </div>
        </div>
      </div>
      <!-- 固定在底部的提交订单的部分 -->
      <div class='footer'>
        <span>合计：
            <span class='goods-price'>￥<strong style='font-size:20px;'>{{totalPrice}}</strong></span>
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
    return {
      orderRemark: ''
    }
  },
  created () {
  },
  methods: {
    // 1、提交订单的接口
    async saveOrderById (shopId, details) {
      let param = {
        orderRemark: this.orderRemark,
        shopId,
        rowId: '',
        addrId: this.addressId,
        details: details.filter(item => item.goodsId)
      }
      this.Indicator.open()
      let result = await this.goodsAPI.saveOrderById(param)
      result = this.show.dealResult(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        return result
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    submitTheOrder () {
      //  因为是分店铺多次提交，所以会返回多个订单编号，现在把多个订单编号放在一个数组里面保存
      let orderIdArr = []
      this.allGoodsList.forEach((item, index) => {
        // 这里需要等到两个异步函数都执行完了之后再 执行后面的事件
        if (item.shopId) {
          this.saveOrderById(item.shopId, item.carts).then(data => {
            orderIdArr.push(data)
            // 如果订单都已经提交
            if (orderIdArr.length === this.allGoodsList.filter(item1 => item1.shopId).length) {
              console.log(orderIdArr)
              this.$router.push({name: 'PayOrder', params: { 'orderId': orderIdArr.join() }})
            }
          })
        }
      })
    },
    // 跳转到收货地址的页面
    goToTheAddressPage () {
      this.$router.push({name: 'ShippingAddress'})
    }
  },
  computed: {
    // 用户选中的地址Id
    addressId () {
      return this.$route.query.addressId
    },
    // 传过来的商品的数组
    allGoodsList () {
      return JSON.parse(this.$route.query.allGoodsList)
    },
    totalPrice () {
      let totalPrice = 0
      this.allGoodsList.forEach(item => {
        if (item.shopId) {
          item.carts.forEach(item1 => {
            if (item1.goodsId) {
              totalPrice += (Number(item1.price) * Number(item1.orderNumber))
            }
          })
        }
      })
      return totalPrice.toFixed(2)
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
        .shop-content{
            background:#fff;
            .shop-content-title{
                line-height:30px;
                font-size:16px;
                padding-left:2.8rem;
                text-align:left;
                background:url('./../../assets/img/home.png') no-repeat 1rem center;
                background-size:16px 16px;
            }
            .goods-list{
                list-style none
                &>li{
                    background:#fcfcfc;
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
