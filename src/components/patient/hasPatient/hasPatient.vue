<template>
  <div>
    <el-button @click="getTabelData">显示患者列表</el-button><br><br><br>
    <div class="filter-container">
      <el-input v-model="input" placeholder="标题" style="width:195px;"></el-input>
      <el-select v-model="select" placeholder="类型" style="width:150px;">
        <el-option label="类型一" value="1"></el-option>
        <el-option label="类型二" value="2"></el-option>
        <el-option label="类型三" value="3"></el-option>
      </el-select>
      <el-button type="primary" icon="search">搜索</el-button>
      <el-button type="primary" icon="edit" @click="handleCreate">添加</el-button>
      <el-button type="primary" icon="delete" @click="handleDelAll">批量删除</el-button>
      <el-button type="primary"><i class="el-icon-document el-icon--left"></i>导出</el-button>
    </div><br><br>
    <el-table :data="tableData" border style="width:100%;" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="65"></el-table-column>
      <el-table-column align="center" label='序号' width="100">
        <template scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="日期" width="150" prop="date"></el-table-column>
      <el-table-column label="名字" width="150" prop="name"></el-table-column>
      <el-table-column label="性别" width="150" prop="sex"></el-table-column>
      <el-table-column label="地址" width="250" prop="address"></el-table-column>
      <el-table-column label="联系号码" width="150" prop="phone"></el-table-column>
      <el-table-column label="年龄" width="150" prop="age"></el-table-column>
      <el-table-column label="主治医生" width="150" prop="doctor"></el-table-column>
     <el-table-column label="操作" fixed="right" width="150">
      <template scope="scope">
        <el-button @click="handleClick(scope.$index, scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
     </el-table-column>
    </el-table>
    <!-- 添加表单 -->
    <el-dialog title="表单新增" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="日期">
          <el-input v-model="temp.date"></el-input>
        </el-form-item>
        <el-form-item label="名字">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="temp.sex"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="temp.address"></el-input>
        </el-form-item>
        <el-form-item label="联系号码">
          <el-input v-model="temp.phone"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="temp.age"></el-input>
        </el-form-item>
        <el-form-item label="主治医生">
          <el-input v-model="temp.doctor"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCreateSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue';
export default {
  data () {
    return {
      tableData: [],
      input: '',
      select: '',
      temp: {
        date: '',
        name: '',
        sex: '',
        address: '',
        phone: '',
        age: '',
        doctor: ''
      },
      dialogFormVisible: false,
      multipleSelection: []
    };
  },
  // mounted() {
  //   var vm = this;

  //   vm.getList();
  methods: {
    handleClick (index, rows) {
      console.log(index, rows);
    },
    handleDelete (index, row) {
      var vm = this;
      console.log('单个删除选择的row：', index, '-----', row);
      vm.tableData.splice(index, 1);
    },
    handleCreate () {
      this.dialogFormVisible = true;
    },
    handleCreateSubmit () {
      var vm = this;
      console.log('新增入参：', vm.temp);
      vm.tableData
      .push(vm.temp);
      this.dialogFormVisible = false;
      this.temp = {
        date: '',
        name: '',
        sex: '',
        address: '',
        phone: '',
        age: '',
        doctor: ''
      };
    },
    handleDelAll () {
      var vm = this;
      console.log('批量删除选择的row：', vm.multipleSelection);
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    // handleDownload () {
    //   var vm = this;
    //   require.ensure([], () => {
    //     const { export_json_to_excel } = require('/vendor/Export2Excel');
    //     const tHeader = ['日期', '名字', '性别', '地址', '联系号码', '年龄', '主治医生'];
    //     const filterVal = ['date', 'name', 'sex', 'address', 'phone', 'age', 'doctor'];
    //     const tableData = vm.tableData;
    //     const data = vm.formatJson(filterVal, tableData);
    //     export_json_to_excel(tHeader, data, '导出的列表excel');
    //   });
    // },
    getTabelData () {
      let me = this;
      Vue.http.get('../../static/patient/patientList.json').then(function (response) {
        console.log(response);
        console.log('这是我们需要的json数据', response.tableData);
        me.tableData = response.data.tableData;
      }, function (response) {
        alert('请求失败了');
      });
    }
  }
};
</script>