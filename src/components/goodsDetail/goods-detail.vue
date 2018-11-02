<template>
  <div class="page">
      <mt-header title="商品详情" class='page-header'>
          <a @click='goBack' slot="left">
            <img class='img-item' src="./../../assets/img/back.png" alt="">
          </a>
          <img slot="right" class='img-item' src="./../../assets/img/share.png" alt="">
      </mt-header>
      <div class='main-content'>
        <!-- 头部导航栏 -->
        <div class='header-nav' v-if='showMorePicContent'>
          <ul>
            <li><a :class='{"active":theChoicedNav==1}' href="#">商品</a></li>
            <li><a :class='{"active":theChoicedNav==2}' href="#">详情</a></li>
            <li><a :class='{"active":theChoicedNav==3}' href="#">评价</a></li>
          </ul>
        </div>
        <!-- 商品的轮播图部分 -->
        <div class='swip-content' :class='{"showMorePicContent":showMorePicContent}'>
          <mt-swipe :show-indicators="false" style='height:100%' :auto="0" @change="handleChange">
            <mt-swipe-item>
              <img class='img-item' src="./../../assets/img/goods/goods1.jpg" alt="">
            </mt-swipe-item>
            <mt-swipe-item>
              <img class='img-item' src="./../../assets/img/goods/goods2.jpg" alt="">
            </mt-swipe-item>
            <mt-swipe-item>
              <img class='img-item' src="./../../assets/img/goods/goods3.jpg" alt="">
            </mt-swipe-item>
            <mt-swipe-item>
              <img class='img-item' src="./../../assets/img/goods/goods4.jpg" alt="">
            </mt-swipe-item>
            <mt-swipe-item>
              <img class='img-item' src="./../../assets/img/goods/goods5.jpg" alt="">
            </mt-swipe-item>
          </mt-swipe>
          <div class='swip-badge'>
            <span style='font-size:14px;'>{{nowShowSwipe}}</span>
            <span style='font-size:14px;'>/</span>
            <span style='font-size:14px'>5</span>
          </div>
        </div>
        <!-- 商品名称 价格介绍部分 -->
        <div class='goods-msg-content'>
          <!-- 商品名称 介绍 价格 -->
          <div class='goods-name'>
            <h3>{{goodsMsg.name}}</h3>
            <p>{{goodsMsg.drse}}</p>
            <div class='goods-price'>
              <span class='goods-price-practical'>
                <!-- <strong>拼团价</strong> -->
                ￥<strong style='font-size:24px;'>{{goodsDetail.specs&&goodsDetail.specs.length>0?goodsDetail.specs[0].price:''}}</strong>
              </span>
              &nbsp;&nbsp;
              <span style="text-decoration:line-through;"><span>单买价</span>￥{{goodsDetail.specs&&goodsDetail.specs.length>0?goodsDetail.specs[0].priceShow:''}}</span>
            </div>
          </div>
          <!-- 商品的好评 评价部分 -->
          <div class='goods-evaluate'>
            <div class='goods-evaluate-proportion'>96.4%</div>
            <p>好评率</p>
            <p>销量 97</p>
          </div>
        </div>
        <div class='gray-content'></div>
        <!-- 选择  商品规格 以及 选择收货地址的部分 -->
        <div class='choiced-goods-num' >
          <mt-cell
            title="规格数量选择"
            is-link
            class='user-defined-mt-cell'
            @click.native='choicedTheGoodsNum'
            value="请选择">
          </mt-cell>
          <mt-cell
            title="团购规则"
            is-link
            class='user-defined-mt-cell'
            value="支持自动成团，人数不足自动退款">
          </mt-cell>
          <mt-cell
            title="送至"
            is-link
            class='user-defined-mt-cell'
            @click.native='choicedTheShoppingAddress'
            value="请选择">
          </mt-cell>
        </div>
        <!-- 店铺的信息 -->
        <div class='shop-content'>
        </div>
        <!-- 商品详情和评论的部分 -->
        <div v-if='showMorePicContent'></div>
      </div>
      <!-- 固定在底部的 立即购买的部分 -->
      <div class='footer'>
        <div class='footer-item'>
          <ul>
            <li @click='contactTheServer'>
              <img src="./../../assets/img/goods/customer-service.png" class='img-item' alt="">
            </li>
            <li @click='goToTheShopCard'>
              <img src="./../../assets/img/goods/shop-card.png" class='img-item'>
              <mt-badge class='shop-card-num' size="small">30</mt-badge>
            </li>
            <li @click='collectTheShopCard'>
              <img v-if='false' src="./../../assets/img/goods/collect.png" class='img-item' alt="">
              <img src="./../../assets/img/goods/already-collect.png" class='img-item' alt="">
            </li>
          </ul>
        </div>
        <div class='footer-item'>
          <mt-button type="default" @click.native='addToShoppingCard' size="large" class='footer-item-btn default'>加入购物车</mt-button>
        </div>
        <div class='footer-item'>
          <mt-button type="primary" @click.native='buyImmediately'  size="large" class='footer-item-btn base-color'>立即购买</mt-button>
        </div>
      </div>
      <!-- 选择规格的时候显示的内容 -->
      <div class='default-specification' v-if='showSpecification'  @click='showSpecification=false'>
        <div class='default-specification-content' @click.stop='showSpecification=true'>
          <!-- 商品详情 -->
          <div class='goods-msg'>
            <div class='goods-mg-img'>
              <img src="./../../assets/img/goods/4.png" class='img-item' alt="">
            </div>
            <div class='goods-mg-name'>
              <h3>{{hasChoicedSpecificationMsg.specName}}</h3>
              <h4>价格： ￥<strong style='font-size:18px;'>{{hasChoicedSpecificationMsg.price}}</strong></h4>
              <p>
                请选择规格参数
              </p>
            </div>
          </div>
          <!-- 规格列表 -->
          <div class='goods-specification'>
            <h4>规格</h4>
            <ul>
              <li @click='hasChoicedSpecification=index' :class='{"active":hasChoicedSpecification==index}' v-for='(item,index) in goodsDetail.specs' :key='item.rowId'>
                {{item.specName}}
              </li>
            </ul>
          </div>
          <!-- 选择数量 -->
          <div class='goods-num'>
            <h4>数量</h4>
            <div class='goods-num-item'>
              <button @click='reduceTheGoods' :disabled='!(goodsNum>1)'>-</button>
              <input readonly :value='goodsNum ? goodsNum : 1' type="text">
              <button @click='addTheGoods'>+</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'coupon',
  data () {
    return {
      nowShowSwipe: 1,
      showSpecification: false,
      goodsNum: 1,
      hasChoicedSpecification: 0,
      // 保存商品的信息
      goodsDetail: {},
      goodsMsg: {},
      theChoicedNav: 3,
      // 是否显示商品详情的部分
      showMorePicContent: false
    }
  },
  created () {
    this.getGoodsDetailByRowId(this.goodsId)
    this.getGoodsDetailById(this.goodsId)
  },
  mounted () {
    this.addEventListen()
  },
  methods: {
    // 1、通过商品ID获取商品信息
    async getGoodsDetailByRowId (rowId) {
      let param = {
        rowId
      }
      this.Indicator.open()
      let result = await this.goodsAPI.getGoodsMsgById(param)
      result = this.show.dealResult(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        // 成功获取到了参数
        this.goodsMsg = result
        console.log(this.goodsMsg)
      }
    },
    // 2、通过商品ID获取商品信息
    async getGoodsDetailById (rowId) {
      let param = {
        rowId
      }
      this.Indicator.open()
      let result = await this.goodsAPI.getGoodsDetailById(param)
      result = this.show.dealResult(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        // 成功获取到了参数
        this.goodsDetail = result
        console.log(this.goodsDetail)
      }
    },
    // 3、将一个商品添加至购物车
    async saveOrderCart () {
      if (Object.keys(this.hasChoicedSpecificationMsg).length === 0) {
        this.Toast('请先选择规格')
        return
      }
      let param = [
        {
          goodsId: this.goodsId,
          specId: this.hasChoicedSpecificationMsg.rowId,
          price: this.hasChoicedSpecificationMsg.price,
          // 订购数量类型（0增量，1覆盖
          amountType: 1,
          amount: this.goodsNum
        }
      ]
      this.Indicator.open()
      let result = await this.goodsAPI.saveOrderCart(param)
      result = this.show.dealResult(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        console.log(result)
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    handleChange (index) {
      console.log('切换轮播图')
      this.nowShowSwipe = index + 1
    },
    // 联系客服
    contactTheServer () {
      this.Toast('当前功能暂未开通')
    },
    // 查看购物车
    goToTheShopCard () {
      this.$router.push({name: 'ShoppingCardSolely'})
    },
    // 收藏当前的商品
    collectTheShopCard () {
      this.Toast('收藏成功')
    },
    // 选择当前商品的规格以及数量
    choicedTheGoodsNum () {
      console.log('选择商品规格数量')
      if (this.goodsDetail.specs.length > 0) {
        this.showSpecification = true
      } else {
        this.Toast('改商品没有多种的规格')
      }
    },
    // 选择当前商品的收货地址
    choicedTheShoppingAddress () {
      console.log('选择收货地址')
    },
    reduceTheGoods () {
      if (this.goodsNum > 1) this.goodsNum--
    },
    addTheGoods () {
      this.goodsNum++
    },
    // 立即购买
    buyImmediately () {
      // 提交订单的时候需要传入的商品属性包括
      // 1、订单Id rowId
      // 2、cartId 购物车Id
      // 3、orderId 表头ID
      // 4、goodsId 商品Id
      // 5、specId  规格ID
      // 6、price   单价
      // 7、orderNumber 订单数量
      // 8、drsc    备注
      let goodsList = [
        {
          goodsId: this.goodsId,
          goodsName: this.goodsMsg.name,
          price: this.hasChoicedSpecificationMsg ? this.hasChoicedSpecificationMsg.price : '',
          priceShow: this.hasChoicedSpecificationMsg ? this.hasChoicedSpecificationMsg.priceShow : '',
          orderNumber: this.goodsNum,
          specId: this.hasChoicedSpecificationMsg ? this.hasChoicedSpecificationMsg.rowId : '',
          goodsSpecsName: this.hasChoicedSpecificationMsg ? this.hasChoicedSpecificationMsg.specName : '',
          drsc: ''
        }
      ]
      let allGoodsList = [{
        shopName: this.goodsMsg.shopName,
        shopId: this.goodsMsg.shopId,
        carts: goodsList
      }]
      console.log(allGoodsList)
      allGoodsList = JSON.stringify(allGoodsList)
      this.$router.push({name: 'ConfirmOrder', query: {'addressId': 35378, 'allGoodsList': allGoodsList}})
    },
    // 加入购物车
    addToShoppingCard () {
      this.saveOrderCart()
    },
    // 手机监听滑动到底部的事件
    addEventListen () {
      window.addEventListener('scroll', this.aa)
    },
    aa () {
      // 当前body 滚动的y轴的距离
      // console.log(window.scrollY)
      // 当前框子的高度
      // console.log(window.innerHeight)
      // 当前body的总高度
      // console.log(document.body.clientHeight)
      if (window.scrollY + window.innerHeight >= document.body.clientHeight) {
        console.log('滚动到了底部')
        this.showMorePicContent = true
      }
    }
  },
  computed: {
    goodsId () {
      return this.$route.params.goodsId
    },
    hasChoicedSpecificationMsg () {
      if (this.goodsDetail.specs.length > 0) {
        return this.goodsDetail.specs[this.hasChoicedSpecification]
      } else {
        return {}
      }
    }
  }
}
</script>

<style scoped lang='stylus'>
@import './../../assets/css/base-style.styl'
.page{
  .main-content{
    overflow:hidden;
    .header-nav{
      width:100%;
      height:40px;
      background:#fff;
      position:fixed;
      top:40px;
      z-index 10;
      &>ul{
        width:180px;
        height:26px;
        margin:6px auto;
        list-style:none;
        // border:1px solid #DED7D7;
        border-radius:5px;
        font-size:0px;
        display: flex;
        &>li{
          font-size:14px;
          display:inline-block;
          line-height 24px;
          width:60px;
          >a{
            color:#9b9b9b;
            text-decoration: none;
            display:inline-block;
            width:100%;
            height:100%;
            border-top:1px solid #DED7D7;
            border-bottom:1px solid #DED7D7;
            &.active{
              color:#fff;
              background:$base-color;
              border-color:$base-color;
            }
          }
          &:first-child{
            >a{
              border-right:1px solid #DED7D7
              border-left:1px solid #DED7D7;
              border-bottom-left-radius: 5px;
              border-top-left-radius: 5px;
            }
          }
          &:last-child{
            >a{
              border-left:1px solid #DED7D7
              border-right:1px solid #DED7D7;
              border-bottom-right-radius: 5px;
              border-top-right-radius: 5px;
            }
          }
        }
      }
      &:before{
        content:'';
        display table;
      }
    }
    .showMorePicContent{
      margin-top:40px;
    }
    .swip-content{
      height:355px;
      position relative
      .swip-badge{
        position absolute;
        bottom:1rem;
        right:1rem;
        background:#fff;
        width:32px;
        height:18px;
        border-radius 10px;
        color:#333;
        font-size:0px
        line-height 18px
      }
    }
    .goods-msg-content{
      font-size:0px;
      background:#fff;
      .goods-name{
        width:70%;
        display inline-block
        text-align left;
        padding-left:1rem;
        box-sizing: border-box;
        h3{
          font-size:20px;
          line-height 36px;
        }
        p{
          font-size:12px;
          color:#9B9B9B;
          line-height 24px;
        }
        .goods-price{
          color:#aaa
          font-size:12px;
          line-height 40px
          .goods-price-practical{
            color:$base-color;
            font-size:16px;
          }
        }
      }
      .goods-evaluate{
        width:30%;
        display inline-block;
        font-size:12px;
        color:#aaa;
        vertical-align:top;
        background:url('./../../assets/img/addMore.png') no-repeat;
        background-position:90% 20px
        background-size:12px 20px
        .goods-evaluate-proportion{
          font-size:20px;
          line-height 36px;
        }
        p{
          line-height:20px;
          &:last-child{
            line-height 50px
          }
        }
      }
    }
    .choiced-goods-num{
      text-align:left;
      .user-defined-mt-cell{
        padding-left:1.5rem;
      }
    }
  }
  .footer{
    position fixed;
    width:100%;
    height:50px;
    bottom:0px;
    font-size:0px;
    background:#fff;
    border-top: 1px solid #eee;
    z-index 10
    .footer-item{
      display inline-block;
      width:33%;
      vertical-align top
      >ul{
        height:50px;
        li{
          display inline-block;
          width:33%;
          height:50px;
          box-sizing border-box;
          border-right:1px solid #eee;
          position relative
          text-align:center;
          >img{
            width:20px;
            height:18px;
            margin-top:16px;
          }
          &:last-child{
            border-right:0px;
          }
          .shop-card-num{
            position:absolute;
            top:7px;
            background:$base-color;
            right:-6px;
          }
        }
      }
      .footer-item-btn{
        height:50px;
        border:0px;
        box-shadow:none;
        border-radius 0px;
        &.default{
          border-left:1px solid #eee;
        }
        &.base-color{
          background:$base-color;
        }
      }
    }
  }
  // 显示产品规格的部分
  .default-specification{
    background:rgba(0,0,0,0.2);
    position: fixed;
    top: 0px;
    width:100vw;
    height:100vh;
    .default-specification-content{
      position:absolute;
      bottom:-60px;
      background:#fff;
      width:100%;
      animation myMove 0.3s linear 1 normal
      animation-fill-mode both
      .goods-msg{
        margin-top: 1rem;
        margin-bottom: 2rem;
        .goods-mg-img{
          float:left;
          width:80px;
          height:80px;
          margin-left:15px;
        }
        .goods-mg-name{
          margin-left:110px;
          text-align left;
          h3{
            font-size:16px;
            color:#4a4a4a;
            line-height:30px;
          }
          h4{
            font-size:14px;
            color:$base-color;
            line-height:30px;
          }
          p{
            font-size:12px;
            color:#aaa;
          }
        }
      }
      .goods-specification{
        margin-left:15px;
        text-align:left;
        h4{
          font-size:14px;
          color:#4a4a4a;
          font-size 14px;
          line-height 36px
        }
        ul{
          list-style none
          li{
            display inline-block;
            background #fff;
            color:#4a4a4a;
            border:1px solid #aaa;
            border-radius 4px;
            line-height:26px;
            font-size:13px;
            padding:0px 14px;
            margin:5px;
            &.active{
              background:$base-color;
              border-color:$base-color;
              color:#fff;
            }
          }
        }
      }
      .goods-num{
        margin-left:15px;
        margin-top:20px;
        text-align:left;
        h4{
          font-size:14px;
          color:#4a4a4a;
          font-size 14px;
          line-height 36px
        }
        .goods-num-item{
          margin-bottom:20px
          font-size 0px;
          >input{
            width:33px;
            height:23px;
            line-height 23px;
            border:1px solid #DED7D7
            border-left:0px;
            border-right:0px;
            text-align center;
            color:$numbtn-color;
          }
          >button{
            width:22px;
            height:23px;
            background:#F4F4F4;
            outline none;
            border:1px solid #DED7D7;
            padding 0px
            box-sizing content-box
            font-size: 20px;
            vertical-align: top;
            color:$numbtn-color;
            &:active{
                background:#ddd;
            }
            &:first-child{
                border-top-left-radius:3px
                border-bottom-left-radius:3px
            }
            &:last-child{
                border-top-right-radius:3px
                border-bottom-right-radius:3px
            }
          }
        }
      }
    }
    @keyframes myMove {
      from{
        bottom:-60px;
      }
      to{
        bottom:50px;
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
