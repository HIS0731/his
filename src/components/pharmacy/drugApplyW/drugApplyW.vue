<template>
  <div>
    <el-form label-width="120px" class="apply-form" ref="applyform">
      <h4 class="applytable">药物补给申请表</h4>
      <p class="radio-p">
        <el-radio label="1" disabled>中药</el-radio>
        <el-radio label="2" v-model="applytable.checked">西药</el-radio>
      </p>
      <el-form-item label="药品名称">
        <el-input v-model="applytable.drugname"></el-input>
      </el-form-item>
      <el-form-item label="OTC标志">
        <el-select v-model="applytable.otc_value" placeholder="请选择">
          <el-option
            v-for="item in OTC"
            :key="item.otc_value"
            :label="item.label"
            :value="item.otc_value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="剂型">
        <el-select v-model="applytable.form_value" placeholder="请选择">
          <el-option
            v-for="f in form"
            :key="f.form_value"
            :label="f.label"
            :value="f.form_value">
          </el-option>
        </el-select>
      </el-form-item>              
      <el-form-item label="药品规格">
        <el-input v-model="applytable.drugform"></el-input>
      </el-form-item>
      <el-form-item label="数量（件）">
        <el-input v-model="applytable.drugquantity"></el-input>
      </el-form-item>
      <el-form-item label="申请人">
        <el-input v-model="applytable.applyman"></el-input>
      </el-form-item>
      <el-form-item label="申请科室">
        <el-input v-model="applytable.applyoffices"></el-input>
      </el-form-item>      
      <el-form-item label="申请时间">
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
  export default {
    data () {
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
        // 药物库存不足表格
        insufficientTable: []
      };
    },
    created () {                                // 在实例创建之后同步调用
      // 保存当前vue实例的所有数据
      this.defaultApplytable = JSON.parse(JSON.stringify(this.applytable));
    },
    methods: {
      // 点击提交申请按钮执行
      submitApply: function () {
        this.$notify({
          message: '提交成功',
          type: 'success'
        });
        // 测试
        console.log(this.applytable);
        // 提交数据到后台（暂时没有后台接口）
        // this.$http.post('', {applytable: 'applytable'}).then(response => {}, response => {});
      },
      // 点击重置申请按钮清空表单
      resetApply: function () {
        // 重置用ref绑定的表单对象applyform,resetFields()方法为elementui表单内置的
        this.$refs.applyform.resetFields();
      },
      // 获取库存不足10件的数据
      getinsufficientData: function () {
        let drugapplyThis = this;

        drugapplyThis.$http.get('../../static/drugs.json', {params: {q: 1}}).then((response) => {
          // 把json接口获取的数据
          for (let i = 0; i < response.data.tableData.length; i++) {
            if (response.data.tableData[i].quantity < 10) {
              drugapplyThis.insufficientTable.push(response.data.tableData[i]);
            }
          }
        }, response => {
          // error callback
          alert('数据请求失败!');
        });
      }
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  .apply-form
    width: 100%
  .applytable
    display: block
    line-height: 30px
    text-align: center
    font-size: 20px
    font-weight: bold
    margin: 0 auto
  .radio-p
    line-height: 80px
    text-align: center
  .el-form-item
    display: inline-block
    width: 25%
    padding-left: 40px
    padding-right: 40px
  .el-select
    width: 100%
  .submit
    margin-top: 20px
    text-align: center
  .tips
    display: block
    padding-left: 95px
    margin-top: 20px
    margin-bottom: 20px
    color: #FF4949
  .insufficientTable
    width: 85%
    margin: 0 auto
</style>
