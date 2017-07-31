<template>
    <div class="home" v-if="home.title">
      <h2>{{home.title}}</h2>
      <h3>{{home.subheading}}</h3>
      <p>{{home.survey}}</p>
      <h3>项目组员信息</h3>
      <table>
        <tr>
          <th>组长</th>
          <th>组员</th>
          <th>使用的技术</th>
        </tr>
        <tr>
          <td>{{home.projectTeam.groupLeader}}</td>
          <td>{{home.projectTeam.teamMembers}}</td>
          <td>{{home.projectTeam.technology}}</td>
        </tr>
      </table> 

      <h4>护士系统</h4>
      <ul>
        <li v-for="item in home.introduce.nurse">
          {{item}}
        </li>
      </ul>

      <h4>医生系统</h4>
      <ul>
        <li v-for="item in home.introduce.doctor">
          {{item}}
        </li>
      </ul>

      <h4>前台收银系统</h4>
      <ul>
        <li v-for="item in home.introduce.cashier">
          {{item}}
        </li>
      </ul>

      <h4>药房系统</h4>
      <h5>中药房、西药房</h5>
        <ul>
        <li v-for="item in home.introduce.pharmacy">
          {{item}}
        </li>
      </ul> 
     
      <h4>药库系统</h4>
      <ul>
        <li v-for="item in home.introduce.drugStorage">
          {{item}}
        </li>
      </ul> 
      <h4>患者模块</h4>
       <ul>
        <li v-for="item in home.introduce.patient">
          {{item}}
        </li>
      </ul>

      <h4>医院基本信息</h4>
       <ul>
        <li v-for="item in home.introduce.hospital">
          {{item}}
        </li>
      </ul>



      <h4>登录模块</h4>
       <ul>
        <li v-for="item in home.introduce.register">
          {{item}}
        </li>
      </ul>


      <h4>个人主页</h4>
       <ul>
        <li v-for="item in home.introduce.personalHomepage">
          {{item}}
        </li>
      </ul>


    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        home: []
      };
    },
    created () {
      this.$http.get('../static/home.json').then((response) => {             // mark
        this.home = response.body.home;
        console.log(this.home.projectTeam.groupLeader);
      }, response => {
        // error callback
        alert('数据请求失败');
      });
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  .home
    padding:0 20px
    h2
      font-size: 25px
      text-align: center
      line-height: 70px
      height: 70px
      font-weight: 600
    h3
      text-align: right
      font-size: 14px
  p
      text-indent: 2em
      line-height: 20px
      font-size:16px
      padding: 17px 0


</style>
