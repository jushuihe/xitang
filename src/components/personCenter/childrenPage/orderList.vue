<template>
  <div class="order-list-page">
    <mt-header title="订单列表">
        <router-link to="/base/personCenter" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <h1>这是订单页面</h1>
    <mt-navbar class="page-part" :selected.sync="selected" v-model='selected'>
        <mt-tab-item id="1">待付款</mt-tab-item>
        <mt-tab-item id="2">待收货</mt-tab-item>
        <mt-tab-item id="3">待点评</mt-tab-item>
        <mt-tab-item id="4">全部</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container :active.sync="selected" v-model='selected'>
        <mt-tab-container-item id="1" class='allOrderList'>
            <div class='hasNoOrder'>
                <div>
                    <h4>居然没有订单</h4>
                    <p>好东西，手慢无</p>
                </div>
                <div>
                    <button class='find-more' @click='toHome'>去逛逛</button>
                </div>
            </div>
            <div class='orderList'>

            </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
            <h2>a</h2>
            <mt-cell v-for="n in 4" :key='n' :title="'测试 ' + n"></mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
            <h2>a</h2>
            <mt-cell v-for="n in 6" :key='n' :title="'选项 ' + n"></mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
        </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  name: 'baseGroup',
  data () {
    return {
      selected: '1',
      value: ''
    }
  },
  created () {},
  methods: {
    toHome () {
      this.$router.push('/base/home')
    }
  },
  watch: {}
}
</script>

<style scoped lang='stylus'>
.order-list-page{
    .allOrderList{
        .hasNoOrder{
            margin:60px 20px;
            text-align center;
            color: #999;
            div{
                margin-bottom: 20px;
            }
            h4{
                font-size: 16px;
                margin-bottom: 10px;
                color: #666;
            }
            p{
                font-size: 12px
            }
            .find-more{
                padding: 8px 30px;
                color: #f60;
                border:1px solid #f60;
                font-size: 14px;
                line-height: 18px;
                display: inline-block;
                background-color: transparent;
                border-radius: 3px;
            }
        }
    }
}
</style>
