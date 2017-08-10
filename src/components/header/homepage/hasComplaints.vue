<template>
  <div>
    <h3 style="margin-bottom:20px;">以下是医院被投诉的资料</h3>
    <el-table :data="tableData" border style="width:100%;">
      <el-table-column fixed label="投诉日期" prop="date" width="150"></el-table-column>
      <el-table-column label="投诉人电话
" prop="phone" width="150"></el-table-column>
      <el-table-column label="投诉人姓名" prop="name" width="120"></el-table-column>
      <el-table-column label="投诉内容" prop="content" width="350"></el-table-column>
      <el-table-column label="涉及科室/人员
" prop="department" width="150"></el-table-column>
      <el-table-column label="投诉方式" prop="way" width="100"></el-table-column>
      <el-table-column label="处理进度" prop="Processing" width="200"></el-table-column>
      <el-table-column label="最终处理结果" fixed="right" prop="results" width="250"></el-table-column>
    </el-table>
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue';
import {api} from '../../../global/api.js';
export default {
  data () {
    return {
      tableData: []
    };
  },
  created () {
    let me = this;
    Vue.http.get(api.complaints).then(function (response) {
      console.log(response);
      console.log('这是我们需要的数据:', response.tableData);
      me.tableData = response.data.tableData;
    }, function (response) {
      alert('请求失败了');
    });
  }
  // methods: {
  //   getRegisteredData () {
  //     let me = this;
  //     Vue.http.get(api./patientList).then(function (response) {
  //       console.log(response);
  //       console.log('这是我们需要的数据:', response.tableData);
  //       me.tableData = response.data.tableData;
  //     }, function (response) {
  //       alert('请求失败了');
  //     });
  //   }
  // }
};
</script>