<template>
    <header class="header">
      <el-dropdown>
        <el-button>
          <div class="wapper">
            <span>{{userName}}</span>
            <img id="userPic"src="//2.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?s=132&d=wavatar" alt="user" height="40">
            <i class="el-icon-caret-bottom"></i>
          </div>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <router-link to="home"><el-dropdown-item>首页</el-dropdown-item></router-link>
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item>个人主页</el-dropdown-item>
          <a @click="userLog"><el-dropdown-item>退出登录</el-dropdown-item></a>
        </el-dropdown-menu>
      </el-dropdown>
    </header>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        userName: ''
      };
    },
    created: function () {
      this.userName = sessionStorage.getItem('easeHis');
    },
    methods: {
      userLog () {
        sessionStorage.removeItem('easeHis');
        this.userName = '请登录';
        this.$router.push({path: 'login'});
      }
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  .header
    height:50px
    background-color: #eef1f6
    line-height:  50px
    text-align: right
    padding: 0 20px
    color: #48576a
    font-size:12px
    .el-button
      border-color:transparent
      padding:0
      background: #eef1f6
      .wapper
        display:block
        cursor: pointer
        #userPic
          border-radius:50%
          vertical-align: middle
   .el-dropdown-menu
     a .el-dropdown-menu__item
      padding: 5px 20px
      color:#1f2d3d
      &::hover
       color: #48576a
</style>
