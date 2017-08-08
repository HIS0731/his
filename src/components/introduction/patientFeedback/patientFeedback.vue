<template>
  <div class="patientFeedback">
    <span class="title">安逸医院患者满意度调查表</span>
    <div class="form">
      <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="调查日期" required>
           <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择调查日期" v-model="ruleForm.date1" style="width: 150px;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="住院日期" required>
           <el-col :span="11">
            <el-form-item prop="date2">
              <el-date-picker type="date" placeholder="选择住院日期" v-model="ruleForm.date2" style="width: 150px;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
          <div class="checkbox">
          <span class="question">问题一：您对医院的总的印象如何？</span>
            <label v-for="item in list1">
            <input
            type="checkbox"
            v-model="toggle1"
            name="list1"
            :true-value="item"
            :false-value="b">{{item.number1}}
            </label>
          </div>

          <div class="checkbox">
          <span class="question">问题二：您对医院工作人员的服务态度总体上是否满意？</span>
            <label v-for="item in list2">
            <input
            type="checkbox"
            v-model="toggle2"
            name="list2"
            :true-value="item"
            :false-value="b">{{item.number2}}
            </label>
          </div>

          <div class="checkbox">
          <span class="question">问题三：您对医院提供的诊疗技术是否满意？</span>
            <label v-for="item in list3">
            <input
            type="checkbox"
            v-model="toggle3"
            name="list3"
            :true-value="item"
            :false-value="b">{{item.number3}}
            </label>
          </div>

          <div class="checkbox">
          <span class="question">问题四：您对医院的就诊环境是否满意？</span>
            <label v-for="item in list4">
            <input
            type="checkbox"
            v-model="toggle4"
            name="list4"
            :true-value="item"
            :false-value="b">{{item.number4}}
            </label>
          </div>

          <div class="checkbox">
          <span class="question">问题五：您对医院的服务设施是否满意？</span>
            <label v-for="item in list5">
            <input
            type="checkbox"
            v-model="toggle5"
            name="list5"
            :true-value="item"
            :false-value="b">{{item.number5}}
            </label>
          </div>

          <div class="checkbox">
          <span class="question">问题六：您认为医院是否存在违规收费行为？</span>
            <label v-for="item in list6">
            <input
            type="checkbox"
            v-model="toggle6"
            name="list6"
            :true-value="item"
            :false-value="b">{{item.number6}}
            </label>
          </div>

          <div class="checkbox">
          <span class="question">问题七：您或您的家属在予以就诊或住院过程中，是否宴请过该医院医务人员？</span>
            <label v-for="item in list7">
            <input
            type="checkbox"
            v-model="toggle7"
            name="list7"
            :true-value="item"
            :false-value="b">{{item.number7}}
            </label>
          </div>

          <div class="checkbox">
          <span class="question">问题八：您认为医院是尊重、关爱患者，做到主动、热情、周到、文明服务？</span>
            <label v-for="item in list8">
            <input
            type="checkbox"
            v-model="toggle8"
            name="list8"
            :true-value="item"
            :false-value="b">{{item.number8}}
            </label>
          </div>

          <div class="checkbox">
          <span class="question">问题九：您询问医务人员或有意见向医院投诉，医院工作人员是否热情接待，耐心解释？</span>
            <label v-for="item in list9">
            <input
            type="checkbox"
            v-model="toggle9"
            name="list9"
            :true-value="item"
            :false-value="b">{{item.number9}}
            </label>
          </div>

          <div class="checkbox">
          <span class="question">问题十：您或您的家属在医院就诊时，是否被医生推诿、拒绝过？</span>
            <label v-for="item in list10">
            <input
            type="checkbox"
            v-model="toggle10"
            name="list10"
            :true-value="item"
            :false-value="b">{{item.number10}}
            </label>
          </div>

          <div class="checkbox">
          <span class="question">问题十一：您认为医院是否做到“一切以病人为中心”？</span>
            <label v-for="item in list11">
            <input
            type="checkbox"
            v-model="toggle11"
            name="list11"
            :true-value="item"
            :false-value="b">{{item.number11}}
            </label>
          </div>
      <el-form>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        list1: [
          {number1: '满意'},
          {number1: '基本满意'},
          {number1: '不满意'}
        ],
        list2: [
          {number2: '满意'},
          {number2: '基本满意'},
          {number2: '不满意'}
        ],
        list3: [
          {number3: '满意'},
          {number3: '基本满意'},
          {number3: '不满意'}
        ],
        list4: [
          {number4: '满意'},
          {number4: '基本满意'},
          {number4: '不满意'}
        ],
        list5: [
          {number5: '满意'},
          {number5: '基本满意'},
          {number5: '不满意'}
        ],
        list6: [
          {number6: '是'},
          {number6: '否'},
          {number6: '其他'}
        ],
        list7: [
          {number7: '是'},
          {number7: '否'},
          {number7: '其他'}
        ],
        list8: [
          {number8: '是'},
          {number8: '否'},
          {number8: '其他'}
        ],
        list9: [
          {number9: '是'},
          {number9: '否'},
          {number9: '其他'}
        ],
        list10: [
          {number10: '是'},
          {number10: '否'},
          {number10: '其他'}
        ],
        list11: [
          {number11: '是'},
          {number11: '否'},
          {number11: '其他'}
        ],
        toggle1: {number1: ''},
        toggle2: {number2: ''},
        toggle3: {number3: ''},
        toggle4: {number4: ''},
        toggle5: {number5: ''},
        toggle6: {number6: ''},
        toggle7: {number7: ''},
        toggle8: {number8: ''},
        toggle9: {number9: ''},
        toggle10: {number10: ''},
        toggle11: {number11: ''},
        b: {},
        ruleForm: {
          date1: '',
          date2: ''
        },
        rules: {
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      onSubmit (formName) {
        this.timeFormat();
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('提交成功!');
            console.log(this.ruleForm);
          } else {
            alert('提交失败!!');
            return false;
          }
        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      timeFormat () {
        let oldDate1 = this.ruleForm.date1;
        let oldDate2 = this.ruleForm.date2;
        let year1 = new Date(oldDate1).getFullYear();
        let month1 = new Date(oldDate1).getMonth() + 1;
        let day1 = new Date(oldDate1).getDate();
        let year2 = new Date(oldDate2).getFullYear();
        let month2 = new Date(oldDate2).getMonth() + 1;
        let day2 = new Date(oldDate2).getDate();
        let dateFormat1 = year1 + '-' + month1 + '-' + day1;
        let dateFormat2 = year2 + '-' + month2 + '-' + day2;
        console.log(dateFormat1);
        console.log(dateFormat2);
      }
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  .patientFeedback .title
    font-size:24px
    margin-left:300px
  .patientFeedback .form
     margin-top:80px
  .patientFeedback
    height:920px
    width:1000px
    margin:auto
    border:1px solid black
  .patientFeedback .checkbox
    padding-bottom:50px
  .patientFeedback .question
    padding-right:100px

</style>