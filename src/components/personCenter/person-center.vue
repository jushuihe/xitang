<template>
  <div class="person-center">
      <!-- 用户信息模块 用户头像 手机号 用户余额 -->
      <div class='userMsg'>
        <div class='user-avatar' @click='toPersonMsgPage'>
            <div class='user-info__avatar'>
              <img src="./../../assets/img/avatar.jpg" alt="">
            </div>
            <div class='user-name'>15337261725</div>
        </div>
        <!-- 用户资产 -->
        <div class='user-asset'>
          <div class='user-asset-item'>
            <p class='user-asset-item-value'>0.00</p>
            <p class='user-asset-item-name'>余额</p>
          </div>
          <div class='user-asset-item'>
            <p class='user-asset-item-value'>0</p>
            <p class='user-asset-item-name'>积分</p>
          </div>
          <div class='user-asset-item'>
            <p class='user-asset-item-value'>0</p>
            <p class='user-asset-item-name'>卡</p>
          </div>
          <div class='user-asset-item'>
            <p class='user-asset-item-value'>0</p>
            <p class='user-asset-item-name'>券</p>
          </div>
        </div>
      </div>
      <!-- 用户的订单状况 -->
      <div class='order-content'>
        <mt-cell title="我的订单" style='padding-left:15px;' class='user-defined-mt-cell' value='查看全部订单'  to='/orderList' is-link>
        </mt-cell>
        <div class='order-list'>
          <div class='order-list-item' @click='toOrderList'>
            <div class='order-list-item-icon'>
              <i class='icon iconfont icon-daifukuan'></i>
            </div>
            <p class='order-list-item-name'>待付款</p>
          </div>
          <div class='order-list-item' @click='toOrderList'>
            <div class='order-list-item-icon'>
              <i class='icon iconfont icon-daifahuo'></i>
            </div>
            <p class='order-list-item-name'>待发货</p>
          </div>
          <div class='order-list-item' @click='toOrderList'>
            <div class='order-list-item-icon'>
              <i class='icon iconfont icon-yifahuo'></i>
            </div>
            <p class='order-list-item-name'>已发货</p>
          </div>
          <div class='order-list-item' @click='toOrderList'>
            <div class='order-list-item-icon'>
              <i class='icon iconfont icon-yiwancheng'></i>
            </div>
            <p class='order-list-item-name'>已完成</p>
          </div>
        </div>
      </div>
      <!-- 用户中心的子页面 集中展示区 -->
      <div class='cell-content'>
        <mt-cell title="优惠券" class='user-defined-mt-cell'  icon="youhuiquan" to='/coupon' is-link>
        </mt-cell>
        <mt-cell title="购物车" class='user-defined-mt-cell' icon="shop" to='/base/ShoppingCard'  is-link>
        </mt-cell>
        <mt-cell title="返现" class='user-defined-mt-cell' icon="shaixuantubiaogaozhuanqu12" to='/shippingAddress'  is-link>
        </mt-cell>
        <mt-cell title="赠品" class='user-defined-mt-cell' icon="zengpin01" to='/shippingAddress'  is-link>
        </mt-cell>
        <mt-cell title="心愿单" class='user-defined-mt-cell' icon="xinyuan1" to='/shippingAddress'  is-link>
        </mt-cell>
        <mt-cell title="帮助中心" class='user-defined-mt-cell' icon="test" to='/helpCenter' is-link>
        </mt-cell>
      </div>
      <div class='gray-content'></div>
      <mt-cell title="账号设置" style='padding-left:15px;text-align:left;' class='user-defined-mt-cell' icon="zhanghaoshezhi" to='/personMsg'  is-link>
      </mt-cell>
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
.person-center{
  .userMsg{
    .user-avatar{
      -webkit-box-align: center;
      -webkit-align-items: center;
      align-items: center;
      padding: 0 15px;
      display: flex;
      height: 172px;
      background-size: cover;
      background:#eee;
      .user-info__avatar{
        width: 60px;
        height: 60px;
        border: 1px solid #fff;
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
        -webkit-box-align: start;
        -webkit-align-items: flex-start;
        align-items: flex-start;
        margin-left: 15px;
        font-size: 20px;
        line-height: 30px;
        font-weight: 700;
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
  .cell-content{
    text-align:left;
    margin-top:20px;
    padding-left: 15px;
  }
}
</style>
