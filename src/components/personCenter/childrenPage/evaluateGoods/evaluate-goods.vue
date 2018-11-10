<template>
  <div class="page">
      <mt-header title="评价" class='page-header'>
          <a @click='goBack' slot="left">
            <img class='img-item' src="./../../../../assets/img/back.png" alt="">
          </a>
      </mt-header>
      <div class='main-content'>
        <div class='goods-msg' v-for='item in goodsList' :key='item.rowId'>
          <div class='goods-msg-img'>
            <img class='img-item' :src="item.picUrl" alt="">
          </div>
          <div class='goods-msg-msg'>
            <h3>{{item.goodsName}}
              <span class='goods-price'>￥59</span>
            </h3>
            <p>规格：{{item.specName}}
              <span class='goods-num'>x{{item.orderNumber}}</span>
            </p>
          </div>
        </div>
        <!-- 评分部分的样式 -->
        <div class='grade-list'>
          <span class='grade-list-title'>
            评分
          </span>
          <div class='start-list'>
            <ul>
              <li @click='changeTheGrade(1)'>
                <img class='img-item' v-if='gradeVal>=1' src="./../../../../assets/img/order/start.png" alt="">
                <img class='img-item' v-if='gradeVal<1' src="./../../../../assets/img/order/unstart.png" alt="">
              </li>
              <li @click='changeTheGrade(2)'>
                <img class='img-item' v-if='gradeVal>=2' src="./../../../../assets/img/order/start.png" alt="">
                <img class='img-item' v-if='gradeVal<2' src="./../../../../assets/img/order/unstart.png" alt="">
              </li>
              <li @click='changeTheGrade(3)'>
                <img class='img-item' v-if='gradeVal>=3' src="./../../../../assets/img/order/start.png" alt="">
                <img class='img-item' v-if='gradeVal<3' src="./../../../../assets/img/order/unstart.png" alt="">
              </li>
              <li @click='changeTheGrade(4)'>
                <img class='img-item' v-if='gradeVal>=4' src="./../../../../assets/img/order/start.png" alt="">
                <img class='img-item' v-if='gradeVal<4' src="./../../../../assets/img/order/unstart.png" alt="">
              </li>
              <li @click='changeTheGrade(5)'>
                <img class='img-item' v-if='gradeVal>=5' src="./../../../../assets/img/order/start.png" alt="">
                <img class='img-item' v-if='gradeVal<5' src="./../../../../assets/img/order/unstart.png" alt="">
              </li>
            </ul>
            <span v-if='gradeVal==1'>非常不满意</span>
            <span v-if='gradeVal==2'>有点不满意</span>
            <span v-if='gradeVal==3'>不满意</span>
            <span v-if='gradeVal==4'>基本都满意</span>
            <span v-if='gradeVal==5'>非常满意</span>
          </div>
        </div>
        <mt-field placeholder="请填写评价内容" style='padding-left:0.6rem;' type="textarea" rows="4" v-model="memo"></mt-field>
        <!-- 选择照 -->
        <!-- <div class='picture-component'>
          <ul class='hasChoicedImgList'>
            <li class='has-choiced-img-list-item' v-for='item in imgList' :key='item'>
              <img :src='item'></li>
          </ul>
          <mt-button class='picture-component-btn' @click.native='addNewPicture' type='default' size='small'>
            +
          </mt-button>
        </div> -->
        <div class='submit-component'>
          <mt-button class='submit-component-btn' @click.native='submitTheEvaluate' type='default' size='small'>
            提交
          </mt-button>
        </div>
      </div>
  </div>
</template>

