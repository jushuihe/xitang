import Vue from 'vue'
import Router from 'vue-router'
import BaseGroup from '@/components/BaseGroup'
import Home from '@/components/home/home'
import GroupBuy from '@/components/groupBuy/group-buy'
import Classification from '@/components/classification/classification'
import PersonCenter from '@/components/personCenter/person-center'
import ShoppingCard from '@/components/shoppingCard/shopping-card'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/base',
      name: 'BaseGroup',
      component: BaseGroup,
      children: [
        {
          path: '',
          name: 'Home',
          component: Home
        },
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
    }
  ]
})
