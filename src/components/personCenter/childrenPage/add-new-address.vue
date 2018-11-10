<template>
  <div class="page">
      <!-- 这里需要一个订单编号  -->
      <mt-header title="新增地址" class='page-header'>
          <a @click='goBack' slot="left">
            <img class='img-item' src="./../../../assets/img/back.png" alt="">
          </a>
      </mt-header>
      <div class='main-content'>
        <!-- 新增地址的信息 -->
        <div class='address-msg'>
          <div class='address-msg-item'>
            <span class='item-title'>收货人姓名</span>
            <input class='item-input' v-model='contact' placeholder="请输入收货人姓名" type="text">
          </div>
          <div class='address-msg-item' style='border-color:transparent'>
            <span class='item-title'>手机号码</span>
            <div class='item-input' style='border-bottom:1px solid #eee'>+86 中国</div>
          </div>
          <div class='address-msg-item'>
            <span class='item-title'></span>
            <input class='item-input' v-model='phone' placeholder="请输入收货人手机号" type="text">
          </div>
          <mt-cell
            title="所在地区"
            is-link
            @click.native='showTheDistrictPick=true'
            :value='addressProvince + "-" + addressCity + "-" + addressCounty'
            class='user-defined-mt-cell address-item'>
          </mt-cell>
          <div class='address-msg-item'>
            <span class='item-title'>详细地址</span>
            <input class='item-input' v-model='custom' placeholder="请输入街道地址" type="text">
          </div>
        </div>
        <div class='gray-content'></div>
        <!-- 设为默认 -->
        <div class='choiced-to-default' @click='choicedTheAddressToDefault'>
          <span class='item-title'>设为默认地址</span>
          <div class='selected-img'>
            <img v-if='choicedToDefault' src='./../../../assets/img/selected.png' class='img-item'>
            <img v-if='!choicedToDefault' src='./../../../assets/img/unselected.png' class='img-item'>
          </div>
        </div>
      </div>
      <div class='footer'>
        <mt-button @click.native='saveTheAddress' type='primary' class='footer-btn' size='large'>保存</mt-button>
      </div>
      <!-- 选择地区的组件 -->
      <mt-popup
        v-model="showTheDistrictPick"
        position='bottom'
        style='width:100vw;'
        popup-transition="popup-fade">
        <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5"></mt-picker>
      </mt-popup>
  </div>
</template>