<script>
var wx = require('weixin-js-sdk')
export default {
  name: 'EvaluateGoods',
  data () {
    return {
      gradeVal: 1,
      introduction: '',
      imgList: [],
      uploadSuccessImg: '',
      orderDetail: {},
      goodsList: [],
      memo: ''
    }
  },
  created () {
    this.getOrderDetailById(this.orderId)
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    changeTheGrade (index) {
      this.gradeVal = index
    },
    // 1、通过订单表ID获取订单详情
    async getOrderDetailById (orderId) {
      let param = {
        rowId: orderId
      }
      this.Indicator.open()
      let result = await this.goodsAPI.getOrderDetailById(param)
      result = this.show.dealResult(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        this.orderDetail = result
        this.goodsList = result.details
      }
    },
    // 2、点击打开手机的相册
    async addNewPicture () {
      let param = {
        url: window.location.href
      }
      this.Indicator.open()
      let result = await this.goodsAPI.getWxinfoConfig(param)
      this.Indicator.close()
      this.cfgObj = result
      this.wxjsPictureMain(result)
    },
    // 3、提交评价的接口
    async saveEvaluateForOrder () {
      let param = {
        memo: this.memo,
        orderId: this.orderId,
        detail: [
          {
            rowId: 1,
            configId: 1,
            title: '评价',
            score: this.gradeVal
          }
        ]
      }
      this.Indicator.open()
      let result = await this.goodsAPI.saveEvaluateForOrder(param)
      this.Indicator.close()
      result = this.show.dealResult(result, this)
      this.Indicator.close()
      if (result.err === 'warning') {
        this.Toast(result.message)
      } else {
        this.Toast('评论成功')
        this.goBack()
      }
    },
    // 获取到微信SDK之后调用wx的方法调起照片的功能
    wxjsPictureMain (cfgObj) {
      let that = this
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx57127d6c1d11d825', // 必填，公众号的唯一标识
        timestamp: that.cfgObj.timestamp, // 必填，生成签名的时间戳
        nonceStr: that.cfgObj.noncestr, // 必填，生成签名的随机串
        signature: that.cfgObj.signature, // 必填，签名
        jsApiList: ['chooseImage', 'previewImage'] // 必填，需要使用的JS接口列表
      })
      wx.ready(function () {
        wx.chooseImage({
          count: 9, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            // var localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            if (res.localIds.length > 0) {
              res.localIds.forEach(item => {
                that.imgList.push(item)
                setTimeout(() => {
                  that.wxjsUploadPicture(item)
                }, 200)
              })
            }
          },
          error: function (res) {
            if (res.errMsg.indexOf('function_not_exist') > 0) {
              alert('版本过低请升级')
            }
          }
        })
      })
      wx.error(function (res) {
        console.log(res)
      })
    },
    submitTheEvaluate () {
      console.log('提交评论')
      this.saveEvaluateForOrder()
    },
    // 上传图片的接口
    wxjsUploadPicture (pictureId) {
      this.Toast('开始上传')
      let that = this
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx57127d6c1d11d825', // 必填，公众号的唯一标识
        timestamp: that.cfgObj.timestamp, // 必填，生成签名的时间戳
        nonceStr: that.cfgObj.noncestr, // 必填，生成签名的随机串
        signature: that.cfgObj.signature, // 必填，签名
        jsApiList: ['uploadImage'] // 必填，需要使用的JS接口列表
      })
      wx.ready(function (localId) {
        wx.uploadImage({
          localId, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: (res) => {
            that.Toast('上传成功')
            that.uploadSuccessImg = res.serverId
          },
          error: function (res) {
            if (res.errMsg.indexOf('function_not_exist') > 0) {
              alert('版本过低请升级')
            }
          }
        })
      })
      wx.error(function (res) {
        console.log(res)
      })
    }
  },
  computed: {
    orderId () {
      return this.$route.params.goodsId
    }
  }
}
</script>

<style scoped lang='stylus'>
@import './../../../../assets/css/base-style.styl'
.page{
  .main-content{
    .goods-msg{
      background:#fff;
      padding-top:1rem;
      padding-bottom:1rem;
      .goods-msg-img{
        float:left;
        margin-left:1.5rem;
        width:6rem;
        height:6rem;
      }
      .goods-msg-msg{
        margin-left:9rem;
        height:6rem;
        text-align left;
        >h3{
          line-height 30px;
          .goods-price{
            float:right;
            margin-right:1.5rem;
            font-weight:500;
          }
        }
        >p{
          line-height 20px
          .goods-num{
            float:right;
            margin-right:1.5rem;
          }
        }
      }
    }
    .grade-list{
      background:#fff;
      line-height 22px
      padding-top:1rem;
      padding-bottom:1rem;
      .grade-list-title{
        float:left;
        margin-left:1.5rem;
      }
      .start-list{
        margin-left:4rem;
        text-align:left;
        >ul{
          list-style:none;
          display inline-block;
          li{
            display inline-block;
            width:20px;
            height:20px;
            margin-left:8px;
          }
        }
        >span{
          line-height 22px
          display inline-block
          vertical-align top
          margin-left:6px;
        }
      }
    }
    .picture-component{
      text-align:left;
      background:#fff;
      padding-left:1.5rem;
      padding-bottom:1rem;
      border-bottom:1px solid #eee;
      .picture-component-btn{
        border: 1px solid #eee;
        line-height:70px;
        font-size:60px;
        color:#ddd;
        width:70px;
        height:70px;
        background:#fff;
        border:1px dashed #ccc;
        box-shadow none
      }
      .hasChoicedImgList{
        list-style:none;
        display inline-block
        vertical-align top
        .has-choiced-img-list-item{
          width: 70px;
          height: 70px;
          margin-right:10px;
          margin-bottom:10px;
          display inline-block
          &>img{
            width:100%;
            height:100%;
          }
        }
      }
    }
    .submit-component{
      text-align right
      padding-right:1.5rem;
      background:#fff;
      padding-top:1rem;
      padding-bottom:1rem;
      .submit-component-btn{
        border 1px solid $base-color
        color:$base-color
      }
    }
  }
}

</style>
