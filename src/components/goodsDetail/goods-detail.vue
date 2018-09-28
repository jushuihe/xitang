<template>
  <div class="page">
      <mt-header title="商品详情">
          <a @click='goBack' slot="left">
            <img class='img-item' src="./../../assets/img/back.png" alt="">
          </a>
          <img slot="right" class='img-item' src="./../../assets/img/share.png" alt="">
      </mt-header>
      <h1>这是商品详情页 购买页面</h1>
  </div>
</template>

<script>
export default {
  name: 'coupon',
  data () {
    return {}
  },
  created () {},
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang='stylus'>

</style>
