<template>
  <div class='page'>
      <mt-header title='消息中心' class='page-header'>
          <a @click='goBack' slot='left'>
            <img class='img-item' src='./../../../../assets/img/back.png' alt=''>
          </a>
      </mt-header>
      <div class='main-content'>
        <div class='cell-content'>
            <div class='gray-content'></div>
            <a class='mint-cell user-defined-mt-cell item-content' @click.prevent='toContactServerPage' href="#">
                <h5>在线客服</h5>
                <p>第一时间查看我们的订单的售后消息</p>
                <img class='back-img' src="./../../../../assets/img/addMore.png" alt="">
            </a>
            <div class='gray-content'></div>
            <a class='mint-cell user-defined-mt-cell item-content' @click.prevent='toNotificationMessagePage' href="#">
                <h5>通知消息</h5>
                <p>第一时间查看我的通知消息</p>
                <img class='back-img' src="./../../../../assets/img/addMore.png" alt="">
            </a>
        </div>
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
    },
    toContactServerPage () {
      this.$router.push({name: 'ContactServer'})
    },
    // 跳转到
    toNotificationMessagePage () {
      this.$router.push({name: 'NotificationMessage'})
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
    .cell-content{
        .item-content{
            position:relative;
            background:url('./../../../../assets/img/person/server.png') no-repeat 1.5rem center
            background-size:4rem 4rem;
            background-color:#fff;
            padding-left:6rem;
            padding-top:0.8rem;
            padding-bottom:0.8rem;
            text-align:left;
            &:last-child{
                background-image:url('./../../../../assets/img/person/tongzhi.png')
            }
            >h5{
                font-size:16px;
                line-height:20px;
                font-weight:500
            }
            p{
                font-size:12px;
                line-height:12px;
                color:#9b9b9b;
                margin-top: 12px;
            }
            .back-img{
                position:absolute;
                top:50%;
                margin-top:-8px;
                right:1.5rem;
                width:7px;
                height:16px;
            }
        }
    }
  }
}
</style>
