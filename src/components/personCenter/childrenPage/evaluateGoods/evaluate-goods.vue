<template>
  <div class="page">
      <mt-header title="评价" class='page-header'>
          <a @click='goBack' slot="left">
            <img class='img-item' src="./../../../../assets/img/back.png" alt="">
          </a>
      </mt-header>
      <div class='main-content'>
        <div class='goods-msg'>
          <div class='goods-msg-img'>
            <img class='img-item' src="./../../../../assets/img/goods/4.png" alt="">
          </div>
          <div class='goods-msg-msg'>
            <h3>文玩铜锈貔貅摆件
              <span class='goods-price'>￥59</span>
            </h3>
            <p>规格：铜制小貔貅
              <span class='goods-num'>x1</span>
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
        <mt-field placeholder="请填写评价内容" style='padding-left:0.6rem;' type="textarea" rows="4" v-model="introduction"></mt-field>
        <!-- 选择照 -->
        <div class='picture-component'>
          <mt-button class='picture-component-btn' @click.native='addNewPicture' type='default' size='small'>
            +
          </mt-button>
        </div>
        <div class='submit-component'>
          <mt-button class='submit-component-btn' @click.native='submitTheEvaluate' type='default' size='small'>
            提交
          </mt-button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'EvaluateGoods',
  data () {
    return {
      gradeVal: 1,
      introduction: ''
    }
  },
  created () {},
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    changeTheGrade (index) {
      this.gradeVal = index
    },
    addNewPicture () {
      console.log('打开图片库')
    },
    submitTheEvaluate () {
      console.log('提交评论')
    }
  },
  computed: {
    goodsId () {
      return this.$router.params.goodsId
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
