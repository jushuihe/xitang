<template>
  <div class="page">
      <mt-header title="物流信息">
          <a @click='goBack' slot="left">
            <img class='img-item' src="./../../../../assets/img/back.png" alt="">
          </a>
          <img slot="right" class='img-item' src="./../../../../assets/img/share.png" alt="">
      </mt-header>
      <h1>这是订单详情页</h1>
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
  },
  computed: {
    goodsId () {
      return this.$router.params.goodsId
    }
  }
}
</script>

<style scoped lang='stylus'>

</style>
