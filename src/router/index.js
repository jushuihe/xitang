import Vue from 'vue'
import Router from 'vue-router'
import BaseGroup from '@/components/BaseGroup'
import Home from '@/components/home/home'
import GroupBuy from '@/components/groupBuy/group-buy'
import Classification from '@/components/classification/classification'
import ShoppingCard from '@/components/shoppingCard/shopping-card'
import PersonCenter from '@/components/personCenter/person-center1'
import PersonCenter1 from '@/components/personCenter/person-center'
import Coupon from '@/components/personCenter/childrenPage/coupon'
import HelpCenter from '@/components/personCenter/childrenPage/helpCenter'
import ShippingAddress from '@/components/personCenter/childrenPage/shippingAddress'
import OrderList from '@/components/personCenter/childrenPage/orderList'
import PersonMsg from '@/components/personCenter/childrenPage/person-msg'
import ChangePassWord from '@/components/personCenter/childrenPage/change-pass-word'
import GoodsDetail from '@/components/goodsDetail/goods-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/base',
      name: 'BaseGroup',
      component: BaseGroup,
      children: [
        {
          path: 'groupBuy',
          name: 'GroupBuy',
          component: GroupBuy
        },
        {
          path: 'Classification',
          name: 'Classification',
          component: Classification
        },
        {
          path: 'PersonCenter',
          name: 'PersonCenter',
          component: PersonCenter
        },
        {
          path: 'PersonCenter1',
          name: 'PersonCenter1',
          component: PersonCenter1
        },
        {
          path: 'ShoppingCard',
          name: 'ShoppingCard',
          component: ShoppingCard
        },
        {
          path: 'home',
          name: 'Home',
          component: Home
        }
      ]
    },
    {
      path: '/coupon',
      name: 'Coupon',
      component: Coupon
    },
    {
      path: '/helpCenter',
      name: 'HelpCenter',
      component: HelpCenter
    },
    {
      path: '/shippingAddress',
      name: 'ShippingAddress',
      component: ShippingAddress
    },
    {
      path: '/orderList',
      name: 'OrderList',
      component: OrderList
    },
    {
      path: '/personMsg',
      name: 'personMsg',
      component: PersonMsg
    },
    {
      path: '/changePassWord',
      name: 'changePassWord',
      component: ChangePassWord
    },
    {
      path: '/goodsDetail/:goodsId',
      name: 'goodsDetail',
      component: GoodsDetail
    }
  ]
})
