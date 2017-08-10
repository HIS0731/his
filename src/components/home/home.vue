<template>
    <div class="home" v-if="home.title">
      <div class="homeHead">
        <h2>{{home.title}}</h2>
        <h3>{{home.subheading}}</h3>
      </div>
      
      <p>{{home.survey}}</p>
      <strong>项目组员信息</strong>
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
      <strong>医院系统部分功能块介绍</strong>
      <div class="nurse">
        <h4>一、护士系统</h4>
        <ul>
          <li v-for="item in home.introduce.nurse">
            {{item}}
          </li>
        </ul>
      </div>

      <div class="doctor">  
        <h4>二、医生系统</h4>
        <ul>
          <li v-for="item in home.introduce.doctor">
            {{item}}
          </li>
        </ul>
      </div>

      <h4>三、前台收银系统</h4>
      <ul>
        <li v-for="item in home.introduce.cashier">
          {{item}}
        </li>
      </ul>

      <h4>四、药房系统</h4>
      <h5>中药房、西药房</h5>
        <ul>
        <li v-for="item in home.introduce.pharmacy">
          {{item}}
        </li>
      </ul> 
     
      <h4>五、药库系统</h4>
      <ul>
        <li v-for="item in home.introduce.drugStorage">
          {{item}}
        </li>
      </ul> 
      <h4>六、患者模块</h4>
       <ul>
        <li v-for="item in home.introduce.patient">
          {{item}}
        </li>
      </ul>

      <h4>七、医院基本信息</h4>
       <ul>
        <li v-for="item in home.introduce.hospital">
          {{item}}
        </li>
      </ul>



      <h4>八、登录模块</h4>
       <ul>
        <li v-for="item in home.introduce.register">
          {{item}}
        </li>
      </ul>


      <h4>九、个人主页</h4>
       <ul>
        <li v-for="item in home.introduce.personalHomepage">
          {{item}}
        </li>
      </ul>


    </div>
</template>

<script type="text/ecmascript-6">
  import {api} from '../../global/api.js';
  export default {
    data () {
      return {
        home: []
      };
    },
    created () {
      this.$http.get(api.home).then((response) => {             // mark
        this.home = response.body.home;
        console.log(this.home.projectTeam.groupLeader);
      }, response => {
        // error callback
        this.$message.error('数据请求失败');
      });
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  .home
    padding:0 20px 0 30px
  .home h2
      font-size: 30px
      text-align: center
      line-height: 90px
      font-weight: 800
  .home h3
      padding-right:20px
      text-align: right
      font-size: 14px
  .home h4
      font-size: 18px
      line-height:50px
  .home h5
      padding-bottom:20px
  .home p
      color:#475669
      text-indent: 2em
      line-height: 20px
      font-size:16px
      padding: 17px 0
  .home strong
      font-weight: 500
      font-size: 24px
      line-height:80px
  .home b
      font-weight: 500
      font-size: 24px
      line-height:80px
  .homeHead
      width:100%
      height:120px
      background-color:rgba(50,65,85,0.3)
.home table
  width:100%
.home table th
  width:auto
  padding-top:5px
  padding-bottom:5px
  border:1px solid rgba(50,65,85,0.2)
  font-size:18px
  font-weight:600
.home table td
  border:1px solid rgba(50,65,85,0.2)
  padding: 20px 30px 20px 30px
.home li
  line-height:20px
  padding:0 0 20px 10px
.nurse
  width:100%
  height:auto
</style>
