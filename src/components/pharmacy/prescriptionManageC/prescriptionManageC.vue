<template>
  <div class="prescriptionCManageC">
    <!-- 搜索条件 -->
    <div class="filter-container">
      <el-input placeholder="处方编号" v-model="searchNumber"></el-input>
      <el-input placeholder="患者姓名" v-model="searchName"></el-input>
      <el-button type="primary" icon="search" @click="search">搜索</el-button>
      <el-button type="primary" icon="view" @click="showAll">显示全部</el-button>
    </div>    
    <el-table :data="prescriptionC">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="form-expand">
            <el-form-item label="科别：">
              <span>{{ props.row.disease }}</span>
            </el-form-item>
            <el-form-item label="医生：">
              <span>{{ props.row.doctor }}</span>
            </el-form-item>
            <el-form-item label="开具日期：">
              <span>{{ props.row.date }}</span>
            </el-form-item>
            <hr class="hr">
            <el-form-item label="临床诊断：" class="symptoms">
              <span>{{ props.row.symptoms }}</span>
            </el-form-item>
            <hr class="hr">
            <h5 class="prescriptionC-title">R</h5>
            <template>
              <el-table :data="props.row.prescription.drug" style="width: 80%; margin: 0 auto;">
                <el-table-column prop="sort" label="药品分类" width="100">
                </el-table-column>
                <el-table-column prop="drugname" label="药品名称" width="200">
                </el-table-column>
                <el-table-column prop="quantity" label="用量（件/克）" width="180">
                </el-table-column>
                <el-table-column prop="usage" label="用法" width="260">
                </el-table-column>                
              </el-table>
            </template>
            <el-form-item label="备注：" class="Rp">
              <span>{{ props.row.prescription.tips }}</span>
            </el-form-item>                         
          </el-form> 
        </template>
      </el-table-column>
      <el-table-column label="编号" prop="number">
      </el-table-column>
      <el-table-column label="患者姓名" prop="name">
      </el-table-column>
      <el-table-column label="性别" prop="sex">
      </el-table-column>
      <el-table-column label="年龄" prop="age">
      </el-table-column>
      <el-table-column label="地址" prop="position">
      </el-table-column>    
      <el-table-column label="联系方式" prop="phone">
      </el-table-column>      
      <el-table-column label="审核药师" prop="pharmacist">
      </el-table-column>
      <el-table-column label="操作" width="210">
        <template scope="scope">
          <el-button type="primary" @click="refuseprescriptionC(scope.$index)">驳回药方</el-button>
          <el-button type="primary" @click="acceptprescriptionC(scope.$index)">出药</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import {api} from '../../../global/api.js';
  export default {
    data () {
      return {
        prescriptionC: [],
        intendedprescription: [],
        drugs: [],
        searchNumber: '',
        searchName: ''
      };
    },
    mounted () {
      let prescriptionCThis = this;

      prescriptionCThis.$http.get(api.patientList).then((response) => {
        // 测试语句，测试是否能获取response
        // console.log(prescriptionCThis.prescriptionC, response);
        // 把json接口获取的数据赋给当前对象
        prescriptionCThis.prescriptionC = response.data.tableData;
        prescriptionCThis.intendedprescription = response.data.tableData;
      }, response => {
        // error callback
        prescriptionCThis.$notify.error({
          message: '数据请求失败'
        });
      });
      prescriptionCThis.$http.get(api.drugs).then((response) => {
        // 把json接口获取的数据赋给当前对象
        prescriptionCThis.drugs = response.data.tableDataC;
      }, response => {
        // error callback
        prescriptionCThis.$notify.error({
          message: '数据请求失败'
        });
      });
    },
    methods: {
      // 搜索
      search () {
        let search = this;
        search.$http.get(api.patientList, {params: {number: search.searchNumber, name: search.searchName}}).then((response) => {
          // 把数组置空，以便存放搜索到的符合条件的数据
          search.prescriptionC = [];
          // 遍历后台数据是否有和传入的参数相同的，有的话就找出来push进prescriptionC[]
          for (let i = 0; i < response.data.tableData.length; i++) {
            // 两个条件都有输入值的时候，判断是否有同时符合这两个条件的数据
            if (search.searchNumber && search.searchName) {
              if (response.data.tableData[i].number === search.searchNumber && response.data.tableData[i].name === search.searchName) {
                search.prescriptionC.push(response.data.tableData[i]);
              }
            } else {
              if (search.searchNumber && response.data.tableData[i].number === search.searchNumber) {
                // 只有第一个输入值的时候
                search.prescriptionC.push(response.data.tableData[i]);
              } else if (search.searchName && response.data.tableData[i].name === search.searchName) {
                // 只有第二个输入值的时候
                search.prescriptionC.push(response.data.tableData[i]);
              }
            }
          }
        }, (response) => {
          // error callback
          search.$notify.error({
            message: '数据请求失败'
          });
        });
      },
      // 显示全部数据
      showAll () {
        this.prescriptionC = this.intendedprescription;
        this.searchNumber = '';
        this.searchNamer = '';
      },
      // 驳回处方
      refuseprescriptionC: function (index) {
        // 这里应该有个操作可以提醒医生他的处方被驳回了
        this.$message({
          message: '已通知' + this.prescriptionC[index].doctor + '医生，处方被驳回！',
          type: 'success'
        });
      },
      // 获取当前登陆账户名
      acceptprescriptionC: function (index) {
        // 这里应该获取当前登陆的账户名，将其赋值给this.prescriptionC[index].pharmacist，从而获取当前操作的审核药师
        // 这里假装当前登陆的账户名是 “唐静”，暂时写死数据为该名字
        this.prescriptionC[index].pharmacist = sessionStorage.getItem('easeHis');
        this.$message({
          message: '该处方已被' + this.prescriptionC[index].pharmacist + '审核药师处理！',
          type: 'success'
        });
        // mark!!! 这里需要遍历数组，比较药品名称，修改药品库存：库存-出药数量
        for (let i = 0; i < this.drugs.length; i++) {
          for (let j = 0; j < this.prescriptionC[index].prescription.drug.length; j++) {
            if (this.drugs[i].drugname === this.prescriptionC[index].prescription.drug[j].drugname) {
              this.drugs[i].quantity = this.drugs[i].quantity - this.prescriptionC[index].prescription.drug[j].quantity;
              // 提交数据到后台（暂时没有后台接口），后台用接收到的修改过的库存的值替换掉原来的库存值，所有应用到该库存的地方都会发生相应的修改
              // this.$http.post('', {drugs: 'this.drugs'}).then(response => {}, response => {});
              // 这里没有后台接口，无法把修改后的药品库存返回去，这里用打印到控制台的方式查看结果
              console.log(this.drugs[i].quantity);
            };
          };
        };
      }
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  .prescriptionCManageC .filter-container
    padding-bottom:30px
    .el-input
      width: 200px  
  .prescriptionCManageC
    .form-expand
      /* background: #99FF66 */
      width:80%
      margin: 0 auto
      .el-form-item
        width: 29%
        display: inline-block
        margin-left: 20px
      .symptoms
        width: 100%
      .Rp
        width: 80%
        margin-left: 10%
      .hr
        margin-top: -25px
        border-top: 1px solid #4A7C32
      .prescriptionC-title
        font-size: 26px
        margin-left: 20px
  .prescriptionCManageC .form-expand .el-form-item span
    display: block
    font-size: 15px
    font-weight: bold

</style>
