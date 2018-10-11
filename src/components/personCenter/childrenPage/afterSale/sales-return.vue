<template>
  <div class="page">
      <!-- 已收货之后 申请的退货退款 -->
      <mt-header title="退货退款" class='page-header'>
        <a @click='goBack' slot="left">
          <img class='img-item' src="./../../../../assets/img/back.png" alt="">
        </a>
      </mt-header>
      <div class='main-content'>
        <div class='goods-msg'>
          <div class='goods-msg-logistics'>
            <span>订单编号：</span>
            <span>201803249521</span>
            <span class='contactTheServer' @click='contactTheServer'>
              联系客服
            </span>
          </div>
          <ul class='goods-msg-list'>
            <li v-for='item in 1' :key='item'>
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
            </li>
          </ul>
        </div>
        <div class='gray-content'></div>
        <div class='cell-content'>
          <mt-cell title="货物情况" class='user-defined-mt-cell' @click.native='showgoodsDescriptionList' :value='choicedDescription' is-link></mt-cell>
          <mt-cell title="退货原因" class='user-defined-mt-cell' @click.native='showReturnReasonList' :value='choicedReason' is-link></mt-cell>
          <mt-cell title="退款金额" class='user-defined-mt-cell' value='￥118.00' is-link></mt-cell>
          <mt-cell title="快递公司" class='user-defined-mt-cell' @click.native='showExpressCompanyList' :value='choicedExpress' is-link></mt-cell>
          <mt-field label="快递单号" class='user-defined-mt-cell' placeholder="请输入" type="text" v-model="trackingNumber"></mt-field>
          <mt-field label="退款说明" class='user-defined-mt-cell' placeholder="选填" type="text" v-model="refundMsg"></mt-field>
        </div>
      </div>
      <div class='footer'>
        <mt-button @click.native='evaluateTheOrder' type='primary' class='footer-btn' size='large'>提交</mt-button>
      </div>
      <!-- 货物情况列表 -->
      <mt-popup
        v-model="isShowgoodsDescriptionList"
        style='width:100%'
        position="bottom">
        <div class='cell-content' style='width:100%'>
          <mt-cell title="原因1" class='user-defined-mt-cell' @click.native='choicedTheDescription(1)'></mt-cell>
          <mt-cell title="原因2" class='user-defined-mt-cell' @click.native='choicedTheDescription(2)'></mt-cell>
          <mt-cell title="原因3" class='user-defined-mt-cell' @click.native='choicedTheDescription(3)'></mt-cell>
          <mt-cell title="原因4" class='user-defined-mt-cell' @click.native='choicedTheDescription(4)'></mt-cell>
        </div>
      </mt-popup>
      <!-- 退货原因列表 -->
      <mt-popup
        v-model="isShowReturnReasonList"
        style='width:100%'
        position="bottom">
        <div class='cell-content' style='width:100%'>
          <mt-cell title="原因1" class='user-defined-mt-cell' @click.native='choicedTheReason(1)'></mt-cell>
          <mt-cell title="原因2" class='user-defined-mt-cell' @click.native='choicedTheReason(2)'></mt-cell>
        </div>
      </mt-popup>
      <!-- 快递公司列表 -->
      <mt-popup
        v-model="isShowExpressCompanyList"
        style='width:100%'
        position="bottom">
        <div class='cell-content' style='width:100%'>
          <mt-cell title="原因1" class='user-defined-mt-cell' @click.native='choicedTheExpressCompany(1)'></mt-cell>
          <mt-cell title="原因2" class='user-defined-mt-cell' @click.native='choicedTheExpressCompany(2)'></mt-cell>
        </div>
      </mt-popup>
  </div>
</template>

<script>
export default {
  name: 'coupon',
  data () {
    return {
      // 退款说明
      refundMsg: '',
      // 快递单号
      trackingNumber: '',
      isShowgoodsDescriptionList: false,
      isShowReturnReasonList: false,
      isShowExpressCompanyList: false,
      choicedReason: '',
      choicedDescription: '',
      choicedExpress: ''
    }
  },
  created () {},
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    contactTheServer () {
      // console.log('联系客服')
    },
    showgoodsDescriptionList () {
      console.log('显示货物情况列表')
      this.isShowgoodsDescriptionList = true
    },
    showReturnReasonList () {
      console.log('显示退货原因列表')
      this.isShowReturnReasonList = true
    },
    showExpressCompanyList () {
      this.isShowExpressCompanyList = true
    },
    choicedTheReason (index) {
      this.choicedReason = index
      this.isShowReturnReasonList = false
    },
    choicedTheDescription (index) {
      this.choicedDescription = index
      this.isShowgoodsDescriptionList = false
    },
    // 选中当前的快递公司
    choicedTheExpressCompany (index) {
      this.choicedExpress = index
      this.isShowExpressCompanyList = false
    }
  },
  computed: {
    goodsId () {
      return this.$router.params.goodsId
    }
  }
}
</script>

<style scoped lang='stylus'>
@import './../../../../assets/css/base-style.styl'
.page{
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
                font-weight 500
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
    .cell-content{
      text-align:left;
      background:#fff;
      .user-defined-mt-cell{
        padding-left:1.5rem;
      }
    }
  }
  .footer{
    padding-left:1rem;
    padding-right:1rem;
    background:transparent;
    .footer-btn{
      background:$base-color;
    }
  }
}
</style>
