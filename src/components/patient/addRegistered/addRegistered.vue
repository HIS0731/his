<template>
  <div>
    <el-button @click="getRegisteredData()">查看患者挂号信息</el-button><br><br>
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
  methods: {
    getRegisteredData () {
      let me = this;
      Vue.http.get('../../static/patient/registered.json').then(function (response) {
        console.log(response);
        console.log('这是我们需要的数据:', response.tableData);
        me.tableData = response.data.tableData;
      }, function (response) {
        alert('请求失败了');
      });
    }
  }
};
</script>