<template>
  <div class="page">
        <header class='base-header'>
            <div class='img-content'>
                <img src="../assets/img/saoyisao.png" class='img-item' alt="">
            </div>
            <div class='search-content'>
                <img class='search-content-img' src='../assets/img/search.png' alt=''>
                <input type="text" class='search-content-input' placeholder="搜索...">
            </div>
            <div class='img-content'>
                <img src="../assets/img/zixun.png" class='img-item' alt="">
            </div>
        </header>
        <section class='container'>
            <!-- 分类导航的区域 -->
            <nav class='search-component'>
                <ul class='search-component-min-content'>
                    <li :class='{"active":activeNav==1}' @click='changeTheActiveNav(1)'>推荐</li>
                    <li :class='{"active":activeNav==2}' @click='changeTheActiveNav(2)'>商品</li>
                    <li :class='{"active":activeNav==3}' @click='changeTheActiveNav(3)'>商品</li>
                    <li :class='{"active":activeNav==4}' @click='changeTheActiveNav(4)'>商品</li>
                    <li :class='{"active":activeNav==5}' @click='changeTheActiveNav(5)'>商品</li>
                    <li :class='{"active":activeNav==6}' @click='changeTheActiveNav(6)'>商品</li>
                </ul>
                <div class='show-more-btn' @click="showMore">
                    <img class='img-item' src="../assets/img/showmore.png" alt="">
                </div>
                <transition name='fade'>
                    <ul v-if='showMoreNav' class='search-component-max-content'>
                        <li>商品</li>
                        <li>商品</li>
                        <li>商品</li>
                        <li>商品</li>
                        <li>商品</li>
                        <li>商品</li>
                        <li>商品</li>
                        <li>商品</li>
                    </ul>
                </transition>
            </nav>
            <!-- 主要内容区域 -->
            <div class='main-content'>
                <router-view/>
            </div>
        </section>
        <mt-tabbar v-model="selected" id='userinfo-tab' style='position:fixed'>
            <mt-tab-item id="home">
                <img slot="icon" v-if='selected!="home"' src="../assets/img/home.png">
                <img slot="icon" v-if='selected=="home"' src="../assets/img/homeA.png">
                首页
            </mt-tab-item>
            <mt-tab-item id="classification">
                <img slot="icon" v-if='selected!="classification"'  src="../assets/img/classify.png">
                <img slot="icon" v-if='selected=="classification"' src="../assets/img/classifyA.png">
                分类
            </mt-tab-item>
            <mt-tab-item id="shoppingCard">
                <img slot="icon" v-if='selected!="shoppingCard"' src="../assets/img/card.png">
                <img slot="icon" v-if='selected=="shoppingCard"' src="../assets/img/cardA.png">
                购物车
            </mt-tab-item>
            <mt-tab-item id="personCenter">
                <img slot="icon" v-if='selected!="personCenter"' src="../assets/img/person.png">
                <img slot="icon" v-if='selected=="personCenter"' src="../assets/img/personA.png">
                我的
            </mt-tab-item>
        </mt-tabbar>
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
      activeNav: 1,
      showMoreNav: false
    }
  },
  created () {},
  methods: {
    changeTheActiveNav (index) {
      this.activeNav = index
    },
    showMore () {
      console.log('显示更多的导航项')
      this.showMoreNav = !this.showMoreNav
    }
  },
  watch: {
    selected (val) {
      this.$router.push('/base/' + val)
    }
  }
}
</script>

<style scoped lang='stylus'>
@import './../assets/css/base-style.styl'
.page{
    .base-header{
        width:100%;
        height 40px;
        position:relative;
        background:$base-color;
        box-sizing: border-box;
        padding: 5px;
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
    .container{
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
                    padding: 0px 10px;
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
        .main-content{
            // margin-top:45px;
            padding-bottom:70px;
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
