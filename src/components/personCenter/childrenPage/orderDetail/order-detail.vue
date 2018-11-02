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
          <span v-if='orderType==0'>代付款</span>
          <span v-if='orderType == 1 || orderType == 2'>待收货</span>
          <span v-if='afterSalesFlag==3'>退款售后</span>
          <span v-if='orderType==3'>已收货</span>
          <div class='main-content-title-img'>
            <img class='img-item' v-if='orderType == 0' src="./../../../../assets/img/order/step1.png">
            <img class='img-item' v-if='orderType == 1 || orderType==2' src="./../../../../assets/img/order/step2.png">
            <img class='img-item' v-if='afterSalesFlag==3' src="./../../../../assets/img/order/step3.png">
            <img class='img-item' v-if='orderType == 3' src="./../../../../assets/img/order/step4.png">
          </div>
        </div>
        <div class='gray-content'></div>
        <!-- 退款的流程信息 -->
        <div class='refund-flow-path' v-if='afterSalesFlag == 1'>
          <p>
            退款118.00元已完成，已退回您的账户
          </p>
          <div class='refund-flow-path-content'>
            <div class='flow-path-img'>
              <div class='flow-path-img-item'>
                <div class='circle' :class='{"active":nowRefundPath>0}'></div>
                <div class='full-content' :class='{"active":nowRefundPath>1}'></div>
                <img class='flow-path-img-item-img' v-if='nowRefundPath==1' src="./../../../../assets/img/order/course-success.png">
              </div>
              <div class='flow-path-img-item'>
                <div class='circle' :class='{"active":nowRefundPath>1}'></div>
                <div class='full-content' :class='{"active":nowRefundPath>2}'></div>
                <img class='flow-path-img-item-img' v-if='nowRefundPath==2' src="./../../../../assets/img/order/course-success.png">
              </div>
              <div class='flow-path-img-item'>
                <div class='circle' :class='{"active":nowRefundPath>2}'></div>
                <img class='flow-path-img-item-img' v-if='nowRefundPath==3' src="./../../../../assets/img/order/course-success.png">
              </div>
            </div>
            <div class='flow-path-msg'>
              <div class='flow-path-msg-item'>
                <p class='item-title'>申请退款</p>
                <p class='item-time'>2018-9-2 14:34</p>
              </div>
              <div class='flow-path-msg-item'>
                <p class='item-title'>客服受理</p>
                <p class='item-time'>2018-9-2 14:34</p>
              </div>
              <div class='flow-path-msg-item'>
                <p class='item-title'>退款成功</p>
                <p class='item-time'>2018-9-2 14:34</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 商品的信息 -->
        <div class='goods-msg'>
          <div class='goods-msg-logistics'>
            <span>订单编号：</span>
            <span>{{orderDetail.orderNo ? orderDetail.orderNo : ''}}</span>
            <span class='contactTheServer' @click='contactTheServer'>
              联系客服
            </span>
          </div>
          <ul class='goods-msg-list'>
            <li v-for='item in 4' :key='item'>
              <div class='goods-msg-list-content'>
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
              </div>
              <div v-if='orderType==2 || orderType==4' class='goods-after-sale'>
                <mt-button @click.native='afterSale' type='default' class='footer-btn base-color-border' size='small'>退换/售后</mt-button>
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
              <span class='item-content'>{{orderDetail.orderNo ? orderDetail.orderNo : ''}}</span>
            </p>
            <p>
              <span class='item-title'>下单时间:</span>
              <span class='item-content'>{{orderDetail.subTime ? orderDetail.subTime : ''}}</span>
            </p>
            <p>
              <span class='item-title'>支付方式:</span>
              <span class='item-content' v-if='orderDetail.payFlag==0'>未付款</span>
              <span class='item-content' v-if='orderDetail.payFlag==1 && orderDetail.payMethod==0'>余额支付</span>
              <span class='item-content' v-if='orderDetail.payFlag==1 && orderDetail.payMethod==1'>支付宝</span>
              <span class='item-content' v-if='orderDetail.payFlag==1 && orderDetail.payMethod==2'>微信</span>
            </p>
            <p>
              <span class='item-title'>支付时间:</span>
              <span class='item-content'>{{orderDetail.payTime ? orderDetail.payTime : ''}}</span>
            </p>
          </div>
          <!-- 收货地址 -->
          <div class='logistics-msg-address'>
            <h3>{{orderDetail.receiveContact ? orderDetail.receiveContact : ''}}  &nbsp;&nbsp; {{orderDetail.receivePhone ? orderDetail.receivePhone : ''}}</h3>
            <p>地址：{{orderDetail.receiveAddress ? orderDetail.receiveAddress : ''}}</p>
          </div>
          <!-- 订单金额 -->
          <div class='logistics-msg-money'>
            <div class='logistics-msg-money-item'>
              <div class='item-title'>
                商品金额：
              </div>
              <strong class='item-value'>￥{{orderDetail.totalPrice ? orderDetail.totalPrice : ''}}</strong>
            </div>
            <div class='logistics-msg-money-item'>
              <div class='item-title'>
                运费：
              </div>
              <strong class='item-value'>+￥10.00</strong>
            </div>
          </div>
        </div>
        <div class='refund-money' v-if='afterSalesFlag == 1'>
          退款总金额：
          <strong class='total-price'>￥{{orderDetail.totalPrice ? orderDetail.totalPrice : ''}}</strong>
        </div>
        <div class='gray-content'></div>
      </div>
      <div class='footer' v-if='orderType!=3'>
        <mt-button v-if='orderType == 0' @click.native='cancelTheOrder' type='default' class='footer-btn' size='small'>取消支付</mt-button>
        <mt-button v-if='orderType == 0' @click.native='payTheOrder' type='primary' class='footer-btn base-color-btn' size='small'>付款 30:24</mt-button>
        <mt-button v-if='orderType == 2' @click.native='checkTheLogistics' type='default' class='footer-btn' size='small'>查看物流</mt-button>
        <mt-button v-if='orderType == 1' @click.native='confirmGetGoods' type='primary' class='footer-btn base-color-btn' size='small'>确认收货</mt-button>
        <mt-button v-if='orderType == 3 || orderType == 4' @click.native='buyAgainTheOrder' type='default' class='footer-btn' size='small'>再次购买</mt-button>
        <mt-button v-if='orderType == 3 || orderType == 4' @click.native='evaluateTheOrder' type='default' class='footer-btn base-color-border' size='small'>评价此单</mt-button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'coupon',
  data () {
    return {
      // 退款售后的流程
      nowRefundPath: 1,
      // 用来保存当前订单的详细信息
      orderDetail: {}
    }
  },
  created () {
    this.getOrderDetailById()
  },
  methods: {
    // 1、通过订单表ID获取订单详情
    async getOrderDetailById () {
      let param = {
        rowId: this.orderId
      }
      this.Indicator.open()
      let result = await this.goodsAPI.getOrderDetailById(param)
      result = this.show.dealResult(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        this.orderDetail = result
        console.log(this.orderDetail)
      }
    },
    // 2、取消订单
    async deleteOrderById () {
      let param = {
        rowId: Number(this.orderId)
      }
      this.Indicator.open()
      let result = await this.goodsAPI.deleteOrderById(param)
      result = this.show.dealResult(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        console.log(result)
      }
    },
    // 3、确认收货的接口
    async deliveryCheckOrderById () {
      let param = {
        rowId: Number(this.orderId)
      }
      this.Indicator.open()
      let result = await this.goodsAPI.deliveryCheckOrderById(param)
      result = this.show.dealResult(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        console.log(result)
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    // 取消订单的按钮事件
    cancelTheOrder () {
      this.MessageBox.confirm('确定取消订单？').then(action => {
        this.deleteOrderById()
      }).catch(() => {
        console.log('取消')
      })
    },
    // 付款的按钮事件
    payTheOrder () {
      // 这里可能是跳转到 支付页面 也可能是跳到确认支付页面
      this.$router.push({name: 'PayOrder', params: {orderId: this.orderId}})
    },
    // 联系客服
    contactTheServer () {
      console.log('联系客服')
    },
    // 查看物流的按钮事件
    checkTheLogistics () {
      console.log('查看物流')
      this.$router.push({name: 'LogisticsPage', params: {goodsId: this.orderId}})
    },
    // 确认收货的按钮事件
    confirmGetGoods () {
      console.log('确认收货')
      this.deliveryCheckOrderById()
      // 调用接口
    },
    // 评价此单
    evaluateTheOrder () {
      this.$router.push({name: 'EvaluateGoods', params: {goodsId: this.orderId}})
    },
    buyAgainTheOrder () {
      this.Toast('再次购买')
    },
    // 退货售后的按钮
    afterSale () {
      if (this.orderType === 2) {
        this.$router.push({name: 'ApplicetionForMoney', params: {goodsId: 1}})
      } else if (this.orderType === 4) {
        this.$router.push({name: 'SalesReturn', params: {goodsId: 1}})
      }
    }
  },
  computed: {
    orderId () {
      return this.$route.params.goodsId
    },
    orderType () {
      return this.orderDetail.orderStatus
    },
    afterSalesFlag () {
      return this.orderDetail.afterSalesFlag
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
    .refund-flow-path{
      >p{
        background:#fff;
        height:44px;
        line-height 44px;
        padding-left:1.5rem;
        font-size:14px;
        text-align:left;
      }
      .refund-flow-path-content{
        padding-bottom:2rem;
        .flow-path-img{
          display flex
          justify-content: space-around;
          margin-top:2rem;
          margin-bottom:1.2rem;
          .flow-path-img-item{
            width:35%;
            height:4px;
            background:transparent
            text-align center
            position:relative
            .circle{
              width:12px;
              height:12px;
              display:inline-block
              position:relative
              top:-4px
              border-radius 50%
              background:#aaa;
              &.active{
                background:#7ED321
              }
            }
            .flow-path-img-item-img{
              position absolute;
              width:20px;
              height:20px;
              top:-8px;
              left:50%;
              z-index:20;
              margin-left:-10px;
            }
            .full-content{
              position:absolute;
              width:100%;
              height:4px;
              background:#aaa;
              top:0px
              left:50%
              z-index:10;
              &.active{
                background:#7ED321
              }
            }
          }
        }
        .flow-path-msg{
          display flex
          justify-content: space-around;
          .flow-path-msg-item{
            .item-title{
              line-height:20px;
            }
            .item-time{
              color:#9b9b9b;
            }
          }
        }
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
          .goods-msg-list-content{
            padding-top:0.6rem;
            padding-bottom:0.6rem;
            border-bottom:1px solid #eee;
            margin-left:1.5rem;
          }
          .goods-msg-img{
            float:left;
            width:6rem;
            height:6rem;
          }
          .goods-msg-msg{
            margin-left:7.5rem;
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
          .goods-after-sale{
            text-align right
            padding 1rem
            margin-left:1.5rem;
            border-bottom:1px solid #eee;
            .base-color-border{
              color:$base-color;
              border:1px solid $base-color
              line-height: 28px;
              height: 28px;
              padding: 0px 8px;
            }
          }
        }
      }
    }
    .logistics-msg{
      background:#fff;
      text-align left
      border-bottom:1px solid #eee;
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
    .refund-money{
      background:#fff;
      height:40px;
      text-align:left;
      font-size:14px;
      padding-left:1.5rem;
      line-height:40px;
      .total-price{
        float:right;
        margin-right:1.5rem;
        font-size:18px;
        color:$base-color;
      }
    }
  }
  .footer{
    text-align right;
    .footer-btn{
      margin-right: 1rem;
      margin-top: 8px;
      &.base-color-btn{
        background:$base-color;
      }
      &.base-color-border{
        color:$base-color;
        border:1px solid $base-color
      }
    }
  }
}
</style>
