<template>
  <div class="registerManage">
    <!-- 搜索条件 -->
    <div class="filter-container">
      <el-input placeholder="患者姓名">
      </el-input>

      <el-button type="primary" icon="search">搜索</el-button>

      <el-button type="primary" icon="document" @click="handleDownload">导出</el-button>
    </div>
    <!-- 患者挂号信息列表 -->
    <el-table :data="patients" border style="width: 100%; text-align:left">
      <el-table-column prop="number" label="挂号序号"></el-table-column>
      <el-table-column prop="name" label="患者姓名"></el-table-column>
      <el-table-column prop="" label="挂号凭证"></el-table-column>
      <el-table-column prop="" label="凭证号"></el-table-column>
      <el-table-column prop="disease" label="科室"></el-table-column>
      <el-table-column prop="doctor" label="就诊医生"></el-table-column>
      <el-table-column prop="date" label="就诊时间"></el-table-column>
      <el-table-column prop="" label="候诊号"></el-table-column>
      <el-table-column prop="" label="挂号费"></el-table-column>
      <el-table-column label="操作" width="180">
        <template scope="scope">
          <el-button type="primary" class="btn" @click="checkDetail(scope.$index)">查看</el-button>
          <el-button type="primary" class="btn" @click="deleteDetail(scope.$index,patients)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 点击查看患者挂号详细信息 -->
    <el-dialog title="患者挂号信息" :visible.sync="dialogVisible" :before-close="handleClose">
      <ul class="patientsdetail">
        <li><h5>挂号序号：</h5><span>{{patientsdetails.number}}</span></li>
        <li><h5>患者姓名:</h5><span>{{patientsdetails.name}}</span></li>
        <li><h5>挂号凭证:</h5><span></span></li>
        <li><h5>凭证号：</h5><span></span></li>
        <li><h5>性别:</h5><span>{{patientsdetails.sex}}</span></li>
        <li><h5>年龄:</h5><span>{{patientsdetails.age}}</span></li>
        <li><h5>家庭地址:</h5><span>{{patientsdetails.position}}</span></li>
        <li><h5>科室:</h5><span>{{patientsdetails.disease}}</span></li>
        <li><h5>就诊医生:</h5><span>{{patientsdetails.doctor}}</span></li>
        <li><h5>就诊时间:</h5><span>{{patientsdetails.date}}</span></li>
        <li><h5>候诊号:</h5><span></span></li>
        <li><h5>挂号费:</h5><span></span></li>
      </ul>
      <h5 slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </h5>
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        patients: [],
        dialogVisible: false,
        patientsdetails: ''
      };
    },
    mounted () {
      let registerThis = this;

      registerThis.$http.get('../../static/patientList.json').then((response) => {
        // 测试语句，测试是否能获取response
        console.log(registerThis.patients, response);
        // 把json接口获取的数据赋给当前对象
        registerThis.patients = response.data.tableData;
      }, response => {
        // error callback
        alert('数据请求失败');
      });
    },
    methods: {
      // 确认是否要关闭dialog
      handleClose (done) {
        this.$confirm('确认关闭？').then(_ => {
          done();
        }).catch(_ => {});
      },
      // 查看患者信息详情
      checkDetail (index) {
        this.dialogVisible = true;
        this.patientsdetails = this.patients[index];
      },
      deleteDetail (index, rows) {
        rows.splice(index, 1);
      },
      // 把数据表格导出到excel表
      handleDownload () {
        var vm = this;

        require.ensure([], () => {
          const { export_json_to_excel } = require('vendor/Export2Excel');
          const tHeader = ['挂号序号', '患者姓名', '挂号凭证', '凭证号', '科室', '就诊医生', '就诊时间', '候诊号', '挂号费'];
          const filterVal = ['number', 'name', '', '', 'disease', 'doctor', 'date', '', ''];
          const patients = vm.patients;
          const data = vm.formatJson(filterVal, patients);
          export_json_to_excel(tHeader, data, '患者挂号信息列表excel');
        });
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
      }
    }
};
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  .registerManage .filter-container
    padding-bottom:30px
    .el-input
      width: 400px
  .registerManage .el-table-column
    font-weight: bold
  .registerManage .patientsdetail
    h5
      display: inline-block
      width: 100px
      line-height: 30px
      font-weight: bold
  .registerManage .btn
      display: inline-block
</style>
