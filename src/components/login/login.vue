<template>
    <div class="login">
      <div class="loginContainer">
        <h2>安逸医院内部管理系统登录</h2>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        form: {
          name: '',
          password: ''
        }
      };
    },
    methods: {
      onSubmit () {
        console.log('submit!');
      }
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  .login
    .loginContainer
      max-width:400px
</style>
