<template>
  <div class="home-page">
    <header class='base-header'>
        <div class='img-content' @click='getTheSaoYiSao'>
            <img src="../../assets/img/saoyisao.png" class='img-item' alt="">
        </div>
        <div class='search-content'>
            <img class='search-content-img' src='../../assets/img/search.png' alt=''>
            <input type="text" v-model='searchMsg' class='search-content-input' @keyup.enter='searchTheGoodsList' placeholder="搜索...">
        </div>
        <div class='img-content'>
            <img src="../../assets/img/zixun.png" class='img-item' alt="">
        </div>
    </header>
    <!-- 导航栏 -->
    <nav class='search-component'>
        <ul class='search-component-min-content'>
          <li v-if='index < 6' v-for='(item, index) in catalogList' :key='item.rowId' :class='{"active":activeNav == item.rowId}' @click='changeTheActiveNav(item, index)'>{{item.name}}</li>
        </ul>
        <div class='show-more-btn' v-if='catalogList.length > 6' @click="showMore">
            <img class='img-item' src="../../assets/img/showmore.png" alt="">
        </div>
        <transition name='fade'>
            <ul v-if='showMoreNav' class='search-component-max-content'>
               <li v-if='index > 6' v-for='(item, index) in catalogList' :key='item.id' @click='changeTheActiveNav(item, index)'>{{item.name}}</li>
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
    <div>{{msg}}</div>
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
              <img class='img-item' :src='getTheCoverPic(item.photos)' alt="">
            </dt>
            <!-- 描述列表中的项目 -->
            <dd class='classify-part-content-item-name'>{{item.name}}</dd>
            <dd class='classify-part-content-item-price'><strong style='font-size:12px;'>￥</strong>{{getTheGoodsFirstPrice(item.specs)}}</dd>
          </dl>
        </div>
      </section>
      <div class='gray-content'></div>
      <section class='classify-part'>
        <!-- 空格部分 -->
        <header class='classify-part-header'>
          <h2 class='classify-part-header-title'>每日团购</h2>
          <a class='show-more-btn' @click='showMorePart()'>更多</a>
        </header>
        <div class='classify-part-header-img'>
          <img class='img-item' src="./../../assets/img/goods/1.png" alt="">
        </div>
        <div class='classify-part-content'>
          <dl class='classify-part-content-item' v-for='item in groupPurchaseGoodsList' :key='item' >
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
var wx = require('weixin-js-sdk')
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
      goodsList: [],
      msg: '',
      defaultImg: 'http://xitang.shijiweika.com/img/1541663983385.jpg',
      searchMsg: '',
      // 团购商品列表
      groupPurchaseGoodsList: [],
      // 精品推荐商品列表
      recommendGoodsList: []
    }
  },
  created () {
    this.getGoodsCatalogList()
    this.getGoodsListWithPage()
    // 获取推荐的列表
    this.getRecommendList(0)
    // 获取团购的列表
    this.getRecommendList(1)
    this.judgeTheStrMsg()
  },
  methods: {
    // 1、获取目录列表
    async getGoodsCatalogList () {
      let param = {
        // name: '',
        // isShow: 1
      }
      this.Indicator.open()
      // 获取目录的树形结构
      let result = await this.goodsAPI.goodsCatalogTree(param)
      // 现在dealResult方法需要传入第二个参数this，用来调用this的方法
      result = this.show.dealResult(result, this)
      this.Indicator.close()
      console.log(result)
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        // 成功获取到了参数
        result.forEach(item => {
          item.children.forEach(item1 => {
            this.catalogList.push(item1)
          })
        })
        this.activeNav = this.catalogList[0].rowId
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
        pageSize: 10
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
    // 3、获取微信js-sdk的config
    async getWxinfoConfig () {
      let param = {
        url: window.location.href
      }
      this.Indicator.open()
      let result = await this.goodsAPI.getWxinfoConfig(param)
      this.Indicator.close()
      this.wxjsMain(result)
    },
    // 4、获取微信js-sdk的config
    async getRecommendList (typeCode) {
      let param = {
        typeCode
      }
      this.Indicator.open()
      let result = await this.goodsAPI.getRecommendList(param)
      result = this.show.dealResult(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        if (typeCode === 0) {
          // 获取推荐的列表
          this.recommendGoodsList = result
        } else if (typeCode === 1) {
          // 获取团购的列表
          this.groupPurchaseGoodsList = result
        }
      }
    },
    // 获取到微信SDK之后调用wx的方法调起扫一扫功能
    wxjsMain (cfgObj) {
      let that = this
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx57127d6c1d11d825', // 必填，公众号的唯一标识
        timestamp: cfgObj.timestamp, // 必填，生成签名的时间戳
        nonceStr: cfgObj.noncestr, // 必填，生成签名的随机串
        signature: cfgObj.signature, // 必填，签名
        jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
      })
      wx.ready(function () {
        wx.scanQRCode({
          desc: 'scanQRCode desc',
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            that.msg = JSON.stringify(res.resultStr)
            sessionStorage.setItem('page_url', res.resultStr)
            location.href = 'http://xitang.shijiweika.com/mobile/'
          },
          error: function (res) {
            if (res.errMsg.indexOf('function_not_exist') > 0) {
              alert('版本过低请升级')
            }
          }
        })
      })
      /**
       * config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
       * */
      wx.error(function (res) {
        console.log(res)
      })
    },
    choicedTheGoods (item) {
      console.log(item)
    },
    changeTheActiveNav (item, index) {
      this.activeNav = item.rowId
      if (index > 5) {
        this.catalogList.splice(index, 1)
        this.catalogList.unshift(item)
      }
      this.$router.push({name: 'ClassificationGoodsList', params: {'classificationId': item.rowId}})
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
      // sessionStorage.setItem('page_url', '{"type": 2, "goodsId": 1, "specId": 1}')
      this.getWxinfoConfig()
      // window.open('http://sao315.com/w/api/saoyisao?redirect_uri=www.baidu.com')
    },
    // 判断是否有商品信息，如果有商品信息，直接跳转到商品的详情页面
    judgeTheStrMsg () {
      if (this.page_url && Object.keys(this.page_url).length > 0) {
        if (this.page_url.type === 2) {
          this.$router.push({name: 'goodsDetail', params: {'goodsId': this.page_url.goodsId}})
        }
      }
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
    },
    // 按关键字搜索商品列表
    searchTheGoodsList () {
      console.log('sousu')
      this.$router.push({name: 'SearchResult', params: {'searchMsg': this.searchMsg}})
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
    },
    // 因为会将所以的二维码的信息都存储在sessionStorage里面，所以这里需要判断sessionStorage里面是否有数据
    page_url () {
      return this.str.readS('page_url')
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
        width:100%;
        >.classify-part-content-item{
          width: 31%;
          margin-top: 2vh;
          margin-left: 1%;
          margin-right: 1%;
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
