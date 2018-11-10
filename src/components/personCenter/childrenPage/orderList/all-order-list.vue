<template>
    <div class='order-list'>
        <div class='hasNoOrder' v-if='orderList.length==0'>
            <div>
                <h4>居然没有订单</h4>
                <p>好东西，手慢无</p>
            </div>
            <div>
                <button class='find-more' @click='toHome'>去逛逛</button>
            </div>
        </div>
        <div class='orderList'  v-if='orderList.length>0'>
            <div class='orderListContent'>
                <div class='order-list-content-item' v-for='item in orderList' :key='item.orderNo'>
                    <h4 class='order-list-content-item-header'>订单编号：
                        <span>{{item.orderNo}}</span>
                        <strong class='order-type' v-if='item.payFlag === 0'>未付款</strong>
                        <strong class='order-type' v-if='item.payFlag === 1'>已付款</strong>
                    </h4>
                    <ul class='order-list-content-item-content'>
                        <li class='goods-item' v-for='item1 in item.details' :key='item1'>
                            <div class='goods-item-img'>
                                <img class='img-item' :src="item1.picUrl">
                            </div>
                            <div class='goods-item-msg'>
                                <h4 class='goods-item-msg-name'>
                                    {{item1.goodsName}}
                                    <span class='goods-price'><strong style='font-size:12px;'>￥</strong>{{item1.price}}</span>
                                </h4>
                                <div class='guige'>
                                    规格：{{item1.specName}}
                                    <span class='num'>x{{item1.orderNumber}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class='order-list-content-item-footer'>
                        <div class='total-price'>
                            <span v-if='item.orderStatus == 0'>应付：</span>
                            <span v-if='item.afterSalesFlag == 1'>退款金额：</span>
                            <span v-if='item.afterSalesFlag == 1 || item.orderStatus == 0' class='goods-price'><strong style='font-size:12px'>￥</strong>{{item.totalPrice}}</span>
                        </div>
                        <div class='operation-btn'>
                            <mt-button type="default" @click.native='cancelTheOrder(item)' class='operation-btn-default' v-if='item.orderStatus == 0' size='small'>取消</mt-button>
                            <mt-button type="default" @click.native='payTheOrder(item)' class='operation-btn-full-color' v-if='item.orderStatus == 0' size='small'>付款</mt-button>
                            <mt-button type="default" @click.native='confirmTheOrder(item)' class='operation-btn-outline-color' v-if='item.orderStatus == 1' size='small'>确认收货</mt-button>
                            <mt-button type="default" @click.native='checkTheOrderLogistics(item)' class='operation-btn-default' v-if='item.orderStatus == 2' size='small'>查看物流</mt-button>
                            <mt-button type="default" @click.native='buyTheOrderAgain(item)' class='operation-btn-default' v-if='item.orderStatus == 3 || item.orderStatus == 4' size='small'>再次购买</mt-button>
                            <mt-button type="default" @click.native='evaluateTheOrder(item)' class='operation-btn-default' v-if='item.orderStatus == 3 || item.orderStatus == 4' size='small'>评价此单</mt-button>
                            <mt-button type="default" @click.native='afterSaleTheOrder(item)' class='operation-btn-outline-color' v-if='item.orderStatus == 3 || item.orderStatus == 4' size='small'>退换/售后</mt-button>
                        </div>
                    </div>
                    <div class='gray-content'></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['orderList'],
  name: '',
  data () {
    return {}
  },
  methods: {
    // 1、通过订单表ID获取订单详情
    async getOrderDetailById (orderId) {
      let param = {
        rowId: orderId
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
    async deleteOrderById (orderId) {
      let param = {
        rowId: Number(orderId)
      }
      this.Indicator.open()
      let result = await this.goodsAPI.deleteOrderById(param)
      result = this.show.dealResult(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        this.$emit('refreshTheList')
      }
    },
    // 3、确认收货的接口
    async deliveryCheckOrderById (orderId) {
      let param = {
        rowId: orderId
      }
      this.Indicator.open()
      let result = await this.goodsAPI.deliveryCheckOrderById(param)
      result = this.show.dealResult(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        this.$emit('refreshTheList')
      }
    },
    // 取消订单
    cancelTheOrder (item) {
      this.deleteOrderById(item.rowId)
    },
    // 付款按钮
    payTheOrder (item) {
      this.$router.push({name: 'PayOrder', params: {orderId: item.rowId}})
    },
    // 查看订单物流
    checkTheOrderLogistics (item) {
      console.log('查看订单物流')
      this.$router.push({name: 'LogisticsPage', params: {goodsId: item.rowId}})
    },
    // 确认收货
    confirmTheOrder (item) {
      this.deliveryCheckOrderById(item.rowId)
    },
    // 再次购买
    buyTheOrderAgain () {
      console.log('再次购买')
    },
    // 评价此单
    evaluateTheOrder (item) {
      console.log('评价此单')
      this.$router.push({name: 'EvaluateGoods', params: {goodsId: item.rowId}})
    },
    // 退货售后
    afterSaleTheOrder (item) {
      console.log('退货售后')
      this.$router.push({name: 'ApplicetionForMoney', params: {goodsId: item.rowId}})
    },
    toHome () {
      this.$router.push({name: 'Home'})
    }
  }
}
</script>

<style lang='stylus' scoped>
@import './../../../../assets/css/base-style.styl'
.order-list{
    .hasNoOrder{
        margin:60px 20px;
        text-align center;
        color: #999;
        div{
            margin-bottom: 20px;
        }
        h4{
            font-size: 16px;
            margin-bottom: 10px;
            color: #666;
        }
        p{
            font-size: 12px
        }
        .find-more{
            padding: 8px 30px;
            color: #f60;
            border:1px solid #f60;
            font-size: 14px;
            line-height: 18px;
            display: inline-block;
            background-color: transparent;
            border-radius: 3px;
        }
    }
    .orderList{
        .orderListContent{
            .order-list-content-item{
                .order-list-content-item-header{
                    line-height:50px;
                    font-size:14px;
                    color:$base-undertint-font-color;
                    font-weight 500
                    text-align left;
                    margin-left:1.5rem;
                    border-bottom:1px solid #ededed;
                    position relative;
                    .order-type{
                        position absolute;
                        right:1rem;
                        color:$base-color;
                        font-weight 500;
                    }
                }
                .order-list-content-item-content{
                    list-style:none;
                    .goods-item{
                        margin-left:1.5rem;
                        height:6rem;
                        padding-top:1rem;
                        padding-bottom:1rem;
                        border-bottom:1px solid #ededed;
                        .goods-item-img{
                            float:left;
                            width:6rem;
                            height:6rem;
                        }
                        .goods-item-msg{
                            margin-left: 7rem;
                            text-align: left;
                            .goods-item-msg-name{
                                font-size:16px;
                                color:$base-undertint-font-color;
                                font-weight:600;
                                line-height 25px;
                                .goods-price{
                                    float:right;
                                    margin-right:1rem;
                                    font-weight 500
                                }
                            }
                            .guige{
                                font-size: 12px;
                                color: #aaa;
                                line-height 20px;
                                .num{
                                    float: right;
                                    position: absolute;
                                    right: 1rem;
                                }
                            }
                        }
                    }
                }
                .order-list-content-item-footer{
                    height:60px;
                    position:relative;
                    text-align left;
                    margin-left:1.5rem;
                    .total-price{
                        color:#9b9b9b;
                        font-size:1rem;
                        >span{
                            line-height 60px
                        }
                        .goods-price{
                            font-size: 1.7rem;
                            color: $base-color;
                            font-weight 600
                        }
                    }
                    .operation-btn{
                        position absolute;
                        right:1rem;
                        top:12px;
                        >button{
                            margin-left:0.5rem;
                            &.operation-btn-default{
                                background:#fff;
                            }
                            &.operation-btn-full-color{
                                background:$base-color;
                                color:#fff;
                            }
                            &.operation-btn-outline-color{
                                color:$base-color;
                                border:1px solid $base-color;
                                background:#fff;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
