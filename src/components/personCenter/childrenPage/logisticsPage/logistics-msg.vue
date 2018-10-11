<template>
  <div class='page'>
      <mt-header title='物流信息' class='page-header'>
          <a @click='goBack' slot='left'>
            <img class='img-item' src='./../../../../assets/img/back.png' alt=''>
          </a>
      </mt-header>
      <div class='main-content'>
        <!-- 顶部的商品信息 部分 -->
        <div class='goods-msg'>
          <div class='goods-msg-logistics'>
            <span>订单编号：</span>
            <span>201803249521</span>
            <span class='contactTheServer' @click='contactTheServer'>
              联系客服
            </span>
          </div>
          <ul class='goods-msg-list'>
            <li v-for='item in 4' :key='item'>
              <div class='goods-msg-img'>
                <img class='img-item' src="./../../../../assets/img/goods/4.png" alt="">
              </div>
              <div class='goods-msg-msg'>
                <h3>文玩铜锈貔貅摆件
                  <span class='goods-price'>￥59</span>
                </h3>
                <p>规格：铜制小貔貅
                  <span class='goods-num'>x1</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div class='gray-content'></div>
        <div class='header-content'>
          <p>
            <span class='item-title'>物流状态:</span>
            <span class='item-content'>{{logisticsStatus}}</span>
          </p>
          <p>
            <span class='item-title'>物流公司:</span>
            <span class='item-content'>{{logisticsCompany}}</span>
          </p>
          <p>
            <span class='item-title'>物流单号:</span>
            <span class='item-content'>{{logisticsCode}}</span>
          </p>
          <p>
            <span class='item-title'>更新时间:</span>
            <span class='item-content'>{{updateTime}}</span>
          </p>
        </div>
        <div class='list-content'>
          <ul>
            <li v-for='(item,index) in logistic_data' :key='index' :class='{"firt-item":index==0}'>
              <div class='item-circle' :class='{"firt-item":index==0}'>
                  <div class='circle'></div>
                  <div v-if='index==0' class='hiddle-line1'></div>
                  <div v-if='index==logistic_data.length-1' class='hiddle-line2'></div>
              </div>
              <div class='item-container'>
                  <div>{{item.accept_station}}</div>
                  <div>{{item.accept_time}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logisticsStatus: '',
      logisticsCode: '',
      logisticsCompany: '',
      updateTime: '',
      // 物流信息
      logistic_data: []
    }
  },
  components: {},
  created () {
    // this.getTheGoodsComment()
  },
  methods: {
    getTheGoodsComment () {
      let param = {
        logistic: this.logistic,
        expr_code: this.exprcode
      }
      let json = JSON.stringify(param)
      let obj = {
        url: 'http://andy.shijiweika.com/express/query_logistic',
        data: json,
        method: 'post'
      }
      this.Indicator.open({ text: 'Loading...', spinnerType: 'triple-bounce' })
      this.axios(obj)
        .then(data => {
          this.Indicator.close()
          this.dealTheData(data.data)
        })
        .catch(() => {
          this.Indicator.close()
          this.Toast({
            message: '服务器错误，请稍后重试',
            position: 'middle',
            duration: 2000
          })
        })
    },
    dealTheData (data) {
      if (data.status === 0) {
        this.logisticsStatus = data.expr_state
        this.logisticsCode = data.logistic
        this.logisticsCompany = data.expr_name
        this.updateTime = data.last_time
        this.logistic_data = data.logistic_data
      } else {
        this.Toast({
          message: data.msg,
          position: 'middle',
          duration: 2000
        })
      }
    },
    contactTheServer () {
      console.log('联系客服')
    },
    goBack () {
      this.$router.back()
    }
  },
  computed: {
    logistic () {
      return this.$route.params.logistic
    },
    exprcode () {
      return this.$route.params.exprcode
    }
  }
}
</script>

<style scoped lang='stylus'>
@import './../../../../assets/css/base-style.styl'
.page {
  font-size: 1.2rem
  .main-content{
    .goods-msg{
      background:#fff;
      .goods-msg-logistics{
        height:40px;
        font-size:14px;
        margin-left:1.5rem;
        border-bottom 1px solid #eee;
        text-align left;
        line-height 40px
        .contactTheServer{
          background:url('./../../../../assets/img/person/contact-server.png') no-repeat left center;
          background-size:18px 18px
          float:right;
          padding-left:26px;
          margin-right:1.5rem;
          color:$base-color;
        }
      }
      .goods-msg-list{
        li{
          padding-top:0.6rem;
          padding-bottom:0.6rem;
          border-bottom:1px solid #eee;
          .goods-msg-img{
            float:left;
            margin-left:1.5rem;
            width:6rem;
            height:6rem;
          }
          .goods-msg-msg{
            margin-left:9rem;
            height:6rem;
            text-align left;
            >h3{
              line-height 30px;
              .goods-price{
                float:right;
                color:$base-color;
                margin-right:1.5rem;
              }
            }
            >p{
              line-height 20px
              .goods-num{
                float:right;
                margin-right:1.5rem;
              }
            }
          }
        }
      }
    }
    .header-content {
      >p {
        text-align: left

        .item-title {
          padding-left: 1rem
          padding-right: 0.6rem
          color: #666
        }

        .item-content {
        }
      }
    }
    .list-content {
      margin-top: 2rem

      >ul {
        background: #f7f7f7
        width: 90%
        margin: 0 auto
        padding: 0.5rem
        list-style: none
        text-align: left
        border-radius: 5px
        box-shadow: 0 2px 7px rgba(0, 0, 0, 0.15)
        color: #9b9b9b

        >li {
          padding-top: 1rem
          padding-bottom: 1rem
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
          position: relative

          &.firt-item {
            color: #ff5a4c
          }

          .item-circle {
            display: inline-block
            vertical-align: middle
            width: 1rem
            height: 100%
            text-align: center
            position: absolute
            margin-left: 2rem
            border-left: 2px solid #d8d8d8
            top: 0px

            &.firt-item {
              .circle {
                background: #ff5a4c
              }
            }

            .circle {
              width: 0.65rem
              height: 0.65rem
              background: #d8d8d8
              border-radius: 50%
              position: absolute
              top: 50%
              left: -0.42rem
              margin-top: -0.325rem
            }

            .hiddle-line1 {
              width: 1rem
              height: 100%
              position: relative
              background: #f7f7f7
              left: -6px
              top: -50%
              margin-top: -0.325rem
            }

            .hiddle-line2 {
              width: 1rem
              height: 4rem
              position: relative
              background: #f7f7f7
              left: -6px
              top: 50%
              margin-top: 0.325rem
            }
          }

          .item-container {
            display: inline-block
            padding-left: 4rem
            width: 80%

            >div {
              white-space: normal
              line-height: 16px
            }
          }
        }
      }
    }
  }
}
</style>
