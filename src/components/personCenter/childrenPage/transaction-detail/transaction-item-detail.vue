<template>
  <div class='page'>
      <mt-header title='明细详情' class='page-header'>
          <a @click='goBack' slot='left'>
            <img class='img-item' src='./../../../../assets/img/back.png' alt=''>
          </a>
      </mt-header>
      <div class='main-content'>
          <div class='content-msg'>
            <span class='item-title'>流水号：</span>
            <div class='item-msg'>
                {{transactionMsg.tradeCode ? transactionMsg.tradeCode : '暂无'}}
            </div>
          </div>
          <div class='content-msg'>
            <span class='item-title'>类型：</span>
            <div class='item-msg'>
                {{transactionMsg.tradeMoney === 1 ? '充值' : '消费'}}
            </div>
          </div>
          <div class='content-msg'>
            <span class='item-title'>金额：</span>
            <div class='item-msg price-item' :class='{"green": false}'>
                - {{transactionMsg.tradeMoney}}
            </div>
          </div>
          <div class='content-msg'>
            <span class='item-title'>时间：</span>
            <div class='item-msg'>
                {{transactionMsg.tradeTime}}
            </div>
          </div>
          <!-- 暂时去余额这一行 -->
          <!-- <div class='content-msg'>
            <span class='item-title'>余额：</span>
            <div class='item-msg'>
                0.00元
            </div>
          </div> -->
          <div class='content-msg'>
            <span class='item-title'>订单号：</span>
            <div class='item-msg'>
                {{transactionMsg.orderNo}}
            </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionDetail',
  data () {
    return {
      // 当前交易的基本
      transactionMsg: {}
    }
  },
  components: {},
  created () {
    this.getTradeDetailByUser()
  },
  methods: {
    // 1、交易列表
    async getTradeDetailByUser () {
      let param = {
        orderId: this.orderId
      }
      this.Indicator.open()
      let result = await this.goodsAPI.getTradeDetailByUser(param)
      result = this.show.dealResult(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        this.transactionMsg = result
      }
    },
    goBack () {
      this.$router.back()
    }
  },
  computed: {
    orderId () {
      return this.$route.params.transactionId
    }
  }
}
</script>

<style scoped lang='stylus'>
@import './../../../../assets/css/base-style.styl'
.page {
  font-size: 1.2rem
  .main-content{
    text-align left
    .content-msg{
        padding-left: 1.5rem;
        background:#fff;
        line-height 30px;
        &:first-child{
            padding-top:2rem;
        }
        &:last-child{
            padding-bottom:2rem;
        }
        .item-title{
            color:#9b9b9b;
        }
        .item-msg{
            float:right;
            margin-right:1.5rem;
            font-size:14px;
            &.green{
                color:#417505 !important;
            }
            &.price-item{
                color:#D0021B;
                font-weight 600
            }
        }
    }
  }
}
</style>
