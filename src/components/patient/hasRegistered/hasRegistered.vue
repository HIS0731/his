<template>
  <div>
    <h3 style="margin-bottom:20px;">以下是已经挂号的资料</h3>
    <div style="margin:20px 0px;">
      <el-input v-model="input" placeholder="标题" style="width:195px;"></el-input>
      <el-select v-model="select" placeholder="类型" style="width:150px;">
        <el-option label="类型一" value="1"></el-option>
        <el-option label="类型二" value="2"></el-option>
        <el-option label="类型三" value="3"></el-option>
      </el-select>
      <el-button type="primary" icon="search">搜索</el-button>
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
export default {
  data () {
    return {
      tableData: []
    };
  },
  created () {
    let me = this;
    Vue.http.get('../../static/patientList.json').then(function (response) {
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
  //     Vue.http.get('../../static/patientList.json').then(function (response) {
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