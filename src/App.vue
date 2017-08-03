<template>
  <div id="app">
    <header>
    </header>
    <div class="app-body">
      <div class="menu" :class="{ smallNav: isCollapse }">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo"  :collapse="isCollapse"  theme="dark">
          <el-menu-item index="1"  @click="navToggle">
            <template>
              <i :class="{ 'icon-packUp': !isCollapse ,'icon-spread': isCollapse }"></i>
              <span slot="title">收起/展开面板</span>
            </template>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="icon-nurse"></i>
              <span slot="title">护士管理系统</span>
            </template>
            <el-menu-item-group>
              <span slot="title">护士人员信息管理</span>
              <el-menu-item index="2-1"><router-link to="addNurse">增加新护士信息</router-link></el-menu-item>
              <!--（查询、删除、编辑）-->
              <el-menu-item index="2-2"><router-link to="hasNurse">已存在护士信息</router-link></el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="日常工作以及其他">
              <el-menu-item index="2-3">轮班</el-menu-item>
              <el-menu-item index="2-4">人员流动信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="icon-doctor"></i>
              <span slot="title">医生管理系统</span>
            </template>
            <el-menu-item-group>
              <span slot="title">医生人员信息管理</span>
              <el-menu-item index="3-1">增加医生信息</el-menu-item>
              <el-menu-item index="3-2">删除医生信息</el-menu-item>
              <el-menu-item index="3-3">编辑医生信息</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="日常工作以及其他">
              <el-menu-item index="3-4">轮班</el-menu-item>
              <el-menu-item index="3-5">人员流动信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="icon-checkstand"></i>
              <span slot="title">前台收银系统</span>
            </template>
            <el-menu-item-group>
              <span slot="title">挂号收银</span>
              <el-menu-item index="4-1">挂号</el-menu-item>
              <el-menu-item index="4-2">查询之前挂号信息</el-menu-item>
              <el-menu-item index="4-3">删除挂号信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="icon-pharmacy"></i>
              <span slot="title">药房系统</span>
            </template>
            <el-menu-item-group>
              <span slot="title">
                <i class="icon-chineseMedicine"></i>中药房
              </span>
              <el-menu-item index="5-1">药师判断是否合理</el-menu-item>
              <el-menu-item index="5-2">药的种类</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <span slot="title">
                <i class="icon-WesternMedicine"></i>西药房
              </span>
              <el-menu-item index="5-3">药师判断是否合理</el-menu-item>
              <el-menu-item index="5-4">药的种类</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="icon-DrugStorage"></i>
              <span slot="title">药库系统</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="6-1"><router-link to="drugStorage" @click="openFullScreen">进药</router-link></el-menu-item>
              <el-menu-item index="6-2"><router-link to="checkDrugStorage">查看药库</router-link></el-menu-item>
              <el-menu-item index="6-3"><router-link to="stockRemoval">出药</router-link></el-menu-item>
              <el-menu-item index="6-3"><router-link to="trashy">浪费的药物</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="icon-patient"></i>
              <span slot="title">患者</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="7-1">增加患者</el-menu-item>
              <el-menu-item index="7-2">编辑患者信息</el-menu-item>
              <el-menu-item index="7-3">删除患者</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="8">
            <template slot="title">
              <i class="icon-hospital"></i>
              <span slot="title">医院基本信息</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="8-1">医院基本介绍</el-menu-item>
              <el-menu-item index="8-2">医生护士概况</el-menu-item>
              <el-menu-item index="8-3">今周患者就诊数量统计</el-menu-item>
              <el-menu-item index="8-4">患者反馈</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="content" @mouseover="isCollapse=true">
         <v-header></v-header>
        <div class="tagcontent">
          <transition name="HISshow">
            <router-view></router-view>
          </transition>
        </div>
        <!--翻页按钮-->
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue';
  export default {
    name: 'app',
    data () {
      return {
        isCollapse: true
      };
    },
    methods: {
      navToggle () {
        this.isCollapse = !this.isCollapse;
      }
    },
    components: {
      'v-header': header
    }
  };

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
