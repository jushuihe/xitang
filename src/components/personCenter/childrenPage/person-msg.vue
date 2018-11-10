<template>
  <div class="page">
    <mt-header title="个人信息" class='page-header'>
        <a @click='goBack' slot="left">
          <img class='img-item' src="./../../../assets/img/back.png" alt="">
        </a>
    </mt-header>
    <div class='content-item'>
        <h2 class="block-header" @click='changeTheNickName'>基本信息</h2>
        <div class='cell-group'>
            <mt-cell title="头像" class='user-defined-mt-cell'>
              <span><img class='user-avatar' :src='wechatHeadImgUrl' alt=""></span>
            </mt-cell>
            <mt-cell title="昵称" class='user-defined-mt-cell' :value='wechatName' @click.native='changeTheNickName' is-link>
            </mt-cell>
            <!-- <mt-cell title="性别" class='user-defined-mt-cell' value='保密' @click.native='changeTheSex'  is-link>
            </mt-cell> -->
            <!-- <mt-cell title="生日" class='user-defined-mt-cell' @click.native='changeTheData' :value='userDateValStr' is-link>
            </mt-cell> -->
            <mt-cell title="收货地址" class='user-defined-mt-cell' :value='addressListLength+"个"'  to='/shippingAddress' is-link>
            </mt-cell>
            <!-- 用户权限的位置，如果用户类型是店员才会有我的二维码和推广码， -->
            <mt-cell title="我的推广码" class='user-defined-mt-cell'  to='/PromotionCode' is-link>
            </mt-cell>
            <mt-cell v-if='userType === 5' title="我的二维码" class='user-defined-mt-cell'  to='/qrCodePage' is-link>
            </mt-cell>
        </div>
    </div>
    <div class='content-item'>
        <h2 class="block-header">账号绑定</h2>
        <div class='cell-group'>
            <mt-cell title="手机号" class='user-defined-mt-cell' :value='boundPhone' @click.native='boundTheUserPhone' is-link>
            </mt-cell>
            <mt-cell title="微信" class='user-defined-mt-cell' value='已绑定' is-link>
            </mt-cell>
        </div>
    </div>
    <!-- <div class='content-item'>
        <h2 class="block-header">安全设置</h2>
        <div class='cell-group'>
            <mt-cell title="登录密码" class='user-defined-mt-cell' value='修改'  to='/changePassWord' is-link>
            </mt-cell>
            <mt-cell title="注销账号" class='user-defined-mt-cell' @click.native='cancellationUser' is-link>
            </mt-cell>
        </div>
    </div> -->
    <mt-datetime-picker
      v-model="userDateVal"
      ref="changeUserDate"
      type="date"
      :startDate='new Date("1980-1-1")'
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirmDate">
    </mt-datetime-picker>
  </div>
</template>

<script>
export default {
  name: 'baseGroup',
  data () {
    return {
      userName: '',
      pickerTheUserDate: false,
      userDateVal: null,
      // 用户生日的 ‘yyy-mm-dd’ 显示
      userDateValStr: '',
      // 用户的手机号
      userPhone: '',
      // 收货地址的个数
      addressListLength: 0,
      userType: null,
      userMsg: '',
      boundPhone: ''
    }
  },
  created () {
    this.getAddrList()
    this.getShopUserInfo()
  },
  methods: {
    // 1、获取收货地址列表
    async getAddrList () {
      let param = {}
      this.Indicator.open()
      let result = await this.userAPI.getAddrList(param)
      result = this.show.dealResult1(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        this.addressListLength = result.list.length
      }
    },
    // 2、获取当前用户的信息，获取当前用户的权限
    async getShopUserInfo () {
      let param = {}
      this.Indicator.open()
      let result = await this.userAPI.getShopUserInfo(param)
      result = this.show.dealResult1(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        this.userMsg = result.user
        // 获取当前用户的用户类型
        // 用户类型（0普通用户；2西堂；3区域代理；4店长；5店员）
        this.userType = this.userMsg.roleId
        // 获取当前用户绑定的手机号如果绑定了就不能再去绑定手机号
        this.boundPhone = this.userMsg.phone
      }
    },
    // 改变用户昵称
    changeTheNickName () {
      this.MessageBox.prompt('请输入昵称', '').then((value) => {
        console.log(value)
      }).catch(data => {
        console.log(data)
      })
    },
    // 改变用户性别
    changeTheSex () {
      this.MessageBox({
        title: '选择性别',
        showCancelButton: true,
        confirmButtonClass: 'boy-btn',
        confirmButtonText: '男',
        cancelButtonClass: 'girl-btn',
        cancelButtonText: '女'
      }).then((val) => {
        console.log(val)
        console.log(1)
      }).catch((data) => {
        console.log(data)
      })
    },
    // 改变用户生日
    changeTheData () {
      this.$refs.changeUserDate.open()
    },
    handleConfirmDate (val) {
      console.log(val)
      this.userDateValStr = val.toDateString()
      console.log(this.userDateValStr)
    },
    cancellationUser () {
      this.MessageBox({
        title: '确定注销账号？',
        showCancelButton: true
      }).then((val) => {
        console.log(val)
        console.log(1)
      }).catch((data) => {
        console.log(data)
      })
    },
    boundTheUserPhone () {
      if (this.boundPhone) {
        this.Toast({
          message: '已经绑定了手机号',
          position: 'bottom'
        })
      } else {
        this.$router.push({name: 'BoundPhone'})
      }
    },
    goBack () {
      this.$router.back()
    }
  },
  computed: {
    openId () {
      return this.str.readS('openId')
    },
    wechatName () {
      return decodeURI(this.str.readS('wechatName'))
    },
    wechatHeadImgUrl () {
      return this.str.readS('wechatHeadImgUrl')
    }
  }
}
</script>

<style scoped lang='stylus'>
@import './../../../assets/css/base-style.styl'
.page{
    text-align left
    .content-item{
        .block-header{
            padding: 15px 15px 10px;
            font-size: 14px;
            line-height: 15px;
            color: #999;
            background:#f8f8f8;
        }
        .cell-group{
            position: relative;
            background-color: #fff;
            border-top:1px solid #eee;
            border-bottom:1px solid #eee;
            .user-avatar{
                width:30px;
                height:30px;
            }
            .mint-cell-wrapper{
                border:1px solid red;
                font-size:14px;
                padding-left:1.5rem;
            }
            .user-defined-mt-cell{
              padding-left:1.5rem;
            }
        }
    }
}
</style>
