<template>
  <div class="hospitalized">
    <h3 class="h3">建立住院患者档案</h3><br>

    <el-form :model="ruleForm" class="demo-ruleForm" ref="ruleForm" label-width="100px" >
      <el-form :inline="true">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true">
        <el-form-item label="年龄" prop="age">
          <el-input v-model="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="ruleForm.idCard"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true">
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio :label="1" label-width="150px">男</el-radio>
            <el-radio :label="2" label-width="150px">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="家庭地址" prop="address" style="margin-left:35px;">
          <el-input type="textarea"  v-model="ruleForm.address" class="address"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true">
        <el-form-item label="主治医生" prop="doctor">
          <el-select v-model="ruleForm.doctor" placeholder="请选择主治医生">
            <el-option v-for="item in ruleForm.doctors" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="照看护士" prop="nurse">
          <el-select v-model="ruleForm.nurse" placeholder="请选择照看护士">
            <el-option v-for="nurse in ruleForm.nurses" :key="nurse.value" :label="nurse.label" :value="nurse.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :inline="true">
        <el-form-item label="患者病情" prop="illness">
          <el-input type="textarea" v-model="ruleForm.illness" class="illness"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true">
        <el-form-item label="治疗情况" prop="treatment">
          <el-input type="textarea" v-model="ruleForm.treatment" class="illness"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true">
        <el-form-item label="用药情况" prop="medication">
          <el-input type="textarea" v-model="ruleForm.medication" class="illness"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true">
        <el-form-item label="注意事项" prop="attention">
          <el-input type="textarea" v-model="ruleForm.attention" class="illness"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true">
        <el-form-item label="住院时间" prop="inTime">
          <el-date-picker v-model="ruleForm.inTime" type="date" placeholder="选择住院日期" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item label="出院时间" prop="outTime">
          <el-date-picker v-model="ruleForm.outTime" type="date" placeholder="选择出院日期" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
      </el-form>
      <el-form :inline="true">
        <el-form-item label="住院地址" prop="room">
          <el-select v-model="ruleForm.room" placeholder="住院的房间">
            <el-option label="住院部一号楼210" value="1"></el-option>
            <el-option label="住院部一号楼211" value="2"></el-option>
            <el-option label="住院部一号楼212" value="3"></el-option>
            <el-option label="住院部一号楼213" value="4"></el-option>
            <el-option label="住院部一号楼214" value="5"></el-option>
            <el-option label="住院部一号楼215" value="6"></el-option>
            <el-option label="住院部一号楼216" value="7"></el-option>
            <el-option label="住院部一号楼217" value="8"></el-option>
            <el-option label="住院部一号楼218" value="9"></el-option>
            <el-option label="住院部一号楼219" value="10"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="住院费用" prop="cost">
          <el-input v-model="ruleForm.cost"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true">
        <el-form-item style="margin-left:300px;">
          <el-button @click="onSubmit" type="primary">立即建立</el-button>
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
        name: '',
        age: '',
        idCard: '',
        sex: 2,
        address: '',
        doctor: '',
        doctors: [
          {
            value: 'wangxiaogang',
            label: '王小刚'
          },
          {
            value: 'xiejunru',
            label: '谢君如'
          },
          {
            value: 'liaojuntao',
            label: '廖俊涛'
          },
          {
            value: 'maobuyi',
            label: '毛不易'
          },
          {
            value: 'luobocaiwang',
            label: '萝卜财旺'
          },
          {
            value: 'zengming',
            label: '曾明'
          },
          {
            value: 'chenwang',
            label: '陈旺'
          },
          {
            value: 'laodong',
            label: '劳动'
          }],
        nurse: '',
        nurses: [
          {
            value: 'wangxiaoli',
            label: '王小丽'
          },
          {
            value: 'xieduoduo',
            label: '谢多多'
          },
          {
            value: 'liaoxiaodan',
            label: '廖小单'
          },
          {
            value: 'lixiaohuai',
            label: '李晓华'
          },
          {
            value: 'lilihua',
            label: '李丽华'
          },
          {
            value: 'zenxuefan',
            label: '曾雪帆'
          },
          {
            value: 'chenshaowen',
            label: '陈少文'
          },
          {
            value: 'caiyuling',
            label: '蔡玉玲'
          }
        ],
        illness: '',
        treatment: '',
        medication: '',
        attention: '',
        room: '',
        inTime: '',
        outTime: '',
        cost: ''
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now - 8.64e7;
        }
      }
    };
  },
  methods: {
    onSubmit () {
      console.log('您修改后的参数为：', JSON.stringify(this.ruleForm));
    },
    offReset () {
      this.ruleForm = {
        name: '',
        age: '',
        idCard: '',
        sex: 2,
        address: '',
        doctor: '',
        doctors: [
          {
            value: 'wangxiaogang',
            label: '王小刚'
          },
          {
            value: 'xiejunru',
            label: '谢君如'
          },
          {
            value: 'liaojuntao',
            label: '廖俊涛'
          },
          {
            value: 'maobuyi',
            label: '毛不易'
          },
          {
            value: 'luobocaiwang',
            label: '萝卜财旺'
          },
          {
            value: 'zengming',
            label: '曾明'
          },
          {
            value: 'chenwang',
            label: '陈旺'
          },
          {
            value: 'laodong',
            label: '劳动'
          }],
        nurse: '',
        nurses: [
          {
            value: 'wangxiaoli',
            label: '王小丽'
          },
          {
            value: 'xieduoduo',
            label: '谢多多'
          },
          {
            value: 'liaoxiaodan',
            label: '廖小单'
          },
          {
            value: 'lixiaohuai',
            label: '李晓华'
          },
          {
            value: 'lilihua',
            label: '李丽华'
          },
          {
            value: 'zenxuefan',
            label: '曾雪帆'
          },
          {
            value: 'chenshaowen',
            label: '陈少文'
          },
          {
            value: 'caiyuling',
            label: '蔡玉玲'
          }
        ],
        illness: '',
        treatment: '',
        medication: '',
        attention: '',
        room: '',
        inTime: '',
        outTime: '',
        cost: ''
      };
    }
  }
};
</script>
<style type="text/css">
  .hospitalized .el-input,.hospitalized .el-input__inner {
    width: 195px;
    display: inline-block;
}
  .hospitalized .el-radio {
    padding-left: 35px;
  }
  .hospitalized .el-form--inline .el-form-item{
    margin-right: 150px;
  }
  .hospitalized .address{
    width: 350px;
  }
  .hospitalized .illness{
    width: 740px;
  }
  .hospitalized .h3{
    font-size: 24px;
  }
  .hospitalized .demo-ruleForm{
    margin-left: 50px;
  }
</style>
