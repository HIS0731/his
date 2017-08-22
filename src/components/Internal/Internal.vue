<template>
  <div class="innnerApp">
    <div class="app-body">
    <!-- 菜单开始 -->
      <div class="menu" :class="{ smallNav: isCollapse }">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo"  :collapse="isCollapse"  theme="dark">
          <el-menu-item index="1"  @click="navToggle">
            <template>
              <i :class="{ 'icon-packUp': !isCollapse ,'icon-spread': isCollapse }"></i>
              <span slot="title">收起/展开面板</span>
            </template>
          </el-menu-item>
          <el-submenu index="2" v-if="type === '01' || type === '03'">
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
              <el-menu-item index="2-3"><router-link to="shift">轮班</router-link></el-menu-item>
              <el-menu-item index="2-5"><router-link to="turnOver">人员流动信息</router-link></el-menu-item>
              <el-menu-item index="2-6"><router-link to="complainInfo">查看投诉信息</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3" v-if="type === '01' || type === '02'">
            <template slot="title">
              <i class="icon-doctor"></i>
              <span slot="title">医生管理系统</span>
            </template>
            <el-menu-item-group>
              <span slot="title">医生人员信息管理</span>
              <el-menu-item index="3-1"><router-link to="addDoctor">增加医生信息</router-link></el-menu-item>
              <el-menu-item index="3-2"><router-link to="editDoctor">编辑医生信息</router-link></el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="日常工作以及其他">
              <el-menu-item index="3-3"><router-link to="shiftDoctor">轮班</router-link></el-menu-item>
              <el-menu-item index="3-4"><router-link to="staffFlow">人员流动信息</router-link></el-menu-item>
              <el-menu-item index="3-5"><router-link to="officeComplaints">科室投诉信息</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4" v-if="type === '01' || type === '04'">
            <template slot="title">
              <i class="icon-checkstand"></i>
              <span slot="title">前台收银系统</span>
            </template>
            <el-menu-item-group>
              <span slot="title">挂号收银</span>
              <el-menu-item index="4-1"><router-link to="register">挂号</router-link></el-menu-item>
              <el-menu-item index="4-2"><router-link to="registerManage">管理挂号信息</router-link></el-menu-item>
              <el-menu-item index="4-3"><router-link to="takecash">缴费办理</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5" v-if="type === '01' || type === '05'">
            <template slot="title">
              <i class="icon-pharmacy"></i>
              <span slot="title">药房系统</span>
            </template>
            <el-menu-item-group>
              <span slot="title">
                <i class="icon-chineseMedicine"></i>中药房
              </span>
              <el-menu-item index="5-1"><router-link to="prescriptionManageC">处理处方</router-link></el-menu-item>
              <el-menu-item index="5-2"><router-link to="drugInfosC">药品查询</router-link></el-menu-item>
              <el-menu-item index="5-3"><router-link to="drugApplyC">申请药物补给</router-link></el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <span slot="title">
                <i class="icon-WesternMedicine"></i>西药房
              </span>
              <el-menu-item index="5-4"><router-link to="prescriptionManageW">处理处方</router-link></el-menu-item>
              <el-menu-item index="5-5"><router-link to="drugInfosW">药品查询</router-link></el-menu-item>
              <el-menu-item index="5-6"><router-link to="drugApplyW">申请药物补给</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6" v-if="type === '01' || type === '06'">
            <template slot="title">
              <i class="icon-DrugStorage"></i>
              <span slot="title">药库系统</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="6-1"><router-link to="drugStorage">进药</router-link></el-menu-item>
              <el-menu-item index="6-2"><router-link to="checkDrugStorage">查看药库</router-link></el-menu-item>
              <el-menu-item index="6-3"><router-link to="stockRemoval">出药</router-link></el-menu-item>
              <el-menu-item index="6-3"><router-link to="trashy">浪费的药物</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="icon-patient"></i>
              <span slot="title">患者管理系统</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="7-1" v-if="type === '01'  || type === '04'"><router-link to="addPatient">建立患者档案</router-link></el-menu-item>
              <el-menu-item index="7-2"><router-link to="hasPatient">查看患者列表信息</router-link></el-menu-item>
              <el-menu-item index="7-3"><router-link to="hasRegistered">查看患者挂号列表信息</router-link></el-menu-item>
              <el-menu-item index="7-4" v-if="type === '01' || type === '02'"><router-link to="addHospitalized">建立住院患者档案</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="8">
            <template slot="title">
              <i class="icon-hospital"></i>
              <span slot="title">医院基本信息</span>
            </template>
            <el-menu-item-group>
              <!-- <el-menu-item index="8-1"><router-link to="hisIntroduction">医院基本介绍</router-link></el-menu-item> -->
              <el-menu-item index="8-2"><router-link to="staffIntroduction">医生护士概况</router-link></el-menu-item>
              <el-menu-item index="8-3"><router-link to="patientCount">今周患者就诊数量统计</router-link></el-menu-item>
              <el-menu-item index="8-4"><router-link to="patientFeedback">患者反馈</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
    <!-- 菜单结束 -->
      <!-- 内容显示区块 -->
      <div class="content" @mouseover="navColse">
        <!-- 右侧头部区域 -->
        <v-header></v-header>
        <div class="tagcontent">
          <transition name="HISshow">
            <router-view></router-view>
          </transition>
        </div>
    </div>
  </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import header from '../header/header.vue';
  export default {
    name: 'app',
    data () {
      return {
        isCollapse: true,
        userLogin: '',
        type: ''
      };
    },
    methods: {
      // 左侧导航打开、关闭切换
      navToggle () {
        this.isCollapse = !this.isCollapse;
      },
      // 左侧导航关闭
      navColse () {
        this.isCollapse = true;
      }
    },
    created: function () {
      // 获取用户相关信息、判断用户是否登录
      if (sessionStorage.getItem('easeHis')) {
        this.userLogin = true;
        this.type = sessionStorage.getItem('easeHisType');
        console.log(this.type);
      } else {
        this.userLogin = false;
      }
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
.innnerApp
  background-color:#fff
  min-height: 800px
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
      transition: width 0.4s
      background-color:#324157
      overflow-y: scroll
      .el-menu--dark
        background-color: transparent
      &.smallNav
        width:64px
        overflow-y: visible
        .el-menu-item
        .el-submenu__title
          span
            display:none
          .el-submenu__icon-arrow
            display:none
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
