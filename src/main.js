// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {MessageBox, Toast, Indicator} from 'mint-ui'
import MintUI from 'mint-ui'
import Util from '@/util/util.js'
import store from './vuex/store'
import 'mint-ui/lib/style.css'
import '@/assets/css/base.css'
// 引入自定义字体
import '@/assets/font/iconfont.css'
Vue.config.productionTip = false
Vue.prototype.MessageBox = MessageBox
Vue.prototype.Toast = Toast
Vue.prototype.Indicator = Indicator
Vue.use(MintUI)
/* eslint-disable no-new */
// 在页面进入之前执行的操作
router.beforeEach((to, form, next) => {
  next();
})
router.afterEach((to) => {
  // 在页面进入之前执行 页面已经 create
  Util.openNewPage(router.app, to.name, to.params, to.query,to.path);
  window.scrollTo(0, 0);
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
