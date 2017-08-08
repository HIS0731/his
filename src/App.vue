<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  @import "./common/stylus/icon.styl"
  #app
    width:100%
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif
    .el-menu-item>a
      display:inline-block
      height:100%
      width:100%
      color:#bfcbd9
      &.router-link-active
        color: #20a0ff
    .app-body
      .menu
        position:fixed
        z-index:9999
        height:100%
        width:230px
        transition: all 1s
        background-color:#324157
        .el-menu--dark
          background-color: transparent
        &.smallNav
          width:64px
      .content
        padding-left:60px
        .tagcontent
          padding:20px
        .HISshow
          opacity:1
          transition:all 0.5s
        .HISshow-enter,.HISshow-leave-active
          opacity:0
          transition:all 0.5s
</style>
