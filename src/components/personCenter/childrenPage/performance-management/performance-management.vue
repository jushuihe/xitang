<template>
  <div class='page'>
      <mt-header title='我的业绩' class='page-header'>
          <a @click='goBack' slot='left'>
            <img class='img-item' src='./../../../../assets/img/back.png' alt=''>
          </a>
      </mt-header>
      <div class='main-content'>
          <div class='user-content'>
              <div class='user-msg'>
                  <div class='user-msg-avator'>
                      <img class='img-item' src="./../../../../assets/img/avatar.jpg" alt="">
                  </div>
                  <div class='user-msg-content'>
                      <h3>张小盒</h3>
                      <span class='post'>
                          23号店 店员
                      </span>
                  </div>
                  <div class='user-msg-performance'>
                      <p>当月业绩</p>
                      <p>￥<strong style='font-size:16px;'>3242.00</strong></p>
                  </div>
              </div>
              <p class='user-address'>
                  所在店铺：西塘23号店铺，关谷达到234号
              </p>
          </div>
          <div class='gray-content'></div>
          <!-- 店长才有的select选择框 -->
          <div class='performance-title' v-if='userType==2'>
              <p>店铺业绩</p>
              <select class='type-sel' name="" id="">
                  <option value="1">全部</option>
                  <option value="2">最近一周</option>
                  <option value="3">最近一月</option>
              </select>
          </div>
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
      userType: 2
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
    .user-content{
        background:$base-color;
        &:before{
          content:'';
          display table;
        }
        .user-msg{
            margin-top:3rem;
            position relative
            .user-msg-avator{
                float:left;
                margin-left:3rem;
                width:5rem;
                height:5rem;
                border-radius 50%;
                border:3px solid #fff;
                overflow hidden
            }
            .user-msg-content{
                margin-left:9rem;
                color:#fff;
                text-align:left;
                height:6rem;
                h3{
                    font-size:18px;
                    line-height:40px;
                }
                .post{
                    background:#6B0613
                    border-radius 5px;
                    padding:0 8px;
                    line-height:24px;
                    font-size:12px;
                    display inline-block
                }
            }
            .user-msg-performance{
                position:absolute;
                right:0px;
                top:0px;
                background:#6B0613;
                border-bottom-left-radius 30px;
                border-top-left-radius 30px;
                font-size:12px;
                line-height:24px;
                color:#fff;
                padding:6px 10px 6px 24px
            }
        }
        .user-address{
            color:#fff;
            text-align:left;
            line-height:50px;
            margin-left:3rem;
        }
    }
    // 只有店长才有的 业绩 标题的部分
    .performance-title{
        font-size:18px;
        line-height:40px;
        color:$base-color;
        background:#fff;
        text-align:left;
        padding-left:1.5rem;
        padding-right:1.5rem;
        font-weight:600
        position relative
        >p{
            border-bottom:1px solid #d8d8d8;
        }
        .type-sel{
            float:right;
            margin-right:1.5rem;
            position absolute;
            right:0px;
            top:0px;
            border-radius:5px;
            line-height:24px;
            height:24px;
            padding:0px 5px
            margin-top:8px;
            outline none;
            border-color:#d8d8d8;
        }
    }
    .performance-list{
        list-style: none;
        background:#fff;
        >li{
            height:60px;
            margin-left:1.5rem;
            margin-right:1.5rem;
            text-align:left;
            border-bottom:1px solid #d8d8d8;
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
