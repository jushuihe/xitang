<template>
  <div class="page">
      <mt-header title="优惠券">
          <router-link to="/base/personCenter" slot="left">
              <mt-button icon="back">返回</mt-button>
          </router-link>
          <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
      <h1>这是优惠券页面</h1>
  </div>
</template>

<script>
export default {
  name: 'coupon'
}
</script>

<style scoped lang='stylus'>

</style>
