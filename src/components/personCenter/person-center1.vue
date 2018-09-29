<template>
  <div class="person-center">
      <!-- 用户信息模块 用户头像 手机号 用户余额 -->
      <div class='userMsg'>
        <div class='user-avatar' @click='toPersonMsgPage'>
            <table></table>
            <div class='user-info__avatar'>
              <img src="./../../assets/img/avatar.jpg" alt="">
            </div>
            <div class='user-name'>15337261725</div>
        </div>
      </div>
      <!-- 用户的订单状况 -->
      <div class='order-content'>
        <mt-cell title="我的订单" style='padding-left:15px;' class='user-defined-mt-cell' value='查看全部订单'  to='/orderList' is-link>
        </mt-cell>
        <div class='order-list'>
          <div class='order-list-item' @click='toOrderList'>
            <div class='order-list-item-icon'>
              <img class='img-item' src="./../../assets/img/person/dingdan1.png" alt="">
            </div>
            <p class='order-list-item-name'>待付款</p>
          </div>
          <div class='order-list-item' @click='toOrderList'>
            <div class='order-list-item-icon'>
              <img class='img-item' src="./../../assets/img/person/dingdan2.png" alt="">
            </div>
            <p class='order-list-item-name'>待收货</p>
          </div>
          <div class='order-list-item' @click='toOrderList'>
            <div class='order-list-item-icon'>
              <img class='img-item' src="./../../assets/img/person/dingdan3.png" alt="">
            </div>
            <p class='order-list-item-name'>已收货</p>
          </div>
          <div class='order-list-item' @click='toOrderList'>
            <div class='order-list-item-icon'>
              <img class='img-item' src="./../../assets/img/person/dingdan4.png" alt="">
            </div>
            <p class='order-list-item-name'>待评价</p>
          </div>
          <div class='order-list-item' @click='toOrderList'>
            <div class='order-list-item-icon'>
              <img class='img-item' src="./../../assets/img/person/dingdan4.png" alt="">
            </div>
            <p class='order-list-item-name'>售后</p>
          </div>
        </div>
      </div>
      <div class='gray-content'></div>
      <!-- 用户中心的子页面 集中展示区 -->
      <div class='person-server'>
          <h3 class='person-server-title'>我的服务</h3>
          <div class='server-content'>
              <dl>
                  <dd>
                      <img class='img-item' src="./../../assets/img/person/server1.png" alt="">
                  </dd>
                  <dt>拼团订单</dt>
              </dl>
              <dl>
                  <dd>
                      <img class='img-item' src="./../../assets/img/person/server2.png" alt="">
                  </dd>
                  <dt>我的业绩</dt>
              </dl>
              <dl>
                  <dd>
                      <img class='img-item' src="./../../assets/img/person/server3.png" alt="">
                  </dd>
                  <dt>地址管理</dt>
              </dl>
              <dl>
                  <dd>
                      <img class='img-item' src="./../../assets/img/person/server4.png" alt="">
                  </dd>
                  <dt>联系客服</dt>
              </dl>
              <dl>
                  <dd>
                      <img class='img-item' src="./../../assets/img/person/server5.png" alt="">
                  </dd>
                  <dt>交易明细</dt>
              </dl>
              <dl>
                  <dd>
                      <img class='img-item' src="./../../assets/img/person/server6.png" alt="">
                  </dd>
                  <dt>我的收藏</dt>
              </dl>
              <dl>
                  <dd>
                      <img class='img-item' src="./../../assets/img/person/server7.png" alt="">
                  </dd>
                  <dt>设置</dt>
              </dl>
              <dl>
                  <dd>
                      <img class='img-item' src="./../../assets/img/person/server8.png" alt="">
                  </dd>
                  <dt>礼包</dt>
              </dl>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'personCenter',
  data () {
    return {
      selected: 'home',
      value: ''
    }
  },
  created () {},
  methods: {
    toOrderList () {
      this.$router.push('/orderList')
    },
    toPersonMsgPage () {
      this.$router.push('/personMsg')
    }
  },
  watch: {}
}
</script>

<style scoped lang='stylus'>
@import './../../assets/css/base-style.styl'
.person-center{
  margin-top:-40px;
  background:#fff;
  .userMsg{
    .user-avatar{
      padding: 0 15px;
      height: 150px;
      background-size: cover;
      background:#eee;
      .user-info__avatar{
        width: 60px;
        height: 60px;
        margin: 40px auto 0px;
        border: 3px solid #fff;
        border-radius: 50%;
        overflow: hidden;
        background-size: 60px 60px;
        box-shadow: 0 2px 4px rgba(0,0,0,.1);
        >img{
          width:100%;
          height:100%;
        }
      }
      .user-name{
        margin-left: 15px;
        font-size: 18px;
        line-height: 30px;
        font-weight 600
        color:#fff;
      }
    }
    .user-asset{
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -webkit-flex-direction: row;
      flex-direction: row;
      height: 110px;
      -webkit-box-align: center;
      -webkit-align-items: center;
      align-items: center;
      background: #fff;
      .user-asset-item{
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        text-align: center;
        line-height: 22px;
        .user-asset-item-value{
          font-size: 16px;
          color: #f83c2d;
          font-weight: 400;
        }
        .user-asset-item-name{
          margin-top: 4px;
          font-size: 12px;
          color: #111;
        }
      }
    }
  }
  .order-content{
    text-align: left;
    margin-top: 10px;
    background: #fff;
    .order-list{
      padding: 20px 0;
      position: relative;
      width: 100%;
      height: 50px;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      background-color: #fff;
      .order-list-item{
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        color: #666;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        line-height: 1;
        font-size: 12px;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        .order-list-item-icon{
          margin-bottom: 5px;
          font-size: 24px;
          width:24px;
          height:21px;
          color: #333;
          position: relative;
          .iconfont{
            font-size: 24px;
            color: #666;
          }
        }
        .order-list-item-name{
          margin-top: 10px;
          color: #111;
        }
      }
    }
  }
  .person-server{
    .person-server-title{
        font-size:16px;
        text-align left;
        font-weight:500;
        color:$base-undertint-font-color;
        margin-left:1rem;
        line-height 44px;
        border-bottom:1px solid #ededed;
    }
    .server-content{
        display:flex;
        flex-wrap:wrap;
        justify-content:space-between;
        >dl{
            width:25%;
            padding-top:1.5rem;
            padding-bottom 1.5rem;
            border-bottom:1px solid #ededed;
            >dd{
                width:3rem;
                height:3rem;
                margin:0 auto;
            }
            >dt{
                color:$base-undertint-font-color;
                line-height:24px
            }
        }
    }
  }

}
</style>
