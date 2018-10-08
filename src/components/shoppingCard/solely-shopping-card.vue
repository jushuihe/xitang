<template>
  <div class="page">
    <!-- 这是单独使用的 购物车页面 -->
    <mt-header title="购物车"  class='page-title'>
        <a @click='goBack' slot="left">
        <img class='img-item' src="./../../assets/img/back.png" alt="">
        </a>
        <button class='editor-btn' @click='editorShopCard' slot='right'>编辑</button>
    </mt-header>
    <!-- 如果购物车里面没有商品的界面 -->
    <div class='no-goods' v-if='goodsList.length == 0' style='margin-top:40px;'>
      <div class='no-goods-content'>
        <div class='no-goods-img'>
          <img src="../../assets/img/shop-card-empty.png" class='img-item' alt="">
        </div>
        <div class='no-goods-msg'>
          <h3>您的购物车还没有商品！</h3>
          <mt-button class='to-home-btn' @click='toHome' type="primary">去逛逛</mt-button>
        </div>
      </div>
      <div class='gray-content'></div>
      <!-- 推荐商品列表 -->
      <div class='recommend-goods-list'>
        <dl class='recommend-goods-list-item' @click='toGoodDetail(item)' v-for='item in 15' :key='item'>
          <dt>
            <img class='img-item' src="./../../assets/img/goods/3.png" alt="">
          </dt>
          <dd class='recommend-goods-list-item-name'>Q版文殊菩萨</dd>
          <dd class='recommend-goods-list-item-price'><strong style='font-size:12px;'>￥</strong>159</dd>
        </dl>
      </div>
    </div>
    <div class='goods-list' v-if='goodsList.length > 0' style='margin-top:40px;'>
      <goods-list :goodsList='goodsList' :showDeleteBtn='showDeleteBtn' @deleteTheGoods='deleteTheGoods' @changeTheSelectedState='changeTheSelectedState' @reduceTheGoods='reduceTheGoods' @addTheGoods='addTheGoods'></goods-list>
      <!-- 全选和结算的部分 -->
      <div class='selectAll'>
        <button class='select-all-btn' @click='changeTheAllSelectedState'>
          <img class='img-item' v-if='isSelectAll' src="./../../assets/img/selected.png"  alt="">
          <img class='img-item' v-if='!isSelectAll' src="./../../assets/img/unselected.png"  alt="">
        </button>
        <span class='select-all-mg'>全选</span>
        <span class='select-all-mg2'>合计：</span>
        <span class='all-price'>
          <strong style='font-size:12px;'>￥</strong>
          {{totalPrice}}
        </span>
        <button class='settleAccounts' @click='settleBtn'>去结算({{goodsList.length}})</button>
      </div>
    </div>
  </div>
</template>

