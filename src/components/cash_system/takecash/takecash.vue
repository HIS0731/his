<template>
  <div class="takecash">
    <p class="takecash-title">缴费办理</p>
    <!-- 处理缴费表单 -->
    <el-form :model="takecash" :rules="rules" ref="takecashForm" label-width="100px" class="takecash-ruleForm">
      <el-form-item label="患者姓名" prop="patientName">
        <el-input v-model="takecash.patientName"></el-input>
      </el-form-item>
      <el-form-item label="办理凭证" prop="certificate_value">
        <el-select v-model="takecash.certificate_value" placeholder="请选择办理凭证">
          <el-option label="身份证" value="idCard"></el-option>
          <el-option label="健康证" value="healthCard"></el-option>
        </el-select>
      </el-form-item>
      <p class="takecash-isshow" v-if="takecash.certificate_value === 'idCard'">
        <el-form-item label="身份证号" prop="cardNumber">
          <el-input v-model="takecash.cardNumber"></el-input>
        </el-form-item>
      </p>
      <p class="takecash-isshow" v-else-if="takecash.certificate_value === 'healthCard'">
        <el-form-item label="健康证号" prop="cardNumber">
          <el-input v-model="takecash.cardNumber"></el-input>
        </el-form-item>
      </p>
      <p v-else></p>
      <el-form-item label="处方编号" prop="prescript_number">
        <el-input v-model="number"></el-input>
      </el-form-item>
      <!-- 下面实时监听number的值，找到该值的话就会赋值给isShow，这样isShow也是实时变化的了 -->
      <!-- 如果找到输入的处方编号就把处方的药品数据展示出来，否则隐藏数据表格-->
      <template  v-if="number === isShow && number !== ''">
        <el-table :data="takecash.prescription">
          <el-table-column prop="sort" label="药品分类">
          </el-table-column>
          <el-table-column prop="drugname" label="药品名称">
          </el-table-column>
          <el-table-column prop="quantity" label="用量（件/克）">
          </el-table-column>
          <el-table-column prop="usage" label="用法">
          </el-table-column>                
        </el-table>
      </template>
      <template v-else>
      </template>
      <p class="takecash_p">
        <el-form-item label="应收金额（元）：" class="shouldMoney" label-width="100">
          <span v-show="showMoney" class="money">{{ takecash.shouldMoney }}</span>
        </el-form-item>
        <el-button type="primary" class="computeBtn" @click="compute()">计算应收金额</el-button>
      </p>
      <el-form-item label="实收金额（元）：" prop="exactMoney" class="exactMoney" label-width="80">
        <el-input v-model="takecash.exactMoney" style="width: 75%"></el-input>
      </el-form-item>
      <p class="takecash_p">
        <el-form-item label="找零（元）：" class="theChange" label-width="100">
          <span v-show="showChange" class="money">{{ takecash.theChange }}</span>
        </el-form-item>
        <el-button type="primary" class="changeBtn" @click="change()">计算找零</el-button>
      </p>
      <el-button type="reset" @click="resetForm('takecashForm')" class="reset">重置</el-button>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import {api} from '../../../global/api.js';
  export default {
    data () {
      // 验证患者姓名是否存在的方法
      let checkName = (rule, value, callback) => {
        for (let k = 0; k < this.patients.length; k++) {
          if (value !== this.patients[k].name) {
            callback(new Error('无此患者姓名！'));
          } else {
            callback();
          }
        }
      };
      // 验证处方是否存在的方法
      let checkPrescription = (rule, value, callback) => {
        for (let k = 0; k < this.patients.length; k++) {
          if (value !== this.patients[k].number) {
            callback(new Error('无此处方！'));
          } else {
            callback();
          }
        }
      };
      // 验证输入的实收金额是否是数字值的方法
      let checkexactMoney = (rule, value, callback) => {
        if (/^\d+$/.test(value) === false) {
          callback(new Error('请输入实收金额！'));
        } else {
          if ((value - this.takecash.shouldMoney) < 0) {
            callback(new Error('请输入实收金额！'));
          } else {
            callback();
          }
        }
      };
      // 验证患者身份证号是否与输入的姓名对应以及格式是否正确的方法
      let checkCertificate = (rule, value, callback) => {
        if (/^\d+$/.test(value) !== false) {
          if (value.length !== 18) {
            callback(new Error('身份证号应为18位数！'));
          } else {
            for (let k = 0; k < this.patients.length; k++) {
              if (value === this.patients[k].idCard) {
                if (this.patients[k].name === this.takecash.patientName) {
                  callback();
                } else {
                  callback(new Error('身份证号与姓名不对应！'));
                }
              } else {
                callback(new Error('身份证号与姓名不对应！'));
              }
            }
          }
        } else {
          callback(new Error('请输入数字值！'));
        }
      };
      return {
        takecash: {
          patientName: '',
          certificate_value: '',
          cardNumber: '',
          prescript_number: '',
          prescription: [],
          shouldMoney: '',
          exactMoney: '',
          theChange: ''
        },
        number: '',   // 处方编号 （被监听）
        isShow: '',   // 存放处方编号在被监听的过程中的最终值
        showMoney: false,
        showChange: false,
        patients: [],  // 存放患者信息
        rules: {
          patientName: [
            {required: true, validator: checkName, trigger: 'blur'}
          ],
          certificate_value: [
            { required: true, message: '请输入证件号码', trigger: 'change' }
          ],
          cardNumber: [
            {required: true, validator: checkCertificate, trigger: 'blur'}
          ],
          prescript_number: [
            {required: true, validator: checkPrescription, trigger: 'blur'}
          ],
          exactMoney: [
            {required: true, validator: checkexactMoney, trigger: 'blur'}
          ]
        }
      };
    },
    created () {
      let takecashThis = this;
      takecashThis.$http.get(api.patientList).then((response) => {
        // 把json接口获取的数据赋给当前对象
        takecashThis.patients = response.data.tableData;
      }, response => {
        // error callback
        takecashThis.$notify.error({
          message: '数据请求失败'
        });
      });
    },
    methods: {
      // 计算应收金额
      compute () {
        this.showMoney = true;
        this.$refs.takecashForm.validate((valid) => {
          if (!valid) {
            this.$notify.error({
              message: '请检查所有的必要信息填写！'
            });
          }
        });
      },
      // 重置
      resetForm (formName) {
        this.$refs.takecashForm.resetFields();
        this.isShow = '';
        this.number = '';
        this.showMoney = false;
        this.showChange = false;
      },
      // 找零
      change () {
        this.$refs.takecashForm.validate((valid) => {
          if (valid) {
            if ((this.takecash.exactMoney - this.takecash.shouldMoney) < 0) {
              this.takecash.theChange = '实收金额有误！';
              this.showChange = true;
            } else {
              if (this.takecash.shouldMoney === '') {
                this.showChange = false;
              } else {
                this.takecash.theChange = this.takecash.exactMoney - this.takecash.shouldMoney;
                this.showChange = true;
              }
            }
          } else {
            this.$notify.error({
              message: '请检查所有的必要信息填写！'
            });
          }
        });
      }
    },
    // 实时监听number，当输入处方编号时，开始执行下面的操作
    // 如果能找到该处方编号，则把处方里的药品信息拿出来存在prescription[]数组里
    // 同时把处方编号赋值给this.isShow，以便前面的判断是否要把数据表格展示出来
    watch: {
      number: function () {
        this.takecash.prescript_number = this.number;

        for (let i = 0; i < this.patients.length; i++) {
          if (this.patients[i].number === this.number) {
            this.takecash.prescription = this.patients[i].prescription.drug;
            this.isShow = this.patients[i].number;
            // 暂时写死数据
            this.takecash.shouldMoney = 320;
          }
        }
      }
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  .takecash 
    .takecash-title
      font-weight: bold
      font-size: 28px
      width: 50%
      margin: 0 auto
      text-align: center
      padding-bottom: 40px
    .takecash-ruleForm
      width: 50%
      margin: 0 auto
      .el-form-item
        width: 100%
        .el-select
          width: 100%
      .takecash_p
        overflow: hidden
        padding-left: 30px
        padding-top: 20px
        .shouldMoney
          float: left
          display: inline-block
          width:80%
          /*top: 325px*/
          /*right: 335px*/
        .theChange
          float: left
          width:81%
          margin-left: 25px
          display: inline-block
        .computeBtn
          float: left
          display: inline-block
        .changeBtn
          display: inline-block
          float: left
          /*top: 460px*/
          /*right: 335px*/
      .exactMoney
          margin-left: 20px
          width: 100%
        .money
          font-size: 20px
          color: black
          font-weight: bold
      .reset
        margin-left: 45%
        margin-top: 50px
        
</style>
