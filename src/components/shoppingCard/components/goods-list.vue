<template>
    <div class='goods-list-content'>
        <div class='shop-content' v-for='(item1, index1) in goodsList' :key='item1.rowId'>
            <div class='shop-name'>
                {{item1.shopName}}
            </div>
            <div class='goods-list-content-item' v-for='(item, index) in item1.carts' :key='item.createdTime'>
                <button class='goods-operation' @click='changeTheSelectedState(item, index, index1)'>
                    <img class='img-item' v-if='item.selected' src="./../../../assets/img/selected.png" alt="">
                    <img class='img-item' v-if='!item.selected' src="./../../../assets/img/unselected.png" alt="">
                </button>
                <div class='goods-img' @click='toGoodDetail(item)'>
                    <img class='img-item' :src='item.picUrl' alt=''>
                </div>
                <div class='goods-msg'>
                    <h3>{{item.goodsName}}</h3>
                    <p>规格：{{item.goodsSpec}}</p>
                    <div>
                        <div class='goods-price'>
                            <strong style='font-size:12px;'>￥</strong>{{item.price}}
                        </div>
                        <div class='goods-num'>
                            <button @click='reduceTheGoods(item, index, index1)' :disabled='!(item.amount>1)'>-</button>
                            <input readonly :value='item.amount ? item.amount : 1' type="text">
                            <button @click='addTheGoods(item, index, index1)'>+</button>
                        </div>
                    </div>
                    <transition name='fade'>
                        <mt-button v-if='showDeleteBtn' class='delete-btn' @click.native='deleteTheGoods(item)'  size="small" type="danger">删除</mt-button>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['goodsList', 'isSelectAll', 'showDeleteBtn'],
  name: '',
  data () {
    return {
    }
  },
  created () {},
  methods: {
    reduceTheGoods (item, index, index1) {
      this.$emit('reduceTheGoods', index, index1)
    },
    addTheGoods (item, index, index1) {
      this.$emit('addTheGoods', index, index1)
    },
    changeTheSelectedState (item, index, index1) {
      this.$emit('changeTheSelectedState', index, index1)
    },
    // 跳转到商品详情页面
    toGoodDetail (item) {
      this.$router.push({name: 'goodsDetail', params: {goodsId: item.goodsId}})
    },
    deleteTheGoods (item) {
      this.$emit('deleteTheGoods', item)
    }
  }
}
</script>

<style lang='stylus' scoped>
@import './../../../assets/css/base-style.styl'
$numbtn-color=#979797;
.goods-list-content{
    .shop-content{
        background:#fff;
        width:95%;
        margin:1rem auto 1rem;
        border-radius 8px;
        overflow hidden
        .shop-name{
            line-height 30px;
            font-size: 18px;
            font-weight: 600;
            text-align: left;
            padding-left: 2.8rem;
            background: url('./../../../assets/img/home.png') no-repeat 1rem center;
            background-size: 16px 16px;
            border-bottom:1px solid #eee;
        }
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
                    color:$base-undertint-font-color;
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
                .delete-btn{
                    position absolute;
                    top:10px;
                    right:1rem;
                }
                // 删除按钮的动画效果
                .fade-enter-active {
                    animation: fade-in .5s;
                }
                @keyframes fade-in {
                    0% {
                        transform: translateY(-5px);
                    }
                    50% {
                        transform: translateY(5px);
                    }
                    100% {
                        transform: translateY(0px);
                    }
                }
            }
        }
    }
}
</style>
