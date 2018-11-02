import router from './../router'
export default {
  //  统一处理 请求结果
  dealResult (result, vm) {
    if (result) {
      if (result.status === 0) {
        if (!result.data || Object.getOwnPropertyNames(result.data).length === 0) {
          vm.Toast({
            message: result.msg,
            position: 'middle',
            duration: 3000
          })
        }
        return result.data
      } else {
        //  接口返回错误  显示错误信息
        vm.Toast({
          message: result.msg,
          position: 'middle',
          duration: 3000
        })
        var msg = {err: 'warning', message: result.msg}
        return msg
      }
    } else {
      // 没有收取到数据
      vm.Toast({
        message: result.msg,
        position: 'middle',
        duration: 3000
      })
      router.push({name: 'err'})
      return {err: 'error'}
    }
  },
  // 用户部分的统一处理方法
  dealResult1 (result, vm) {
    if (result) {
      if (result.result === 0) {
        if (!result.data || Object.getOwnPropertyNames(result.data).length === 0) {
          vm.Toast({
            message: result.message,
            position: 'middle',
            duration: 3000
          })
        }
        return result.data
      } else {
        //  接口返回错误  显示错误信息
        vm.Toast({
          message: result.message,
          position: 'middle',
          duration: 3000
        })
        var message = {err: 'warning', message: result.message}
        return message
      }
    } else {
      // 没有收取到数据
      vm.Toast({
        message: result.message,
        position: 'middle',
        duration: 3000
      })
      router.push({name: 'err'})
      return {err: 'error'}
    }
  }
}
