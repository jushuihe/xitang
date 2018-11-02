import {
  SERVER_URL,
  REQUEST_TIMEOUT
} from './Config'
import axios from 'axios'
import router from './../router/index'
//  axios 配置
axios.defaults.timeout = REQUEST_TIMEOUT
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
// axios.defaults.baseURL = SERVER_URL;
export default {
  // get请求
  httpGet (url, body) {
    if (url.indexOf('http') === -1) {
      url = SERVER_URL + url
    }
    console.log(url)
    let param
    if (body) {
      param = {
        params: body
      }
    }
    return axios.get(url, param).then(res => {
      return res
    }).catch(err => {
      console.log(url + '请求错误')
      console.log(err)
      this.NetworkErr()
    })
  },
  // 将请求消息转变为 字符窜的形式 传递过去
  httpPost (url, body) {
    if (url.indexOf('http') === -1) url = SERVER_URL + url
    let param
    if (body) {
      param = body
    }
    let obj = {
      url,
      method: 'POST',
      data: param,
      headers: {
        'openId': '54321'
      }
    }
    return axios(obj).then(res => {
      return res.data
    }).catch(err => {
      console.log(url + '请求错误')
      console.log(err)
      //  后续在增加错误事件
      this.NetworkErr()
    })
  },
  // 刘总的接口
  httpPost1 (url, body) {
    if (url.indexOf('http') === -1) url = SERVER_URL + url
    let param
    if (body) {
      param = body
    }
    let obj = {
      url,
      method: 'POST',
      param: param,
      headers: {
        'openId': '54321'
      }
    }
    return axios(obj).then(res => {
      return res.data
    }).catch(err => {
      console.log(url + '请求错误')
      console.log(err)
      //  后续在增加错误事件
      this.NetworkErr()
    })
  },
  // 网络错误的 执行的事件
  NetworkErr () {
    router.push({
      name: 'error-500'
    })
  }
}
