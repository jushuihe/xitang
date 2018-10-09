<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='stylus'>
@import './assets/css/base-style.styl'

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #4a4a4a;
  font-size 1rem;
}
.search-component{
  .mint-searchbar{
      padding:1px;
      width:90vw;
      margin: 0 auto;
      .mint-searchbar-inner{
        padding:0px 4px;
      }
      .mint-searchbar-cancel{
        margin-right: 10px;
        font-size: 12px;
      }
  }
}
// 自定义的cell
.user-defined-mt-cell{
  &.mint-cell:last-child{
    background-image:none;
    .mint-cell-wrapper{
      border-bottom:none;
    }
  }
  &.mint-cell:first-child{
    background-image:none;
    .mint-cell-wrapper{
      border-top:none;
    }
  }
  .mint-cell-wrapper{
    background-image:none;
    border-bottom:1px solid #eee;
    font-size:14px;
    padding:20px 15px 20px 0px;
  }
  .mintui{
    font-family:"iconfont";
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
// 自定义模态框
.mint-msgbox{
  .mint-msgbox-btns{
    .girl-btn{
      color: red;
      border-right: none;
    }
    .boy-btn{}
  }
}

//  改变tab 里面文字选中的时候的颜色
#userinfo-tab{
  &.mint-tabbar > .mint-tab-item.is-selected{
    color: $base-color;
  }
}
//  改变所有页面的头部
.page{
  .mint-header{
    background:$base-color;
    .mint-header-button{
      width:20px;
      height:20px;
      flex: none;
    }
    .mint-header-title{
      font-size:18px;
    }
  }
}
.mint-tabbar > .mint-tab-item.is-selected{
  background:#fff;
}
</style>
