import str from '@/fetch/StorageService.js'
let util = {
}
// 打开一个新的页面 执行的函数
util.openNewPage = function (vm, name, argu, query, path) {
  console.log(window.location.href)
  let openId = getQueryParamValue('openId')
  let wechatName = getQueryParamValue('wechatName')
  let wechatHeadImgUrl = getQueryParamValue('wechatHeadImgUrl')
  if (openId && !str.readS('openId')) {
    // 将数据存储起来
    str.writeS('openId', openId)
    str.writeS('wechatName', wechatName)
    str.writeS('wechatHeadImgUrl', wechatHeadImgUrl)
  }
  function getQueryParamValue (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if (r != null && r !== '') {
      return (r[2])
    }
    return null
  }
  if (!str.readS('openId')) {
    // location.href = 'http://xitang.shijiweika.com/web/wechat/wxLogin?redirectUrl=http://xitang.shijiweika.com/mobile/'
  }
  if (path === '/') {
    vm.$router.push({
      name: 'Home'
    })
  }
}
export default util
