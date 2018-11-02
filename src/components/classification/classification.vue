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
    <!-- 左边的分类导航部分 一级分类 -->
    <aside class='left-nav'>
      <ul class='left-nav-ul'>
        <li :class='{"active":nowActiveNav === "default"}'  @click='changeTheActiveNav(0)'>
          <span>推荐分类</span>
        </li>
        <li v-for='(item, index) in catalogList' :class='{"active":nowActiveNav == item.rowId}'  @click='changeTheActiveNav(item, index)' :key='item.rowId'>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </aside>
    <!-- 右边的主要内容页面 -->
    <section class='right-content'>
      <div class='right-content-header-img'>
        <img class='img-item' src="./../../assets/img/goods/1.png" alt="">
      </div>
      <div class='classify-item'>
        <ul>
          <li v-for='item in catalogListSecond'  @click='changeTheSecondLevel(item)' :key='item.rowId'>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'classification',
  data () {
    return {
      nowActiveNav: 'default',
      showSecondLevelNav: false,
      // 第一级的目录导航
      catalogList: [],
      // 第二级的目录列表
      catalogListSecond: [],
      catalogListTree: []
    }
  },
  created () {
    this.getGoodsCatalogList()
    this.goodsCatalogTree()
  },
  methods: {
    // 1、获取目录列表
    async getGoodsCatalogList () {
      let param = {
        parentId: null
      }
      this.Indicator.open()
      let result = await this.goodsAPI.getGoodsCatalogList(param)
      // 现在dealResult方法需要传入第二个参数this，用来调用this的方法
      result = this.show.dealResult(result, this)
      this.Indicator.close()
      console.log(result)
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        // 成功获取到了参数
        this.catalogList = result
        if (this.catalogList.length === 0) {
          this.Toast('当前的目录的数据为空')
        } else {
        }
      }
    },
    // 2、获取全部的目录树状结构
    async goodsCatalogTree () {
      let param = {}
      this.Indicator.open()
      let result = await this.goodsAPI.goodsCatalogTree(param)
      // 现在dealResult方法需要传入第二个参数this，用来调用this的方法
      result = this.show.dealResult(result, this)
      this.Indicator.close()
      console.log(result)
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        // 成功获取到了参数
        this.catalogListTree = result
        if (this.catalogListTree.length === 0) {
          this.Toast('当前的目录树的数据为空')
        } else {
          this.catalogListSecond = this.catalogListTree[0].children
        }
      }
    },
    // 跳转到商品详情页面
    toGoodDetail (item) {
      this.$router.push({name: 'goodsDetail', params: {goodsId: item}})
    },
    // 切换当前显示的分类地址
    changeTheActiveNav (item, index) {
      if (item === 0) {
        this.nowActiveNav = 'default'
      } else {
        this.nowActiveNav = item.rowId
        this.catalogListSecond = this.catalogListTree[index].children
      }
    },
    // 跳转到分类搜索的页面
    changeTheSecondLevel (item, index) {
      this.$router.push({name: 'ClassificationGoodsList', params: {'classificationId': item.rowId}})
    }
  }
}
</script>

<style scoped lang='stylus'>
@import './../../assets/css/base-style.styl'
.classification-page{
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
  /* 左边导航的部分 */
  .left-nav{
    width: 90px;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    box-sizing: border-box;
    padding: 40px 0px 55px;
    background: #ececec;
    overflow: auto;
    .left-nav-ul{
      list-style none;
      padding-bottom:10px;
      >li{
        line-height:26px;
        color:#333;
        font-size:14px;
        background:#ececec;
        padding:5px 1px;
        height:36px;
        box-sizing border-box
        >span{
          width:100%;
          box-sizing border-box;
          border:3px solid transparent
          border-top:0px;
          border-bottom:0px;
          display block;
        }
        &.active{
          background: #fff;
          color: $base-color;
          font-weight: 600;
          >span{
            border-left-color:$base-color;
          }
        }
      }
    }
    /* 二级分类部分的样式 */
  }
  .second-level{
    position: fixed;
    left:90px;
    width:90px;
    max-height:100vh;
    background:#fff;
    box-sizing: border-box;
    z-index:10;
    .second-level-ul{
      list-style none;
      >li{
        line-height:26px;
        color:#333;
        font-size:14px;
        padding:5px 1px;
        height:36px;
        box-sizing border-box
      }
    }
  }
  // 二级页面的遮罩层
  .second-level-shade{
    position: fixed;
    left:90px;
    width:100%;
    height:100%;
    max-height:100vh;
    background:#fff;
    box-sizing: border-box;
    background:rgba(0,0,0,0.2);
    z-index:5;
  }
  /*右边主要内容的部分*/
  .right-content{
    width:100%;
    box-sizing border-box
    padding:9px;
    min-height: 84vh;
    padding-left:90px+@padding;
    padding-bottom:50px+@padding;
    background:#fff;
    .right-content-header-img{
      width:100%;
      height:16vh;
    }
    .classify-item{
      &>ul{
        padding:1rem;
        text-align:left;
        li{
          display: inline-block;
          font-size: 15px;
          line-height: 30px;
          padding: 0 1rem;
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
