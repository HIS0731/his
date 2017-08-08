<template>
  <div class="editDoctor">
    <span class="tittle">医生信息表</span>
    <div class="search">
     <el-input style="width: 200px;" placeholder="医生姓名"></el-input>
     <el-button  type="primary" icon="search" @click="">搜索</el-button>
     <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>
    </div>
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
    <div class="block">
      <span class="demonstration">调整每页显示条数</span>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="sizes, prev, pager, next" :total="100">
      </el-pagination>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
    export default {
      data () {
        return {
          doctorlist: [],
          doctorlistedit: [],
          dialogFormVisible: false,
          formLabelWidth: '60px',
          Index: '',
          currentPage: 5
        };
      },
      methods: {
        // 导出信息表
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
        edictDoctor (index) {
          // console.log(index, row);
          this.dialogFormVisible = true;
          this.Index = index;             // mark
          this.doctorlistedit = this.doctorlist[index];
        },
        delectDoctor (index, rows) {
          console.log(rows[index]);
          rows.splice(index, 1);
        },
        updateDoctor () {
          this.dialogFormVisible = false;
          // mark 实际应该用get
          console.log(this.doctorlistedit.date);
          let year = this.doctorlistedit.date.getFullYear();
          let month = this.doctorlistedit.date.getMonth() + 1;
          let day = this.doctorlistedit.date.getDate();
          let dateFormat = year + '-' + month + '-' + day;
          // console.log(this.doctorlistedit);
          this.doctorlistedit.date = dateFormat;
          // this.$http.get('../../static/doctor.json', this.doctorlistedit).then(function () {
          this.doctorlist[this.Index] = this.doctorlistedit;
          // this.doctorlist[this.Index].date = dateFormat;
          this.$message({
            message: '医生信息修改成功',
            type: 'success'
          });
          console.log(this.doctorlistedit);
          console.log('---------', this.doctorlist[this.Index]);
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
        this.$http.get('../../static/doctor/doctor.json').then((response) => {             // mark
          this.doctorlist = response.body.doctorlist;
        }, response => {
          // error callback
          alert('数据请求失败');
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
