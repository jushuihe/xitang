// import store from '@/vuex/store.js';
let util = {

}
// 打开一个新的页面 执行的函数
util.openNewPage = function (vm, name, argu, query, path) {
//   let token = vm.str.readS('token')
//   let defaultPath = store.state.navList.defaultPath
  if (path === '/') {
    vm.$router.push({
      name: 'Home'
    })
  }
}
export default util
