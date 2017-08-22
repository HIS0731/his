<template>
  <div class="drug">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="输入药品相关信息">
        <el-input v-model="selectInformation" placeholder="请输入药品相关信息"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="selectFn">查询</el-button>
      </el-form-item>
      <p class="tips">
        <i>储存温度:01-常温，02-冷藏</i><br>
        <i>进货方式：01-网上订货，02-到厂家进货</i>
      </p>
    </el-form>
    <template v-if="selectArr.length">
      <h2 class="title">查询结果</h2>
      <el-table :data="selectArr" height="450">
        <el-table-column  type="index" width="50"></el-table-column>
        <el-table-column  prop="name" label="药品名称"></el-table-column>
        <el-table-column  prop="amount" label="数目"></el-table-column>
        <el-table-column  prop="date2" label="进药时间"></el-table-column>
        <el-table-column  prop="manufacturers" label="厂家"></el-table-column>
        <el-table-column  prop="species" label="种类"></el-table-column>
        <el-table-column  prop="productionData" label="生产日期"></el-table-column>
        <el-table-column  prop="specification" label="规格"></el-table-column>
        <el-table-column  prop="dosageForm" label="剂型"></el-table-column>
        <el-table-column  prop="unitPrice" label="单价"></el-table-column>
        <el-table-column  prop="temperature" label="储存温度"></el-table-column>
        <el-table-column  prop="handlers" label="经手人"></el-table-column>
        <el-table-column  prop="qualityOfficer" label="质管员"></el-table-column>
        <el-table-column  prop="warehouseman" label="仓库员"></el-table-column>
        <el-table-column  prop="pattern" label="进药方式"></el-table-column>s
      </el-table>
    </template>
    <template>
      <h2 class="title">全部药品</h2>
      <el-table :data="drug">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column  prop="name" label="药品名称"></el-table-column>
      <el-table-column  prop="amount" label="数目"></el-table-column>
      <el-table-column  prop="date2" label="进药时间"></el-table-column>
      <el-table-column  prop="manufacturers" label="厂家"></el-table-column>
      <el-table-column  prop="species" label="种类"></el-table-column>
      <el-table-column  prop="productionData" label="生产日期"></el-table-column>
      <el-table-column  prop="specification" label="规格"></el-table-column>
      <el-table-column  prop="dosageForm" label="剂型"></el-table-column>
      <el-table-column  prop="unitPrice" label="单价"></el-table-column>
      <el-table-column  prop="temperature" label="储存温度"></el-table-column>
      <el-table-column  prop="handlers" label="经手人"></el-table-column>
      <el-table-column  prop="qualityOfficer" label="质管员"></el-table-column>
      <el-table-column  prop="warehouseman" label="仓库员"></el-table-column>
      <el-table-column  prop="pattern" label="进药方式"></el-table-column>s
    </el-table>
      <div class="pageBlock">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 100, 200]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total=totalInformation>
        </el-pagination>
      </div>
  </template>
  </div>
</template>
<script type="text/ecmascript-6">
  import {api} from '../../../global/api.js';
  export default {
    data () {
      return {
        temperatures: ['常温', '冷藏'],
        currentPage: 4,
        nowpage: 1,
        handleSize: 10,
        selectInformation: '',
        drug: [],
        selectArr: [],
        totalInformation: 0
      };
    },
    created () {
      // 获取药品信息
      this.$http.get(api.Storage).then((response) => {             // mark
        this.drug = response.body.drug;
        // 信息总条数
        this.totalInformation = response.body.total;
      }, response => {
        this.$message.error('数据请求失败');
      });
    },
    methods: {
      selectFn () {
        this.$message({
          message: '传给后台的信息是用户输入数据 ' + this.selectInformation,
          type: 'success'
        });
        this.$http.get(api.Storage, {params: {selectInformation: this.selectInformation}}).then(function (response) {
          this.selectArr = response.body.drug;
        }, function () {
          this.$message.error('后台接口有误,修改后台接口既可！');
        });
      },
      handleSizeChange (val) {
        this.handleSize = val;
        console.log(this.handleSize, `每页 ${val} 条`);
      },
      handleCurrentChange (val) {
        console.log(`当前页:`, val);
        const showindex = [val, this.handleSize, this.drug[this.drug.length - 1].id];
        this.$message({
          message: '传给后台的信息是选择的页码、显示条数以及当前显示的位置的id ' + showindex,
          type: 'success'
        });
        this.$http.get(api.Storage, {params: {showindex: showindex}}).then(function (response) {
          this.drug = response.body.drug;
          // 信息总条数
          this.totalInformation = response.body.total;
        }, function () {
//          this.$message.error('后台接口有误,修改后台接口既可！');
        });
      }
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
.drug
  .title
    padding:10px 0
    margin:30px 0 10px 0
  .el-table
    margin-bottom:30px
  .pageBlock
    text-align: center
  .tips
    text-align: left
    float:right
    font-size:13px
    line-height:15px
    padding-top:60px
</style>
