<template>
  <div class="shift">
    <el-table :data="doctorlist" border style="width: auto;">
      <el-table-column fixed label="时段" width="165" type="text">
       
      </el-table-column>
      <el-table-column fixed v-model="doctorlist.name" label="姓名" width="165">
      </el-table-column>
      <el-table-column fixed v-model="doctorlist.sex" label="性别" width="165"> 
      </el-table-column>
      <el-table-column fixed v-model="doctorlist.date" label="入职日期" width="165"> 
      </el-table-column>
      <el-table-column fixed v-model="doctorlist.degree" label="学历" width="165"> 
      </el-table-column>
      <el-table-column fixed v-model="doctorlist.major" label="专业" width="165"> 
      </el-table-column>
      <el-table-column fixed v-model="doctorlist.profession" label="职称" width="165"> 
      </el-table-column>
      <el-table-column fixed v-model="doctorlist.office" label="科室" width="180"> 
      </el-table-column>    
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      data () {
        return {
          doctorlist: [{
            'name': '',
            'sex': '',
            'date': '',
            'degree': '',
            'major': '',
            'profession': '',
            'office': ''
          }]
        };
      },
      created () {
        this.$http.get('../../static/doctor.json').then((response) => {             // mark
          this.doctorlist = response.body.doctorlist;
        }, response => {
          // error callback
          alert('数据请求失败');
        });
      }
    };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
.shift
  margin:auto
</style>