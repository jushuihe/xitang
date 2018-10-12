<template>
  <div class='page'>
      <mt-header title='我的业绩' class='page-header'>
          <a @click='goBack' slot='left'>
            <img class='img-item' src='./../../../../assets/img/back.png' alt=''>
          </a>
      </mt-header>
      <div class='main-content'>
          <div class='user-msg'>
              <div class=''>
                  <div class='user-msg-avator'>
                      <img class='img-item' src="" alt="">
                  </div>
                  <div class='user-msg-content'>
                  </div>
                  <div class='user-msg-performance'>
                  </div>
              </div>
              <p class='user-address'>
                  所在店铺：西塘23号店铺，关谷达到234号
              </p>
          </div>
          <div class='gray-content'></div>
          <ul class='performance-list'>
              <li v-for='item in 5' :key='item'>
                  <p class='item-part1'>
                      产品销售
                      <span class='item-person'>张小盒-店员</span>
                      <span class='item-time'>2018-05-29</span>
                  </p>
                  <p class='item-part2'>
                      铜制大貔貅等，三个产品
                      <strong class='item-price'>+118.00</strong>
                  </p>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'PerformanceManagement',
  data () {
    return {
    }
  },
  components: {},
  created () {
    // this.getTheGoodsComment()
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    toTheTransactionItemDetail (item) {
      console.log()
    }
  },
  computed: {
  }
}
</script>

<style scoped lang='stylus'>
@import './../../../../assets/css/base-style.styl'
.page {
  .main-content{
    .user-msg{}
    .performance-list{
        list-style: none;
        background:#fff;
        >li{
            height:60px;
            margin-left:1.5rem;
            margin-right:1.5rem;
            text-align:left;
            border-bottom:1px solid #eee;
            .item-part1{
                line-height:30px;
                font-size:14px;
                padding-top: 5px
                .item-person{
                    margin-left:10px;
                    font-size:12px;
                }
                .item-time{
                    float:right;
                    color:#9b9b9b;
                    font-size:12px;
                }
            }
            .item-part2{
                line-height:20px;
                color:#9b9b9b;
                padding-bottom: 5px
                .item-price{
                    float:right;
                    color:#417505;
                    font-size:16px;
                }
            }
        }
    }
  }
}
</style>
