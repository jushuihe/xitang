<template>
  <div class="page">
        <mt-header title="首页">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <section class='container'>
            <!-- 搜索框的区域 -->
            <div class='search-component'>
                <mt-search v-model="value" cancel-text="取消" class='search-item' placeholder="搜索"></mt-search>
            </div>
            <!-- 主要内容区域 -->
            <div class='main-content'>
                <router-view/>
            </div>
        </section>
        <mt-tabbar v-model="selected">
            <mt-tab-item id="home">
                <img slot="icon" src="../assets/logo.png">
                首页
            </mt-tab-item>
            <mt-tab-item id="classification">
                <img slot="icon" src="../assets/logo.png">
                分类
            </mt-tab-item>
            <mt-tab-item id="groupBuy">
                <img slot="icon" src="../assets/logo.png">
                团购
            </mt-tab-item>
            <mt-tab-item id="shoppingCard">
                <img slot="icon" src="../assets/logo.png">
                购物车
            </mt-tab-item>
            <mt-tab-item id="personCenter">
                <img slot="icon" src="../assets/logo.png">
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
.page{
    .container{
        // 搜素框的样式
        .search-component{
            position:fixed;
            top:50px;
            left:0px;
            right:0px;
        }
        .main-content{
            margin-top:35px;
        }
    }
}
</style>
