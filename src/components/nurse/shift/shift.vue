<template>
  <div class="shift">
    <div class="title">
      <p>安逸医院护士值班表</p>
    </div>
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入姓名" v-model="searchName"></el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入科室" v-model="searchDepartment"></el-input>
      <!-- <el-select clearable class="filter-item" style="width: 130px" placeholder="科室" v-model="searchDepartment">
        <el-option v-for="item in typeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
        </el-option>
      </el-select> -->
      <el-button class="filter-item" type="primary" icon="search" @click="handelSearch">搜索</el-button>
      <el-button  type="primary" icon="" @click="getAll">显示全部</el-button>
      <el-button class="filter-item" type="primary" @click="handelCreate"  icon="edit">添加</el-button>
      <el-button class="filter-item" type="primary" @click="handleDelAll"  icon="edit">全部删除</el-button>
      <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>
    </div>

    <el-table v-if="table" :data="table" border style="width: 100%" height="400">
    <el-table-column label="序号" width="120" fixed>
      <template scope="scope">{{ scope.$index }}</template>
    </el-table-column>
    <el-table-column prop="date" fixed label="日期" width="120"></el-table-column>
    <el-table-column prop="time" label="时段" width="200"></el-table-column>
    <el-table-column prop="name" label="姓名" width="150"></el-table-column>
    <el-table-column prop="sex"  label="性别" width="150"></el-table-column>
    <el-table-column prop="department" label="科室" width="150"></el-table-column>
    <el-table-column prop="phone" label="电话号码" width="150"></el-table-column>
    <el-table-column prop="attendence" label="出勤情况" width="120" v-model="listQuery.type"></el-table-column>
    <el-table-column prop="signature" label="护士长签名" width="120"></el-table-column>
    <el-table-column align="center" label="操作">
      <template scope="scope">
        <el-button size="small" @click="handleEdit(scope.$index)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
 <!--  添加信息表单 -->
  <el-dialog title="添加信息" :visible.sync="dialogFormVisible">
        <el-form class="small-space" :model="form" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-input v-model="form.date"></el-input>
          </el-form-item>
          <el-form-item label="值班时间">
            <el-select v-model="form.time" placeholder="请选择值班时间">
              <el-option label="早班 8：00-16：00" value="早班 8：00-16：00"></el-option>
              <el-option label="白班 8：00-17：00" value="白班 8：00-17：00"></el-option>
              <el-option label="小夜 16：00-24：00" value="小夜 16：00-24：00"></el-option>
              <el-option label="大夜 24：00-8：00" value="大夜 24：00-8：00"></el-option>
            </el-select>
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
          <el-form-item label="电话号码">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="负责人">
            <el-input v-model="form.signature"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>          
          <el-button type="primary" @click="handleCreateSubmit">确 定</el-button>
          <el-button type="primary" @click="resetForm('form')">重置</el-button>
        </div>
      </el-dialog>
      <!-- 编辑信息表单 -->
      <el-dialog title="修改值班信息" :visible.sync="dialogFormEditVisible">
        <el-form class="small-space" :model="form" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
          <el-form-item label="姓名">
            <el-input v-model="tableEdit.name" placeholder="必填"></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-input v-model="tableEdit.date" placeholder="必填"></el-input>
          </el-form-item>
          <el-form-item label="值班时间">
            <el-select v-model="tableEdit.time" placeholder="请选择值班时间">
              <el-option label="早班 8：00-16：00" value="早班 8：00-16：00"></el-option>
              <el-option label="白班 8：00-17：00" value="白班 8：00-17：00"></el-option>
              <el-option label="小夜 16：00-24：00" value="小夜 16：00-24：00"></el-option>
              <el-option label="大夜 24：00-8：00" value="大夜 24：00-8：00"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="tableEdit.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="科室">
            <el-input v-model="tableEdit.department" placeholder="必填"></el-input>
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input v-model="tableEdit.phone" placeholder="必填"></el-input>
          </el-form-item>
          <el-form-item label="出勤情况">
            <el-select v-model="tableEdit.attendence" placeholder="必填">
              <el-option label="上班" value="上班"></el-option>
              <el-option label="休息" value="休息"></el-option>
              <el-option label="请假" value="请假"></el-option>
              <el-option label="早退" value="早退"></el-option>
              <el-option label="迟到" value="迟到"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="护士长签名">
            <el-input v-model="tableEdit.signature" placeholder="必填"></el-input>
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
  export default {
    data () {
      return {
        table: [],
        tableEdit: [],
        searchList: [],
        searchName: '',
        searchDepartment: '',
        listQuery: {
          type: null
        },
        dialogFormVisible: false,
        dialogFormEditVisible: false,
        form: {
          name: '',
          date: '',
          time: '',
          phone: '',
          attendence: '',
          department: '',
          sex: '',
          signature: ''
        },
        typeOptions: [
          {key: '001', display_name: '妇科'},
          {key: '002', display_name: '儿科'},
          {key: '003', display_name: '助产科'},
          {key: '004', display_name: '精神科'},
          {key: '005', display_name: '急诊科'},
          {key: '006', display_name: '牙科'},
          {key: '007', display_name: '外科'},
          {key: '008', display_name: '内科'}
        ]
      };
    },
    methods: {
      // 编辑
      handleEdit (index) {
        this.dialogFormEditVisible = true;
        this.Index = index;
        this.tableEdit = this.table[index];
      },
      handleEditSubmit (index) {
        this.dialogFormEditVisible = false;
        let oldDate = this.tableEdit.date;
        let year = new Date(oldDate).getFullYear();
        let month = new Date(oldDate).getMonth() + 1;
        let day = new Date(oldDate).getDate();
        let dateFormat = year + '-' + month + '-' + day;
        this.tableEdit.date = dateFormat;
        console.log(dateFormat);
        this.table[index] = this.tableEdit;
        this.$message({
          message: '轮班修改成功！',
          type: 'success'
        });
      },
      // 搜索
      handelSearch () {
        let intendedSearch = this;
        intendedSearch.$http.get(api.table_shift, {params: {name: intendedSearch.searchName, department: intendedSearch.searchDepartment}}).then((response) => {
          intendedSearch.table = [];
          for (let i = 0; i < response.data.table.length; i++) {
            if (response.data.table[i].name === intendedSearch.searchName && response.data.table[i].department === intendedSearch.searchDepartment) {
              intendedSearch.table.push(response.data.table[i]);
            } else if (response.data.table[i].name === intendedSearch.searchName) {
              intendedSearch.table.push(response.data.table[i]);
            } else if (response.data.table[i].department === intendedSearch.searchDepartment) {
              intendedSearch.table.push(response.data.table[i]);
            }
          };
        }, response => {
            // error callback
          intendedSearch.$notify.error({
            message: '数据请求失败'
          });
        });
      },
      // 显示全部
      getAll () {
        this.table = this.searchList;
        this.searchName = '';
      },
      // 导出
      handleDownload () {
        var vm = this;
        require.ensure([], () => {
          const { export_json_to_excel } = require('vendor/Export2Excel');
          const tHeader = ['日期', '时段', '姓名', '性别', '科室', '电话号码', '出勤情况', '护士长签名'];
          const filterVal = ['date', 'time', 'name', 'sex', 'department', 'phone', 'attendence', 'signature'];
          const table = vm.table;
          const data = vm.formatJson(filterVal, table);
          export_json_to_excel(tHeader, data, '安逸医院护士值班表excel');
        });
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
      },
      // 删除
      handleDelete (index, row) {
        let vm = this;
        console.log('单个删除选择的row: ', index, '-----', row);
        vm.table.splice(index, 1);
        this.$message({
          message: '删除成功！',
          type: 'success'
        });
      },
      // 显示全部
      handleDelAll () {
        this.table = [];
      },
      // 添加
      handelCreate () {
        this.dialogFormVisible = true;
        this.formClear();
      },
      // 添加提交
      handleCreateSubmit () {
        let vm = this;
        console.log('修改后的信息：', vm.form, vm.table);
        vm.table.push(vm.form);
        this.dialogFormVisible = false;
        this.$message({
          message: '轮班信息添加成功！',
          type: 'success'
        });
      },
      // 清空表单
      formClear () {
        this.form = {
          name: '',
          time: '',
          phone: '',
          attendence: '',
          department: '',
          sex: '',
          signature: ''
        };
      },
      // 重置表单
      resetForm () {
        this.form = {
          name: '',
          time: '',
          phone: '',
          attendence: '',
          department: '',
          sex: '',
          signature: ''
        };
      }
    },
    created () {
      this.$http.get(api.table_shift).then((response) => {             // mark
        this.table = response.body.table;
        this.searchList = response.body.table;
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
  .shift .title
    p
      font-size:24px
      text-align:center
      margin-bottom:50px
  .shift .filter-container
      margin-bottom:20px
</style>