<script>
import cityData from './cityData/data.js'
export default {
  name: 'payOrder',
  data () {
    return {
      showTheDistrictPick: false,
      addressSlots: [
        {
          flex: 1,
          values: Object.keys(cityData),
          className: 'slot1',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['北京'],
          className: 'slot3',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot4'
        }, {
          flex: 1,
          values: ['东城区'],
          className: 'slot5',
          textAlign: 'center'
        }
      ],
      addressProvince: '北京',
      addressProvinceCode: '',
      addressCity: '北京市',
      addressCityCode: '',
      addressCounty: '东城区',
      addressCountyCode: '',
      choicedToDefault: false,
      provincialLevelList: [],
      // 保存上一级的城市的数据
      oldCityData: [],
      // 保存当前联级地址的第二级的所有的内容
      secondChoicedArr: [],
      // 填写的收货地址的信息
      contact: '',
      phone: '',
      custom: ''
    }
  },
  created () {
    this.getLocationAddress(0)
    if (Number(this.addrId) !== 0) {
      this.getAddrInfo()
    }
  },
  methods: {
    // 1、新增或者修改收货地址
    async createOrUpdateAddress () {
      if (!this.contact || !this.phone || !this.custom) {
        this.Toast('请将收货信息填写完整')
        return
      }
      if (this.phone.length !== 11) {
        this.Toast('填写的电话号码不正确')
        return
      }
      let param = {
        addrId: this.addrId,
        contact: this.contact,
        phone: this.phone,
        isDefault: this.choicedToDefault ? 0 : 1,
        custom: this.custom,
        addrInfo: JSON.stringify([
          {
            name: this.addressProvince,
            code: this.addressProvinceCode,
            level: 0
          },
          {
            name: this.addressCity,
            code: this.addressCityCode,
            level: 1
          },
          {
            name: this.addressCounty,
            code: this.addressCountyCode,
            level: 2
          }
        ])
      }
      this.Indicator.open()
      let result = await this.userAPI.createOrUpdateAddress(param)
      result = this.show.dealResult1(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        console.log(result)
        this.Toast('新增地址成功')
        this.$router.push({name: 'ShippingAddress'})
      }
    },
    // 2、获取层级的地区数据
    async getLocationAddress (code) {
      let param = {
        code
      }
      // this.Indicator.open()
      let result = await this.userAPI.getLocationAddress(param)
      result = this.show.dealResult1(result, this)
      // this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        if (code === 0) {
          this.provincialLevelList = result.list
          let obj = {
            flex: 1,
            values: this.provincialLevelList.map(item => item.name),
            className: 'slot1',
            textAlign: 'center'
          }
          this.addressSlots.shift()
          this.addressSlots.unshift(obj)
          this.addressProvinceCode = this.provincialLevelList[0].code
          this.getLocationAddress(this.provincialLevelList[0].code).then(data => {
            this.addressCityCode = data[0].code
            this.getLocationAddress(data[0].code).then(data1 => {
              this.addressCountyCode = data1[0].code
              let obj = {
                flex: 1,
                values: data1.map(item => item.name),
                className: 'slot5',
                textAlign: 'center'
              }
              this.addressSlots.pop()
              this.addressSlots.push(obj)
            })
          })
        } else {
          return result.list
        }
      }
    },
    // 3、查询当前地址的详细信息
    async getAddrInfo () {
      let param = {
        type: 0,
        addrId: this.addrId
      }
      this.Indicator.open()
      let result = await this.userAPI.getAddrInfo(param)
      result = this.show.dealResult1(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        this.address = result.address
        this.contact = this.address.contact
        this.phone = this.address.phone
        this.custom = this.address.custom
        this.addressProvince = this.address.addrInfo.filter(item => item.level === 0)[0].name
        this.addressProvinceCode = this.address.addrInfo.filter(item => item.level === 0)[0].code
        this.addressCity = this.address.addrInfo.filter(item => item.level === 1)[0].name
        this.addressCityCode = this.address.addrInfo.filter(item => item.level === 1)[0].code
        this.addressCounty = this.address.addrInfo.filter(item => item.level === 2)[0].name
        this.addressCountyCode = this.address.addrInfo.filter(item => item.level === 2)[0].code
        this.choicedToDefault = (this.address.isDefault === 1) ? null : true
      }
    },
    goBack () {
      this.$router.back()
    },
    // 选择的城市发生改变的时候执行的函数
    onAddressChange (picker, values) {
      let choicedCode
      if (values[0] !== this.oldCityData[0]) {
        this.oldCityData = [...values]
        if ((this.provincialLevelList.length > 0) && (this.provincialLevelList.filter(item => item.name === values[0]).length > 0)) {
          choicedCode = this.provincialLevelList.filter(item => item.name === values[0])[0].code
          this.addressProvinceCode = choicedCode
        }
        if (choicedCode) {
          this.getLocationAddress(choicedCode).then(data => {
            this.secondChoicedArr = data
            picker.setSlotValues(1, data.map(item => item.name))
            let secondChoicedCode = data[0].code
            this.addressCityCode = secondChoicedCode
            this.getLocationAddress(secondChoicedCode).then(data1 => {
              this.addressCountyCode = data1[0].code
              picker.setSlotValues(2, data1.map(item => item.name))
            })
          })
        }
      } else if (values[1] !== this.oldCityData[1]) {
        this.oldCityData = [...values]
        if ((this.secondChoicedArr.length > 0) && (this.secondChoicedArr.filter(item => item.name === values[1]).length > 0)) {
          choicedCode = this.secondChoicedArr.filter(item => item.name === values[1])[0].code
          this.addressCityCode = choicedCode
        }
        if (choicedCode) {
          this.getLocationAddress(choicedCode).then(data1 => {
            this.addressCountyCode = data1[0].code
            picker.setSlotValues(2, data1.map(item => item.name))
          })
        }
      }
      this.addressProvince = values[0]
      this.addressCity = values[1]
      this.addressCounty = values[2]
    },
    saveTheAddress () {
      this.createOrUpdateAddress()
    },
    choicedTheAddressToDefault () {
      this.choicedToDefault = !this.choicedToDefault
    }
  },
  computed: {
    addrId () {
      return this.$route.params.addrId
    }
  }
}
</script>

<style scoped lang='stylus'>
@import './../../../assets/css/base-style.styl'
.page{
  .page-header{
    .go-to-home{
      position:absolute;
      top: 0px;
      right: 1rem;
      height: 40px;
    }
  }
  .main-content{
    .address-msg{
      .address-msg-item{
        text-align left;
        background:#fff;
        height:56px;
        line-height:56px;
        font-size:14px;
        border-bottom:1px solid #eee;
        .item-title{
          float:left;
          display inline-block
          margin-left:1.2rem;
        }
        .item-input{
          margin-left:28vw
          width:70vw;
          line-height 56px;
          border:0px;
          display block;
          outline:none
          font-size 14px;
        }
      }
      .address-item{
        text-align:left;
        padding-left:1.5rem;
      }
    }
    .choiced-to-default{
      background:#fff;
      height:56px;
      line-height 56px;
      font-size 14px;
      text-align:left;
      padding-left:1.5rem;
      .selected-img{
        width:22px;
        height:22px;
        float:right;
        margin-right:1.5rem;
        margin-top:7px;
      }
    }
  }
  .footer{
    background:transparent;
    padding-left:1rem;
    padding-right:1rem;
    .footer-btn{
      background:$base-color;
    }
  }
}
</style>
