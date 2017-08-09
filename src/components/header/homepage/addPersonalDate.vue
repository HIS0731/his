<template>
  <div class="addPersonalDate">
     <h1 style="text-align: center;font-size: 24px;
    margin-bottom: 25px;">建立员工信息档案表</h1>
    <el-form :data="ruleForm" label-width="100px" class="demo-ruleForm" ref="ruleForm">
      <div>
        <h3 style="margin-bottom:20px;">员工基本信息:</h3>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="联系号码" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="民族" prop="nation">
          <el-input v-model="ruleForm.nation"></el-input>
        </el-form-item>
        <el-form-item label="QQ" prop="qq">
          <el-input v-model="ruleForm.qq"></el-input>
        </el-form-item>
        <el-form-item label="紧急电话" prop="PHONE">
          <el-input v-model="ruleForm.PHONE"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="户籍" prop="registration">
          <el-input v-model="ruleForm.registration"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="ruleForm.idCard"></el-input>
        </el-form-item>
      </div>
        <el-form-item label="身高" prop="height">
          <el-input v-model="ruleForm.height"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex" class="sexx">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="政治面貌" prop="politics" style="margin-left:25px;">
          <el-input v-model="ruleForm.politics"></el-input>
        </el-form-item>
        <h3 style="margin-bottom:20px;">毕业院校情况：</h3>
        <el-form-item label="毕业学校" prop="school">
          <el-input v-model="ruleForm.school"></el-input>
        </el-form-item>
        <el-form-item label="所学专业" prop="profession">
          <el-input v-model="ruleForm.profession"></el-input>
        </el-form-item>
        <el-form-item label="毕业时间" prop="graduationTime" class="demonstration">
          <el-date-picker v-model="ruleForm.graduationTime" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <h3 style="margin-bottom:20px;">获的哪些证书:</h3>
        <el-form-item label="获得证书" prop="getCertificate">
          <el-input v-model="ruleForm.getCertificate"></el-input>
        </el-form-item>
        <el-form-item label="获取时间" prop="getTime">
          <el-date-picker v-model="ruleForm.getTime" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item label="证书编号" prop="certificateNumber">
          <el-input v-model="ruleForm.certificateNumber"></el-input>
        </el-form-item>
        <h3 style="margin-bottom:20px;">现在职位情况:</h3>
        <el-form-item label="现在职位" prop="job">
          <el-input v-model="ruleForm.job"></el-input>
        </el-form-item>
        <el-form-item label="所在科室" prop="department">
          <el-input v-model="ruleForm.department"></el-input>
        </el-form-item>
        <el-form-item label="入职时间:" prop="hiredate">
          <el-date-picker v-model="ruleForm.hiredate" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item class="center">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="offReset">重置</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        age: '',
        phone: '',
        nation: '',
        qq: '',
        PHONE: '',
        registration: '',
        email: '',
        height: '',
        sex: 2,
        politics: '',
        school: '',
        profession: '',
        graduationTime: '',
        getCertificate: '',
        getTime: '',
        certificateNumber: '',
        job: '',
        department: '',
        hiredate: ''
      }
    };
  },
  methods: {
    onSubmit () {
      console.log('您修改后的参数为：', JSON.stringify(this.ruleForm));
    },
    offReset () {
      this.ruleForm = {
        name: '',
        age: '',
        phone: '',
        nation: '',
        qq: '',
        PHONE: '',
        registration: '',
        email: '',
        height: '',
        sex: 2,
        politics: '',
        school: '',
        profession: '',
        graduationTime: '',
        getCertificate: '',
        getTime: '',
        certificateNumber: '',
        job: '',
        department: '',
        hiredate: ''
      };
    },
    pickerOptions: {
      disabledDate (time) {
        return time.getTime() < Date.now - 8.64e7;
      }
    }
  }
};
</script>
<style type="text/css">
  .addPersonalDate .el-input, .addPersonalDate .el-input__inner {
    width: 170px;
    display: inline-block;
  }
  .addPersonalDate .el-form-item {
    margin-bottom: 22px;
    margin-right: 50px;
    display: inline-block;
  }
  .addPersonalDate .el-radio {
    margin-left: 15px;
    padding-left: 20px;
  },
  .addPersonalDate .sexx {
    margin-right: 30px;
  }
  .addPersonalDate .center{
      padding-left: 300px;
      margin-top: 50px;
    }
</style>