<script>
import goodsList from './components/goods-list'
export default {
  name: 'baseGroup',
  data () {
    return {
      goodsList: [
        {goodsId: 1, goodsName: '商品1', goodsPrice: '666', goodsImg: './../../../assets/img/goods/3.png', num: 1, selected: false},
        {goodsId: 2, goodsName: '商品2', goodsPrice: '888', goodsImg: './../../../assets/img/goods/4.png', num: 2, selected: false}
      ],
      isSelectAll: false,
      // 点击编辑按钮的时候显示或隐藏删除按钮
      showDeleteBtn: false
    }
  },
  components: {
    goodsList
  },
  created () {},
  methods: {
    editorShopCard () {
      console.log('编辑购物车')
      this.showDeleteBtn = !this.showDeleteBtn
    },
    toHome () {
      this.$router.push({name: 'Home'})
    },
    toGoodDetail (item) {
      this.$router.push({name: 'goodsDetail', params: {goodsId: item}})
    },
    settleBtn () {
      this.Toast('结算')
    },
    changeTheSelectedState (index) {
      let obj = this.goodsList[index]
      obj.selected = !obj.selected
      this.goodsList.splice(index, 1, obj)
      if (this.goodsList.some(item => {
        if (!item.selected) return true
      })) {
        this.isSelectAll = false
      } else {
        this.isSelectAll = true
      }
    },
    changeTheAllSelectedState () {
      this.isSelectAll = !this.isSelectAll
      if (this.isSelectAll) {
        this.goodsList.forEach((item, index) => {
          item.selected = true
          this.goodsList.splice(index, 1, item)
        })
      } else {
        this.goodsList.forEach((item, index) => {
          item.selected = false
          this.goodsList.splice(index, 1, item)
        })
      }
    },
    // 减少数量
    reduceTheGoods (index) {
      let obj = this.goodsList[index]
      if (obj.num > 1) {
        obj.num--
      }
      this.goodsList.splice(index, 1, obj)
    },
    // 增加数量
    addTheGoods (index) {
      let obj = this.goodsList[index]
      if (obj.num) {
        obj.num++
      } else {
        obj.num = 1
      }
      this.goodsList.splice(index, 1, obj)
    },
    // 删除当前商品
    deleteTheGoods (index) {
      this.MessageBox.confirm('确定执行此操作?').then(action => {
        this.goodsList.splice(index, 1)
      }).catch(data => {
        console.log(2)
      })
      console.log('删除')
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  watch: {
  },
  computed: {
    totalPrice () {
      let total = 0
      this.goodsList.forEach(item => {
        if (item.selected) total += (Number(item.goodsPrice) * Number(item.num))
      })
      total = parseFloat(total).toFixed(2)
      return total
    }
  }
}
</script>

<style scoped lang='stylus'>
@import './../../assets/css/base-style.styl'
.page{
  // 页头部分的样式
  .page-title{
    position:fixed;
    top:0px;
    left:0px;
    width: 100%;
    z-index:10;
    .editor-btn{
      position:relative;
      background:$base-color;
      color:#fff;
      border:0px;
      outline none;
      left: -16px;
    }
  }
  // 当前购物车没有商品的样式
  .no-goods{
    .no-goods-content{
      padding: 50px 10px;
      .no-goods-img{
        display inline-block;
        width:10.5rem;
        height:10.5rem;
        vertical-align top
      }
      .no-goods-msg{
        display inline-block;
        margin-left:1rem;
        width:14rem;
        height:10rem;
        text-align left;
        >h3{
          font-size:16px;
          color:#9b9b9b;
          white-space nowrap
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
        >.to-home-btn{
          background:$base-color;
          height:32px;
          font-size:14px;
          border-radius:6px;
        }
      }
    }
    .recommend-goods-list{
      display flex;
      flex-wrap:wrap;
      justify-content:space-around;
      width:100%;
      padding: 0px 6px;
      box-sizing: border-box;
      .recommend-goods-list-item{
        width:31%;
        margin-top:2vh;
        >dt{
          height: 9.5rem;
        }
        >dd{
          font-size: 12px;
          line-height 16px;
          color: $base-undertint-font-color;
          text-align: left;
          margin-top:6px;
          &.recommend-goods-list-item-name{
            font-size: 14px;
          }
          &.recommend-goods-list-item-price{
            font-size: 1.5rem;
            line-height: 2rem;
            color: $base-color;
          }
        }
      }
    }
  }
  // 当前购物车里面有商品的界面
  .goods-list{
    .selectAll{
      position:fixed;
      width:100%;
      height:50px;
      bottom:0px;
      background:#fff;
      color:$base-undertint-font-color;
      line-height:50px;
      text-align:right;
      .select-all-btn{
        width:20px;
        height:20px;
        border-radius 50%;
        overflow:hidden;
        left:10px;
        top:50%;
        margin-top:-10px;
        position:absolute;
        padding:0px;
        outline none;
        border 0px;
      }
      .select-all-mg{
        font-size 12px;
        position absolute;
        display block
        left:40px
      }
      .select-all-mg2{
        font-size:14px;
        margin-left:40px;
      }
      .all-price{
        font-size: 1.5rem;
        line-height: 2rem;
        color: $base-color;
        margin-right: 110px;
      }
      .settleAccounts{
        position:absolute;
        top:0px;
        right:0px;
        background:$base-color;
        width:100px;
        height:100%;
        color:#fff;
        font-size 14px;
        outline none;
        border:0px;
      }
    }
  }
}
</style>
