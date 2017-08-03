<template>
  <div class="drug">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="输入药品相关信息">
        <el-input v-model="selectInformation" placeholder="药品"></el-input>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="selectFn">查询</el-button>
    </el-form-item>
    </el-form>
    <template v-if="selectArr.length">
      <h2 class="title">查询结果</h2>
      <el-table :data="selectArr">
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
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
  </template>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        nowpage: 1,
        selectInformation: '',
        drug: [],
        selectArr: []
      };
    },
    created () {
      this.$http.get('../static/Storage.json').then((response) => {             // mark
        this.drug = response.body.drug;
    //  console.log(this.drug[0].date2.getFullYear()); mark
      }, response => {
        this.$message.error('数据请求失败');
      });
    },
    methods: {
      selectFn () {
        // 实际上，应该使用post方法传数据
        this.$http.get('../static/Storage.json', this.selectInformation, {emulateJSON: true}).then(function (response) {
          this.selectArr = response.body.drug;
        }, function () {
          this.$message.error('后台接口有误,修改后台接口既可！');
        });
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`);
      }
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  .title
    padding:10px 0
    margin:30px 0 10px 0
  .el-table
    margin-bottom:30px
    .pageBlock
      text-align: center;
</style>
