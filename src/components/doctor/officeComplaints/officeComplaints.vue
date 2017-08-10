<template>
  <div class="officeComplaint">
  <!-- Tabs 标签页 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="患者留言" name="first">
        <template>
        <!-- 表格 -->
          <el-table :data="complaintPatientList" height="250" border style="width: auto">
            <el-table-column prop="name" label="患者姓名" width="180"></el-table-column>
            <el-table-column prop="date" label="投诉日期" width="180"></el-table-column>
            <el-table-column prop="containts" label="投诉内容" width="500"></el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button size="small" @click.native.prevent="lookforPatient(scope.$index)">查看患者信息</el-button>
                <el-button size="small" type="danger" @click.native.prevent="delectPatient(scope.$index, complaintPatientList)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        <!-- 表格 -->
        </template>
      </el-tab-pane>
      <el-tab-pane label="投诉处理" name="second">
        <div class="importants">
          <h1>{{complaintList.tittle}}</h1>
          <h3>{{complaintList.subheading}}</h3>
          <h2>一、投诉途径与渠道</h2>
            <ol>
              <li v-for="item in complaintList.ways">{{item}}</li>
            </ol>
          <h2>二、受理投诉的部门和范围</h2>
            <ol>
              <li v-for="item in complaintList.offices">{{item}}</li>
            </ol>
        </div>
      </el-tab-pane>
      <el-tab-pane label="医生意见" name="third">
        <el-input type="textarea" :rows="4" placeholder="请输入意见" v-model="textarea">
        </el-input>
        <el-button type="danger" @click="getEmpty">清 空</el-button>
        <el-button type="primary" @click="save">保 存</el-button>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="患者详细信息" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <ul class="patientMessage">
        <li><h3>患者姓名:</h3><span>{{messages.name}}</span></li>
        <li><h3>挂号序:</h3><span>{{messages.number}}</span></li>
        <li><h3>性别:</h3><span>{{messages.sex}}</span></li>
        <li><h3>年龄:</h3><span>{{messages.age}}</span></li>
        <li><h3>病科:</h3><span>{{messages.disease}}</span></li>
        <li><h3>病情:</h3><span>{{messages.symptoms}}</span></li>
        <li><h3>手机号码:</h3><span>{{messages.phone}}</span></li>
        <li><h3>地址:</h3><span>{{messages.position}}</span></li>
        <li><h3>日期:</h3><span>{{messages.date}}</span></li>
      </ul>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
    import {api} from '../../../global/api.js';
    export default {
      data () {
        return {
          dialogFormVisible: false,
          complaintList: [],
          complaintPatientList: [],
          messages: [],
          patientList: [],
          activeName: 'second',
          Index: '',
          textarea: ''
        };
      },
      methods: {
        handleClose (done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        lookforPatient (index) {
          // console.log(index, row);
          this.dialogFormVisible = true;
          this.Index = index;
          // console.log('患者姓名', this.complaintPatientList[this.Index].name);
          for (let i = 0; i < this.patientList.length; i++) {
            if (this.complaintPatientList[this.Index].name === this.patientList[i].name) {
              this.messages = this.patientList[i];
            };
          };
        },
        delectPatient (index, rows) {
          rows.splice(index, 1);
        },
        getEmpty () {
          this.textarea = '';
        },
        save () {
          if (this.textarea === '') {
            this.$message({
              showClose: true,
              message: '保存失败！',
              type: 'error'
            });
          } else {
            this.$message({
              showClose: true,
              message: '保存成功！',
              type: 'success'
            });
          }
        }
      },
      created () {
        this.$http.get(api.complaintPatient).then((response) => {             // mark
          this.complaintList = response.body.complaintList;
          this.complaintPatientList = response.body.complaintPatientList;
        }, response => {
          // error callback
          alert('1数据请求失败');
        });
        this.$http.get(api.registered).then((response) => {             // mark
          this.patientList = response.body.tableData;
        }, response => {
          // error callback
          alert('2数据请求失败');
        });
      }
    };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
.patientMessage li
  font-size:20px
.patientMessage h3
  width:150px
  line-height:40px
  display:inline-block
  margin-left:30px
  margin-right:50px
.patientMessage span
  color:#999
.importants h1
  font-size:22px
  margin:0 0 20px 0
.importants h2
  font-size:18px
  margin:10px 0 30px 0
.importants h3
  color:red
  font-size:14px
  padding:0 0 10px 40px
.importants li
  margin-left:30px
  margin-bottom:20px
</style>
