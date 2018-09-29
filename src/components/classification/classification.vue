<template>
  <div class="classification-page">
    <header class='base-header'>
        <div class='img-content'>
            <img src="../../assets/img/saoyisao.png" class='img-item' alt="">
        </div>
        <div class='search-content'>
            <img class='search-content-img' src='../../assets/img/search.png' alt=''>
            <input type="text" class='search-content-input' placeholder="搜索...">
        </div>
        <div class='img-content'>
            <img src="../../assets/img/zixun.png" class='img-item' alt="">
        </div>
    </header>
    <!-- 左边的分类导航部分 一级分类 -->
    <aside class='left-nav'>
      <ul class='left-nav-ul'>
        <li :class='{"active":nowActiveNav==0}'  @click='changeTheActiveNav(0)'>
          <span>推荐分类</span>
        </li>
        <li v-for='item in 10' :class='{"active":nowActiveNav==item}'  @click='changeTheActiveNav(item)' :key='item'>
          <span>商品</span>
        </li>
      </ul>
    </aside>
    <!-- 二级分类页面 -->
    <div class='second-level' id='secondLevel' v-if='showSecondLevelNav'>
      <ul class='second-level-ul'>
        <li v-for='item in 10' :key='item'>
          <span>分类{{item}}</span>
        </li>
      </ul>
    </div>
    <!-- 这里设置一个遮罩层  当没有选择二级分类的时候 关掉二级分类的部分 -->
    <div class='second-level-shade' v-if='showSecondLevelNav' @click='showSecondLevelNav=false'></div>
    <!-- 右边的主要内容页面 -->
    <section class='right-content'>
      <div class='right-content-header-img'>
        <img class='img-item' src="./../../assets/img/goods/1.png" alt="">
      </div>
      <div class='classify-item'>
        <header class='classify-item-title'>
          ----推荐分类----
        </header>
        <section class='classify-item-content'>
          <dl class='classify-item-content-item' @click='toGoodDetail(item)' v-for='item in 15' :key='item'>
            <dt>
              <img class='img-item' src="./../../assets/img/goods/3.png" alt="">
            </dt>
            <dd>
              二佛对坐雕刻杯
            </dd>
          </dl>
        </section>
      </div>
      <div class='show-the-last-content'>
        <h4>没有更多了~</h4>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'classification',
  data () {
    return {
      nowActiveNav: 0,
      showSecondLevelNav: false
    }
  },
  created () {},
  methods: {
    // 跳转到商品详情页面
    toGoodDetail (item) {
      this.$router.push({name: 'goodsDetail', params: {goodsId: item}})
    },
    // 切换当前显示的分类地址
    changeTheActiveNav (item) {
      this.nowActiveNav = item
      if (item !== 0) {
        this.showSecondLevelNav = true
        this.$nextTick(() => {
          if (item < 9) {
            document.getElementById('secondLevel').style.top = 40 + item * 36 + 'px'
            document.getElementById('secondLevel').style.bottom = 'auto'
          } else {
            let windowHeight = window.screen.height
            document.getElementById('secondLevel').style.bottom = windowHeight - ((item + 1) * 36 + 40) + 'px'
            document.getElementById('secondLevel').style.top = 'auto'
          }
        })
      } else {
        this.showSecondLevelNav = false
      }
    }
  }
}
</script>

<style scoped lang='stylus'>
@import './../../assets/css/base-style.styl'
.classification-page{
  height:100vh;
  // 头部搜索部分
  .base-header{
    width:100%;
    height 40px;
    position:fixed;
    top:0px;
    background:$base-color;
    box-sizing: border-box;
    padding: 5px;
    z-index:100;
    >div{
        display inline-block;
        &.img-content{
            width:30px;
            height:30px;
            position:absolute;
            left:5px;
            top:5px;
            padding:3px;
            box-sizing border-box
            &:last-child{
                right:5px;
                left: auto;
            }
        }
        &.search-content{
            width:100%;
            height:100%;
            padding:0 33px;
            box-sizing: border-box;
            position relative
            .search-content-img{
                position:absolute
                top: 8px;
                left: 43px;
                width: 14px;
                height: 14px;
            }
            .search-content-input{
                width:100%;
                height:100%;
                border: 0px;
                border-radius 5px;
                outline: none;
                padding-left:30px;
                background-color:#EDEDED;
                box-sizing: border-box;
            }
        }
    }
  }
  /* 左边导航的部分 */
  .left-nav{
    width: 90px;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    box-sizing: border-box;
    padding: 40px 0px 55px;
    background: #ececec;
    overflow: auto;
    .left-nav-ul{
      list-style none;
      padding-bottom:10px;
      >li{
        line-height:26px;
        color:#333;
        font-size:14px;
        background:#ececec;
        padding:5px 1px;
        height:36px;
        box-sizing border-box
        >span{
          width:100%;
          box-sizing border-box;
          border:3px solid transparent
          border-top:0px;
          border-bottom:0px;
          display block;
        }
        &.active{
          background: #fff;
          color: $base-color;
          font-weight: 600;
          >span{
            border-left-color:$base-color;
          }
        }
      }
    }
    /* 二级分类部分的样式 */
  }
  .second-level{
    position: fixed;
    left:90px;
    width:90px;
    max-height:100vh;
    background:#fff;
    box-sizing: border-box;
    z-index:10;
    .second-level-ul{
      list-style none;
      >li{
        line-height:26px;
        color:#333;
        font-size:14px;
        padding:5px 1px;
        height:36px;
        box-sizing border-box
      }
    }
  }
  // 二级页面的遮罩层
  .second-level-shade{
    position: fixed;
    left:90px;
    width:100%;
    height:100%;
    max-height:100vh;
    background:#fff;
    box-sizing: border-box;
    background:rgba(0,0,0,0.2);
    z-index:5;
  }
  /*右边主要内容的部分*/
  .right-content{
    width:100%;
    box-sizing border-box
    padding:9px;
    padding-left:90px+@padding;
    padding-bottom:50px+@padding;
    background:#fff;
    .right-content-header-img{
      width:100%;
      height:16vh;
    }
    .classify-item{
      .classify-item-title{
        font-size: 14px;
        color: #999;
        line-height: 24px;
        margin-top: 10px;
      }
      .classify-item-content{
        display flex;
        flex-wrap:wrap;
        justify-content:space-between;
        width:100%;

        .classify-item-content-item{
          width:31%;
          margin-top:2vh;
          >dt{
            height: 7rem;
          }
          >dd{
            font-size: 12px;
            line-height 16px;
            color: $base-undertint-font-color;
            text-align: left;
            margin-top:6px;
          }
        }
      }
    }
    .show-the-last-content{
      margin-top:20px;
      margin-bottom:20px;
    }
  }
}

</style>
