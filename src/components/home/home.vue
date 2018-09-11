<template>
  <div class="page">
    <mt-swipe @change="handleChange" class='carousel' :auto="4000">
      <mt-swipe-item @click.native='choicedTheGoods(1)'>1</mt-swipe-item>
      <mt-swipe-item @click.native='choicedTheGoods(2)'>2</mt-swipe-item>
      <mt-swipe-item @click.native='choicedTheGoods(3)'>3</mt-swipe-item>
    </mt-swipe>
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
  methods: {
    handleChange () {},
    choicedTheGoods (item) {
      console.log(item)
    }
  },
  watch: {
    selected (val) {
      this.$router.push('/base/' + val)
    }
  }
}
</script>

<style scoped lang='stylus'>
.page{
  .carousel{
    height:30vh;
  }
}
</style>
