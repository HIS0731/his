<template>
  <div class="addPatient">
    <el-form :model="ruleForm" class="demo-ruleForm" ref="ruleForm" :rules="rules" label-width="100px" >
      <h1 class="record">
        新建患者档案资料:
        <span class="demonstration">建档日期</span>
        <el-date-picker v-model="ruleForm.date" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
      </h1>
      <br><br>
      <el-form :inline="true" class="demo-ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="患者姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="患者来源：" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择患者来源">
              <el-option label="挂号" value="guahao"></el-option>
              <el-option label="门诊" value="menzhen"></el-option>
              <el-option label="急诊" value="jizhen"></el-option>
              <el-option label="化验" value="huayan"></el-option>
              <el-option label="手术" value="shoushu"></el-option>
              <el-option label="住院" value="huayan"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="身份证号" prop="idCard">
            <el-input v-model="ruleForm.idCard"></el-input>
          </el-form-item>
      </el-form>
      <el-form :inline="true" class="demo-ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="患者年龄" prop="age">
          <el-input v-model="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input> 
        </el-form-item>
        <el-form-item label="患者性别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio :label="1" label-width="150px">男</el-radio>
            <el-radio :label="2" label-width="150px">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-form :inline="true" class="demo-ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="家庭地址" prop="address">
          <el-select  @click.native="selectProvice" v-model="ruleForm.province" placeholder="选择省份">
            <el-option v-for="item in ruleForm.provinces" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size:13px">{{ item.value }}</span>
            </el-option>
          </el-select>
          <el-select v-model="ruleForm.city" placeholder="选择城市份">
            <el-option label="广州" value="1"></el-option>
            <el-option label="湖北" value="2"></el-option>
            <el-option label="四川" value="3"></el-option>
          </el-select>
          <el-input v-model="ruleForm.moreAddress" placeholder="更加详细地址" label-width:200px></el-input>
        </el-form-item>
      </el-form>
      <br>
      <h3>联系人资料</h3><br>
      <el-form :inline="true" class="demo-ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="联系人姓名">
          <el-input v-model="ruleForm.Name" prop="Name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="ruleForm.Phone" prop="Phone"></el-input>
        </el-form-item>
        <el-form-item label="与患者关系" prop="relation">
          <el-select v-model="ruleForm.relation" placeholder="与患者关系">
            <el-option label="父子" value="1"></el-option>
            <el-option label="父女" value="2"></el-option>
            <el-option label="母子" value="3"></el-option>
            <el-option label="母女" value="4"></el-option>
            <el-option label="兄弟" value="5"></el-option>
            <el-option label="姐妹" value="6"></el-option>
            <el-option label="亲戚" value="7"></el-option>
            <el-option label="朋友" value="8"></el-option>
            <el-option label="监护人" value="9"></el-option>
            <el-option label="其他" value="10"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :inline="true" class="demo-ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="目前的身体状况" prop="symptoms">
          <el-input type="textarea" v-model="ruleForm.symptoms"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" class="demo-ruleForm" ref="ruleForm" :rules="rules">
        <h3>是否有病史？如果有，请简单说明</h3><br>
        <el-form-item label="病史简单说明" prop="illHistory">
          <el-input type="textarea" v-model="ruleForm.illHistory"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" class="demo-ruleForm" ref="ruleForm" :rules="rules">
        <h3>医生信息</h3>
        <el-form-item label="主治医生姓名" prop="mainDoctor">
          <el-input v-model="ruleForm.mainDoctor"></el-input>
        </el-form-item>
        <el-form-item label="科室" prop="department">
          <el-select v-model="ruleForm.department" placeholder="选择科室">
            <el-option label="外科" value="1"></el-option>
            <el-option label="内科" value="2"></el-option>
            <el-option label="妇产科" value="3"></el-option>
            <el-option label="骨科" value="4"></el-option>
            <el-option label="儿科学" value="5"></el-option>
            <el-option label="其他" value="6"></el-option>
          </el-select>
        </el-form-item>
      </el-form><br>
      <el-form :inline="true" class="demo-ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item class="center">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="offReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-form>
  </div>
  
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        ruleForm: {
          date: '',
          name: '',
          region: '',
          idCard: '',
          sex: 2,
          age: '',
          phone: '',
          Name: '',
          Phone: '',
          relation: '',
          address: '',
          province: '',
          provinces: [],
          city: '',
          moreAddress: '',
          symptoms: '',
          mainDoctor: '',
          department: ''
        },
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() < Date.now - 8.64e7;
          }
        },
        rules: {
          name: [
            { required: true, message: '请输入患者姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          age: [
            {required: true, message: '请输入患者年龄', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入患者的联系方式', trigger: 'blur'},
            {min: 7, max: 11, message: '号码长度不对', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      onSubmit () {
        // let me = this;
        // this.$http.post('../../static/patient/addPatient.json').then(function (response) {
        //   console.log('这是我们需要的json数据', response.ruleForm);
        //   me.ruleForm = me.data.ruleForm;
        // }, function (response) {
        //   alert('请求失败了');
        // });
        console.log('您修改后的参数为：', JSON.stringify(this.ruleForm));
      },
      offReset () {
        this.ruleForm = {
          date: '',
          name: '',
          region: '',
          idCard: '',
          sex: 2,
          age: '',
          phone: '',
          Name: '',
          Phone: '',
          relation: '',
          address: '',
          province: '',
          city: '',
          moreAddress: '',
          symptoms: '',
          mainDoctor: '',
          department: ''
        };
      },
      selectProvice () {
        console.log('hi');
        let me = this;
        this.$http.get('../../static/patient/provinces.json').then(function (response) {
          console.log('这是我们需要的json数据', response.privinces);
          me.privinces = response.data.privinces;
          console.log(me.privinces);
        }, function (response) {
          alert('请求失败了');
        });
      }
    }
  };

</script>
<!-- <script src="https://unpkg.com/vue"></script> -->
<style lang="stylus-loader" rel="stylesheet/stylus">
  .el-input, .el-input__inner {
    display: inline-block;
    width: 192px;
  }
  .el-form-item{
    padding-right: 30px;
  }

  .el-form{
    padding-bottom: 20px;
  }
  .el-textarea__inner{
    width: 500px;
  }
  .center{
    padding-left: 200px;
  }
  .demonstration{
    color: #333;
    font-size: 24px;
  }
  .record{
    color: red;
    font-size: 28px;
  }
</style>
