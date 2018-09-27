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
      value: ''
    }
  },
  created () {},
  methods: {},
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
        .main-content{
            // margin-top:45px;
            padding-bottom:65px;
        }
    }
}
</style>
