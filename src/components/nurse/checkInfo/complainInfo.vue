<template>
  <div class="checkInfo">
    <div class="title">
        <p>安逸医院论坛</p>
    </div>

    <el-table :data="table" height="480" border style="width: 100%">
    <el-table-column label="序号" width="100">
      <template scope="scope">{{ scope.$index }}</template>
    </el-table-column>
    <el-table-column
      prop="complainant"
      label="投诉者"
      width="180">
    </el-table-column>
    <el-table-column
      prop="type"
      label="投诉类型"
      width="180">
    </el-table-column>
    <el-table-column
      prop="date"
      label="投诉时间">
    </el-table-column>
    <el-table-column
      prop="content"
      label="投诉内容">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="联系方式">
    </el-table-column>
   <!--  <el-table-column
      prop="rate"
      label="五星评分">
      <template scope="scope">
      <label>医疗服务</label>
       <el-rate
       v-model="value1"
       show-text>
       </el-rate>
       <label>医疗质量</label>
       <el-rate
       v-model="value2"
       show-text>
       </el-rate>
       <label>医院卫生水平</label>
       <el-rate
       v-model="value3"
       show-text>
       </el-rate>
      </template>
    </el-table-column> -->
    <el-table-column align="center" label="操作">
      <template scope="scope">
        <el-button size="small" @click="dialogVisible = true">回复</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

    <el-dialog title="回复" :visible.sync="dialogVisible" size="tiny">
      <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        // value1: null,
        // value2: null,
        // value3: null,
        table: [],
        dialogVisible: false,
        textarea: ''
      };
    },
    methods: {
      handleDelete (index, row) {
        let vm = this;
        console.log('单个删除选择的row: ', index, row);
        vm.table.splice(index, 1);
      },
      submit () {
        this.dialogVisible = false;
        console.log('回复的内容：', this.textarea);
        this.textarea = '';
      }
    },
    created () {
      this.$http.get('../static/complainInfo.json').then((response) => {             // mark
        this.table = response.body.table;
        console.log(this.table);
      }, response => {
        // error callback
        alert('数据请求失败');
      });
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  .title
    p
      font-size:24px
      text-align:center
      margin-bottom:50px
  .item
    margin-top: 10px;
    margin-right: 40px;
</style>