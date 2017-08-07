<template>
    <div class="login">
      <div class="loginContainer">
        <h2 class="title">安逸医院内部管理系统登录</h2>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item>
            <el-input v-model.trim="form.name" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item @keyup.enter.native="onSubmit">
            <el-input v-model="form.password" type="password" class="inputpsw" placeholder="密码"></el-input>
            <!--mark-->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
          </el-form-item>
        </el-form>
        <p class="tips">本系统有六个测试的用户角色为root、doctor、nurse、checkstand、pharmacist、pharmacy，
          密码为各自用户名，例如root用户的密码为root。其中最高权限是root用户</p>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        tips: '',
        form: {
          name: '',
          password: ''
        },
        user: ''
      };
    },
    methods: {
      onSubmit () {
        if (this.form.name && this.form.password) {
          this.$http.get('../static/userLogin.json').then((response) => {             // mark
            this.user = response.body.user;
          }, response => {
            // error callback
            this.$message({
              message: '数据请求失败',
              type: 'error'
            });
          });
          for (var i = 0; i < this.user.length; i++) {
            console.log(this.user[i]);
            if (this.user[i].name === this.form.name && this.user[i].password === this.form.password) {
              sessionStorage.setItem('easeHis', this.form.name);
              sessionStorage.setItem('easeHisType', this.user[i].type);
              location.reload();
            }
          }

          this.tips = '密码不正确！';
          this.$message({
            message: this.tips,
            type: 'warning'
          });
        } else {
          if (!this.form.name) {
            this.tips = '用户名不能为空！';
          } else if (!this.form.password) {
            this.tips = '密码不能为空！';
          }
          this.$message({
            message: this.tips,
            type: 'warning'
          });
        }
      }
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  .login
    .loginContainer
      max-width:500px
      margin: 90px auto 0 auto
      background-color:#48576a
      padding:25px 30px
      border-radius: 20px
      .title
        font-size: 30px
        text-align: center
        line-height: 80px
        height: 80px
        color: #fff
    .el-form-item__content
      margin-right: 80px
    .el-button
      width:100%
    .tips
      color:#fff
      font-size:12px
      text-indent:2em
</style>
