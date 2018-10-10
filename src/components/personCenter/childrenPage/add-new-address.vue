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
            <input class='item-input' placeholder="请输入收货人姓名" type="text">
          </div>
          <div class='address-msg-item' style='border-color:transparent'>
            <span class='item-title'>手机号码</span>
            <div class='item-input' style='border-bottom:1px solid #eee'>+86 中国</div>
          </div>
          <div class='address-msg-item'>
            <span class='item-title'></span>
            <input class='item-input' placeholder="请输入收货人手机号" type="text">
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
            <input class='item-input' placeholder="请输入街道地址" type="text">
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
          values: ['东城区', '西城区', '崇文区', '宣武区', '朝阳区', '丰台区', '石景山区', '海淀区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '平谷区', '怀柔区', '密云县', '延庆县', '其他'],
          className: 'slot5',
          textAlign: 'center'
        }
      ],
      addressProvince: '北京',
      addressCity: '北京',
      addressCounty: '东城区',
      choicedToDefault: false
    }
  },
  created () {
    console.log(cityData)
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    onAddressChange (picker, values) {
      let obj = cityData[values[0]]
      picker.setSlotValues(1, Object.keys(obj))
      picker.setSlotValues(2, obj[values[1]])
      this.addressProvince = values[0]
      this.addressCity = values[1]
      this.addressCounty = values[2]
    },
    saveTheAddress () {
      console.log('保存当前的地址')
      this.$router.push({name: 'ShippingAddress'})
    },
    choicedTheAddressToDefault () {
      this.choicedToDefault = !this.choicedToDefault
    }
  },
  computed: {
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
