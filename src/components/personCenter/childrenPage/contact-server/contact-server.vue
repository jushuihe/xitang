<template>
  <div class='page'>
      <mt-header title='联系客服' class='page-header'>
          <a @click='goBack' slot='left'>
            <img class='img-item' src='./../../../../assets/img/back.png' alt=''>
          </a>
      </mt-header>
      <div class='main-content'>
        <h1>对话框</h1>
      </div>
  </div>
</template>

<script>
export default {
  name: 'ContactServer',
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
          padding-top:1rem;
          padding-bottom:1rem;
          border-bottom:1px solid #eee;
          .goods-msg-img{
            float:left;
            margin-left:1.5rem;
            width:5rem;
            height:5rem;
          }
          .goods-msg-msg{
            margin-left:9rem;
            height:5rem;
            text-align left;
            >h3{
              line-height 30px;
              .goods-price{
                float:right;
                margin-right:1.5rem;
                font-weight:500;
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
    .return-money{
        line-height 40px;
        height:40px;
        color:#9b9b9b;
        font-size:14px;
        background:#fff;
        text-align:left;
        padding-left:1.5rem;
        .goods-price{
            color:$base-color;
            >span{
                font-size:18px;
            }
        }
    }
  }
}
</style>
