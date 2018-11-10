<template>
  <div class='page'>
      <mt-header title='店铺信息' class='page-header'>
          <a @click='goBack' slot='left'>
            <img class='img-item' src='./../../assets/img/back.png'  alt=''>
          </a>
      </mt-header>
      <div class='main-content'>
          <div class='shop-video'>
              <video :src="shopVideo" autoplay height='200px' loop width='100%'></video>
          </div>
          <!-- 商品名称地址 简介 -->
          <div class='shop-intr'>
            <div class='shop-icon'>
              <img :src="shopMsg.icon" class='img-item' alt="">
            </div>
            <div class='shop-name'>
              <h3>{{shopMsg.shopName}}</h3>
              <p>{{shopMsg.description}}</p>
            </div>
          </div>
          <div class='gray-content'></div>
          <!-- 商铺的图片描述 -->
          <div class='shop-msg'>
            <img class='img-item' v-for='item in imgList' :src="item.picUrl" :key='item.id' alt="">
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionDetail',
  data () {
    return {
      shopMsg: {}
    }
  },
  components: {},
  created () {
    this.getShopDetailInfo()
  },
  methods: {
    // 1、获取当前商铺的信息
    async getShopDetailInfo () {
      let param = {
        shopId: this.shopId
      }
      this.Indicator.open()
      let result = await this.userAPI.getShopDetailInfo(param)
      result = this.show.dealResult1(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        this.shopMsg = result.shop
      }
    },
    goBack () {
      this.$router.back()
    }
  },
  computed: {
    shopId () {
      return this.$route.params.shopId
    },
    shopVideo () {
      return this.shopMsg.videoUrl
    },
    imgList () {
      return this.shopMsg.detailList
    }
  }
}
</script>

<style scoped lang='stylus'>
@import './../../assets/css/base-style.styl'
.page {
  font-size: 1.2rem
  .main-content{
    background:$base-color;
    text-align left
    padding-bottom:0px
    .shop-video{
      padding-bottom:1rem;
    }
    .shop-intr{
      background:#fff;
      min-height: 6rem;
      padding-bottom:1rem
      .shop-icon{
        float: left;
        height: 4rem;
        width: 4rem;
        border-radius 8px;
        margin-left:1.5rem;
        margin-top: 1rem;
        overflow hidden
      }
      .shop-name{
        margin-left:7rem;
        padding-top: 1rem;
        h3{
          font-size 18px;
          line-height:26px;
        }
        p{
          font-size:12px;
          line-height 22px;
          padding-right:1.5rem
        }
      }
    }
    .shop-msg{
      background:#fff
      padding-left:10px;
      padding-right:10px;
    }
  }
}
</style>
