<template>
  <div class="register">
    <p class="reguster-title">挂 号 办 理</p>
    <el-form :model="register" :rules="rules" ref="registerForm" label-width="100px" class="register-ruleForm">
      <el-form-item label="患者姓名" prop="patientName" class="register-name">
        <el-input v-model="register.patientName"></el-input>
      </el-form-item>
      <el-form-item label="办理凭证" prop="certificate_value" class="register-certificate">
        <el-select v-model="register.certificate_value" placeholder="请选择办理凭证">
          <el-option label="身份证" value="idCard"></el-option>
          <el-option label="健康证" value="healthCard"></el-option>
        </el-select>
      </el-form-item>
      <p class="register-isshow" v-if="register.certificate_value === 'idCard'">
        <el-form-item label="身份证号" prop="cardNumber" class="register-name">
          <el-input v-model="register.cardNumber"></el-input>
        </el-form-item>
      </p>
      <p class="register-isshow" v-else-if="register.certificate_value === 'healthCard'">
        <el-form-item label="健康证号" prop="cardNumber" class="register-name">
          <el-input v-model="register.cardNumber"></el-input>
        </el-form-item>
      </p>
      <p v-else></p>
      <el-form-item label="科室">
        <el-select v-model="department_value" placeholder="请选择科室">
          <el-option v-for="items in register.department" :key="items.value" :label="items.text " :value="items.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="就诊医生" prop="doctor_value" class="register-certificate">
        <el-select v-model="register.doctor_value" placeholder="请选择就诊医生">
          <el-option v-for="items in register.doctor" :key="items.id" :label="items.name " :value="items.id">
          </el-option>
        </el-select>
      </el-form-item>
      <p v-if="register.doctor_value">
        <el-form-item label="就诊时间：" class="register-name">
          <span>{{ visit_date }}  {{ visit_time }}</span>
        </el-form-item>
      </p>
      <p v-if="register.doctor_value">
        <el-form-item label="候诊号：" class="register-name">
          <span>待计算</span>
        </el-form-item>
      </p>
      <p v-if="register.doctor_value">
        <el-form-item label="挂号费：" class="register-name">
          <span>{{ register.expense }}元</span>
        </el-form-item>
      </p>
      <el-button type="primary" class="submitBtn" @click="submitForm('registerForm')">提交挂号</el-button>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        register: {
          patientName: '',
          certificate_value: '',
          cardNumber: '',
          department: [],
          doctor: [],
          doctor_value: '',
          visit_time: '',
          expense: '',
          visit_date: ''
        },
        department_value: '',
        rules: {
          patientName: [
            { required: true, message: '请输入患者姓名', trigger: 'blur' }
          ],
          certificate_value: [
            { required: true, message: '请选择办理凭证', trigger: 'change' }
          ],
          cardNumber: [
            { required: true, message: '请输入证件号码', trigger: 'blur' }
          ],
          department_value: [
            { required: true, message: '请至少选择一个科室', trigger: 'change' }
          ],
          doctor_value: [
            { required: true, message: '请选择医生', trigger: 'change' }
          ],
          visit_time: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    created () {
      this.visit_time = this.compute_visitTime();
      this.visit_date = new Date().toLocaleDateString();
      console.log(this.visit_date);
      let registerThis = this;
      registerThis.$http.get('../../static/department.json').then((response) => {
        // 把json接口获取的数据赋给当前对象
        this.register.department = response.data.department;
      }, response => {
        // error callback
        alert('数据请求失败');
      });
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$notify({
              message: '提交成功',
              type: 'success'
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      compute_visitTime () {
        var hour = new Date().getHours();
        var minutes = new Date().getMinutes();
        var time = '';
        if (hour < 11) {
          time = '8:00 - 11:30';
        } else if (hour === 11) {
          if (minutes < 30) {
            time = '8:00 - 11:30';
          }
        } else {
          time = '14:00 - 17:30';
        }
        return time;
      }
    },
    watch: {
      department_value: function () {
        let registerThis = this;
        registerThis.$http.get('../../static/doctor/doctor.json').then((response) => {
          // 把json接口获取的数据赋给当前对象
          console.log('dsf', this.department_value);
          for (let i = 0; i < response.data.doctorlist.length; i++) {
            if (this.department_value === response.data.doctorlist[i].officeId) {
              registerThis.register.doctor = [];
              registerThis.register.doctor.push(response.data.doctorlist[i]);
              if (response.data.doctorlist[i].isexpert === 'yes') {
                this.register.expense = 12;
              } else if (response.data.doctorlist[i].isexpert === 'no') {
                this.register.expense = 8;
              }
            } else {
              this.register.doctor_value = '';
            }
          }
        }, response => {
          // error callback
          alert('数据请求失败');
        });
      }
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  .register 
    .reguster-title
      font-weight: bold
      font-size: 28px
      width: 50%
      margin: 0 auto
      text-align: center
      padding-bottom: 40px
    .register-ruleForm
      width: 30%
      margin: 0 auto
      padding-left: 20px
      .register-name
        width: 315px
      .submitBtn
        margin-left: 30px
        
</style>
