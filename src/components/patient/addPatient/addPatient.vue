<template>
  <div class="addPatient">
    <el-form :model="ruleForm" class="demo-ruleForm" ref="ruleForm" :rules="rules" label-width="100px" >
      <h1 class="record">
        新建患者档案:
        <span class="demonstration">建档日期</span>
        <el-date-picker v-model="ruleForm.date" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
      </h1>
      <br><br>
      <div>
        <el-form-item label="患者姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="患者来源" prop="region">
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
      </div>
      <div>
        <el-form-item label="患者年龄" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
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
      </div>
      <div>
        <el-form-item label="家庭地址" prop="address">
          <el-select v-model="ruleForm.selectProvince" placeholder="选择省份" v-on:change="getProv($event)">
            <el-option v-for="item in ruleForm.provinces" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="ruleForm.selectCity" v-if="ruleForm.province!==''" placeholder="选择城市份" v-on:change="getCity($event)">
            <el-option v-for="item in ruleForm.citys" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-input v-model="ruleForm.moreAddress" placeholder="更加详细地址" label-width:200px></el-input>
        </el-form-item>
      </div>
      <br>
      <h3>联系人资料</h3><br>
      <div>
        <el-form-item label="联系人姓名">
          <el-input v-model="ruleForm.Name" prop="Name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model.number="ruleForm.Phone" prop="Phone"></el-input>
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
      </div>
      <div>
        <el-form-item label="目前身体状况" prop="symptoms">
          <el-input type="textarea" v-model="ruleForm.symptoms"></el-input>
        </el-form-item>
      </div>
      <div>
        <h3>是否有病史？如果有，请简单说明</h3><br>
        <el-form-item label="病史简单说明" prop="illHistory">
          <el-input type="textarea" v-model="ruleForm.illHistory"></el-input>
        </el-form-item>
      </div>
      <div>
        <h3>医生信息</h3>
        <el-form-item label="主治医生姓名" prop="mainDoctor">
          <el-input v-model="ruleForm.doctor"></el-input>
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
      </div>
      <div>
        <el-form-item class="center">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <!-- <el-button @click="offReset">重置</el-button> -->
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    let checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      };
      setTimeout(() => {
        if (/^\d+$/.test(value) === false) {
          callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      }, 300);
    };
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名不能为空'));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('电话不能为空'));
      };
      setTimeout(() => {
        if (/^\d+$/.test(value) === false) {
          callback(new Error('请输入数字值'));
        } else if (value.length > 11) {
          callback(new Error('请输入正确号码'));
        } else {
          callback();
        }
      }, 500);
    };
    var checkidCard = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('身份证号不能为空'));
      };
      setTimeout(() => {
        if (/^(\w){6,20}$/.test(value) === false) {
          callback(new Error('请输入正确身份证号码'));
        } else {
          callback();
        }
      }, 500);
    };
    // var checkAddress = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('家庭地址不能为空'));
    //   } else {
    //     callback();
    //   }
    // };
    // var checkSex = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('一定要选择性别'));
    //   };
    // };
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
        selectProvince: '',
        provinces: [{
          label: '北京市',
          value: '北京市'
        }, {
          label: '天津市',
          value: '天津市'
        }, {
          label: '河北省',
          value: '河北省'
        }, {
          label: '山西省',
          value: '山西省'
        }, {
          label: '内蒙古自治区',
          value: '内蒙古自治区'
        }, {
          label: '辽宁省',
          value: '辽宁省'
        }, {
          label: '吉林省',
          value: '吉林省'
        }, {
          label: '黑龙江省',
          value: '黑龙江省'
        }, {
          label: '上海市',
          value: '上海市'
        }, {
          label: '江苏省',
          value: '江苏省'
        }, {
          label: '浙江省',
          value: '浙江省'
        }, {
          label: '安徽省',
          value: '安徽省'
        }, {
          label: '福建省',
          value: '福建省'
        }, {
          label: '江西省',
          value: '江西省'
        }, {
          label: '山东省',
          value: '山东省'
        }, {
          label: '河南省',
          value: '河南省'
        }, {
          label: '湖北省',
          value: '湖北省'
        }, {
          label: '湖南省',
          value: '湖南省'
        }, {
          label: '广东省',
          value: '广东省'
        }, {
          label: '广西壮族自治区',
          value: '广西壮族自治区'
        }, {
          label: '海南省',
          value: '海南省'
        }, {
          label: '重庆市',
          value: '重庆市'
        }, {
          label: '四川省',
          value: '四川省'
        }, {
          label: '贵州省',
          value: '贵州省'
        }, {
          label: '云南省',
          value: '云南省'
        }, {
          label: '西藏自治区',
          value: '西藏自治区'
        }, {
          label: '陕西省',
          value: '陕西省'
        }, {
          label: '甘肃省',
          value: '甘肃省'
        }, {
          label: '青海省',
          value: '青海省'
        }, {
          label: '宁夏回族自治区',
          value: '宁夏回族自治区'
        }, {
          label: '新疆维吾尔自治区',
          value: '新疆维吾尔自治区'
        }, {
          label: '台湾省',
          value: '台湾省'
        }, {
          label: '香港特别行政区',
          value: '香港特别行政区'
        }, {
          label: '澳门特别行政区',
          value: '澳门特别行政区'
        }],
        selectCity: '',
        citys: [],
        moreAddress: '',
        symptoms: '',
        doctor: '',
        department: ''
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now - 8.64e7;
        }
      },
      rules: {
        name: [
          { required: true, validator: checkName, trigger: 'blur' }
        ],
        age: [
          { required: true, validator: checkAge, trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: checkPhone, trigger: 'blur' }
        ],
        region: [
          { required: true, trigger: 'blur' }
        ],
        idCard: [
          { required: true, validator: checkidCard, trigger: 'blur' }
        ],
        sex: [
          { required: true, trigger: 'blur' }
        ]
        // address: [
        //   { required: true }
        // ]
      }
    };
  },
  methods: {
    getProv: function (province) {
      let tempCity = [];
      this.ruleForm.citys = [];
      this.ruleForm.selectCity = '';
      var allCity = [{
        province: '北京市',
        label: '北京市'
      }, {
        province: '天津市',
        label: '天津市'
      }, {
        province: '河北省',
        label: '石家庄市'
      }, {
        province: '河北省',
        label: '唐山市'
      }, {
        province: '河北省',
        label: '秦皇岛市'
      }, {
        province: '河北省',
        label: '邯郸市'
      }, {
        province: '河北省',
        label: '邢台市'
      }, {
        province: '河北省',
        label: '保定市'
      }, {
        province: '河北省',
        label: '张家口市'
      }, {
        province: '河北省',
        label: '承德市'
      }, {
        province: '河北省',
        label: '沧州市'
      }, {
        province: '河北省',
        label: '廊坊市'
      }, {
        province: '河北省',
        label: '衡水市'
      }, {
        province: '山西省',
        label: '太原市'
      }, {
        province: '山西省',
        label: '大同市'
      }, {
        province: '山西省',
        label: '阳泉市'
      }, {
        province: '山西省',
        label: '长治市'
      }, {
        province: '山西省',
        label: '晋城市'
      }, {
        province: '山西省',
        label: '朔州市'
      }, {
        province: '山西省',
        label: '晋中市'
      }, {
        province: '山西省',
        label: '运城市'
      }, {
        province: '山西省',
        label: '忻州市'
      }, {
        province: '山西省',
        label: '临汾市'
      }, {
        province: '山西省',
        label: '吕梁市'
      }, {
        province: '内蒙古自治区',
        label: '呼和浩特市'
      }, {
        province: '内蒙古自治区',
        label: '包头市'
      }, {
        province: '内蒙古自治区',
        label: '乌海市'
      }, {
        province: '内蒙古自治区',
        label: '赤峰市'
      }, {
        province: '内蒙古自治区',
        label: '通辽市'
      }, {
        province: '内蒙古自治区',
        label: '鄂尔多斯市'
      }, {
        province: '内蒙古自治区',
        label: '呼伦贝尔市'
      }, {
        province: '内蒙古自治区',
        label: '巴彦淖尔市'
      }, {
        province: '内蒙古自治区',
        label: '乌兰察布市'
      }, {
        province: '内蒙古自治区',
        label: '兴安盟'
      }, {
        province: '内蒙古自治区',
        label: '锡林郭勒盟'
      }, {
        province: '内蒙古自治区',
        label: '阿拉善盟'
      }, {
        province: '辽宁省',
        label: '沈阳市'
      }, {
        province: '辽宁省',
        label: '大连市'
      }, {
        province: '辽宁省',
        label: '鞍山市'
      }, {
        province: '辽宁省',
        label: '抚顺市'
      }, {
        province: '辽宁省',
        label: '本溪市'
      }, {
        province: '辽宁省',
        label: '丹东市'
      }, {
        province: '辽宁省',
        label: '锦州市'
      }, {
        province: '辽宁省',
        label: '营口市'
      }, {
        province: '辽宁省',
        label: '阜新市'
      }, {
        province: '辽宁省',
        label: '辽阳市'
      }, {
        province: '辽宁省',
        label: '盘锦市'
      }, {
        province: '辽宁省',
        label: '铁岭市'
      }, {
        province: '辽宁省',
        label: '朝阳市'
      }, {
        province: '辽宁省',
        label: '葫芦岛市'
      }, {
        province: '吉林省',
        label: '长春市'
      }, {
        province: '吉林省',
        label: '吉林市'
      }, {
        province: '吉林省',
        label: '四平市'
      }, {
        province: '吉林省',
        label: '辽源市'
      }, {
        province: '吉林省',
        label: '通化市'
      }, {
        province: '吉林省',
        label: '白山市'
      }, {
        province: '吉林省',
        label: '松原市'
      }, {
        province: '吉林省',
        label: '白城市'
      }, {
        province: '吉林省',
        label: '延边朝鲜族自治州'
      }, {
        province: '黑龙江省',
        label: '哈尔滨市'
      }, {
        province: '黑龙江省',
        label: '齐齐哈尔市'
      }, {
        province: '黑龙江省',
        label: '鸡西市'
      }, {
        province: '黑龙江省',
        label: '鹤岗市'
      }, {
        province: '黑龙江省',
        label: '双鸭山市'
      }, {
        province: '黑龙江省',
        label: '大庆市'
      }, {
        province: '黑龙江省',
        label: '伊春市'
      }, {
        province: '黑龙江省',
        label: '佳木斯市'
      }, {
        province: '黑龙江省',
        label: '七台河市'
      }, {
        province: '黑龙江省',
        label: '牡丹江市'
      }, {
        province: '黑龙江省',
        label: '黑河市'
      }, {
        province: '黑龙江省',
        label: '绥化市'
      }, {
        province: '黑龙江省',
        label: '大兴安岭地区'
      }, {
        province: '上海市',
        label: '上海市'
      }, {
        province: '江苏省',
        label: '南京市'
      }, {
        province: '江苏省',
        label: '无锡市'
      }, {
        province: '江苏省',
        label: '徐州市'
      }, {
        province: '江苏省',
        label: '常州市'
      }, {
        province: '江苏省',
        label: '苏州市'
      }, {
        province: '江苏省',
        label: '南通市'
      }, {
        province: '江苏省',
        label: '连云港市'
      }, {
        province: '江苏省',
        label: '淮安市'
      }, {
        province: '江苏省',
        label: '盐城市'
      }, {
        province: '江苏省',
        label: '扬州市'
      }, {
        province: '江苏省',
        label: '镇江市'
      }, {
        province: '江苏省',
        label: '泰州市'
      }, {
        province: '江苏省',
        label: '宿迁市'
      }, {
        province: '浙江省',
        label: '杭州市'
      }, {
        province: '浙江省',
        label: '市宁波'
      }, {
        province: '浙江省',
        label: '温州市'
      }, {
        province: '浙江省',
        label: '嘉兴市'
      }, {
        province: '浙江省',
        label: '湖州市'
      }, {
        province: '浙江省',
        label: '绍兴市'
      }, {
        province: '浙江省',
        label: '金华市'
      }, {
        province: '浙江省',
        label: '衢州市'
      }, {
        province: '浙江省',
        label: '舟山市'
      }, {
        province: '浙江省',
        label: '台州市'
      }, {
        province: '浙江省',
        label: '丽水市'
      }, {
        province: '安徽省',
        label: '合肥市'
      }, {
        province: '安徽省',
        label: '芜湖市'
      }, {
        province: '安徽省',
        label: '蚌埠市'
      }, {
        province: '安徽省',
        label: '淮南市'
      }, {
        province: '安徽省',
        label: '马鞍山市'
      }, {
        province: '安徽省',
        label: '淮北市'
      }, {
        province: '安徽省',
        label: '铜陵市'
      }, {
        province: '安徽省',
        label: '安庆市'
      }, {
        province: '安徽省',
        label: '黄山市'
      }, {
        province: '安徽省',
        label: '滁州市'
      }, {
        province: '安徽省',
        label: '阜阳市'
      }, {
        province: '安徽省',
        label: '宿州市'
      }, {
        province: '安徽省',
        label: '六安市'
      }, {
        province: '安徽省',
        label: '亳州市'
      }, {
        province: '安徽省',
        label: '池州市'
      }, {
        province: '安徽省',
        label: '宣城市'
      }, {
        province: '福建省',
        label: '福州市'
      }, {
        province: '福建省',
        label: '厦门市'
      }, {
        province: '福建省',
        label: '莆田市'
      }, {
        province: '福建省',
        label: '三明市'
      }, {
        province: '福建省',
        label: '泉州市'
      }, {
        province: '福建省',
        label: '漳州市'
      }, {
        province: '福建省',
        label: '南平市'
      }, {
        province: '福建省',
        label: '龙岩市'
      }, {
        province: '福建省',
        label: '宁德市'
      }, {
        province: '江西省',
        label: '南昌市'
      }, {
        province: '江西省',
        label: '景德镇市'
      }, {
        province: '江西省',
        label: '萍乡市'
      }, {
        province: '江西省',
        label: '九江市'
      }, {
        province: '江西省',
        label: '新余市'
      }, {
        province: '江西省',
        label: '鹰潭市'
      }, {
        province: '江西省',
        label: '赣州市'
      }, {
        province: '江西省',
        label: '吉安市'
      }, {
        province: '江西省',
        label: '宜春市'
      }, {
        province: '江西省',
        label: '抚州市'
      }, {
        province: '江西省',
        label: '上饶市'
      }, {
        province: '山东省',
        label: '济南市'
      }, {
        province: '山东省',
        label: '青岛市'
      }, {
        province: '山东省',
        label: '淄博市'
      }, {
        province: '山东省',
        label: '枣庄市'
      }, {
        province: '山东省',
        label: '东营市'
      }, {
        province: '山东省',
        label: '烟台市'
      }, {
        province: '山东省',
        label: '潍坊市'
      }, {
        province: '山东省',
        label: '济宁市'
      }, {
        province: '山东省',
        label: '泰安市'
      }, {
        province: '山东省',
        label: '威海市'
      }, {
        province: '山东省',
        label: '日照市'
      }, {
        province: '山东省',
        label: '莱芜市'
      }, {
        province: '山东省',
        label: '临沂市'
      }, {
        province: '山东省',
        label: '德州市'
      }, {
        province: '山东省',
        label: '聊城市'
      }, {
        province: '山东省',
        label: '滨州市'
      }, {
        province: '山东省',
        label: '菏泽市'
      }, {
        province: '河南省',
        label: '郑州市'
      }, {
        province: '河南省',
        label: '开封市'
      }, {
        province: '河南省',
        label: '洛阳市'
      }, {
        province: '河南省',
        label: '平顶山市'
      }, {
        province: '河南省',
        label: '安阳市'
      }, {
        province: '河南省',
        label: '鹤壁市'
      }, {
        province: '河南省',
        label: '新乡市'
      }, {
        province: '河南省',
        label: '焦作市'
      }, {
        province: '河南省',
        label: '濮阳市'
      }, {
        province: '河南省',
        label: '许昌市'
      }, {
        province: '河南省',
        label: '漯河市'
      }, {
        province: '河南省',
        label: '三门峡市'
      }, {
        province: '河南省',
        label: '南阳市'
      }, {
        province: '河南省',
        label: '商丘市'
      }, {
        province: '河南省',
        label: '信阳市'
      }, {
        province: '河南省',
        label: '周口市'
      }, {
        province: '河南省',
        label: '驻马店市'
      }, {
        province: '河南省',
        label: '省直辖县级行政区划'
      }, {
        province: '湖北省',
        label: '武汉市'
      }, {
        province: '湖北省',
        label: '黄石市'
      }, {
        province: '湖北省',
        label: '十堰市'
      }, {
        province: '湖北省',
        label: '宜昌市'
      }, {
        province: '湖北省',
        label: '襄阳市'
      }, {
        province: '湖北省',
        label: '鄂州市'
      }, {
        province: '湖北省',
        label: '荆门市'
      }, {
        province: '湖北省',
        label: '孝感市'
      }, {
        province: '湖北省',
        label: '荆州市'
      }, {
        province: '湖北省',
        label: '黄冈市'
      }, {
        province: '湖北省',
        label: '咸宁市'
      }, {
        province: '湖北省',
        label: '随州市'
      }, {
        province: '湖北省',
        label: '恩施土家族苗族自治州'
      }, {
        province: '湖北省',
        label: '省直辖县级行政区划'
      }, {
        province: '湖北省',
        label: '仙桃市'
      }, {
        province: '湖北省',
        label: '潜江市'
      }, {
        province: '湖北省',
        label: '天门市'
      }, {
        province: '湖北省',
        label: '神农架林区'
      }, {
        province: '湖南省',
        label: '长沙市'
      }, {
        province: '湖南省',
        label: '株洲市'
      }, {
        province: '湖南省',
        label: '湘潭市'
      }, {
        province: '湖南省',
        label: '衡阳市'
      }, {
        province: '湖南省',
        label: '邵阳市'
      }, {
        province: '湖南省',
        label: '岳阳市'
      }, {
        province: '湖南省',
        label: '常德市'
      }, {
        province: '湖南省',
        label: '张家界市'
      }, {
        province: '湖南省',
        label: '益阳市'
      }, {
        province: '湖南省',
        label: '郴州市'
      }, {
        province: '湖南省',
        label: '永州市'
      }, {
        province: '湖南省',
        label: '怀化市'
      }, {
        province: '湖南省',
        label: '娄底市'
      }, {
        province: '湖南省',
        label: '湘西土家族苗族自治州'
      }, {
        province: '广东省',
        label: '广州市'
      }, {
        province: '广东省',
        label: '韶关市'
      }, {
        province: '广东省',
        label: '深圳市'
      }, {
        province: '广东省',
        label: '珠海市'
      }, {
        province: '广东省',
        label: '汕头市'
      }, {
        province: '广东省',
        label: '佛山市'
      }, {
        province: '广东省',
        label: '江门市'
      }, {
        province: '广东省',
        label: '湛江市'
      }, {
        province: '广东省',
        label: '茂名市'
      }, {
        province: '广东省',
        label: '肇庆市'
      }, {
        province: '广东省',
        label: '惠州市'
      }, {
        province: '广东省',
        label: '梅州市'
      }, {
        province: '广东省',
        label: '汕尾市'
      }, {
        province: '广东省',
        label: '河源市'
      }, {
        province: '广东省',
        label: '阳江市'
      }, {
        province: '广东省',
        label: '清远市'
      }, {
        province: '广东省',
        label: '东莞市'
      }, {
        province: '广东省',
        label: '中山市'
      }, {
        province: '广东省',
        label: '潮州市'
      }, {
        province: '广东省',
        label: '揭阳市'
      }, {
        province: '广东省',
        label: '云浮市'
      }, {
        province: '广西壮族自治区',
        label: '南宁市'
      }, {
        province: '广西壮族自治区',
        label: '柳州市'
      }, {
        province: '广西壮族自治区',
        label: '桂林市'
      }, {
        province: '广西壮族自治区',
        label: '梧州市'
      }, {
        province: '广西壮族自治区',
        label: '北海市'
      }, {
        province: '广西壮族自治区',
        label: '防城港市'
      }, {
        province: '广西壮族自治区',
        label: '钦州市'
      }, {
        province: '广西壮族自治区',
        label: '贵港市'
      }, {
        province: '广西壮族自治区',
        label: '玉林市'
      }, {
        province: '广西壮族自治区',
        label: '百色市'
      }, {
        province: '广西壮族自治区',
        label: '贺州市'
      }, {
        province: '广西壮族自治区',
        label: '河池市'
      }, {
        province: '广西壮族自治区',
        label: '来宾市'
      }, {
        province: '广西壮族自治区',
        label: '崇左市'
      }, {
        province: '海南省',
        label: '海口市'
      }, {
        province: '海南省',
        label: '三亚市'
      }, {
        province: '海南省',
        label: '三沙市'
      }, {
        province: '海南省',
        label: '省直辖县级行政区划'
      }, {
        province: '海南省',
        label: '五指山市'
      }, {
        province: '海南省',
        label: '琼海市'
      }, {
        province: '海南省',
        label: '儋州市'
      }, {
        province: '海南省',
        label: '文昌市'
      }, {
        province: '海南省',
        label: '万宁市'
      }, {
        province: '海南省',
        label: '东方市'
      }, {
        province: '海南省',
        label: '定安县'
      }, {
        province: '海南省',
        label: '屯昌县'
      }, {
        province: '海南省',
        label: '澄迈县'
      }, {
        province: '海南省',
        label: '临高县'
      }, {
        province: '海南省',
        label: '白沙黎族自治县'
      }, {
        province: '海南省',
        label: '昌江黎族自治县'
      }, {
        province: '海南省',
        label: '乐东黎族自治县'
      }, {
        province: '海南省',
        label: '陵水黎族自治县'
      }, {
        province: '海南省',
        label: '保亭黎族苗族自治县'
      }, {
        province: '海南省',
        label: '琼中黎族苗族自治县'
      }, {
        province: '重庆市',
        label: '重庆市'
      }, {
        province: '四川省',
        label: '成都市'
      }, {
        province: '四川省',
        label: '自贡市'
      }, {
        province: '四川省',
        label: '攀枝花市'
      }, {
        province: '四川省',
        label: '泸州市'
      }, {
        province: '四川省',
        label: '德阳市'
      }, {
        province: '四川省',
        label: '绵阳市'
      }, {
        province: '四川省',
        label: '广元市'
      }, {
        province: '四川省',
        label: '遂宁市'
      }, {
        province: '四川省',
        label: '内江市'
      }, {
        province: '四川省',
        label: '乐山市'
      }, {
        province: '四川省',
        label: '南充市'
      }, {
        province: '四川省',
        label: '眉山市'
      }, {
        province: '四川省',
        label: '宜宾市'
      }, {
        province: '四川省',
        label: '广安市'
      }, {
        province: '四川省',
        label: '达州市'
      }, {
        province: '四川省',
        label: '雅安市'
      }, {
        province: '四川省',
        label: '巴中市'
      }, {
        province: '四川省',
        label: '资阳市'
      }, {
        province: '四川省',
        label: '阿坝藏族羌族自治州'
      }, {
        province: '四川省',
        label: '甘孜藏族自治州'
      }, {
        province: '四川省',
        label: '凉山彝族自治州'
      }, {
        province: '贵州省',
        label: '贵阳市'
      }, {
        province: '贵州省',
        label: '六盘水市'
      }, {
        province: '贵州省',
        label: '遵义市'
      }, {
        province: '贵州省',
        label: '安顺市'
      }, {
        province: '贵州省',
        label: '毕节市'
      }, {
        province: '贵州省',
        label: '铜仁市'
      }, {
        province: '贵州省',
        label: '黔西南布依族苗族自治州'
      }, {
        province: '贵州省',
        label: '黔东南苗族侗族自治州'
      }, {
        province: '贵州省',
        label: '黔南布依族苗族自治州'
      }, {
        province: '云南省',
        label: '昆明市'
      }, {
        province: '云南省',
        label: '曲靖市'
      }, {
        province: '云南省',
        label: '玉溪市'
      }, {
        province: '云南省',
        label: '保山市'
      }, {
        province: '云南省',
        label: '昭通市'
      }, {
        province: '云南省',
        label: '丽江市'
      }, {
        province: '云南省',
        label: '普洱市'
      }, {
        province: '云南省',
        label: '临沧市'
      }, {
        province: '云南省',
        label: '楚雄彝族自治州'
      }, {
        province: '云南省',
        label: '红河哈尼族彝族自治州'
      }, {
        province: '云南省',
        label: '文山壮族苗族自治州'
      }, {
        province: '云南省',
        label: '西双版纳傣族自治州'
      }, {
        province: '云南省',
        label: '大理白族自治州'
      }, {
        province: '云南省',
        label: '德宏傣族景颇族自治州'
      }, {
        province: '云南省',
        label: '怒江傈僳族自治州'
      }, {
        province: '云南省',
        label: '迪庆藏族自治州'
      }, {
        province: '西藏自治区',
        label: '拉萨市'
      }, {
        province: '西藏自治区',
        label: '昌都地区'
      }, {
        province: '西藏自治区',
        label: '山南地区'
      }, {
        province: '西藏自治区',
        label: '日喀则地区'
      }, {
        province: '西藏自治区',
        label: '那曲地区'
      }, {
        province: '西藏自治区',
        label: '阿里地区'
      }, {
        province: '西藏自治区',
        label: '林芝地区'
      }, {
        province: '陕西省',
        label: '西安市'
      }, {
        province: '陕西省',
        label: '铜川市'
      }, {
        province: '陕西省',
        label: '宝鸡市'
      }, {
        province: '陕西省',
        label: '咸阳市'
      }, {
        province: '陕西省',
        label: '渭南市'
      }, {
        province: '陕西省',
        label: '延安市'
      }, {
        province: '陕西省',
        label: '汉中市'
      }, {
        province: '陕西省',
        label: '榆林市'
      }, {
        province: '陕西省',
        label: '安康市'
      }, {
        province: '陕西省',
        label: '商洛市'
      }, {
        province: '甘肃省',
        label: '兰州市'
      }, {
        province: '甘肃省',
        label: '嘉峪关市'
      }, {
        province: '甘肃省',
        label: '金昌市'
      }, {
        province: '甘肃省',
        label: '白银市'
      }, {
        province: '甘肃省',
        label: '天水市'
      }, {
        province: '甘肃省',
        label: '武威市'
      }, {
        province: '甘肃省',
        label: '张掖市'
      }, {
        province: '甘肃省',
        label: '平凉市'
      }, {
        province: '甘肃省',
        label: '酒泉市'
      }, {
        province: '甘肃省',
        label: '庆阳市'
      }, {
        province: '甘肃省',
        label: '定西市'
      }, {
        province: '甘肃省',
        label: '陇南市'
      }, {
        province: '甘肃省',
        label: '临夏回族自治州'
      }, {
        province: '甘肃省',
        label: '甘南藏族自治州'
      }, {
        province: '青海省',
        label: '西宁市'
      }, {
        province: '青海省',
        label: '海东市'
      }, {
        province: '青海省',
        label: '海北藏族自治州'
      }, {
        province: '青海省',
        label: '黄南藏族自治州'
      }, {
        province: '青海省',
        label: '海南藏族自治州'
      }, {
        province: '青海省',
        label: '果洛藏族自治州'
      }, {
        province: '青海省',
        label: '玉树藏族自治州'
      }, {
        province: '青海省',
        label: '海西蒙古族藏族自治州'
      }, {
        province: '宁夏回族自治区',
        label: '银川市'
      }, {
        province: '宁夏回族自治区',
        label: '石嘴山市'
      }, {
        province: '宁夏回族自治区',
        label: '吴忠市'
      }, {
        province: '宁夏回族自治区',
        label: '固原市'
      }, {
        province: '宁夏回族自治区',
        label: '中卫市'
      }, {
        province: '新疆维吾尔自治区',
        label: '乌鲁木齐市'
      }, {
        province: '新疆维吾尔自治区',
        label: '克拉玛依市'
      }, {
        province: '新疆维吾尔自治区',
        label: '吐鲁番地区'
      }, {
        province: '新疆维吾尔自治区',
        label: '哈密地区'
      }, {
        province: '新疆维吾尔自治区',
        label: '昌吉回族自治州'
      }, {
        province: '新疆维吾尔自治区',
        label: '博尔塔拉蒙古自治州'
      }, {
        province: '新疆维吾尔自治区',
        label: '巴音楞蒙古自治州'
      }, {
        province: '新疆维吾尔自治区',
        label: '阿克苏地区'
      }, {
        province: '新疆维吾尔自治区',
        label: '克孜勒苏柯尔克孜自治州'
      }, {
        province: '新疆维吾尔自治区',
        label: '喀什地区'
      }, {
        province: '新疆维吾尔自治区',
        label: '和田地区'
      }, {
        province: '新疆维吾尔自治区',
        label: '伊犁哈萨克自治州'
      }, {
        province: '新疆维吾尔自治区',
        label: '塔城地区'
      }, {
        province: '新疆维吾尔自治区',
        label: '阿勒泰地区'
      }, {
        province: '新疆维吾尔自治区',
        label: '自治区直辖县级行政区划'
      }, {
        province: '新疆维吾尔自治区',
        label: '石河子市'
      }, {
        province: '新疆维吾尔自治区',
        label: '阿拉尔市'
      }, {
        province: '新疆维吾尔自治区',
        label: '图木舒克市'
      }, {
        province: '新疆维吾尔自治区',
        label: '五家渠市'
      }, {
        province: '台湾省',
        label: '台北市'
      }, {
        province: '台湾省',
        label: '高雄市'
      }, {
        province: '台湾省',
        label: '基隆市'
      }, {
        province: '台湾省',
        label: '台中市'
      }, {
        province: '台湾省',
        label: '台南市'
      }, {
        province: '台湾省',
        label: '新竹市'
      }, {
        province: '台湾省',
        label: '嘉义市'
      }, {
        province: '台湾省',
        label: '省直辖'
      }, {
        province: '香港特别行政区',
        label: '香港岛'
      }, {
        province: '香港特别行政区',
        label: '九龙'
      }, {
        province: '香港特别行政区',
        label: '新界'
      }, {
        province: '澳门特别行政区',
        label: '澳门半岛'
      }, {
        province: '澳门特别行政区',
        label: '澳门离岛'
      }, {
        province: '澳门特别行政区',
        label: '无堂区划分区域'
      }];
      for (var val of allCity) {
        if (province === val.province) {
          console.log(val);
          tempCity.push({label: val.label, value: val.label});
        }
      }
      this.ruleForm.citys = tempCity;
    },
    getCity: function (city) {
      console.log(city);
      console.log(this.selectCity);
    },
    onSubmit () {
      // let me = this;
      // this.$http.post(api.addPatient).then(function (response) {
      //   console.log('这是我们需要的json数据', response.ruleForm);
      //   me.ruleForm = me.data.ruleForm;
      // }, function (response) {
      //   alert('请求失败了');
      // });
      console.log('您修改后的参数为：', JSON.stringify(this.ruleForm));
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<!-- <script src="https://unpkg.com/vue"></script> -->
<style type="text/css">
  .addPatient .el-input, .addPatient .el-input__inner {
    display: inline-block;
    width: 192px;
  }
  .addPatient .el-form-item{
    padding-right: 30px;
  }
  .addPatient .el-form{
    padding-bottom: 20px;
  }
  .addPatient .el-textarea__inner{
    width: 500px;
  }
  .addPatient .center{
    padding-left: 200px;
  }
  .addPatient .demonstration{
    color: #333;
    font-size: 24px;
  }
  .addPatient .record{
    font-size: 28px;
  }
  .addPatient .el-form-item{
    display: inline-block;
  }
</style>
