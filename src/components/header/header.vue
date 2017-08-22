<template>
    <header class="header">
      <el-dropdown>
        <el-button>
          <div class="wapper">
            <span>{{easeHis}}</span>
            <img id="userPic"src="//2.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?s=132&d=wavatar" alt="user" height="40">
            <i class="el-icon-caret-bottom"></i>
          </div>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <router-link to="home"><el-dropdown-item>首页</el-dropdown-item></router-link>
          <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>
              <span class="el-dropdown-link" @click="personalShow">个人主页<i class="el-icon-caret-bottom el-icon--right"></i></span>
            </el-dropdown-item>
            <el-dropdown-item :class="{ show: isShow }" class="personalDropdown">
              <el-dropdown-item><router-link to="addPersonalDate">新建个人档案</router-link></el-dropdown-item>
              <el-dropdown-item><router-link to="absenceRequest">申请休假</router-link></el-dropdown-item>
              <el-dropdown-item><router-link to="departure">申请离职</router-link></el-dropdown-item>
              <el-dropdown-item><router-link to="hasComplaints">查看投诉信息</router-link></el-dropdown-item>
            </el-dropdown-item>
          <a @click="userLog"><el-dropdown-item>退出登录</el-dropdown-item></a>
        </el-dropdown-menu>
      </el-dropdown>
    </header>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex';
  // 引入vuex中各个模块的actions
  export default {
    data () {
      return {
        isShow: false
      };
    },
    // 获取vuex数据
    computed: mapGetters([
      'easeHis'
    ]),
    created: function () {
      // 路由拦截
      if (!sessionStorage.getItem('easeHis')) {
        this.$router.push({path: 'login'});
      }
    },
    methods: {
      // 本组件注册VUEX输出的actions中的setSignOut方法
      ...mapActions({setUserInfo: 'setSignOut'}),
      // 退出登录
      userLog () {
        this.setUserInfo(this.form);
        this.$router.push({path: 'login'});
      },
      // 个人主页下拉菜单切换
      personalShow () {
        this.isShow = !this.isShow;
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
    .el-dropdown-menu__item.personalDropdown  
      overflow:hidden
      height:20px
      .isShow
        height:60px
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
    .el-dropdown-menu__item:not(.is-disabled):hover
      background-color:#fff
    .el-dropdown-menu__item
       a:hover,.el-icon--right:hover
        color:#20a0ff
      .el-icon--right
        font-size:12px
</style>
