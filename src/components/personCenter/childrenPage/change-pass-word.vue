<template>
  <div class="page">
        <mt-header title="修改密码">
            <router-link to="/personMsg" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <h1>这是修改密码的页面</h1>
  </div>
</template>

<script>
export default {
  name: 'changePassWord'
}
</script>

<style scoped lang='stylus'>

</style>
