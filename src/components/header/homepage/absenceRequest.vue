<template>
  <div class="absenceRequest">
    <h1 style="text-align: center;font-size: 24px;
    margin-bottom: 25px;">员工请（休）假申请表</h1>
    <el-form :data="ruleForm" label-width="100px" class="demo-ruleForm" ref="ruleForm">
      <div>
        <h2 style="margin-bottom:20px;">职位部门：</h2>
        <el-form-item label="单位" prop="organization">
          <el-input v-model="ruleForm.organization"></el-input>
        </el-form-item>
        <el-form-item label="班组/科室" prop="department">
          <el-input v-model="ruleForm.group"></el-input>
        </el-form-item>
        <el-form-item label="职务/岗位" prop="jobs">
          <el-input v-model="ruleForm.group"></el-input>
        </el-form-item>
      </div>
      <div>
        <h2 style="margin-bottom:20px;">员工基本信息:</h2>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="员工编号" prop="employeeNumber">
          <el-input v-model="ruleForm.employeeNumber"></el-input>
        </el-form-item>
      </div>
      <div>
        <h2 style="margin-bottom:20px;">请（休）假类别:</h2>
        <el-checkbox-group v-model="ruleForm.category" :min="1" :max="1">
          <el-checkbox label="公假"></el-checkbox>
          <el-checkbox label="婚假"></el-checkbox>
          <el-checkbox label="丧假"></el-checkbox>
          <el-checkbox label="产假"></el-checkbox>
          <el-checkbox label="年假"></el-checkbox>
          <el-checkbox label="探亲假"></el-checkbox>
          <el-checkbox label="病假"></el-checkbox>
          <el-checkbox label="其他"></el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        <h2 style="margin:20px 0px;">请（休）假详情:</h2>
        <el-form-item label="原因" prop="reason">
          <el-input type="textarea" v-model="ruleForm.reason"></el-input>
        </el-form-item>
        <el-form-item label="请假时间" prop="absenceTime" class="demonstration">
          <el-date-picker v-model="ruleForm.absenceTime" type="daterange" placeholder="选择日期" :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="__天__时" prop="totalTime">
          <el-input v-model="ruleForm.totalTime"></el-input>
        </el-form-item>
      </div>
      <div>
        <h2 style="margin-bottom:20px;">审核意见:</h2>
        <el-form-item label="部门主管签字" prop="departmentManager">
          <el-input v-model="ruleForm.departmentManager"></el-input>
        </el-form-item>
        <el-form-item label="院长签字" prop="director">
          <el-input v-model="ruleForm.director"></el-input>
        </el-form-item>
        <span>注:     本表审核通过后请交由办公室存档</span>
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
        organization: '',
        department: '',
        jobs: '',
        name: '',
        age: '',
        employeeNumber: '',
        category: [],
        reason: '',
        absenceTime: '',
        totalTime: '',
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
        organization: '',
        group: '',
        jobs: '',
        name: '',
        age: '',
        employeeNumber: '',
        checkList: [],
        reason: '',
        absenceTime: '',
        totalTime: '',
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
.absenceRequest .el-input, .absenceRequest .el-input__inner {
  width: 170px; 
  display: inline-block;
}
.absenceRequest .el-form-item {
  margin-bottom: 22px;
  margin-right: 50px;
  display: inline-block;
}
.absenceRequest .el-checkbox, .absenceRequest .el-checkbox__input {
    cursor: pointer;
    display: inline-block;
    position: relative;
    white-space: nowrap;
    margin-left: 29px;
}
.absenceRequest .center{
  padding-left: 300px;
  margin-top: 50px;
}
</style>