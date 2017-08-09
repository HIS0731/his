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
        <el-form-item label="就诊日期" required>
           <el-col :span="11">
            <el-form-item prop="date2">
              <el-date-picker type="date" placeholder="选择就诊日期" v-model="ruleForm.date2" style="width: 150px;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>      
      </el-form>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="问题一：您对医院的总的印象如何？" prop="answer" required>
          <el-checkbox-group v-model="ruleForm.answer1" :max="1">
            <el-checkbox label="checkbox1" name="answer">满意</el-checkbox>
            <el-checkbox label="checkbox2" name="answer">基本满意</el-checkbox>
            <el-checkbox label="checkbox3" name="answer">不满意</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="问题二：您对医院工作人员的服务态度总体上是否满意？" prop="answer" required>
          <el-checkbox-group v-model="ruleForm.answer2" :max="1">
            <el-checkbox label="checkbox1" name="answer">满意</el-checkbox>
            <el-checkbox label="checkbox2" name="answer">基本满意</el-checkbox>
            <el-checkbox label="checkbox3" name="answer">不满意</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="问题三：您对医院提供的诊疗技术是否满意？" prop="answer" required>
          <el-checkbox-group v-model="ruleForm.answer3" :max="1">
            <el-checkbox label="checkbox1" name="answer">满意</el-checkbox>
            <el-checkbox label="checkbox2" name="answer">基本满意</el-checkbox>
            <el-checkbox label="checkbox3" name="answer">不满意</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="问题四：您对医院的就诊环境是否满意？" prop="answer" required>
          <el-checkbox-group v-model="ruleForm.answer4" :max="1">
            <el-checkbox label="checkbox1" name="answer">满意</el-checkbox>
            <el-checkbox label="checkbox2" name="answer">基本满意</el-checkbox>
            <el-checkbox label="checkbox3" name="answer">不满意</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="问题五：您对医院的服务设施是否满意？" prop="answer" required>
          <el-checkbox-group v-model="ruleForm.answer5" :max="1">
            <el-checkbox label="checkbox1" name="answer">满意</el-checkbox>
            <el-checkbox label="checkbox2" name="answer">基本满意</el-checkbox>
            <el-checkbox label="checkbox3" name="answer">不满意</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="问题六：您认为医院是否存在违规收费行为？" prop="answer" required>
          <el-checkbox-group v-model="ruleForm.answer6" :max="1">
            <el-checkbox label="checkbox1" name="answer">是</el-checkbox>
            <el-checkbox label="checkbox2" name="answer">否</el-checkbox>
            <el-checkbox label="checkbox3" name="answer">其他</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="问题七：您或您的家属在予以就诊或住院过程中，是否宴请过该医院医务人员？" prop="answer" required>
          <el-checkbox-group v-model="ruleForm.answer7" :max="1">
            <el-checkbox label="checkbox1" name="answer">是</el-checkbox>
            <el-checkbox label="checkbox2" name="answer">否</el-checkbox>
            <el-checkbox label="checkbox3" name="answer">其他</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="问题八：您认为医院是尊重、关爱患者，做到主动、热情、周到、文明服务？" prop="answer" required>
          <el-checkbox-group v-model="ruleForm.answer8" :max="1">
           <el-checkbox label="checkbox1" name="answer">是</el-checkbox>
            <el-checkbox label="checkbox2" name="answer">否</el-checkbox>
            <el-checkbox label="checkbox3" name="answer">其他</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="问题九：您询问医务人员或有意见向医院投诉，医院工作人员是否热情接待，耐心解释？" prop="answer" required>
          <el-checkbox-group v-model="ruleForm.answer9" :max="1">
            <el-checkbox label="checkbox1" name="answer">是</el-checkbox>
            <el-checkbox label="checkbox2" name="answer">否</el-checkbox>
            <el-checkbox label="checkbox3" name="answer">其他</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="问题十：您或您的家属在医院就诊时，是否被医生推诿、拒绝过？" prop="answer" required>
          <el-checkbox-group v-model="ruleForm.answer10" :max="1">
            <el-checkbox label="checkbox1" name="answer">是</el-checkbox>
            <el-checkbox label="checkbox2" name="answer">否</el-checkbox>
            <el-checkbox label="checkbox3" name="answer">其他</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="问题十一：您认为医院是否做到“一切以病人为中心”？" prop="answer" required>
          <el-checkbox-group v-model="ruleForm.answer11" :max="1">
            <el-checkbox label="checkbox1" name="answer">是</el-checkbox>
            <el-checkbox label="checkbox2" name="answer">否</el-checkbox>
            <el-checkbox label="checkbox3" name="answer">其他</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>

      
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
        ruleForm: {
          date1: '',
          date2: '',
          answer1: [],
          answer2: [],
          answer3: [],
          answer4: [],
          answer5: [],
          answer6: [],
          answer7: [],
          answer8: [],
          answer9: [],
          answer10: [],
          answer11: []
        },
        rules: {
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          answer1: [
            { required: true, message: '  请只选择一个', trigger: 'blur' }
          ],
          answer2: [
            { required: true, message: '  请只选择一个', trigger: 'change' }
          ],
          answer3: [
            { required: true, message: '  请只选择一个', trigger: 'change' }
          ],
          answer4: [
            { required: true, message: '  请只选择一个', trigger: 'change' }
          ],
          answer5: [
            { required: true, message: '  请只选择一个', trigger: 'change' }
          ],
          answer6: [
            { required: true, message: '  请只选择一个', trigger: 'change' }
          ],
          answer7: [
            { required: true, message: '  请只选择一个', trigger: 'change' }
          ],
          answer8: [
            { required: true, message: '  请只选择一个', trigger: 'change' }
          ],
          answer9: [
            { required: true, message: '  请只选择一个', trigger: 'change' }
          ],
          answer10: [
            { required: true, message: '  请只选择一个', trigger: 'change' }
          ],
          answer11: [
            { required: true, message: '  请只选择一个', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      onSubmit (formName) {
        this.timeFormat();
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({
              message: '提交成功！',
              type: 'success'
            });
            console.log(this.ruleForm);
          } else {
            this.$message.error('提交失败，请重新填写！');
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
        console.log('调查日期：', dateFormat1);
        console.log('就诊日期：', dateFormat2);
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
    height:850px
    width:900px
    margin:auto
    border:1px solid black
  .patientFeedback .checkbox
    padding-bottom:50px
  .patientFeedback .question
    padding-right:100px

</style>