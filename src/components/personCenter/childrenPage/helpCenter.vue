<template>
  <div class="page">
      <mt-header title="帮助中心">
          <router-link to="/base/personCenter" slot="left">
              <mt-button icon="back">返回</mt-button>
          </router-link>
          <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
      <h1>这是帮助中心页面</h1>
  </div>
</template>

<script>
export default {
  name: 'baseGroup'
}
</script>

<style scoped lang='stylus'>

</style>
