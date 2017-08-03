<template>
  <div class="addTrashy">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="药品名称">
        <el-input v-model.trim="form.name"></el-input>
      </el-form-item>
      <el-form-item label="数量">
        <el-input v-model.trim.number="form.amount" type="number"></el-input>
      </el-form-item>
      <el-form-item label="确认人员">
        <el-input v-model.trim="form.handlers"></el-input>
      </el-form-item>
      <el-form-item label="原因">
        <el-input v-model.trim="form.trashy" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="进货厂家">
        <el-input v-model.trim="form.manufacturers"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button>取消</el-button>
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
          amount: '',
          handlers: '',
          trashy: '',
          manufacturers: ''
        }
      };
    },
    methods: {
      onSubmit () {
        console.log(this.form);
        // mark 实际上，应该使用post方法传数据
        this.$http.get('../static/Storage.json', this.form, {emulateJSON: true}).then(function (response) {
          this.$message({
            message: '信息添加成功',
            type: 'success'
          });
          history.go(-1);
        }, function () {
          this.$message.error('后台接口有误,修改后台接口既可！');
        });
      }
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  .addTrashy
    max-width:850px
</style>
