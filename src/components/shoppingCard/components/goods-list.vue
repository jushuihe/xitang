<template>
    <div class='goods-list-content'>
        <div class='goods-list-content-item' v-for='(item, index) in goodsList' :key='item.goodsId'>
            <button class='goods-operation' @click='changeTheSelectedState(item, index)'>
                <img class='img-item' v-if='item.selected' src="./../../../assets/img/selected.png" alt="">
                <img class='img-item' v-if='!item.selected' src="./../../../assets/img/unselected.png" alt="">
            </button>
            <div class='goods-img' @click='toGoodDetail(item)'>
                <img class='img-item' src='./../../../assets/img/goods/3.png' alt=''>
            </div>
            <div class='goods-msg'>
                <h3>{{item.goodsName}}</h3>
                <p>规格：铜制小貔貅</p>
                <div>
                    <div class='goods-price'>
                        <strong style='font-size:12px;'>￥</strong>{{item.goodsPrice}}
                    </div>
                    <div class='goods-num'>
                        <button @click='reduceTheGoods(item, index)'>-</button>
                        <input readonly :value='item.num ? item.num : 1' type="text">
                        <button @click='addTheGoods(item, index)'>+</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['goodsList', 'isSelectAll'],
  name: '',
  data () {
    return {}
  },
  created () {},
  methods: {
    reduceTheGoods (item, index) {
      this.$emit('reduceTheGoods', index)
    },
    addTheGoods (item, index) {
      this.$emit('addTheGoods', index)
    },
    changeTheSelectedState (item, index) {
      this.$emit('changeTheSelectedState', index)
    },
    // 跳转到商品详情页面
    toGoodDetail (item) {
      this.$router.push({name: 'goodsDetail', params: {goodsId: item.goodsId}})
    },
  }
}
</script>

<style lang='stylus' scoped>
@import './../../../assets/css/base-style.styl'
$numbtn-color=#979797;
.goods-list-content{
    background:#fff;
    .goods-list-content-item{
        position:relative;
        text-align left;
        padding-top:1.5rem;
        padding-bottom 1.5rem;
        border-bottom:1px solid #eee;
        .goods-operation{
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
        .goods-img{
            position:absolute;
            width:6rem;
            height:6rem;
            float:left;
            margin-left:5.8rem;
        }
        .goods-msg{
            display inline-block;
            width:100%;
            padding-left:13rem;
            padding-right:1rem;
            box-sizing border-box;
            height: 6rem;
            vertical-align top;
            >h3{
                color:#4A4A4A;
                font-size:16px;
                line-height 26px;
            }
            >p{
                color:$numbtn-color;
                font-size:12px;
                line-height:24px;
            }
            >div{
                position: relative;
                height:3rem;
                .goods-price{
                    font-size: 1.5rem;
                    line-height: 2rem;
                    color: $base-color;
                }
                .goods-num{
                    position: absolute;
                    top:0px;
                    right:0px;
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
    }
}
</style>
