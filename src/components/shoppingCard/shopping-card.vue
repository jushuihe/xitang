<template>
  <div class="page">
    <mt-header title="购物车" class='page-title'>
      <button class='editor-btn' @click='editorShopCard' slot='right'>编辑</button>
    </mt-header>
    <!-- 如果购物车里面没有商品的界面 -->
    <div class='no-goods' v-if='goodsList.length == 0'>
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
    <div class='goods-list' v-if='goodsList.length > 0'>
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
        <button class='settleAccounts' @click='settleBtn'>去结算({{choicedGoodsLength}})</button>
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
      goodsList: [],
      isSelectAll: false,
      // 点击编辑按钮的时候显示或隐藏删除按钮
      showDeleteBtn: false,
      timeoutId: 1
    }
  },
  components: {
    goodsList
  },
  created () {
    this.getOrderCartList()
  },
  methods: {
    // 1、获取当前用户的购物车列表
    async getOrderCartList () {
      let param = {}
      this.Indicator.open()
      let result = await this.goodsAPI.getOrderCartList(param)
      result = this.show.dealResult(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        this.goodsList = result
        console.log(this.goodsList)
      }
    },
    // 2、新增/修改购物车商品
    async saveOrderCart () {
      let arrAll = []
      this.goodsList.forEach(item1 => {
        arrAll = [...item1.carts.map(item => {
          let obj = {}
          obj.rowId = item.rowId
          obj.goodsId = item.goodsId
          obj.specId = item.specId
          obj.price = item.price
          obj.amount = item.amount
          obj.amountType = 1
          return obj
        }), ...arrAll]
      })
      let param = arrAll
      let result = await this.goodsAPI.saveOrderCart(param)
      result = this.show.dealResult(result, this)
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        // 采用延时搜素的方式
        clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(() => {
          this.nowPage = 1
          this.getOrderCartList()
        }, 1000)
      }
    },
    // 3、删除购物车商品
    async removeOrderCart (goodsId) {
      let param = {
        ids: [goodsId]
      }
      this.Indicator.open()
      let result = await this.goodsAPI.removeOrderCart(param)
      result = this.show.dealResult(result, this)
      this.Indicator.close()
      if (result) {
        if (result.err === 'warning') {
          this.Toast(result.message)
        } else {
          this.getOrderCartList()
        }
      } else {
        this.getOrderCartList()
      }
    },
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
    // 去结算
    settleBtn () {
      // 在确认订单页面需要将不同的店铺的订单分开  所以这里需要改变数据结构  以店铺为集合
      // 这里需要跳转到订单确认页面
      if (this.choicedGoodsLength === 0) {
        return
      }
      let goodsList = this.goodsList.map(item => {
        if (
          item.carts.some(item => {
            if (item.selected) return true
            else return false
          })
        ) {
          let obj = {}
          obj.shopName = item.shopName
          obj.shopId = item.rowId
          obj.carts = item.carts.map(item1 => {
            if (item1.selected) {
              let obj = {}
              obj.goodsId = item1.goodsId
              obj.goodsName = item1.goodsName
              obj.specId = item1.specId
              obj.price = item1.price
              obj.priceShow = item1.priceShow
              obj.orderNumber = item1.amount
              obj.goodsSpecsName = item1.goodsSpec
              obj.drsc = ''
              return obj
            } else {
              return {}
            }
          })
          return obj
        } else {
          return {}
        }
      })
      console.log(goodsList)
      if (goodsList.filter(item => item.shopId).length > 1) {
        this.Toast('请选择同一商店的商品进行结算')
      } else {
        goodsList = JSON.stringify(goodsList)
        this.$router.push({name: 'ConfirmOrder', query: {'addressId': 35378, 'allGoodsList': goodsList}})
      }
    },
    changeTheSelectedState (index, index1) {
      let obj1 = this.goodsList[index1]
      let arr = obj1.carts
      let obj = arr[index]
      obj.selected = !obj.selected
      arr.splice(index, 1, obj)
      this.goodsList.splice(index1, 1, obj1)
      if (this.goodsList.some(item => {
        if (item.carts.some(item1 => {
          if (!item1.selected) return true
        })) {
          return true
        }
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
          item.carts.forEach((item1, index1) => {
            item1.selected = true
            item.carts.splice(index1, 1, item1)
          })
          this.goodsList.splice(index, 1, item)
        })
      } else {
        this.goodsList.forEach((item, index) => {
          item.carts.forEach((item1, index1) => {
            item1.selected = false
            item.carts.splice(index1, 1, item1)
          })
          this.goodsList.splice(index, 1, item)
        })
      }
    },
    // 减少数量
    reduceTheGoods (index, index1) {
      console.log(index, index1)
      let obj = this.goodsList[index1].carts[index]
      if (obj.amount > 1) {
        obj.amount--
      }
      this.saveOrderCart()
    },
    // 增加数量
    addTheGoods (index, index1) {
      let obj = this.goodsList[index1].carts[index]
      if (obj.amount) {
        obj.amount++
      } else {
        obj.amount = 1
      }
      this.saveOrderCart()
    },
    // 删除当前商品
    deleteTheGoods (item) {
      this.MessageBox.confirm('确定执行此操作?').then(action => {
        this.removeOrderCart(item.goodsId)
      }).catch(data => {
        console.log(2)
      })
    }

  },
  watch: {
  },
  computed: {
    totalPrice () {
      let total = 0
      if (this.goodsList.length > 0) {
        this.goodsList.forEach(item => {
          if (item.carts.length > 0) {
            item.carts.forEach(item1 => {
              if (item1.selected) total += (Number(item1.price) * Number(item1.amount))
            })
          }
        })
      }
      total = parseFloat(total).toFixed(2)
      return total
    },
    choicedGoodsLength () {
      let num = 0
      this.goodsList.forEach(item => {
        item.carts.forEach(item1 => {
          if (item1.selected) {
            num++
          }
        })
      })
      return num
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
      bottom:58px;
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
