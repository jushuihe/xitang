<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='stylus'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.search-component{
  .mint-searchbar{
      padding:1px;
      width:90vw;
      margin: 0 auto;
      .mint-searchbar-inner{
        padding:0px 4px;
      }
      .mint-searchbar-cancel{
        margin-right: 10px;
        font-size: 12px;
      }
  }
}
</style>
