<template>
  <div class="trashyDrug">
    <el-popover ref="popover5" placement="top" width="160" v-model="tipsVisible">
      <p>确定全部删除吗？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="deleteAll(false)">取消</el-button>
        <el-button type="primary" size="mini" @click="deleteAll(true)">确定</el-button>
      </div>
    </el-popover>
    <div class="headerBt">
      <el-button size="small"><router-link to="addTrashy">添加消耗信息</router-link></el-button>
      <el-button size="small" type="danger"  v-popover:popover5>删除全部</el-button>
    </div>
    <el-table :data="trashyDrug">
      <el-table-column prop="name" label="药品名称"></el-table-column>
      <el-table-column prop="amount" label="数量"></el-table-column>
      <el-table-column prop="handlers" label="经手人员"></el-table-column>
      <el-table-column prop="trashy" label="原因"></el-table-column>
      <el-table-column prop="manufacturers" label="厂家"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑消耗药品信息" :visible.sync="dialogFormVisible">
      <el-form :model="editForm">
        <el-form-item label="药品名称">
          <el-input v-model.trim="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model.trim.number="editForm.amount" type="number"></el-input>
        </el-form-item>
        <el-form-item label="确认人员">
          <el-input v-model.trim="editForm.handlers"></el-input>
        </el-form-item>
        <el-form-item label="原因">
          <el-input v-model.trim="editForm.trashy"></el-input>
        </el-form-item>
        <el-form-item label="进货厂家">
          <el-input v-model.trim="editForm.manufacturers"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toEditTrashy">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        trashyDrug: [],
        tipsVisible: false,
        dialogFormVisible: false,
        editIndex: '',
        editForm: {
          id: '',
          name: '',
          manufacturers: '',
          amount: '',
          handlers: '',
          trashy: ''
        }
      };
    },
    created () {
      // mark
      this.$http.get('../static/trashy.json').then((response) => {             // mark
        this.trashyDrug = response.body.trashyDrug;
        console.log(this.trashyDrug);
      }, response => {
        // error callback
        this.$message('数据请求失败');
      });
    },
    methods: {
      handleEdit (index, row) {
        this.editIndex = index;
        this.editForm = this.trashyDrug[index];
        this.dialogFormVisible = true;
      },
      handleDelete (index, row) {
        console.log(index, row);
        // mark 实际上，应该使用post方法传数据
        this.$http.get('../static/Storage.json', index, {emulateJSON: true}).then(function (response) {
          this.trashyDrug.splice(index, 1);
        }, function () {
          this.$message.error('后台接口有误,修改后台接口既可！');
        });
      },
      deleteAll (toDelete) {
        this.tipsVisible = false;
        if (toDelete) {
          this.$message('删除所有');
          // mark 实际上，应该使用post方法传数据
          this.$http.get('../static/trashy.json', {emulateJSON: true}).then(function (response) {
            this.trashyDrug = [];
          }, function () {
            this.$message.error('后台接口有误,修改后台接口既可！');
          });
        }
      },
      toEditTrashy () {
        // mark 实际上，应该使用post方法传数据
        this.$http.get('../static/trashy.json', this.form, {emulateJSON: true}).then(function (response) {
          this.$message({
            message: '编辑消耗药品信息成功',
            type: 'success'
          });
          this.trashyDrug[this.editIndex] = this.editForm;
          this.dialogFormVisible = false;
        }, function () {
          this.$message.error('后台接口有误,修改后台接口既可！');
        });
      }
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  .trashyDrug
    .headerBt
      margin-bottom:20px
</style>
