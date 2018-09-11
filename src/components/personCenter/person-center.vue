<template>
  <div class="page">
      <div class='order-content'>
        <h3>订单页面</h3>
        <ul class='order-list'>
          <li>全部</li>
          <li>代付款</li>
          <li>待收货</li>
          <li>待点评</li>
        </ul>
      </div>
      <div class='cell-content'>
        <mt-cell title="优惠券" icon="more" to='/home' is-link>
          <img slot="icon" src="../../assets/logo.png" width="24" height="24">
        </mt-cell>
        <mt-cell title="收货地址" icon="more" to='/home1'  is-link>
          <img slot="icon" src="../../assets/logo.png" width="24" height="24">
        </mt-cell>
        <mt-cell title="帮助中心" icon="more" to='/home2' is-link>
          <img slot="icon" src="../../assets/logo.png" width="24" height="24">
        </mt-cell>
      </div>
  </div>
</template>

<script>
export default {
  name: 'baseGroup'
}
</script>

<style scoped lang='stylus'>
.page{
  .order-content{
    ul.order-list{
      list-style none;
      li{
        width:25%;
        display inline-block;
      }
    }
  }
  .cell-content{
    text-align:left;
  }
}
</style>
