<template>
    <div class='order-list'>
        <div class='hasNoOrder' v-if='awaitTakeGoodsOrderList.length==0'>
            <div>
                <h4>居然没有订单</h4>
                <p>好东西，手慢无</p>
            </div>
            <div>
                <button class='find-more' @click='toHome'>去逛逛</button>
            </div>
        </div>
        <div class='orderList'  v-if='awaitTakeGoodsOrderList.length>0'>
            <div class='orderListContent'>
                <div class='order-list-content-item' v-for='item in awaitTakeGoodsOrderList' :key='item.orderType+"2"'>
                    <h4 class='order-list-content-item-header'>订单编号：
                        <span>201803249521</span>
                        <strong class='order-type'>代付款</strong>
                    </h4>
                    <ul class='order-list-content-item-content'>
                        <li class='goods-item' v-for='item1 in 4' :key='item1+"313"'>
                            <div class='goods-item-img'>
                                <img class='img-item' src="./../../../../assets/img/goods/4.png" alt="">
                            </div>
                            <div class='goods-item-msg'>
                                <h4 class='goods-item-msg-name'>
                                    文玩铜锈貔貅摆件
                                    <span class='goods-price'><strong style='font-size:12px;'>￥</strong>59</span>
                                </h4>
                                <div class='guige'>
                                    规格：铜制小貔貅
                                    <span class='num'>x1</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class='order-list-content-item-footer'>
                        <div class='total-price'>
                            <span v-if='item.orderType==1'>应付：</span>
                            <span v-if='item.orderType==4'>退款金额：</span>
                            <span v-if='item.orderType==4 || item.orderType==1' class='goods-price'><strong style='font-size:12px'>￥</strong>118.00</span>
                        </div>
                        <div class='operation-btn'>
                            <mt-button type="default" class='operation-btn-default' v-if='item.orderType==1' size='small'>取消</mt-button>
                            <mt-button type="default" class='operation-btn-full-color' v-if='item.orderType==1' size='small'>付款</mt-button>
                            <mt-button type="default" class='operation-btn-default' v-if='item.orderType==2' size='small'>查看物流</mt-button>
                            <mt-button type="default" class='operation-btn-outline-color' v-if='item.orderType==2' size='small'>确认收货</mt-button>
                            <mt-button type="default" class='operation-btn-default' v-if='item.orderType==3' size='small'>再次购买</mt-button>
                            <mt-button type="default" class='operation-btn-default' v-if='item.orderType==3' size='small'>评价此单</mt-button>
                            <mt-button type="default" class='operation-btn-outline-color' v-if='item.orderType==3' size='small'>退换/售后</mt-button>
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
  props: ['awaitTakeGoodsOrderList'],
  name: '',
  data () {
    return {}
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
