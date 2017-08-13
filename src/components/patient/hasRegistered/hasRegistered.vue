<template>
  <div>
    <h3 style="margin-bottom:20px;">以下是已经挂号的资料</h3>
    <div style="margin:20px 0px;">
      <el-input v-model="listQuery.title" placeholder="搜索关键字" style="width:195px;"></el-input>
      <el-select v-model="listQuery.select" placeholder="类型" style="width:150px;">
        <el-option label="编号" value="1"></el-option>
        <el-option label="姓名" value="2"></el-option>
        <el-option label="日期" value="3"></el-option>
      </el-select>
      <el-button type="primary" icon="search" @click="handleSearch">搜索</el-button>
    </div>
    <el-table :data="tableData" border style="width:100%;">
      <el-table-column fixed label="日期" prop="date" width="150"></el-table-column>
      <el-table-column label="编号" prop="number" width="150"></el-table-column>
      <el-table-column label="姓名" prop="name" width="150"></el-table-column>
      <el-table-column label="年龄" prop="age" width="150"></el-table-column>
      <el-table-column label="联系号码" prop="phone" width="200"></el-table-column>
      <el-table-column label="病症" prop="symptoms" width="200"></el-table-column>
      <el-table-column label="病情分类" prop="disease" width="200"></el-table-column>
      <el-table-column label="科室位置" fixed="right" prop="position" width="250"></el-table-column>
    </el-table>
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue';
import {api} from '../../../global/api.js';
export default {
  data () {
    return {
      tableData: [],
      listQuery: {
        select: '',
        title: ''
      }
    };
  },
  created () {
    let me = this;
    Vue.http.get(api.patientList).then(function (response) {
      console.log(response);
      console.log('这是我们需要的数据:', response.tableData);
      me.tableData = response.data.tableData;
    }, function (response) {
      alert('请求失败了');
    });
  },
  methods: {
    handleSearch () {
      let me = this;
      Vue.http.get(api.patientList1, {params: this.listQuery}).then(function (response) {
        console.log(response);
        console.log('这是我们需要的json数据', response.tableData);
        // me.tableData = response.data.tableData;
        me.tableData = response.data.tableData;
      }, function (response) {
        alert('请求失败了');
      });
    }
  }
};
</script>