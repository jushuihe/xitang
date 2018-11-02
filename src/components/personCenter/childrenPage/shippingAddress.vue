<template>
  <div class="page">
      <!-- 这里需要一个订单编号  -->
      <mt-header title="收货地址" class='page-header'>
          <a @click='goBack' slot="left">
            <img class='img-item' src="./../../../assets/img/back.png" alt="">
          </a>
          <mt-button type="default" v-if='!hasNoAddress' slot='right' @click.native='editorTheAddressList'  size="small" class='go-to-home'>编辑</mt-button>
      </mt-header>
      <div class='main-content'>
        <!-- 如果没有地址 -->
        <div v-if='hasNoAddress' class='has-no-address'>
          <img class='has-no-address-img' src='./../../../assets/img/person/no-address.png' alt="">
          <p>您没有添加任何地址</p>
          <footer class='add-more'>
            <mt-button type="default" class='add-more-address' @click.native='addMoreAddress'  size="large">立即设置收货地址</mt-button>
          </footer>
        </div>
        <!-- 如果有地址 -->
        <div v-if='!hasNoAddress' class='address-list'>
          <mt-cell
            title="添加新地址"
            is-link
            to='/AddNewAddress'
            class='user-defined-mt-cell'>
          </mt-cell>
          <div class='gray-content'></div>
          <ul class='address-list-content'>
            <li v-for='item in addressList' :key='item.addressId'>
              <transition name='selected'>
                <div v-if='isEditorTheAddress' @click='choicedTheAddress(item)' class='selected-img'>
                  <img v-if='choicedAddressIndex === item' class='img-item' src="./../../../assets/img/selected.png" alt="">
                  <img v-if='choicedAddressIndex !== item' class='img-item' src="./../../../assets/img/unselected.png" alt="">
                </div>
              </transition>
              <div class='address-list-msg' @click='choicedTheAddressForOrder'>
                <h3>{{item.contact}}
                  <span v-if='item.isDefault == 0' class='default-address'>(默认)</span>
                  <span style='float:right;font-size:14px;'>{{item.phone}}</span>
                </h3>
                <p>{{item.desc}}</p>
              </div>
              <transition name='delete'>
                <div v-if='isEditorTheAddress' class='delete-the-address'>
                  <mt-button type="default" class='delete-the-address-btn' @click.native='deleteTheAddress(item)' size="small">
                    <img slot="icon" height="20" width="16" src="./../../../assets/img/person/delete.png">
                  </mt-button>
                </div>
              </transition>
            </li>
          </ul>
        </div>
      </div>
      <div class='footer'>
        <mt-button @click.native='editorTheAddress' :class='{"show-footer-btn" : isEditorTheAddress}' type='default' class='footer-btn' size='small'>编辑</mt-button>
        <mt-button @click.native='setToTheDefault' :class='{"show-footer-btn" : isEditorTheAddress}' type='primary' class='footer-btn' size='small'>设为默认</mt-button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'payOrder',
  data () {
    return {
      hasNoAddress: false,
      isEditorTheAddress: false,
      // 被选中的地址的编号
      choicedAddressIndex: 1,
      addressList: []
    }
  },
  created () {
    this.getAddrList()
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
        this.addressList = result.list
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    editorTheAddressList () {
      console.log('编辑地址列表')
      this.isEditorTheAddress = !this.isEditorTheAddress
    },
    addMoreAddress () {
      console.log('新增地址')
      this.$router.push({name: 'AddNewAddress'})
    },
    deleteTheAddress (item) {
      console.log(item)
    },
    choicedTheAddress (item) {
      this.choicedAddressIndex = item
    },
    // 编辑当前的地址
    editorTheAddress () {
      console.log('编辑当前的地址')
      this.$router.push({name: 'AddNewAddress', params: {'addressId': 1}})
    },
    setToTheDefault () {
      console.log('设置为默认')
    },
    // 选中当前的地址为当前的订单的收货地址
    choicedTheAddressForOrder () {
      console.log('选为地址 并且跳转到订单的页面')
      this.$router.back()
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
    .has-no-address{
      .has-no-address-img{
        width:7rem;
        height:8.5rem;
        margin-top:4rem;
        margin-bottom:1.5rem;
      }
      >p{
        font-size:15px;
        line-height 20px;
      }
      .add-more{
        margin-left:1rem;
        margin-right:1rem;
        position:fixed;
        bottom:10px;
        right:0px;
        left:0px;
        .add-more-address{
          background:$base-color;
          color:#fff;

        }
      }
    }
    .address-list{
      .user-defined-mt-cell{
        text-align left;
        font-size:16px;
        padding-left:1.5rem;
      }
      .address-list-content{
        list-style none
        background:#fff;
        li{
          display flex
          .selected-img{
            width:2.2rem;
            margin-left:1rem;
            position relative
            >.img-item{
              width:1.8rem;
              height:1.8rem;
              position:absolute
              top:50%
              left:0px
              margin-top:-0.9rem;
            }
          }
          .address-list-msg{
            margin-left: 1.8rem
            margin-right: 1.8rem;
            width: 100%;
            &:before{
              content:'';
              display table;
            }
            h3{
              line-height 30px;
              font-size: 18px;
              text-align left;
              margin-top:1.3rem;
              .default-address{
                color:#ff685c;
                font-size:12px;
              }
            }
            p{
              text-align left;
              font-size: 13px;
              line-height 22px;
              padding-bottom:1.2rem;
              border-bottom:1px solid #eee;
            }
          }
          .delete-the-address{
            width:3rem;
            margin-right:1rem;
            position relative
            .delete-the-address-btn{
              padding:0px
              position absolute;
              top:50%;
              margin-top:-16px;
              left:0px;
              box-shadow: none;
            }
          }
          .selected-enter-active, .selected-leave-active {
            transition: all 0.5s linear;
          }
          .selected-enter, .selected-leave-to {
            transform rotateY(90deg);
            transform-origin:left center;
          }
          .delete-enter-active, .delete-leave-active {
            transition: all 0.5s linear;
          }
          .delete-enter, .delete-leave-to {
            transform rotateY(90deg);
            transform-origin:left center;
          }
        }
      }
    }
  }
  .footer{
    padding:0px 30px;
    font-size:0px;
    background:transparent
    .footer-btn{
      width:48%;
      height:30px;
      margin-top:10px;
      border-radius:50px;
      transition transform 0.5s
      transform translateY(50px)
      &.show-footer-btn{
        transform translateY(0px)
      }
      &:last-child{
        background:$base-color;
        margin-left:4%;
      }
    }
  }
}
</style>
