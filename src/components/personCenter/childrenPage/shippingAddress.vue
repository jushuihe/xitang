<template>
  <div class="page">
      <!-- 这里需要一个订单编号  -->
      <mt-header title="收货地址" class='page-header'>
          <a @click='goBack' slot="left">
            <img class='img-item' src="./../../../assets/img/back.png" alt="">
          </a>
          <mt-button type="default" v-if='!hasNoAddress' slot='right' @click.native='editorTheAddress'  size="small" class='go-to-home'>编辑</mt-button>
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
            class='user-defined-mt-cell'
            @click.native='choicedTheGoodsNum'>
          </mt-cell>
          <div class='gray-content'></div>
          <ul class='address-list-content'>
            <li v-for='item in 3' :key='item'>
              <transition name='selected'>
                <div v-if='isEditorTheAddress' @click='choicedTheAddress(item)' class='selected-img'>
                  <img v-if='false' src="./../../../assets/img/selected.png" alt="">
                  <img src="./../../../assets/img/unselected.png" alt="">
                </div>
              </transition>
              <div class='address-list-msg'>
                <h3>吕小布
                  <span v-if='item == 1' class='default-address'>(默认)</span>
                  <span style='float:right;font-size:14px;'>1867777777</span>
                </h3>
                <p>湖北省武汉市洪山区光谷一路佛祖岭湖口一路湖口社区13栋2209号</p>
              </div>
              <transition name='delete'>
                <mt-button type="default" class='add-more-address' @click.native='deleteTheAddress(item)'  size="small">
                  <img class='img-item' src="./../../../assets/img/person/delete.png">
                </mt-button>
              </transition>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'payOrder',
  data () {
    return {
      hasNoAddress: false,
      isEditorTheAddress: false
    }
  },
  created () {},
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    editorTheAddress () {
      console.log('编辑地址列表')
      this.isEditorTheAddress = true
    },
    addMoreAddress () {
      console.log('新增地址')
      this.$router.push({name: 'AddNewAddress'})
    },
    deleteTheAddress (item) {
      console.log(item)
    },
    choicedTheAddress (item) {
      console.log(item)
      console.log('选中当前的地址')
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
          .selected-img{}
          .address-list-msg{}
          .add-more-address{}
        }
      }
    }
  }
}
</style>
