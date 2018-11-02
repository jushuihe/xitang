export default{
  //   读取localStorage里面的数据
  write (key, value) {
    if (value) {
      value = JSON.stringify(value)
    }
    console.log(key, value)
    localStorage.setItem(key, value)
  },
  read (key) {
    let value = localStorage.getItem(key)
    if (value && value !== 'undefined' && value !== 'null') {
      console.log('返回JSON.parse')
      return JSON.parse(value)
    }
    return null
  },
  clear () {
    localStorage.clear()
  },
  removeItem (key) {
    localStorage.removeItem(key)
  },
  //  sessionStorage 的操作方法
  writeS (key, value) {
    if (value) {
      value = JSON.stringify(value)
    }
    sessionStorage.setItem(key, value)
  },
  readS (key) {
    let value = sessionStorage.getItem(key)
    if (value && value !== 'undefined' && value !== 'null') {
      return JSON.parse(value)
    }
    return null
  },
  clearS () {
    sessionStorage.clear()
  },
  removeItemS (key) {
    sessionStorage.removeItem(key)
  }
}
