<template>
  <div class="order-list-page page">
    <mt-header title="我的订单">
        <a @click='goBack' slot="left">
        <img class='img-item' src="./../../../assets/img/back.png" alt="">
        </a>
    </mt-header>

    <mt-navbar class="page-part" :selected.sync="selected" v-model='selected'>
        <mt-tab-item id="1">全部订单</mt-tab-item>
        <mt-tab-item id="2">待付款</mt-tab-item>
        <mt-tab-item id="3">待收货</mt-tab-item>
        <mt-tab-item id="4">已收货</mt-tab-item>
    </mt-navbar>

    <div class='gray-content'></div>

    <!-- tab-container -->
    <mt-tab-container :active.sync="selected" v-model='selected'>
        <mt-tab-container-item id="1" class='allOrderList'>
            <!-- 全部订单列表 -->
            <all-order-list :orderList='orderList'></all-order-list>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
            <!-- 代付款 -->
            <await-payment :awaitPaymentOrderList='awaitPaymentOrderList'></await-payment>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
            <!-- 待收货 -->
            <await-take-goods :awaitTakeGoodsOrderList='awaitTakeGoodsOrderList'></await-take-goods>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
            <!-- 已收货的订单 -->
            <already-take-goods :alreadyTakeGoodsOrderList='alreadyTakeGoodsOrderList'></already-take-goods>
        </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import allOrderList from './orderList/all-order-list'
import awaitPayment from './orderList/await-payment'
import awaitTakeGoods from './orderList/await-take-goods'
import alreadyTakeGoods from './orderList/already-take-goods'
export default {
  name: 'baseGroup',
  data () {
    return {
      selected: '1',
      value: '',
      // orderType=1 待付款 orderType=2 待收货 orderType=3 已收货 orderType=4 退款中
      orderList: [
        {goodsId: 1, orderType: 1, price: 12},
        {goodsId: 1, orderType: 1, price: 12},
        {goodsId: 1, orderType: 1, price: 12},
        {goodsId: 1, orderType: 2, price: 12},
        {goodsId: 1, orderType: 2, price: 12},
        {goodsId: 1, orderType: 2, price: 12},
        {goodsId: 1, orderType: 3, price: 12},
        {goodsId: 1, orderType: 3, price: 12},
        {goodsId: 1, orderType: 4, price: 12},
        {goodsId: 1, orderType: 4, price: 12},
        {goodsId: 1, orderType: 4, price: 12},
        {goodsId: 1, orderType: 4, price: 12}
      ]
    }
  },
  components: {
    allOrderList,
    awaitPayment,
    awaitTakeGoods,
    alreadyTakeGoods
  },
  created () {},
  methods: {
    toHome () {
      this.$router.push('/base/home')
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  watch: {},
  computed: {
    // 等待付款的订单列表
    awaitPaymentOrderList () {
      return this.orderList.filter(item => item.orderType === 1)
    },
    // 等待收货的订单列表
    awaitTakeGoodsOrderList () {
      return this.orderList.filter(item => item.orderType === 2)
    },
    // 已经收货的订单列表
    alreadyTakeGoodsOrderList () {
      return this.orderList.filter(item => item.orderType === 3)
    }
  }
}
</script>

<style scoped lang='stylus'>
.order-list-page{
    .allOrderList{
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
    }
}
</style>
