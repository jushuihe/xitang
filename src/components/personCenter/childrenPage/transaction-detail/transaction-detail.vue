<template>
  <div class='page'>
      <mt-header title='交易明细' class='page-header'>
          <a @click='goBack' slot='left'>
            <img class='img-item' src='./../../../../assets/img/back.png' alt=''>
          </a>
      </mt-header>
      <div class='main-content'>
        <!-- 顶部的商品信息 部分 -->
        <div class='transaction-msg'>
          <ul class='transaction-msg-list'>
            <li v-for='item in tradeList' :key='item.orderId' @click='toTheTransactionItemDetail(item)'>
              <span class='item-title'>{{item.payMethod === 1 ? '微信支付' : (item.payMethod === 0 ? '余额支付' : '支付宝支付')}}</span>
              <div class='item-content'>
                <p class='item-content-time'>
                  {{item.tradeDate}}
                </p>
                <p class='item-content-price' :class='{"green":false}'>
                  -{{item.payMoney}}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionDetail',
  data () {
    return {
      tradeList: []
    }
  },
  components: {},
  created () {
    this.getTradeListByUser()
  },
  methods: {
    // 1、交易列表
    async getTradeListByUser () {
      let param = {
        beginDate: '',
        endDate: ''
      }
      this.Indicator.open()
      let result = await this.goodsAPI.getTradeListByUser(param)
      result = this.show.dealResult(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        console.log(result)
        this.tradeList = result.list
      }
    },
    goBack () {
      this.$router.back()
    },
    toTheTransactionItemDetail (item) {
      this.$router.push({name: 'TransactionItemDetail', params: {'transactionId': item.orderId}})
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
    .transaction-msg{
      background:#fff;
      .transaction-msg-list{
        list-style:none;
        li{
          height:55px;
          line-height:55px;
          font-size:14px;
          border-bottom:1px solid #eee;
          text-align:left;
          padding-left:1.5rem;
          .item-title{
          }
          .item-content{
            float:right
            margin-right:1.5rem;
            text-align right
            .item-content-time{
              line-height 20px;
              font-size:12px;
              margin-top:5px;
              color:#9b9b9b
            }
            .item-content-price{
              line-height 30px;
              font-size:14px;
              font-weight:600;
              color:#D0021B;
              &.green{
                color:#417505;
              }
            }
          }
        }
      }
    }
  }
}
</style>
