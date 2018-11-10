<template>
  <div class='page'>
      <mt-header title='搜索结果' class='page-header'>
          <a @click='goBack' slot='left'>
            <img class='img-item' src='./../../assets/img/back.png'  alt=''>
          </a>
      </mt-header>
      <div class='main-content'>
        <div class='right-content-header-img'>
            <img class='img-item' src="./../../assets/img/goods/1.png" alt="">
        </div>
        <div class='classify-item'>
            <header class='classify-item-title'>
            ----搜索结果----
            </header>
            <section class='classify-item-content'>
            <dl class='classify-item-content-item' v-for='(item, index) in goodsList' :key='item.rowId' @click='toGoodDetail(item, index)'>
                <dt>
                <img class='img-item' :src='getTheCoverPic(item.photos)' alt="">
                </dt>
                <dd>
                {{item.name}}
                </dd>
            </dl>
            </section>
        </div>
        <div class='show-the-last-content'>
            <h4>没有更多了~</h4>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'SearchResult',
  data () {
    return {
      goodsList: []
    }
  },
  components: {},
  created () {
    this.getGoodsListWithPage(this.searchMsg)
  },
  methods: {
    // 1、根据不同的条件获取商品列表
    async getGoodsListWithPage (name) {
      let param = {
        name,
        catalogId: null,
        pageNow: 1,
        pageSize: 20
      }
      this.Indicator.open()
      let result = await this.goodsAPI.getGoodsList(param)
      result = this.show.dealResult(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        // 成功获取到了参数
        this.goodsList = result
        if (this.goodsList.length === 0) {
          this.Toast('当前的商品的数据为空')
        } else {
          // 处理商品的数据
          console.log(this.goodsList)
        }
      }
    },
    toGoodDetail (item) {
      this.$router.push({name: 'goodsDetail', params: {goodsId: item.rowId}})
    },
    goBack () {
      this.$router.back()
    },
    // 传入商品图片的集合然后获取到商品封面的图片地址
    // 图片类型(0:封面,1普通,2长图)
    getTheCoverPic (arr) {
      if (arr && arr.length > 0) {
        if (arr.filter(item => item.photoType === 0)[0].url) {
          return arr.filter(item => item.photoType === 0)[0].url
        } else {
          return this.defaultImg
        }
      } else {
        return this.defaultImg
      }
    },
    // 获取到当前商品的第一个规格的价格
    getTheGoodsFirstPrice (arr) {
      if (arr && arr.length > 0) {
        return arr[0].price
      } else {
        return '暂无'
      }
    }
  },
  computed: {
    searchMsg () {
      return this.$route.params.searchMsg
    }
  }
}
</script>

<style scoped lang='stylus'>
@import './../../assets/css/base-style.styl'
.page {
  font-size: 1.2rem
  .main-content{
    /*搜索到的商品列表*/
    width:100%;
    min-height: 84vh;
    box-sizing border-box
    padding:9px;
    padding-bottom:50px+@padding;
    background:#fff;
    margin-top: 40px;
    .right-content-header-img{
      width:100%;
      height:16vh;
    }
    .classify-item{
      .classify-item-title{
        font-size: 14px;
        color: #999;
        line-height: 24px;
        margin-top: 10px;
      }
      .classify-item-content{
        display flex;
        flex-wrap:wrap;
        justify-content:normal;
        width:100%;

        .classify-item-content-item{
          width:31%;
          margin-top:2vh;
          margin-right:1%;
          margin-left:1%;
          >dt{
            height: 9.2rem;
          }
          >dd{
            font-size: 12px;
            line-height 16px;
            color: $base-undertint-font-color;
            text-align: left;
            margin-top:6px;
          }
        }
      }
    }
    .show-the-last-content{
      margin-top:20px;
      margin-bottom:20px;
    }
  }
}
</style>
