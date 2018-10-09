<template>
  <div class="page">
      <!-- 这里需要一个订单编号  -->
      <mt-header title="新增地址" class='page-header'>
          <a @click='goBack' slot="left">
            <img class='img-item' src="./../../../assets/img/back.png" alt="">
          </a>
      </mt-header>
      <div class='main-content'>
      </div>
  </div>
</template>

<script>
export default {
  name: 'payOrder',
  data () {
    return {
    }
  },
  created () {},
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  },
  computed: {
  }
}
</script>

<style scoped lang='stylus'>
@import './../../../assets/css/base-style.styl'
.page{
  .page-header{
    .go-to-home{
      position:absolute;
      top: 0px;
      right: 1rem;
      height: 40px;
    }
  }
  .main-content{
  }
}
</style>
