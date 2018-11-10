<template>
  <div class='page'>
      <mt-header title='我的收藏' class='page-header'>
          <a @click='goBack' slot='left'>
            <img class='img-item' src='./../../../../assets/img/back.png' alt=''>
          </a>
      </mt-header>
      <div class='main-content'>
        <!-- 顶部的商品信息 部分 -->
        <div class='goods-msg'>
          <ul class='goods-msg-list'>
            <li v-for='item in hasCollectedList' :key='item.rowId' @click='toTheGoodsDetail(item)'>
              <div class='goods-msg-img'>
                <img class='img-item' :src=' item.picUrl ? item.picUrl : defaultImg' alt="">
              </div>
              <div class='goods-msg-msg'>
                <h3>{{item.name}}</h3>
                <p>收藏时间：{{item.updateTime}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'collectPage',
  data () {
    return {
      allLoaded: false,
      hasCollectedList: [],
      list: [],
      defaultImg: 'http://xitang.shijiweika.com/img/1541663983385.jpg'
    }
  },
  components: {},
  created () {
    this.getUserCollectList()
  },
  methods: {
    // 1、获取当前用户的收藏列表
    async getUserCollectList () {
      let param = {
        pageNum: 1,
        pageSize: 20
      }
      this.Indicator.open()
      let result = await this.goodsAPI.getUserCollectList(param)
      result = this.show.dealResult(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        console.log(result)
        this.hasCollectedList = result.list
      }
    },
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
    background:#fff;
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
          padding-top:1rem;
          padding-bottom:1rem;
          border-bottom:1px solid #eee;
          .goods-msg-img{
            float:left;
            margin-left:1.5rem;
            width:5rem;
            height:5rem;
          }
          .goods-msg-msg{
            margin-left:8rem;
            min-height:5rem;
            text-align left;
            >h3{
              line-height 22px;
              .goods-price{
                float:right;
                margin-right:1.5rem;
                font-weight:500;
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
    .return-money{
        line-height 40px;
        height:40px;
        color:#9b9b9b;
        font-size:14px;
        background:#fff;
        text-align:left;
        padding-left:1.5rem;
        .goods-price{
            color:$base-color;
            >span{
                font-size:18px;
            }
        }
    }
  }
}
</style>
