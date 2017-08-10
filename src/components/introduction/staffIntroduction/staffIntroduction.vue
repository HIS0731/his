<template>
  <div class="staffIntroduction">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="医师介绍" name="first">
        <span class="title"><em>门诊查询</em></span>
        <div class="input">
          <el-input size="mini" type="text" placeholder="科室查询" v-model="input" style="width:150px"></el-input>
          <el-input size="mini" type="text" placeholder="医师查询" v-model="input" style="width:150px"></el-input>
          <el-input size="mini" type="text" placeholder="疾病查询" v-model="input" style="width:150px"></el-input>
          <el-button size="mini" type="primary" @click="Onsubmit">查询</el-button>
        </div>
        <div class="table">
           <el-table ref="multipleTable" :data="table" border tooltip-effect="dark"  style="width: 100%">
              <el-table-column type="expand">
                <template scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="详细信息:">
                      <span>{{ props.row.message }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column label="序号" width="50" >
                <template scope="scope">{{ scope.$index }}</template>
              </el-table-column>
              <el-table-column prop="name" label="医师姓名"  width="120" ></el-table-column>
              <el-table-column prop="sex" label="性别" show-overflow-tooltip width="70"></el-table-column>
              <el-table-column prop="age" label="年龄" sortable show-overflow-tooltip width="100"></el-table-column>
              <el-table-column prop="position" label="职称" show-overflow-tooltip width="150"></el-table-column>
              <el-table-column prop="department" label="科室" show-overflow-tooltip></el-table-column>
               <el-table-column prop="area" label="地点" show-overflow-tooltip></el-table-column>
              <el-table-column prop="special" label="特长" show-overflow-tooltip></el-table-column>
              <el-table-column align="center" label="电话预约">
                <template scope="scope">
                  <img src="../logo/phone.icon.jpg" width="20" height="20">
                  <el-button size="small" @click="handleOrder(scope.$index)">电话预约</el-button>
                </template>
              </el-table-column>
           </el-table>
        </div>       
      </el-tab-pane>
      <el-tab-pane label="护士介绍" name="second">
        <span class="title"><em>门诊查询</em></span>
        <div class="input">
          <el-input size="mini" type="text" placeholder="科室查询" v-model="input" style="width:150px"></el-input>
          <el-input size="mini" type="text" placeholder="护士查询" v-model="input" style="width:150px"></el-input>
          <el-input size="mini" type="text" placeholder="病房查询" v-model="input" style="width:150px"></el-input>
          <el-button size="mini" type="primary" @click="Onsubmit">查询</el-button>
        </div> 
         <div class="table2">
           <el-table ref="multipleTable" :data="table2" border tooltip-effect="dark"  style="width: 100%">
              <el-table-column type="expand">
                <template scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="详细信息:">
                      <span>{{ props.row.message }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column label="序号" width="50" >
                <template scope="scope">{{ scope.$index }}</template>
              </el-table-column>
              <el-table-column prop="name" label="护士姓名"  width="120" ></el-table-column>
              <el-table-column prop="sex" label="性别" show-overflow-tooltip width="70"></el-table-column>
              <el-table-column prop="age" label="年龄" sortable show-overflow-tooltip width="100"></el-table-column>
              <el-table-column prop="position" label="职称" show-overflow-tooltip width="150"></el-table-column>
              <el-table-column prop="department" label="科室" show-overflow-tooltip></el-table-column>
               <el-table-column prop="area" label="地点" show-overflow-tooltip></el-table-column>
              <el-table-column prop="special" label="特长" show-overflow-tooltip></el-table-column>
              <el-table-column align="center" label="电话预约">
                <template scope="scope">
                  <img src="../logo/phone.icon.jpg" width="20" height="20">
                  <el-button size="small" @click="handleOrder(scope.$index)">电话预约</el-button>
                </template>
              </el-table-column>
           </el-table>
        </div>       
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  import {api} from '../../../global/api.js';
  export default {
    data () {
      return {
        activeName2: 'first',
        input: '',
        table: [],
        table2: []
      };
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event);
      },
      Onsubmit () {
        this.$message({
          message: '正在查询...',
          type: 'success'
        });
      },
      handleOrder () {
        this.$message({
          message: '正在预约...',
          type: 'success'
        });
      }
    },
    created () {
      this.$http.get(api.staffIntroduction).then((response) => {             // mark
        this.table = response.body.table;
        this.table2 = response.body.table2;
        this.message = response.body.message;
        console.log(this.table);
        console.log(this.table2);
      }, response => {
        // error callback
        this.$message({
          message: '数据请求失败',
          type: 'error'
        });
      });
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  .staffIntroduction .title
    float:left
  .staffIntroduction .input
    margin-left:100px
  .staffIntroduction .table
    margin-top:50px
  .staffIntroduction .table2
    margin-top:50px
</style>