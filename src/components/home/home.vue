<template>
  <div class="home-page">
    <header class='base-header'>
        <div class='img-content' @click='getTheSaoYiSao'>
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
    <!-- 导航栏 -->
    <nav class='search-component'>
        <ul class='search-component-min-content'>
            <li :class='{"active":activeNav=="default"}' @click='changeTheActiveNav("default")'>推荐</li>
            <!-- 取目录的前五个 -->
            <li v-if='index < 5' v-for='(item, index) in catalogList' :key='item.rowId' :class='{"active":activeNav == item.rowId}' @click='changeTheActiveNav(item, index)'>{{item.name}}</li>
        </ul>
        <div class='show-more-btn' @click="showMore">
            <img class='img-item' src="../../assets/img/showmore.png" alt="">
        </div>
        <transition name='fade'>
            <ul v-if='showMoreNav' class='search-component-max-content'>
               <li v-if='index > 5' v-for='(item, index) in catalogList' :key='item.id' @click='changeTheActiveNav(item, index)'>{{item.name}}</li>
            </ul>
        </transition>
    </nav>
    <!-- 首页轮播图部分 -->
    <mt-swipe @change="handleChange" class='carousel' :auto="4000">
      <mt-swipe-item @click.native='choicedTheGoods(1)'>
        <img class='img-item' src="./../../assets/img/goods/2.png" alt="">
      </mt-swipe-item>
      <mt-swipe-item @click.native='choicedTheGoods(2)'>
        <img class='img-item' src="./../../assets/img/goods/1.png" alt="">
      </mt-swipe-item>
      <mt-swipe-item @click.native='choicedTheGoods(3)'>
        <img class='img-item' src="./../../assets/img/goods/2.png" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <!-- 测试微信登录 -->
    <div>
      <h1>
        登录号：{{openId}}
      </h1>
      <h1>
        用户昵称：{{wechatName}}
      </h1>
      <img :src="wechatHeadImgUrl" alt="">
    </div>
    <!-- 分类部分 -->
    <section class='classify'>
      <div class='gray-content'></div>
      <section class='classify-part'>
        <!-- 空格部分 -->
        <header class='classify-part-header'>
          <h2 class='classify-part-header-title'>每日新品</h2>
          <a class='show-more-btn' @click='showMorePart()'>更多</a>
        </header>
        <div class='classify-part-header-img'>
          <img class='img-item' src="./../../assets/img/goods/1.png" alt="">
        </div>
        <div class='classify-part-content'>
          <dl class='classify-part-content-item' v-for='item in goodsList' :key='item.rowId' @click='toGoodDetail(item)'>
            <!-- 定义列表中的项目 -->
            <dt class='classify-part-content-item-img'>
              <img class='img-item' :src='item.photos ? item.photos[0].url : ""' alt="">
            </dt>
            <!-- 描述列表中的项目 -->
            <dd class='classify-part-content-item-name'>{{item.name}}</dd>
            <dd class='classify-part-content-item-price'><strong style='font-size:12px;'>￥</strong>{{item.price}}</dd>
          </dl>
        </div>
      </section>
      <div class='gray-content'></div>
      <section class='classify-part'>
        <!-- 空格部分 -->
        <header class='classify-part-header'>
          <h2 class='classify-part-header-title'>精品推荐</h2>
          <a class='show-more-btn' @click='showMorePart()'>更多</a>
        </header>
        <div class='classify-part-header-img'>
          <img class='img-item' src="./../../assets/img/goods/1.png" alt="">
        </div>
        <div class='classify-part-content'>
          <dl class='classify-part-content-item' v-for='item in 9' :key='item' >
            <!-- 定义列表中的项目 -->
            <dt class='classify-part-content-item-img'>
              <img class='img-item' src="./../../assets/img/goods/3.png" alt="">
            </dt>
            <!-- 描述列表中的项目 -->
            <dd class='classify-part-content-item-name'>Q版文殊菩萨</dd>
            <dd class='classify-part-content-item-price'><strong style='font-size:12px;'>￥</strong>159</dd>
          </dl>
        </div>
      </section>
    </section>
    <div class='gray-content'></div>
  </div>
</template>

