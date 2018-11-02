<template>
  <div class="classification-page">
    <header class='base-header'>
        <div class='img-content'>
            <img src="../../assets/img/saoyisao.png" class='img-item' alt="">
        </div>
        <div class='search-content'>
            <img class='search-content-img' src='../../assets/img/search.png' alt=''>
            <input type="text" class='search-content-input' placeholder="搜索...">
        </div>
        <div class='img-content'>
            <img src="../../assets/img/zixun.png" class='img-item' alt="">
        </div>
    </header>
    <section class='content'>
      <div class='right-content-header-img'>
        <img class='img-item' src="./../../assets/img/goods/1.png" alt="">
      </div>
      <div class='classify-item'>
        <header class='classify-item-title'>
          ----推荐分类----
        </header>
        <section class='classify-item-content'>
          <dl class='classify-item-content-item' v-for='(item, index) in goodsList' :key='item.rowId' @click='toGoodDetail(item, index)'>
            <dt>
              <img class='img-item' src="./../../assets/img/goods/3.png" alt="">
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
    </section>
  </div>
</template>

<script>
export default {
  name: 'classification',
  data () {
    return {
      nowActiveNav: 0,
      showSecondLevelNav: false,
      goodsList: []
    }
  },
  created () {
    console.log(this.classificationId)
    this.getGoodsListWithPage('', this.classificationId)
  },
  methods: {
    // 2、根据不同的条件获取商品列表
    async getGoodsListWithPage (name, catalogId) {
      let param = {
        name,
        catalogId,
        pageNow: 1,
        limit: 10
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
    // 跳转到商品详情页面
    toGoodDetail (item) {
      this.$router.push({name: 'goodsDetail', params: {goodsId: item.rowId}})
    }
  },
  computed: {
    classificationId () {
      return this.$route.params.classificationId
    }
  }
}
</script>

<style scoped lang='stylus'>
@import './../../assets/css/base-style.styl'
.classification-page{
  min-height:100%;
  // 头部搜索部分
  .base-header{
    width:100%;
    height 40px;
    position:fixed;
    top:0px;
    background:$base-color;
    box-sizing: border-box;
    padding: 5px;
    z-index:100;
    >div{
        display inline-block;
        &.img-content{
            width:30px;
            height:30px;
            position:absolute;
            left:5px;
            top:5px;
            padding:3px;
            box-sizing border-box
            &:last-child{
                right:5px;
                left: auto;
            }
        }
        &.search-content{
            width:100%;
            height:100%;
            padding:0 33px;
            box-sizing: border-box;
            position relative
            .search-content-img{
                position:absolute
                top: 8px;
                left: 43px;
                width: 14px;
                height: 14px;
            }
            .search-content-input{
                width:100%;
                height:100%;
                border: 0px;
                border-radius 5px;
                outline: none;
                padding-left:30px;
                background-color:#EDEDED;
                box-sizing: border-box;
            }
        }
    }
  }
  /*搜索到的商品列表*/
  .content{
    width:100%;
    min-height: 84vh;
    box-sizing border-box
    padding:9px;
    padding-bottom:50px+@padding;
    background:#fff;
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
