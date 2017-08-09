<template>
    <div class="addDoctor">
      <span class="tittle">添加医生信息</span>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="addForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio class="radio" v-model="form.sex" label="man">男</el-radio>
          <el-radio class="radio" v-model="form.sex" label="woman">女</el-radio>
        </el-form-item>
        <el-form-item label="入职日期" prop="date">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="学历" prop="degree">
          <el-select v-model="form.degree" placeholder="请选择">
            <el-option label="大专" value="junior"></el-option>
            <el-option label="本科" value="undergraduate"></el-option>
            <el-option label="研究生" value="postgraduate"></el-option>
            <el-option label="博士" value="doctor"></el-option>
            <el-option label="硕士" value="master"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="form.major"></el-input>
        </el-form-item>
        <el-form-item label="职称" prop="profession">
          <el-input v-model="form.profession"></el-input>
        </el-form-item>
        <el-form-item label="科室" prop="office">
          <el-input v-model="form.office"></el-input>
        </el-form-item>
        <el-form-item class="buttonAdd">
          <el-button type="primary" @click="submitForm('form')">增 加</el-button>
          <el-button type="danger" @click="resetForm ('form')">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      data () {
        return {
          form: {
            name: '',
            sex: 'man',
            date: '',
            degree: '',
            major: '',
            profession: '',
            office: ''
          },
          // 验证规则
          rules: {
            name: [
              { required: true, message: '请输入姓名', trigger: 'blur' },
              { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            sex: [
              { required: true, message: '请选择性别', trigger: 'change' }
            ],
            date: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
            ],
            degree: [
              { required: true, message: '请选择学历', trigger: 'change' }
            ],
            major: [
              { required: true, message: '请填写专业', trigger: 'blur' }
            ],
            profession: [
              { required: true, message: '请填写职称', trigger: 'blur' }
            ],
            office: [
              { required: true, message: '请填写科室', trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        // 增加的方法
        submitForm (form) {
        // 规则验证
          this.$refs[form].validate((valid) => {
            if (valid) {
        // 提示信息
              this.$message({
                showClose: true,
                message: '添加成功！',
                type: 'success'
              });
            } else {
              this.$message({
                showClose: true,
                message: '添加失败！',
                type: 'error'
              });
              return false;
            }
          });
        },
        // 重置方法
        resetForm (form) {
          this.$refs[form].resetFields();
        }
      }
};

</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
.addDoctor .el-input
  width:384px
.addDoctor .tittle
  display:block
  text-align: center
  font-size:24px
  font-weight:600
  line-height:80px
.addDoctor .addForm
  width:470px
  margin:auto
.addDoctor .addForm .buttonAdd
  text-align: center;
</style>