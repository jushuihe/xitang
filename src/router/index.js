import Vue from 'vue'
import Router from 'vue-router'
import BaseGroup from '@/components/BaseGroup'
import Home from '@/components/home/home'
import SearchResult from '@/components/home/search-result'
import GroupBuy from '@/components/groupBuy/group-buy'
import Classification from '@/components/classification/classification'
import ClassificationGoodsList from '@/components/classification/classification-goodsList'
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
import GoodsShop from '@/components/goodsDetail/goods-shop'
import OrderDetail from '@/components/personCenter/childrenPage/OrderDetail/order-detail'
import LogisticsPage from '@/components/personCenter/childrenPage/logisticsPage/logistics-msg'
import EvaluateGoods from '@/components/personCenter/childrenPage/evaluateGoods/evaluate-goods'
import ApplicetionForMoney from '@/components/personCenter/childrenPage/afterSale/application-for-money'
import SalesReturn from '@/components/personCenter/childrenPage/afterSale/sales-return'
import RefundOrder from '@/components/personCenter/childrenPage/afterSale/refund-order'
import CollectPage from '@/components/personCenter/childrenPage/collect-page/collect-page'
import TransactionDetail from '@/components/personCenter/childrenPage/transaction-detail/transaction-detail'
import TransactionItemDetail from '@/components/personCenter/childrenPage/transaction-detail/transaction-item-detail'
import ContactServer from '@/components/personCenter/childrenPage/contact-server/contact-server'
import PerformanceManagement from '@/components/personCenter/childrenPage/performance-management/performance-management'
import MessageCenter from '@/components/personCenter/childrenPage/messageCenter/message-center'
import NotificationMessage from '@/components/personCenter/childrenPage/messageCenter/notification-message'
import BoundPhone from '@/components/personCenter/childrenPage/boundPhone/bound-phone'
import qrCodePage from '@/components/personCenter/childrenPage/qrCodePage/qr-code-page'
import PromotionCode from '@/components/personCenter/childrenPage/promotionCodePage/promotion-code-page'

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
          path: 'ClassificationGoodsList/:classificationId',
          name: 'ClassificationGoodsList',
          component: ClassificationGoodsList
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
      path: '/AddNewAddress/:addrId',
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
      path: '/RefundOrder/:goodsId',
      name: 'RefundOrder',
      component: RefundOrder
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
    },
    {
      path: '/CollectPage',
      name: 'CollectPage',
      component: CollectPage
    },
    {
      path: '/TransactionDetail',
      name: 'TransactionDetail',
      component: TransactionDetail
    },
    {
      path: '/TransactionItemDetail/:transactionId',
      name: 'TransactionItemDetail',
      component: TransactionItemDetail
    },
    {
      path: '/ContactServer',
      name: 'ContactServer',
      component: ContactServer
    },
    {
      path: '/MessageCenter',
      name: 'MessageCenter',
      component: MessageCenter
    },
    {
      path: '/NotificationMessage',
      name: 'NotificationMessage',
      component: NotificationMessage
    },
    {
      path: '/PerformanceManagement',
      name: 'PerformanceManagement',
      component: PerformanceManagement
    },
    {
      path: '/BoundPhone',
      name: 'BoundPhone',
      component: BoundPhone
    },
    {
      path: '/qrCodePage',
      name: 'qrCodePage',
      component: qrCodePage
    },
    {
      path: '/PromotionCode',
      name: 'PromotionCode',
      component: PromotionCode
    },
    {
      path: '/GoodsShop/:shopId',
      name: 'GoodsShop',
      component: GoodsShop
    },
    {
      path: '/SearchResult/:searchMsg',
      name: 'SearchResult',
      component: SearchResult
    }
  ]
})
