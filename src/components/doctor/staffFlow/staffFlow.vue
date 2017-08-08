<template>
    <div class="staffFlow">
      <el-table :data="staffFlowlist" style="width: 100%;" height="500">
        <el-table-column label="人员流动信息表" class="tittle">
          <el-table-column type="expand">
            <template scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="姓名">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="性别">
                  <span>{{ props.row.sex }}</span>
                </el-form-item>
                <el-form-item label="学历">
                  <span>{{ props.row.degree }}</span>
                </el-form-item>
                <el-form-item label="专业">
                  <span>{{ props.row.major }}</span>
                </el-form-item>
                <el-form-item label="职称">
                  <span>{{ props.row.profession }}</span>
                </el-form-item>
                <el-form-item label="科室">
                  <span>{{ props.row.office }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="医生 ID" prop="id"></el-table-column>
          <el-table-column label="医生姓名" prop="name"></el-table-column>
          <el-table-column label="入职日期" prop="date"></el-table-column>
          <el-table-column label="离职日期" prop="leave"></el-table-column>
          <el-table-column label="离职原因" prop="reason"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      data () {
        return {
          staffFlowlist: []
        };
      },
      created () {
        this.$http.get('../../static/doctor/staffFlow.json').then((response) => {
          // mark
          this.staffFlowlist = response.body.staffFlowlist;
        }, response => {
          // error callback
          alert('数据请求失败');
        });
      }
    };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
.staffFlow .el-table-column label .tittle
  font-size:22px
.staffFlow .demo-table-expand
  font-size: 0
.staffFlow .demo-table-expand label
  width: 90px
  color: #99a9bf
.staffFlow .demo-table-expand .el-form-item
  margin-right: 0
  margin-bottom: 0
  width: 50%
</style>
