<template>
  <div class="departure">
    <h1 style="text-align: center;font-size: 24px;
    margin-bottom: 25px;">员工离职申请表</h1>
    <el-form :data="ruleForm" label-width="100px" class="demo-ruleForm" ref="ruleForm">
      <h2 style="margin-bottom:20px;">员工基本信息:</h2>
      <div>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="班组/科室" prop="department">
          <el-input v-model="ruleForm.department"></el-input>
        </el-form-item>
        <el-form-item label="职务/岗位" prop="jobs">
          <el-input v-model="ruleForm.jobs"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="入职日期" prop="hiredate" class="demonstration">
          <el-date-picker v-model="ruleForm.hiredate" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item label="离职日期" prop="leaveDate">
          <el-date-picker v-model="ruleForm.leaveDate" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item label="学历" prop="education">
          <el-input v-model="ruleForm.education"></el-input>
        </el-form-item>
      </div>
      <h2 style="margin-bottom:20px;">离职类别</h2>
      <div>
        <el-checkbox-group v-model="ruleForm.category" :min="1" :max="1">
          <el-checkbox label="辞职"></el-checkbox>
          <el-checkbox label="辞退"></el-checkbox>
          <el-checkbox label="除名"></el-checkbox>
          <el-checkbox label="自动离职"></el-checkbox>
          <el-checkbox label="合同到期"></el-checkbox>
          <el-checkbox label="其他"></el-checkbox>
        </el-checkbox-group>
      </div>
      <h2 style="margin-bottom:20px;">离职情况</h2>
      <div>
        <el-form-item label="申请离职日期" prop="applicationTime" class="demonstration">
          <el-date-picker v-model="ruleForm.applicationTime" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item label="核准离职日期" prop="approvedTime">
          <el-date-picker v-model="ruleForm.approvedTime" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item label="离职原因" prop="reason">
          <el-input v-model="ruleForm.reason"></el-input>
        </el-form-item>
      </div>
      <span style="margin-bottom:20px;">
        本人自愿与安逸医院解除劳动关系，自签字之日起任何行为与安逸医院无关，并自我承当责任。  
        签名:______________________
      </span>
      <div>
        <h2 style="margin:20px 0px;">审批情况:</h2>
        <el-form-item label="部门主管签字" prop="departmentManager">
          <el-input v-model="ruleForm.departmentManager"></el-input>
        </el-form-item>
        <el-form-item label="院长签字" prop="director">
          <el-input v-model="ruleForm.director"></el-input>
        </el-form-item>
        <span>注:1.本表一人事管理审批权限逐级核准</span>
      </div>
      <div>
        <el-form-item class="center">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          <el-button @click="offReset">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        department: '',
        jobs: '',
        hiredate: '',
        leaveDate: '',
        organization: '',
        education: '',
        category: [],
        departments: '',
        applicationTime: '',
        approvedTime: '',
        reason: '',
        departmentManager: '',
        director: ''
      }
    };
  },
  methods: {
    onSubmit () {
      // let me = this;
      // this.$http.post(api.addPatient).then(function (response) {
      //   console.log('这是我们需要的json数据', response.ruleForm);
      //   me.ruleForm = me.data.ruleForm;
      // }, function (response) {
      //   alert('请求失败了');
      // });
      console.log('您修改后的参数为：', JSON.stringify(this.ruleForm));
    },
    offReset () {
      this.ruleForm = {
        name: '',
        department: '',
        jobs: '',
        hiredate: '',
        leaveDate: '',
        organization: '',
        education: '',
        category: '',
        departments: '',
        applicationTime: '',
        approvedTime: '',
        reason: '',
        departmentManager: '',
        director: ''
      };
    },
    pickerOptions: {
      disabledDate (time) {
        return time.getTime() < Date.now - 8.64e7;
      }
    }

    // resetForm (formName) {
    //   this.$refs[formName].resetFields();
    // }
  }
};
</script>
<style type="text/css">
.departure .el-input, .departure .el-input__inner {
  width: 170px; 
  display: inline-block;
}
.departure .el-form-item {
  margin-bottom: 22px;
  margin-right: 50px;
  display: inline-block;
}
.departure .el-checkbox, .departure .el-checkbox__input {
    cursor: pointer;
    display: inline-block;
    position: relative;
    white-space: nowrap;
    margin-left: 29px;
}
.departure .center{
  padding-left: 300px;
  margin-top: 50px;
}
</style>