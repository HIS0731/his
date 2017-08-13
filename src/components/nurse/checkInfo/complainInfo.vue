<template>
  <div class="checkInfo">
    <div class="title">
        <p>安逸医院论坛</p>
    </div>

    <el-table :data="table" height="480" border style="width: 100%">
    <el-table-column label="序号" width="100">
      <template scope="scope">{{ scope.$index }}</template>
    </el-table-column>
    <el-table-column
      prop="complainant"
      label="投诉者"
      width="180">
    </el-table-column>
    <el-table-column
      prop="type"
      label="投诉类型"
      width="180">
    </el-table-column>
    <el-table-column
      prop="date"
      label="投诉时间">
    </el-table-column>
    <el-table-column
      prop="content"
      label="投诉内容">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="联系方式">
    </el-table-column>
    <el-table-column align="center" label="操作">
      <template scope="scope">
        <el-button size="small" @click="dialogVisible = true">回复</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

    <el-dialog title="回复" :visible.sync="dialogVisible" size="tiny">
      <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import {api} from '../../../global/api.js';
  export default {
    data () {
      return {
        table: [],
        dialogVisible: false,
        textarea: ''
      };
    },
    methods: {
      handleDelete (index, row) {
        let vm = this;
        console.log('单个删除选择的row: ', index, row);
        vm.table.splice(index, 1);
        this.$message({
          message: '删除成功！',
          type: 'success'
        });
      },
      submit () {
        this.dialogVisible = false;
        console.log('回复的内容：', this.textarea);
        this.textarea = '';
        this.$message({
          message: '已回复，查看控制台！',
          type: 'success'
        });
      }
    },
    created () {
      this.$http.get(api.complainInfo).then((response) => {             // mark
        this.table = response.body.table;
        console.log(this.table);
      }, response => {
        // error callback
        this.$message({
          message: '数据请求失败',
          type: 'error'
        });
      });
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  .checkInfo .title
    p
      font-size:24px
      text-align:center
      margin-bottom:50px
</style>