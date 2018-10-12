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
                2018480932431
            </div>
          </div>
          <div class='content-msg'>
            <span class='item-title'>类型：</span>
            <div class='item-msg'>
                消费
            </div>
          </div>
          <div class='content-msg'>
            <span class='item-title'>金额：</span>
            <div class='item-msg price-item' :class='{"green": true}'>
                -118.00
            </div>
          </div>
          <div class='content-msg'>
            <span class='item-title'>时间：</span>
            <div class='item-msg'>
                2018-05-29 15:11:10
            </div>
          </div>
          <div class='content-msg'>
            <span class='item-title'>余额：</span>
            <div class='item-msg'>
                3579.00元
            </div>
          </div>
          <div class='content-msg'>
            <span class='item-title'>订单号：</span>
            <div class='item-msg'>
                3846545131256
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
