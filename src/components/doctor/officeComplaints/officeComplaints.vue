<template>
  <div class="officeComplaint">
    <el-tabs v-model="activeName">
      <el-tab-pane label="患者留言" name="first">
        <template>
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
        </template>
      </el-tab-pane>
      <el-tab-pane label="投诉处理" name="second">
        <div class="importants">
          <h1>医院患者投诉处理流程</h1>
          <h3>为及时处理各种投诉，保障公民的合法权益，促进医院改进服务，提高服务质量，维护医院形象。根据有关法律法规和医疗规章制度，结合医院的实际情况，制定投诉处理制度。</h3>
          <h2>一、投诉途径与渠道</h2>
            <ol>
              <li>医院投诉监督电话(0511-88619092)、医院电子邮箱(zjzyydb@163.com)，医院公众场所的意见投诉箱，各系统、科室、班组意见薄(本)。</li>
              <li>建立院总值班制度，急诊期间接待来访、受理投诉，投诉电话(18906100399)。</li>
              <li>院办公室、党委办公室为综合接待受理、协调投诉科室，其它职能科室受理职权范围内的投诉。
              </li>
            </ol>
          <h2>二、受理投诉的部门和范围</h2>
            <ol>
              <li>门诊部：受理并协调解决门诊患者对于医生服务态度、医疗质量、物价医保等方面的投诉。受理地点：总服务台、门诊部主任办公室。投诉电话(0511-88619015、88619016)</li>
              <li>院办公室：受理行政事务与管理方面的投诉。投诉电话(0511-88619092)</li>
              <li>党委办公室：受理医德医风、职工违规违纪方面的投诉。投诉电话 (0511-88619093)</li>
              <li>人事科：受理职工劳动纪律方面的投诉。投诉电话(0511-88619091)</li>
              <li>医教科：受理医疗质量、医疗纠纷方面的投诉。投诉电话(0511-88619085)</li>
              <li>护理部：受理护理质量、护理纠纷方面的投诉。投诉电话(0511-88619089)</li>
              <li>财务科：受理医疗收费记账,医疗物价方面的投诉。投诉电话(0511-88619087)</li>
              <li>保卫科：受理医院安全方面的投诉。投诉电话(0511-88619086)</li>
              <li>总务科：受理后勤保障方面的投诉。投诉电话(0511-88619090)</li>
              <li>器械科：受理设备管理方面的投诉。投诉电话(0511-88619077)</li>
              <li>疾控科：受理院内感染方面的投诉。投诉电话(0511-88619084)</li>
              <li>药剂科：受理药品质量、价格及药事管理方面的投诉。投诉电话(0511-88619078)</li>
              <li>各系统、各科室受理本系统和科室范围内的投诉。</li>
              <li>其它应该受理的投诉问题由相应的职能部门受理。</li>
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
    export default {
      data () {
        return {
          dialogFormVisible: false,
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
          this.Index = index;             // mark
          // console.log('患者信息', this.patientList);
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
        this.$http.get('../../static/doctor/complaintPatient.json').then((response) => {             // mark
          this.complaintPatientList = response.body.complaintPatientList;
        }, response => {
          // error callback
          alert('1数据请求失败');
        });
        this.$http.get('../../static/doctor/registered.json').then((response) => {             // mark
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
  margin:10px 0 10px 0
.importants h3
  color:red
  font-size:14px
.importants li
  margin-left:30px
</style>
