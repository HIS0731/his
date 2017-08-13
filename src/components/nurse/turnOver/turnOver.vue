<template>
  <div class="turnOver">
    <div class="title">
      <p>安逸医院护士职工人员流动记录表</p>
    </div>
    <div class="replyBtn">
      <el-button size="big" type="primary" @click="handleCreate">添加离职人员信息</el-button>
    </div>
    <el-table
    :data="table"
    style="width: 100%">
    <el-table-column type="expand">
      <template scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="姓名:">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="年龄:">
            <span>{{ props.row.age }}</span>
          </el-form-item>
          <el-form-item label="性别:">
            <span>{{ props.row.sex }}</span>
          </el-form-item>
           <el-form-item label="籍贯:">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="工龄:">
            <span>{{ props.row.seniority }}</span>
          </el-form-item>
          <el-form-item label="科室:">
            <span>{{ props.row.department }}</span>
          </el-form-item> 
          <el-form-item label="员工编号:">
            <span>{{ props.row.number }}</span>
          </el-form-item>                  
          <el-form-item label="入职时间:">
            <span>{{ props.row.hiredate }}</span>
          </el-form-item>
          <el-form-item label="离职时间:">
            <span>{{ props.row.resignation_time }}</span>
          </el-form-item>          
          <el-form-item label="离职原因:">
            <span>{{ props.row.resignation_reason }}</span>
          </el-form-item>
          <el-form-item label="职称:">
            <span>{{ props.row.position }}</span>
          </el-form-item>
          <el-form-item label="处理人:">
            <span>{{ props.row.processor }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="序号">
      <template scope="scope">{{ scope.$index }}</template>
    </el-table-column>
    <el-table-column label="姓名" prop="name"></el-table-column>
    <el-table-column label="员工编号" prop="number"></el-table-column>
    <el-table-column label="科室" prop="department"></el-table-column>
    <el-table-column label="处理人" prop="processor"></el-table-column>
    <el-table-column align="center" label="操作">
      <template scope="scope">
        <!-- <el-button size="small" type="primary" @click="handleCreate">添加</el-button> -->
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="添加记录人员流动信息" :visible.sync="dialogFormVisible">
        <el-form class="small-space" :model="form" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="科室">
            <el-input v-model="form.department"></el-input>
          </el-form-item>
          <el-form-item label="籍贯">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="工龄">
            <el-input v-model="form.seniority"></el-input>
          </el-form-item>
          <el-form-item label="员工编号">
            <el-input v-model="form.number"></el-input>
          </el-form-item>
          <el-form-item label="职称">
            <el-input v-model="form.position"></el-input>
          </el-form-item>
           <el-form-item label="入职时间">
            <el-input v-model="form.hiredate"></el-input>
          </el-form-item>
           <el-form-item label="离职时间">
            <el-input v-model="form.resignation_time"></el-input>
          </el-form-item>
           <el-form-item label="离职原因">
            <el-input v-model="form.resignation_reason"></el-input>
          </el-form-item>
          <el-form-item label="处理人">
            <el-input v-model="form.processor"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>          
          <el-button type="primary" @click="handleCreateSubmit">确 定</el-button>
          <el-button type="primary" @click="resetForm('form')">重置</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import {api} from '../../../global/api.js';
  export default {
    data () {
      return {
        table: [],
        dialogFormVisible: false,
        form: {
          name: '',
          age: '',
          sex: '',
          department: '',
          address: '',
          seniority: '',
          number: '',
          position: '',
          processor: '',
          hiredate: '',
          resignation_time: '',
          resignation_reason: ''
        }
      };
    },
    methods: {
      handleCreate () {
        this.dialogFormVisible = true;
        this.formClear();
      },
      handleCreateSubmit () {
        let vm = this;
        console.log('修改后的信息：', vm.form, vm.table);
        vm.table.push(vm.form);
        this.dialogFormVisible = false;
        this.$message({
          message: '添加成功！',
          type: 'success'
        });
      },
      formClear () {
        this.form = {
          name: '',
          age: '',
          sex: '',
          department: '',
          address: '',
          seniority: '',
          number: '',
          position: '',
          processor: '',
          hiredate: '',
          resignation_time: '',
          resignation_reason: ''
        };
      },
      resetForm () {
        this.form = {
          name: '',
          age: '',
          sex: '',
          department: '',
          address: '',
          seniority: '',
          number: '',
          position: '',
          processor: '',
          hiredate: '',
          resignation_time: '',
          resignation_reason: ''
        };
      },
      handleDelete (index, row) {
        let vm = this;
        console.log('单个删除选择的row: ', index, '-----', row);
        vm.table.splice(index, 1);
        this.$message({
          message: '删除成功！',
          type: 'success'
        });
      }
    },
    created () {
      this.$http.get(api.turnOver).then((response) => {             // mark
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
  .turnOver .title
    p
      font-size:24px
      text-align:center
      margin-bottom:50px
  .demo-table-expand
    font-size:0
  .demo-table-expand label
    width:90px
    color:#99a9bf
  .demo-table-expand .el-form-item
    margin-right:0
    margin-bottom:0
    width: 50%
  .turnOver .replyBtn
    float:right
    padding-bottom:80px
</style>