<script>
export default {
  name: 'baseGroup',
  data () {
    return {
      selected: 'home',
      value: '',
      // 当前激活的导航菜单项
      activeNav: 'default',
      showMoreNav: false,
      // 目录列表
      catalogList: [],
      // 商品列表
      goodsList: []
    }
  },
  created () {
    // this.testAPI()
    this.getGoodsCatalogList()
    this.getGoodsListWithPage()
    // if (this.$route.query.openId) {
    //   console.log(this.$route.query.openId)
    //   this.str.writeS('openId', this.$route.query.openId)
    // }
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
    // 2、根据不同的条件获取商品列表
    async getGoodsListWithPage (name, catalogId) {
      let param = {
        name,
        catalogId,
        pageNow: 1,
        limit: 0
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
    handleChange () {},
    choicedTheGoods (item) {
      console.log(item)
    },
    changeTheActiveNav (item, index) {
      if (item === 'default') {
        this.activeNav = 'default'
      } else {
        this.activeNav = item.rowId
        console.log('获取商品列表')
        if (index > 5) {
          this.catalogList.splice(index, 1)
          this.catalogList.unshift(item)
        }
      }
    },
    showMore () {
      console.log('显示更多的导航项')
      this.showMoreNav = !this.showMoreNav
    },
    // 查看更多的时候显示的商品分类的页面
    showMorePart (index) {
      console.log(index)
      console.log('需要跳转到特定的页面')
    },
    // 跳转到商品详情页面
    toGoodDetail (item) {
      console.log(item)
      this.$router.push({name: 'goodsDetail', params: {goodsId: item.rowId}})
    },
    getTheSaoYiSao () {
      console.log(1)
      window.open('http://sao315.com/w/api/saoyisao?redirect_uri=www.baidu.com')
    }
  },
  watch: {
    selected (val) {
      this.$router.push('/base/' + val)
    }
  },
  computed: {
    openId () {
      return this.str.readS('openId')
    },
    wechatName () {
      return this.str.readS('wechatName')
    },
    wechatHeadImgUrl () {
      return this.str.readS('wechatHeadImgUrl')
    }
  }
}
</script>

<style scoped lang='stylus'>
@import './../../assets/css/base-style.styl'
.home-page{
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
            z-index:10;
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
  // 导航栏部分
  .search-component{
      background:$base-color;
      color:#fff;
      position relative
      padding:1px 5px;
      .search-component-min-content{
          list-style:none;
          display:flex;
          flex-wrap:nowrap;
          justify-content:space-between;
          width:90%;
          padding:0 10px;
          box-sizing: border-box;
          >li{
              display inline-block;
              font-size:14px;
              line-height 26px;
              padding: 0px 7px;
              border-bottom:2px solid transparent;
              &.active{
                  border-bottom:2px solid #fff;
              }
          }
      }
      .show-more-btn{
          width:15px;
          height:9px;
          position absolute;
          right:15px;
          top:10px;
      }
      .search-component-max-content{
          list-style:none;
          display:flex;
          flex-wrap:wrap;
          justify-content:flex-start;
          margin-top:10px;
          >li{
              font-size: 14px;
              line-height: 34px;
              padding: 0px 16px;
          }
      }
  }
  .carousel{
    height:25vh;
  }
  .classify{
    background:#fff;
    .classify-part{
      padding:8px;
      .classify-part-header{
        position: relative;
        .classify-part-header-title{
          color:$base-color;
          font-size:16px;
          font-weight 600;
          background:url('./../../assets/img/title-bg.png') no-repeat left center;
          background-size:112px 30px;
          text-align: left;
          padding-left: 24px;
          line-height: 40px;
        }
        .show-more-btn{
          position: absolute;
          top: 50%;
          right: 5px;
          margin-top: -8px;
          padding-right: 12px;
          background:url('./../../assets/img/addMore.png') no-repeat right center;
          background-size:6px 10px;
          font-size: 12px;
        }

      }
      .classify-part-header-img{
        margin-top:5px;
        width:100%;
        height:22vh;
      }
      .classify-part-content{
        display flex;
        flex-wrap:wrap;
        justify-content:space-between;
        width:100%;
        >.classify-part-content-item{
          width:31%;
          margin-top:2vh;
          .classify-part-content-item-img{
            height: 9.2rem;
          }
          .classify-part-content-item-name{
            font-size: 14px;
            color: $base-undertint-font-color;
            text-align: left;
          }
          .classify-part-content-item-price{
            font-size: 1.5rem;
            line-height: 2rem;
            color: $base-color;
            text-align: left;
          }

        }
      }
    }
  }
  .fade-enter-active {
    animation: fade-in .5s;
  }
  @keyframes fade-in {
    0% {
        transform: translateY(-5px);
    }
    50% {
        transform: translateY(3px);
    }
    100% {
        transform: translateY(0px);
    }
  }
}
</style>
