import Vue from 'vue'
import Router from 'vue-router'
import BaseGroup from '@/components/BaseGroup'
import Home from '@/components/home/home'
import GroupBuy from '@/components/groupBuy/group-buy'
import Classification from '@/components/classification/classification'
import ShoppingCard from '@/components/shoppingCard/shopping-card'
// 这是单独的购物车页面
import ShoppingCardSolely from '@/components/shoppingCard/solely-shopping-card'
import PersonCenter from '@/components/personCenter/person-center1'
import PersonCenter1 from '@/components/personCenter/person-center'
import Coupon from '@/components/personCenter/childrenPage/coupon'
import HelpCenter from '@/components/personCenter/childrenPage/helpCenter'
import ShippingAddress from '@/components/personCenter/childrenPage/shippingAddress'
import AddNewAddress from '@/components/personCenter/childrenPage/add-new-address'
import OrderList from '@/components/personCenter/childrenPage/orderList'
import PersonMsg from '@/components/personCenter/childrenPage/person-msg'
import ChangePassWord from '@/components/personCenter/childrenPage/change-pass-word'
import GoodsDetail from '@/components/goodsDetail/goods-detail'
import ConfirmOrder from '@/components/goodsDetail/confirm-order'
import PayOrder from '@/components/goodsDetail/pay-order'
import PaySuccess from '@/components/goodsDetail/pay-success'
import OrderDetail from '@/components/personCenter/childrenPage/OrderDetail/order-detail'
import LogisticsPage from '@/components/personCenter/childrenPage/logisticsPage/logistics-msg'
import EvaluateGoods from '@/components/personCenter/childrenPage/evaluateGoods/evaluate-goods'
import ApplicetionForMoney from '@/components/personCenter/childrenPage/afterSale/application-for-money'
import SalesReturn from '@/components/personCenter/childrenPage/afterSale/sales-return'

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
      path: '/AddNewAddress',
      name: 'AddNewAddress',
      component: AddNewAddress
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
    },
    {
      path: '/orderDetail/:goodsId',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/logisticsPage/:goodsId',
      name: 'LogisticsPage',
      component: LogisticsPage
    },
    {
      path: '/evaluateGoods/:goodsId',
      name: 'EvaluateGoods',
      component: EvaluateGoods
    },
    {
      path: '/applicetionForMoney/:goodsId',
      name: 'ApplicetionForMoney',
      component: ApplicetionForMoney
    },
    {
      path: '/salesReturn/:goodsId',
      name: 'SalesReturn',
      component: SalesReturn
    },
    {
      path: '/ShoppingCardSolely',
      name: 'ShoppingCardSolely',
      component: ShoppingCardSolely
    },
    {
      path: '/ConfirmOrder',
      name: 'ConfirmOrder',
      component: ConfirmOrder
    },
    {
      path: '/PayOrder/:orderId',
      name: 'PayOrder',
      component: PayOrder
    },
    {
      path: '/PaySuccess/:orderId',
      name: 'PaySuccess',
      component: PaySuccess
    }
  ]
})
