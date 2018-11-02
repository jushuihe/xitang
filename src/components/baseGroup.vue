<template>
  <div class="page">
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
  created () {
    this.getTheActiveSelected(this.$route.name)
  },
  methods: {
    // 获取到当前激活的是哪一个 selected
    getTheActiveSelected (index) {
      switch (index) {
        case 'Home':
          this.selected = 'home'
          break
        case 'Classification':
          this.selected = 'classification'
          break
        case 'ShoppingCard':
          this.selected = 'shoppingCard'
          break
        case 'PersonCenter':
          this.selected = 'personCenter'
          break
        default:
          break
      }
    }
  },
  watch: {
    selected (val) {
      this.$router.push('/base/' + val)
    },
    // 监听路由的变化
    $route (to, from) {
      this.getTheActiveSelected(to.name)
    }
  }
}
</script>

<style scoped lang='stylus'>
@import './../assets/css/base-style.styl'
.page{
    .container{
      padding-top: 0px;
      // padding-bottom: 65px;
      min-height: 100vh;
      box-sizing: border-box;
      background:#ececec;
      .main-content{
      }
    }
}
</style>
