<template>
  <div class="person-msg">
      <mt-header title="账号设置">
          <router-link to="/base/personCenter" slot="left">
              <mt-button icon="back">返回</mt-button>
          </router-link>
          <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
      <div class='content-item'>
          <h2 class="block-header" @click='changeTheNickName'>基本信息</h2>
          <div class='cell-group'>
              <mt-cell title="头像" class='user-defined-mt-cell'  to='/coupon'>
                <span><img class='user-avatar' src="../../../assets/img/avatar.jpg" alt=""></span>
              </mt-cell>
              <mt-cell title="昵称" class='user-defined-mt-cell' value='15337261725' @click.native='changeTheNickName' is-link>
              </mt-cell>
              <mt-cell title="性别" class='user-defined-mt-cell' value='保密' @click.native='changeTheSex'  is-link>
              </mt-cell>
              <mt-cell title="生日" class='user-defined-mt-cell' @click.native='changeTheData' :value='userDateValStr' is-link>
              </mt-cell>
              <mt-cell title="收货地址" class='user-defined-mt-cell' value='0个'  to='/shippingAddress' is-link>
              </mt-cell>
          </div>
      </div>
      <div class='content-item'>
          <h2 class="block-header">账号绑定</h2>
          <div class='cell-group'>
              <mt-cell title="手机号" class='user-defined-mt-cell' :value='userPhone'  @click.native='changeTheUserPhone' is-link>
              </mt-cell>
              <mt-cell title="微信" class='user-defined-mt-cell' value='已绑定' is-link>
              </mt-cell>
          </div>
      </div>
      <div class='content-item'>
          <h2 class="block-header">安全设置</h2>
          <div class='cell-group'>
              <mt-cell title="登录密码" class='user-defined-mt-cell' value='修改'  to='/changePassWord' is-link>
              </mt-cell>
              <mt-cell title="注销账号" class='user-defined-mt-cell' @click.native='cancellationUser' is-link>
              </mt-cell>
          </div>
      </div>
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
      userPhone: ''
    }
  },
  created () {},
  methods: {
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
    changeTheUserPhone () {
      this.MessageBox.prompt('请输入新手机号', '').then((value) => {
        console.log(value)
      }).catch(data => {
        console.log(data)
      })
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
    }
  }
}
</script>

<style scoped lang='stylus'>
.person-msg{
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
            padding-left: 15px;
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
            }
        }
    }
}
</style>
