<template>
  <div class="shiftDoctor">
    <span class="tittle">医生轮班信息表</span>
    <div class="search">
     <el-input  style="width: 200px;" placeholder="医生姓名"></el-input>
     <el-button  type="primary" icon="search" @click="">搜索</el-button>
     <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>
    </div>
    <el-table :data="shiftList" border style="width: 100%;">
      <el-table-column fixed prop="date" label="轮班日期" width="120">
        <template scope="scope">
          {{scope.row.date}}
        </template> 
      </el-table-column>
      <el-table-column fixed prop="dates" label="时段" width="200">
      </el-table-column>
      <el-table-column fixed prop="index" label="序号" width="80">
        <template scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column fixed prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column fixed prop="sex" label="性别" width="120"> 
      </el-table-column>
      <el-table-column fixed prop="office" label="科室" width="120"> 
      </el-table-column>
      <el-table-column fixed prop="number" label="电话" width="130"> 
      </el-table-column>
      <el-table-column fixed prop="attendance" label="出勤情况" width="120"> 
      </el-table-column>
      <el-table-column fixed prop="signatory" label="主任签名" width="120"> 
      </el-table-column>
      <el-table-column fixed="right" prop="operate" label="操作" width="180"> 
        <template scope="scope">
          <el-button @click.native.prevent="edictDoctor(scope.$index, scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click.native.prevent="delectDoctor(scope.$index, shiftList)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>     
    </el-table>
    <el-dialog title="轮班信息修改" :visible.sync="dialogFormVisible">

      <el-form>
        <el-form-item label="轮班日期" prop="date" :label-width="formLabelWidth">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="时段" :label-width="formLabelWidth">
          <el-select v-model="form.dates" placeholder="请选择" style="width: 100%;">
            <el-option label="早班：6:00~17:00" name="lessMorning" value="早班：6:00~17:00"></el-option>
            <el-option label="日班：10：00~21：00" name="Morning" value="日班：10：00~21：00"></el-option>
            <el-option label="小夜：16：00~00：00" name="lessNinght" value="小夜：16：00~00：00"></el-option>
            <el-option label="大夜：00：00~8：00" name="Ninght" value="大夜：00：00~8：00"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别"  :label-width="formLabelWidth">
          <el-radio class="radio" v-model="form.sex" label="男">男</el-radio>
          <el-radio class="radio" v-model="form.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="科室"  :label-width="formLabelWidth">
          <el-input v-model="form.office" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="出勤情况" :label-width="formLabelWidth">
          <el-select v-model="form.attendance" placeholder="请选择" style="width: 100%;">
            <el-option label="迟到" name="late" value="迟到"></el-option>
            <el-option label="早退" name="early" value="早退"></el-option>
            <el-option label="工作时间" name="bework" value="工作时间"></el-option>
            <el-option label="加班" name="overtime" value="加班"></el-option>
            <el-option label="病假" name="sickleave" value="病假"></el-option>
            <el-option label="公休" name="generalholiday" value="公休"></el-option>
            <el-option label="其他" name="others" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主任签名"  :label-width="formLabelWidth">
          <el-input v-model="form.signatory" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">重 置</el-button>
        <el-button type="primary"  @click="submitForm('form')">确 定</el-button>
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
    import {api} from '../../../global/api.js';
    export default {
      data () {
        return {
          shiftList: [],
          // 将一行数据存储在form里
          Index: '',
          form: [],
          dialogFormVisible: false,
          formLabelWidth: '60px',
          currentPage: 5
        };
      },
      methods: {
        // 表格点击编辑触发的事件，进行修改
        edictDoctor (index, rows) {
          // console.log(index, row);
          this.dialogFormVisible = true;
          // this.form = row;
          console.log('tt', rows);
          this.form = rows;
          // 深拷贝
          // this.form = JSON.parse(JSON.stringify(rows[index]));
          this.Index = index;
          this.form2 = rows;
          // rows[index] = this.form;
        },
        // 删除某行数据
        delectDoctor (index, rows) {
          console.log(rows);
          rows.splice(index, 1);
        },
        // 事件格式转化
        updateDoctor () {
          console.log('修改时间格式', this.form.date);
          let year = this.form.date.getFullYear();
          let month = this.form.date.getMonth() + 1;
          let day = this.form.date.getDate();
          let dateFormat = year + '-' + month + '-' + day;
          this.form.date = dateFormat;
        },
        // Dialog 对话框 的确定按钮触发的事件
        submitForm (formName) {
          console.log('this.shiftList[this.Index]的数据', this.shiftList[this.Index]);
          console.log('form.date的数据', this.form.date);
          this.dialogFormVisible = false;
          this.updateDoctor();
          this.shiftList[this.Index] = this.form;
          console.log('修改的form', this.form);
          console.log('修改的shiftList', this.shiftList[this.Index]);
          this.$message({
            message: '轮班信息修改成功',
            type: 'success'
          });
          // else {
          //     this.$message.error('医生信息修改失败');
          //     return false;
          //   }
          // }
        },
          // });
        // resetForm (formName) {
        //   this.$refs[formName].resetFields();
        //   alert(99);
        // },
        // 导出信息表
        handleDownload () {
          // 导出
          var vm = this;
          require.ensure([], () => {
            const { export_json_to_excel } = require('vendor/Export2Excel');
            const tHeader = ['轮班日期', '时段', '姓名', '性别', '科室', '电话', '出勤情况', '主任签名'];
            const filterVal = ['date', 'dates', 'name', 'sex', 'office', 'number', 'attendance', 'signatory'];
            const shiftList = vm.shiftList;
            const data = vm.formatJson(filterVal, shiftList);
            export_json_to_excel(tHeader, data, '医生轮班信息列表excel');
          });
        },
        formatJson (filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]));
        },
        // 导出信息表
        handleSizeChange (val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange (val) {
          console.log(`当前页: ${val}`);
        }
      },
      // 获取json数据
      created () {
        this.$http.get(api.shiftList).then((response) => {             // mark
          this.shiftList = response.body.shiftList;
        }, response => {
          // error callback
          this.$message({
            message: '数据请求失败',
            type: 'error'
          });
        });
        // this.updateDoctor();
      }
    };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
.shiftDoctor .block
  position:absolute
.shiftDoctor .tittle
  display:block
  text-align: center
  font-size:24px
  font-weight:600
  line-height:80px
.shiftDoctor .search
  margin-bottom:30px

</style>
