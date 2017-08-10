<template>
  <div class="drugApplyW">
    <el-form label-width="120px" :model="applytable" :rules="rules" ref="applyform" class="apply-form">
      <h4 class="applytable">药物补给申请表</h4>
      <p class="radio-p">
        <el-radio label="1" disabled>中药</el-radio>
        <el-radio label="2" v-model="applytable.checked">西药</el-radio>
      </p>
      <el-form-item label="药品名称" prop="drugname">
        <el-input v-model="applytable.drugname"></el-input>
      </el-form-item>
      <el-form-item label="OTC标志" prop="otc_value">
        <el-select v-model="applytable.otc_value" placeholder="请选择">
          <el-option
            v-for="item in OTC"
            :key="item.otc_value"
            :label="item.label"
            :value="item.otc_value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="剂型" prop="form_value">
        <el-select v-model="applytable.form_value" placeholder="请选择">
          <el-option
            v-for="f in form"
            :key="f.form_value"
            :label="f.label"
            :value="f.form_value">
          </el-option>
        </el-select>
      </el-form-item>              
      <el-form-item label="药品规格" prop="drugform">
        <el-input v-model="applytable.drugform"></el-input>
      </el-form-item>
      <el-form-item label="数量（件）" prop="drugquantity">
        <el-input v-model="applytable.drugquantity"></el-input>
      </el-form-item>
      <el-form-item label="申请人" prop="applyman">
        <el-input v-model="applytable.applyman"></el-input>
      </el-form-item>
      <el-form-item label="申请科室" prop="applyoffices">
        <el-input v-model="applytable.applyoffices"></el-input>
      </el-form-item>      
      <el-form-item label="申请时间" prop="date">
        <el-date-picker v-model="applytable.date" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <p  class="submit">
        <el-button type="reset" @click="resetApply">重置申请</el-button>
        <el-button type="submit" @click="submitApply">提交申请</el-button>
      </p>         
    </el-form>
    <h4 class="tips">以下药品库存不足10件了，建议申请补给！</h4>
    <el-table :data="insufficientTable" border class="insufficientTable">
      <el-table-column prop="drugname" label="药品名称"></el-table-column>
      <el-table-column prop="type" label="类别"></el-table-column>
      <el-table-column prop="quantity" label="库存"></el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import {api} from '../../../global/api.js';
  export default {
    data () {
      let validatevalue = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('此处值不能为空！'));
        } else {
          callback();
        }
      };
      let checkquantity = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('此处值不能为空！'));
        }
        setTimeout(() => {
          if (/^\d+$/.test(value) === false) {
            callback(new Error('请输入数字值！'));
          } else {
            callback();
          }
        }, 1000);
      };
      return {
        OTC: [
          {
            otc_value: '选项1',
            label: '处方药'
          },
          {
            otc_value: '选项2',
            label: '非处方药'
          }
        ],
        // 规格
        form: [
          {
            form_value: '选项1',
            label: '片剂'
          },
          {
            form_value: '选项2',
            label: '胶囊剂'
          },
          {
            form_value: '选项3',
            label: '丸剂'
          },
          {
            form_value: '选项4',
            label: '散剂'
          },
          {
            form_value: '选项5',
            label: '颗粒剂'
          },
          {
            form_value: '选项6',
            label: '外用膏剂'
          },
          {
            form_value: '选项7',
            label: '液体剂'
          },
          {
            form_value: '选项8',
            label: '气体剂'
          },
          {
            form_value: '选项9',
            label: '注射液剂'
          }
        ],
        // 保存申请药物补给表的数据
        applytable: {
          drugname: '',
          drugform: '',
          drugquantity: '',
          applyoffices: '',
          applyman: '',
          checked: '2',
          otc_value: '',
          form_value: '',
          date: ''
        },
        rules: {
          drugname: [
            {validator: validatevalue, trigger: 'blur'}
          ],
          drugform: [
            {validator: validatevalue, trigger: 'blur'}
          ],
          drugquantity: [
            {validator: checkquantity, trigger: 'blur'}
          ],
          applyoffices: [
            {validator: validatevalue, trigger: 'blur'}
          ],
          applyman: [
            {validator: validatevalue, trigger: 'blur'}
          ],
          otc_value: [
            {validator: validatevalue, trigger: 'change'}
          ],
          form_value: [
            {validator: validatevalue, trigger: 'change'}
          ],
          date: [
            {validator: validatevalue, trigger: 'blur'}
          ]
        },
        // 药物库存不足表格
        insufficientTable: []
      };
    },
    mounted () {
      this.getinsufficientData();
    },
    methods: {
      // 点击提交申请按钮执行
      submitApply: function () {
        this.$refs.applyform.validate((valid) => {
          if (valid) {
            this.$notify({
              message: '提交成功',
              type: 'success'
            });
            // 测试
            // console.log(this.applytable);
            // 提交数据到后台（暂时没有后台接口）
            // this.$http.post('', {applytable: 'this.applytable'}).then(response => {}, response => {});
          } else {
            this.$notify.error({
              message: '提交失败'
            });
            return false;
          }
        });
      },
      // 点击重置申请按钮执行
      resetApply: function () {
        // 重置当前vue实例的所有数据
        this.$refs.applyform.resetFields();
      },
      // 获取库存不足10件的数据
      getinsufficientData: function () {
        let drugapplyThis = this;

        drugapplyThis.$http.get(api.drugs, {params: {q: 1}}).then((response) => {
          // 把json接口获取的数据
          for (let i = 0; i < response.data.tableDataW.length; i++) {
            if (response.data.tableDataW[i].quantity < 10) {
              drugapplyThis.insufficientTable.push(response.data.tableDataW[i]);
            }
          }
        }, response => {
          // error callback
          drugapplyThis.$notify.error({
            message: '数据请求失败'
          });
        });
      }
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  .drugApplyW .apply-form
    width: 100%
  .drugApplyW .apply-form .applytable
    display: block
    line-height: 30px
    text-align: center
    font-size: 20px
    font-weight: bold
    margin: 0 auto
  .drugApplyW .apply-form .radio-p
    line-height: 80px
    text-align: center
  .drugApplyW .apply-form .el-form-item
    display: inline-block
    width: 25%
    padding-left: 40px
    padding-right: 40px
  .drugApplyW .apply-form .el-select
    width: 100%
  .drugApplyW .apply-form .submit
    margin-top: 20px
    text-align: center
  .drugApplyW .tips
    display: block
    padding-left: 95px
    margin-top: 20px
    margin-bottom: 20px
    color: #FF4949
  .drugApplyW .insufficientTable
    width: 85%
    margin: 0 auto
</style>
