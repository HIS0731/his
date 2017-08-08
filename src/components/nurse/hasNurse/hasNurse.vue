<template>
    <div class="nurse_table">
      <!-- 已存在护士信息 -->
      <div class="filter-container">
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="姓名" v-model="listQuery.name">
        </el-input>
        <el-select clearable class="filter-item" style="width: 130px" placeholder="科室" v-model="listQuery.type">
          <el-option v-for="item in typeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
          </el-option>
        </el-select>
        <el-button class="filter-item" type="primary" icon="search">搜索</el-button>
        <el-button class="filter-item" type="primary" @click="handelCreate"  icon="edit">添加</el-button>
       <!--  <el-button class="filter-item" type="primary" @click="handleDelAll"  icon="edit">批量删除</el-button> -->
        <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>
      </div>

      <el-table ref="multipleTable" :data="table" border tooltip-effect="dark"  style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" width="50">
      <template scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名"  width="120"></el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
      <el-table-column prop="sex" label="性别" show-overflow-tooltip width="70"></el-table-column>
      <el-table-column prop="age" label="年龄" sortable align="center" show-overflow-tooltip width="100"></el-table-column>
      <el-table-column prop="position" label="职称" show-overflow-tooltip width="100"></el-table-column>
      <el-table-column prop="department" label="科室" show-overflow-tooltip></el-table-column>
      <el-table-column prop="education" label="学历" show-overflow-tooltip></el-table-column>
      <el-table-column prop="profession" label="专业" show-overflow-tooltip></el-table-column>
      <el-table-column prop="date" label="入职时间" sortable show-overflow-tooltip></el-table-column>
      <el-table-column align="center" label="操作">
      <template scope="scope">
      	<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
      </el-table-column>
      </el-table>

      <div style="margin-top: 20px">
         <el-button @click="toggleSelection()">取消选择</el-button>
      </div>

      <div class="pagination-container">
         <el-pagination @size-change="handleSizeChange"
      @current-change="handleCurrentChange"  :page-sizes="[7,10,20,30]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="80">
         </el-pagination>
      </div>  

      <el-dialog title="添加信息" :visible.sync="dialogFormVisible">
        <el-form class="small-space" :model="form" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
          <el-form-item label="职称">
            <el-input v-model="form.position"></el-input>
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model="form.profession"></el-input>
          </el-form-item>
          <el-form-item label="科室">
            <el-input v-model="form.department"></el-input>
          </el-form-item>
          <el-form-item label="学历">
            <el-input v-model="form.education"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="form.sex"></el-input>
          </el-form-item>
           <el-form-item label="入职时间">
            <el-input v-model="form.date"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>          
          <el-button type="primary" @click="handleCreateSubmit">确 定</el-button>
          <el-button type="primary" @click="resetForm('form')">重置</el-button>
        </div>
      </el-dialog>

      <el-dialog title="修改个人信息" :visible.sync="dialogFormEditVisible">
        <el-form class="small-space" :model="form" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
          <el-form-item label="姓名">
            <el-input v-model="tableEdit.name"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="tableEdit.address"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="tableEdit.age"></el-input>
          </el-form-item>
          <el-form-item label="职称">
            <el-input v-model="tableEdit.position"></el-input>
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model="tableEdit.profession"></el-input>
          </el-form-item>
          <el-form-item label="科室">
            <el-input v-model="tableEdit.department"></el-input>
          </el-form-item>
          <el-form-item label="学历">
            <el-input v-model="tableEdit.education"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="tableEdit.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="入职时间">
            <el-col :span="11">
              <el-form-item prop="date">
              <el-date-picker type="date" placeholder="选择日期" v-model="tableEdit.date"></el-date-picker>
              </el-form-item>
            </el-col>
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
export default {
  data () {
    return {
      table: [],
      tableEdit: [],
      total: null,
      listLoading: true,
      listQuery: {
        currPage: 1,
        // pageSize: 10,
        name: '',
        type: null
      },
      dialogFormVisible: false,
      dialogFormEditVisible: false,
      form: {
        name: '',
        address: '',
        age: '',
        position: '',
        profession: '',
        department: '',
        education: '',
        sex: '',
        date: ''
      },
      typeOptions: [
        {key: '001', display_name: '妇科'},
        {key: '002', display_name: '儿科'},
        {key: '003', display_name: '助产科'},
        {key: '004', display_name: '急诊科'},
        {key: '005', display_name: '精神科'}
      ],
      multipleSelection: []
    };
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    handleEdit (index, row) {
      this.dialogFormEditVisible = true;
      // this.Index = index;
      // this.tableEdit = this.table[index];
      // this.tableEdit = JSON.parse(JSON.Stringify(this.index));
      this.tableEdit = row;
      // this.tableEdit = JSON.parse(JSON.Stringify(this.tableEdit.row));
    },
    handleEditSubmit (index) {
      this.dialogFormEditVisible = false;
      let oldDate = this.tableEdit.date;
      let year = new Date(oldDate).getFullYear();
      let month = new Date(oldDate).getMonth() + 1;
      let day = new Date(oldDate).getDate();
      let dateFormat = year + '-' + month + '-' + day;
      this.tableEdit.date = dateFormat;
      // console.log(dateFormat);
      this.table[index] = this.tableEdit;
    },
    handleDelete (index, row) {
      let vm = this;
      console.log('单个删除选择的row: ', index, '-----', row);
      vm.table.splice(index, 1);
    },
    handleDelAll () {
      // let vm = this;
      // console.log('批量删除选择的row：', vm.multipleSelection);
      // vm.table.splice(index, 1);
      // let arr = [];
      // var len = this.proData.length;
      // for (var i = 0; i < len; i++) {
      //   if (this.selectArr.indexOf(i) >= 0) {
      //     console.log(this.selectArr.indexOf(i));
      //   } else {
      //     arr.push(proData[i]);
      //   }
      // }
      // this.proData = arr;
      // this.selectArr = [];
    },
    handelCreate () {
      this.dialogFormVisible = true;
      this.formClear();
    },
    // handleFilter () {
    //   // 姓名this.getList();
    // },
    handleDownload () {
      // 导出
      var vm = this;
      require.ensure([], () => {
        const { export_json_to_excel } = require('vendor/Export2Excel');
        const tHeader = ['姓名', '地址', '性别', '年龄', '职称', '科室', '学历', '专业', '入职时间'];
        const filterVal = ['name', 'address', 'sex', 'age', 'position', 'department', 'education', 'profession', 'date'];
        const table = vm.table;
        const data = vm.formatJson(filterVal, table);
        export_json_to_excel(tHeader, data, '护士信息列表excel');
      });
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCreateSubmit () {
      let vm = this;
      console.log('添加后的信息：', vm.form, vm.table);
      vm.table.push(vm.form);
      this.dialogFormVisible = false;
    },
    formClear () {
      this.form = {
        name: '',
        address: '',
        age: '',
        position: '',
        profession: '',
        department: '',
        education: '',
        sex: '',
        date: ''
      };
    },
    resetForm () {
      this.form = {
        name: '',
        address: '',
        age: '',
        position: '',
        profession: '',
        department: '',
        education: '',
        sex: '',
        date: ''
      };
    }
  },
  created () {
    this.$http.get('../static/hasNurse.json').then((response) => {             // mark
      this.table = response.body.table;
      console.log(this.table);
    }, response => {
        // error callback
      alert('数据请求失败');
    });
  }
};
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">   
  .nurse_table
   	padding:10 10px
    margin-top:50px
    .filter-container
      margin-bottom:20px
    .pagination-container
      margin-top:50px
      margin-left:-5px
</style>

