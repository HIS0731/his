<template>
  <div class="editDoctor">
    <span class="tittle">医生信息表</span>
    <div class="search">
     <el-input style="width: 200px;" placeholder="医生姓名" v-model="searchName"></el-input>
     <el-button  type="primary" icon="search" @click="search">搜索</el-button>
     <el-button  type="primary" icon="" @click="getAll">显示全部</el-button>
     <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="doctorlist" border style="width: 100%;">
      <el-table-column fixed prop="index" label="序号" width="100">
        <template scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column fixed prop="name" label="姓名" width="150">
      </el-table-column>
      <el-table-column fixed prop="sex" label="性别" width="150"> 
      </el-table-column>
      <el-table-column fixed  label="入职日期" width="150">
        <template scope="scope">
          {{scope.row.date}}
        </template> 
      </el-table-column>
      <el-table-column fixed prop="degree" label="学历" width="150"> 
      </el-table-column>
      <el-table-column fixed prop="major" label="专业" width="150"> 
      </el-table-column>
      <el-table-column fixed prop="profession" label="职称" width="150"> 
      </el-table-column>
      <el-table-column fixed prop="office" label="科室" width="150"> 
      </el-table-column>
      <el-table-column fixed="right" prop="operate" label="操作" width="150"> 
        <template scope="scope">
          <el-button @click.native.prevent="edictDoctor(scope.$index)" type="primary" size="small">编辑</el-button>
          <el-button @click.native.prevent="delectDoctor(scope.$index, doctorlist)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>     
    </el-table>
    <!-- 表格 -->
    <!-- dialog对话框 -->
    <el-dialog title="医生信息修改" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="doctorlistedit.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别"  :label-width="formLabelWidth">
          <el-radio class="radio" v-model="doctorlistedit.sex" label="男">男</el-radio>
          <el-radio class="radio" v-model="doctorlistedit.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="入职日期" prop="date" :label-width="formLabelWidth">
            <el-date-picker type="date" placeholder="选择日期" v-model="doctorlistedit.date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="学历" :label-width="formLabelWidth">
          <el-select v-model="doctorlistedit.degree" placeholder="请选择" style="width: 100%;">
            <el-option label="大专" name="junior" value="大专"></el-option>
            <el-option label="本科" name="undergraduate" value="本科"></el-option>
            <el-option label="研究生" name="postgraduate" value="研究生"></el-option>
            <el-option label="博士" name="doctor" value="博士"></el-option>
            <el-option label="硕士" name="master" value="硕士"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" :label-width="formLabelWidth">
          <el-input v-model="doctorlistedit.major" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="职称"  :label-width="formLabelWidth">
          <el-input v-model="doctorlistedit.profession" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="科室"  :label-width="formLabelWidth">
          <el-input v-model="doctorlistedit.office" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateDoctor">确 定</el-button>
      </div>
    </el-dialog>
    <!-- dialog对话框 -->
    <div class="block">
      <span class="demonstration">调整每页显示条数</span>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="sizes, prev, pager, next" :total="100">
      </el-pagination>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
    import {api} from '../../../global/api.js';
    export default {
      data () {
        return {
          // 获取json存放在doctorlist里面
          doctorlist: [],
          // 对话框的修改存放
          doctorlistedit: [],
          // 搜索相同名字时存放
          searchList: [],
          searchName: '',
          dialogFormVisible: false,
          // 表单input的限制长度
          formLabelWidth: '60px',
          // 获取当前行的序号存放在Index
          Index: '',
          currentPage: 5
        };
      },
      methods: {
        // 导出信息表的具体方法
        handleDownload () {
        // 导出
          var vm = this;
          require.ensure([], () => {
            const { export_json_to_excel } = require('vendor/Export2Excel');
            const tHeader = ['姓名', '性别', '入职日期', '学历', '专业', '职称', '科室'];
            const filterVal = ['name', 'sex', 'date', 'degree', 'major', 'profession', 'office'];
            const doctorlist = vm.doctorlist;
            const data = vm.formatJson(filterVal, doctorlist);
            export_json_to_excel(tHeader, data, '医生信息列表excel');
          });
        },
        formatJson (filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]));
        },
        // 导出信息表
        // 搜索
        search () {
          let intendedSearch = this;
          intendedSearch.$http.get(api.doctor, {params: {name: intendedSearch.searchName}}).then((response) => {
              // 遍历接口里的所有信息，查找drugname为搜索框里输入的内容的数据，然后把所有找到的数据push进this.tableData里
              // 在把查找到的数据存进this.tableData里之前，需要把它置为空
            intendedSearch.doctorlist = [];
            for (let i = 0; i < response.data.doctorlist.length; i++) {
              if (response.data.doctorlist[i].name === intendedSearch.searchName) {
                intendedSearch.doctorlist.push(response.data.doctorlist[i]);
              }
            };
            console.log(intendedSearch.searchList);
          }, response => {
            // error callback
            intendedSearch.$notify.error({
              message: '数据请求失败'
            });
          });
        },
        // 搜索
        // 显示全部
        getAll () {
          this.doctorlist = this.searchList;
        },
        // 点击编辑按钮执行的方法
        edictDoctor (index) {
          this.dialogFormVisible = true;
          this.Index = index;             // 存放当前行的序号
          this.doctorlistedit = this.doctorlist[index];  // 获取当前行的数据
          // 编辑前的日期
          console.log('编辑前的日期', this.doctorlistedit.date);
        },
        // 点击删除按钮执行的方法
        delectDoctor (index, rows) {
          console.log('该行对象内容', rows[index]);    // 打印该行对象内容
          rows.splice(index, 1);    // 1代表从当前列表开始删除的行数
        },
        updateDoctor () {
          this.dialogFormVisible = false;
          // 编辑后没转化格式的日期
          console.log('编辑后没转化格式的日期', this.doctorlistedit.date);
          // 转换时间格式
          let year = this.doctorlistedit.date.getFullYear();
          let month = this.doctorlistedit.date.getMonth() + 1;
          let day = this.doctorlistedit.date.getDate();
          let dateFormat = year + '-' + month + '-' + day;
          // console.log(this.doctorlistedit);
          this.doctorlistedit.date = dateFormat;
          // this.$http.get(api.doctor, this.doctorlistedit).then(function () {
          this.doctorlist[this.Index] = this.doctorlistedit;
          // this.doctorlist[this.Index].date = dateFormat;
          this.$message({
            message: '医生信息修改成功',
            type: 'success'
          });
          console.log('编辑后完成转化格式的日期', this.doctorlistedit.date);
          // }, function () {
          //   this.$message.error('医生信息修改失败');
          // });
        },
        handleSizeChange (val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange (val) {
          console.log(`当前页: ${val}`);
        }
      },
      created () {
        this.$http.get(api.doctor).then((response) => {             // mark
          this.doctorlist = response.body.doctorlist;
          this.searchList = response.body.doctorlist;
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
.editDoctor .block
  position:absolute
.editDoctor .tittle
  display:block
  text-align: center
  font-size:24px
  font-weight:600
  line-height:80px
.editDoctor .search
  margin-bottom:30px
</style>
