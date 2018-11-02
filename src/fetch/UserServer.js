import HttpService from './HttpService'

export default {
  // 1、绑定微信用户
  wechatBindUser (param) {
    var url = 'web/wechat/bindUser'
    return HttpService.httpPost1(url, param)
  },
  // 2、获取行政区划
  getLocationAddress (param) {
    var url = 'web/address/getLocation'
    return HttpService.httpPost1(url, param)
  },
  // 3、获取收货地址
  getAddrList (param) {
    var url = 'web/address/getAddrList'
    return HttpService.httpPost1(url, param)
  },
  // 4、查询地址信息
  getAddrInfo (param) {
    var url = 'web/address/getAddrInfo'
    return HttpService.httpPost1(url, param)
  },
  // 5、收货地址修改或增加
  createOrUpdateAddress (param) {
    var url = 'web/address/createOrUpdate'
    return HttpService.httpPost1(url, param)
  },
  // 6、收货地址删除
  deleteTheAddress (param) {
    var url = 'web/address/delAddr'
    return HttpService.httpPost1(url, param)
  },
  // 7、设置默认地址
  setDefaultAddress (param) {
    var url = 'web/address/defaultAddr'
    return HttpService.httpPost1(url, param)
  }
}
