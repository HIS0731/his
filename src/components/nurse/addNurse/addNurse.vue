<template>
    <div class="nurse_form">
      <!-- 增加新护士信息 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" style="width:500px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item label="职称" prop="position">
        <el-input v-model="ruleForm.position"></el-input>
      </el-form-item>
      <el-form-item label="专业" prop="profession">
        <el-input v-model="ruleForm.profession"></el-input>
      </el-form-item>
      <el-form-item label="科室" prop="department">
        <el-select v-model="ruleForm.department" placeholder="请选择科室">
            <el-option label="妇科" value="women"></el-option>
            <el-option label="儿科" value="child"></el-option>
            <el-option label="助产科" value="birth"></el-option>
            <el-option label="急诊科" value="emergency"></el-option>
            <el-option label="精神科" value="spirit"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学历" prop="education">
        <el-select v-model="ruleForm.education" placeholder="请选择学历">
            <el-option label="中专学历" value="technical"></el-option>
            <el-option label="专科学历" value="junior"></el-option>
            <el-option label="本科学历" value="undergraduate"></el-option>
            <el-option label="硕士学位" value="master"></el-option>
            <el-option label="博士学位" value="doctor"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入职时间" required>
        <el-col :span="11">
          <el-form-item prop="date">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>     
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
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
        address: '',
        age: '',
        position: '',
        profession: '',
        department: '',
        education: '',
        sex: '',
        date: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 2, max: 5, message: '长度在3到5个字符', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '请输入地址', trigger: 'blur'}
        ],
        age: [
          {required: true, message: '请输入年龄', trigger: 'blur'}
          // {type: 'number', message: '年龄必须为数字值'}
        ],
        position: [
          {required: true, message: '请输入职称', trigger: 'blur'}
        ],
        profession: [
          {required: true, message: '请输入专业', trigger: 'blur'}
        ],
        department: [
          {required: true, message: '请选择所在的科室', trigger: 'change'}
        ],
        education: [
          {required: true, message: '请选择学历', trigger: 'change'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
        date: [
          {type: 'date', required: true, message: '请选择入职时间', trigger: 'change'}
        ]
      }
    };
  },
  methods: {
    // 提交
    submitForm (formName) {
      this.timeFormat();
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: '提交成功！',
            type: 'success'
          });
          console.log(this.ruleForm);
        } else {
          this.$message.error('提交失败，请重新填写！');
          return false;
        }
      });
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    timeFormat () {
      let oldDate = this.ruleForm.date;
      let year = new Date(oldDate).getFullYear();
      let month = new Date(oldDate).getMonth() + 1;
      let day = new Date(oldDate).getDate();
      let dateFormat = year + '-' + month + '-' + day;
      console.log(dateFormat);
    }
  }
};
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
</style>
