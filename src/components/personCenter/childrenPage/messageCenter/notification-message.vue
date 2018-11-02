<template>
  <div class='page'>
      <mt-header title='通知消息' class='page-header'>
          <a @click='goBack' slot='left'>
            <img class='img-item' src='./../../../../assets/img/back.png' alt=''>
          </a>
      </mt-header>
      <div class='main-content'>
          <ul class='message-list'>
              <li v-for='item in 5' :key='item'>
                  <p class='item-time'>
                      <span>2018-05-31 03:14</span>
                  </p>
                  <div class='item-content'>
                      <h3>专属礼包</h3>
                      <p class='item-content-msg'>
                          恭喜你成为乐享会员，快来领取您的专属礼包。快来哟！
                      </p>
                  </div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'ContactServer',
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
    }
  },
  computed: {
  }
}
</script>

<style scoped lang='stylus'>
@import './../../../../assets/css/base-style.styl'
.page {
  font-size: 1.2rem
  .main-content{
    .message-list{
        list-style none
        >li{
            margin-top:20px;
            .item-time{
                >span{
                    display inline-block;
                    border-radius:4px;
                    padding:0px 8px;
                    line-height:20px;
                    background:#9b9b9b;
                }
                color:#fff;
            }
            .item-content{
                background:#fff;
                text-align:left;
                margin:1.5rem;
                border-radius 5px;
                >h3{
                    line-height:40px;
                    font-size:16px;
                    margin-left:1.5rem;
                    margin-right:1.5rem;
                    border-bottom:1px solid #ebebeb;
                }
                .item-content-msg{
                    color:#9b9b9b;
                    line-height:20px;
                    margin-left:1.5rem;
                    margin-right:1.5rem;
                    margin-top:1rem;
                }
            }
        }
    }
  }
}
</style>
