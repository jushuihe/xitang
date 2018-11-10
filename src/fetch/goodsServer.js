import HttpService from './HttpService'

export default {
  // 1、获取商品目录列表
  getGoodsCatalogList (param) {
    var url = 'manage/goods/catalog/list'
    return HttpService.httpPost(url, param)
  },
  // 2、获取商品目录分页列表
  getGoodsListWidthPage (param) {
    var url = 'manage/goods/catalog/list-with-page'
    return HttpService.httpPost(url, param)
  },
  // 3、通过商品目录ID获取商品目录
  goodsCatalogQueryEntity (param) {
    var url = 'manage/goods/catalog/query-entity'
    return HttpService.httpPost(url, param)
  },
  // 4、获取商品目录树
  goodsCatalogTree (param) {
    var url = 'manage/goods/catalog/tree'
    return HttpService.httpPost(url, param)
  },
  // 二、商品信息
  // 1、获取商品信息列表
  getGoodsList (param) {
    var url = 'manage/goods/list'
    return HttpService.httpPost(url, param)
  },
  // 2、获取商品信息分页列表
  getGoodsListWithPage (param) {
    var url = 'manage/goods/list-with-page'
    return HttpService.httpPost(url, param)
  },
  // 3、通过商品ID获取商品信息
  getGoodsMsgById (param) {
    var url = 'manage/goods/query-entity'
    return HttpService.httpPost(url, param)
  },
  // 4、通过商品ID获取商品详情、规格及图片信息
  getGoodsDetailById (param) {
    var url = 'manage/goods/query-entity-with-spec-app'
    return HttpService.httpPost(url, param)
  },
  // 5、通过商品ID获取商品规格列表
  getGoodsSpecListById (param) {
    var url = 'manage/goods/spec/list'
    return HttpService.httpPost(url, param)
  },
  // 6、通过商品规格ID获取商品规格
  getGoodsSpecQueryEntityById (param) {
    var url = 'manage/goods/spec/query-entity'
    return HttpService.httpPost(url, param)
  },
  // 7、获取商品图片列表
  getGoodsPhotosList (param) {
    var url = 'manage/goods/photos/list'
    return HttpService.httpPost(url, param)
  },
  // 8、获取商品参数列表
  getGoodsParameterList (param) {
    var url = 'manage/goods/parameter/list'
    return HttpService.httpPost(url, param)
  },
  // 商品售后信息
  // 1、获取商品售后信息列表
  getGoodsManageAfterList (param) {
    var url = 'manage/goods/parameter/list'
    return HttpService.httpPost(url, param)
  },
  // 2、获取商品规格库存
  getGoodsManageStorageList (param) {
    var url = 'manage/goods/storage/list'
    return HttpService.httpPost(url, param)
  },
  // 订单接口
  // 1、获取购物车列表
  getOrderCartList (param) {
    var url = 'manage/order/cart/query-carts'
    return HttpService.httpPost(url, param)
  },
  // 2、新增/修改购物车商品
  saveOrderCart (param) {
    var url = 'manage/order/cart/save-carts'
    return HttpService.httpPost(url, param)
  },
  // 3、删除购物车商品
  removeOrderCart (param) {
    var url = 'manage/order/cart/remove'
    return HttpService.httpPost(url, param)
  },
  // 订单部分的列表
  // 1、获取订单列表
  getOrderList (param) {
    var url = 'manage/order/list'
    return HttpService.httpPost(url, param)
  },
  // 1、根据用户取订单列表
  getOrderListByUserId (param) {
    var url = 'manage/order/query-by-user'
    return HttpService.httpPost(url, param)
  },
  // 2、分页列表
  getOrderListWidthPage (param) {
    var url = 'manage/order/list-with-page'
    return HttpService.httpPost(url, param)
  },
  // 3、通过订单表ID获取订单详情
  getOrderDetailById (param) {
    var url = 'manage/order/query-entity'
    return HttpService.httpPost(url, param)
  },
  // 4、作废订单
  deleteOrderById (param) {
    var url = 'manage/order/delete-one'
    return HttpService.httpPost(url, param)
  },
  // 5、提交订单
  saveOrderById (param) {
    var url = 'manage/order/save'
    return HttpService.httpPost(url, param)
  },
  // 6、确认收货的接口
  deliveryCheckOrderById (param) {
    var url = 'manage/order/delivery-check'
    return HttpService.httpPost(url, param)
  },
  // 7、订单完成
  finishOrderById (param) {
    var url = 'manage/order/finish'
    return HttpService.httpPost(url, param)
  },
  // 8、获取订单物流轨迹
  traceAppOrderById (param) {
    var url = 'manage/order/trace-app'
    return HttpService.httpPost(url, param)
  },
  // 9、获取当前商品的评价
  getEvaluateListWithPage (param) {
    var url = 'manage/evaluate/list-with-page'
    return HttpService.httpPost(url, param)
  },
  // 10、保存对订单的评价
  saveEvaluateForOrder (param) {
    var url = 'manage/evaluate/save'
    return HttpService.httpPost(url, param)
  },
  // 商品推荐部分的列表
  // 1、获取列表
  getRecommendList (param) {
    var url = 'manage/recommend/list-app'
    return HttpService.httpPost(url, param)
  },
  // 业绩部分的接口
  // 1、获取业绩列表
  getAchievementListByUser (param) {
    var url = 'manage/achievement/query-by-user'
    return HttpService.httpPost(url, param)
  },
  // 交易列表部分的接口
  // 1、获取交易列表
  getTradeListByUser (param) {
    var url = 'manage/trade/query-by-user'
    return HttpService.httpPost(url, param)
  },
  // 2、获取交易详情
  getTradeDetailByUser (param) {
    var url = 'manage/trade/query-detail-by-user'
    return HttpService.httpPost(url, param)
  },
  // 商品收藏部分的接口
  // 1、获取用户的收藏列表
  getUserCollectList (param) {
    var url = 'manage/collect/query-by-user'
    return HttpService.httpPost(url, param)
  },
  // 2、用户的收藏商品的接口
  collectOneGoods (param) {
    var url = 'manage/collect/save-one'
    return HttpService.httpPost(url, param)
  },
  // 3、用取消收藏的接口
  deleteCollectGoods (param) {
    var url = 'manage/collect/delete-one'
    return HttpService.httpPost(url, param)
  },
  // 第二部分
  // 超哥的接口
  // pingxx支付请求
  pingxxGetCharge (param) {
    var url = 'pingxx/get_charge'
    return HttpService.httpPost(url, param)
  },
  // 2、发送手机验证码的接口
  smsGetCode (param) {
    var url = 'sms/get_code'
    return HttpService.httpPost(url, param)
  },
  // 3、获取微信js-sdk config
  getWxinfoConfig (param) {
    var url = 'wxinfo/v1/js_config'
    return HttpService.httpPost(url, param)
  },
  // 4、获取我的推广码
  getMyPromotion (param) {
    var url = 'wxinfo/v1/my_promotion'
    return HttpService.httpPost(url, param)
  }
}
