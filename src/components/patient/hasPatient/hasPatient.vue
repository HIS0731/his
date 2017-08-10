<template>
  <div class="hasPatient">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="搜索关键字" style="width:195px;"></el-input>
      <el-select v-model="listQuery.select" placeholder="搜索类型" style="width:150px;">
        <el-option label="名字" value="1"></el-option>
        <el-option label="主治医生" value="2"></el-option>
        <el-option label="日期" value="3"></el-option>
      </el-select>
      <el-button type="primary" icon="search" @click="handleSearch">搜索</el-button>
      <el-button type="primary" icon="edit" @click="handleCreate">添加</el-button>
      <el-button type="primary" icon="delete" @click="handleDelAll">批量删除</el-button>
      <el-button type="primary" @click="handleDownload"><i class="el-icon-document el-icon--left"></i>导出</el-button>
    </div><br><br>
    <el-table :data="tableData" border style="width:100%;" @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column align="center" label='序号'>
        <template scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="日期" prop="date"></el-table-column>
      <el-table-column label="名字" prop="name"></el-table-column>
      <el-table-column label="性别" prop="sex"></el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="主治医生" prop="doctor"></el-table-column>
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="建档日期">
              <span>{{ props.row.date }}</span>
            </el-form-item>
            <el-form-item label="患者姓名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="患者来源">
              <span>{{ props.row.region }}</span>
            </el-form-item>
            <el-form-item label="身份证号">
              <span>{{ props.row.idCard }}</span>
            </el-form-item>
            <el-form-item label="患者年龄">
              <span>{{ props.row.age }}</span>
            </el-form-item>
            <el-form-item label="联系方式">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="患者性别">
              <span>{{ props.row.sex }}</span>
            </el-form-item>
            <el-form-item label="家庭地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="联系人姓名">
              <span>{{ props.row.Name }}</span>
            </el-form-item>
            <el-form-item label="联系人号码">
              <span>{{ props.row.Phone }}</span>
            </el-form-item>
            <el-form-item label="患者与联系人关系">
              <span>{{ props.row.relation }}</span>
            </el-form-item>
            <el-form-item label="病症">
              <span>{{ props.row.symptoms }}</span>
            </el-form-item>
            <el-form-item label="病史">
              <span>{{ props.row.illHistory }}</span>
            </el-form-item>
            <el-form-item label="科室">
              <span>{{ props.row.disease }}</span>
            </el-form-item>
            <el-form-item label="主治医生">
              <span>{{ props.row.doctor }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
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
    <!-- 编辑表单 -->
    <el-dialog title="编辑表单" :visible.sync="dialogFormEditVisible">
      <el-form class="small-space" :model="Edit" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="建档日期">
          <el-input v-model="Edit.date"></el-input>
        </el-form-item>
        <el-form-item label="患者姓名">
          <el-input v-model="Edit.name"></el-input>
        </el-form-item>
        <el-form-item label="患者来源">
          <el-input v-model="Edit.region"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="Edit.idCard"></el-input>
        </el-form-item>
        <el-form-item label="患者年龄">
          <el-input v-model="Edit.age"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="Edit.phone"></el-input>
        </el-form-item>
        <el-form-item label="患者性别">
          <el-input v-model="Edit.sex"></el-input>
        </el-form-item>
        <el-form-item label="家庭地址">
          <el-input v-model="Edit.address"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名">
          <el-input v-model="Edit.Name"></el-input>
        </el-form-item>
        <el-form-item label="联系人号码">
          <el-input v-model="Edit.Phone"></el-input>
        </el-form-item>
        <el-form-item label="患者与联系人关系">
          <el-input v-model="Edit.relation"></el-input>
        </el-form-item>
        <el-form-item label="病症">
          <el-input v-model="Edit.symptoms"></el-input>
        </el-form-item>
        <el-form-item label="病史">
          <el-input v-model="Edit.illHistory"></el-input>
        </el-form-item>
        <el-form-item label="科室">
          <el-input v-model="Edit.disease"></el-input>
        </el-form-item>
        <el-form-item label="主治医生">
         <el-input v-model="Edit.doctor"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import {api} from '../../../global/api.js';
import Vue from 'vue';
export default {
  data () {
    return {
      tableData: [],
      listQuery: {
        select: '',
        title: ''
      },
      temp: {
        date: '',
        name: '',
        sex: '',
        age: '',
        doctor: ''
      },
      Edit: [],
        // date: '',
        // name: '',
        // region: '',
        // idCard: '',
        // age: '',
        // phone: '',
        // sex: '',
        // address: '',
        // Name: '',
        // Phone: '',
        // relation: '',
        // symptoms: '',
        // illHistory: '',
        // disease: '',
        // doctor: ''
      // },
      dialogFormEditVisible: false,
      dialogFormVisible: false,
      multipleSelection: []
    };
  },
  created () {
    let vm = this;
    Vue.http.get(api.patientList).then(function (response) {
      console.log(response);
      console.log('这是我们需要的json数据', response.tableData);
      // me.tableData = response.data.tableData;
      vm.tableData = response.data.tableData;
    }, function (response) {
      alert('请求失败了');
    });
  },
  methods: {
    handleSearch () {
      let me = this;
      me.$http.get(api.patientList1, {params: {name: me.listQuery.title}}).then(function (response) {
        // console.log(response);
        console.log('这是我们需要的json数据', response.data.tableData);
        // me.tableData = response.data.tableData;
        me.tableData = response.data.tableData;
        console.log(response.data.tableData);
      }, function (response) {
        alert('请求失败了');
      });
    },
    handleEdit (index, row) {
      this.dialogFormEditVisible = true;
      console.log('选择的条数：', index, '选择row属性：', row);
      this.Edit = row;// 浅拷贝
      // this.Edit = JSON.parse(JSON.stringify(row));
      // 深度拷贝
    },
    handleEditSubmit () {
      this.Edit;
      this.dialogFormEditVisible = false;
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
    handleDownload () {
      var vm = this;
      require.ensure([], () => {
        const { export_json_to_excel } = require('vendor/Export2Excel');
        const tHeader = ['日期', '名字', '性别', '地址', '联系号码', '年龄', '主治医生'];
        const filterVal = ['date', 'name', 'sex', 'address', 'phone', 'age', 'doctor'];
        const tableData = vm.tableData;
        const data = vm.formatJson(filterVal, tableData);
        export_json_to_excel(tHeader, data, '导出的列表excel');
      });
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }
};

</script>
<style type="text/css">
.hasPatient .demo-table-expand {
    font-size: 0;
  }
 .hasPatient .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
 .hasPatient .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33%;
  }
</style>