<template>
    <div class="home" v-if="home.title">
       <h3 class="tips">该项目是本人在读本科大三的时候，和组员一起开发的前端项目。由于我的组员的辛勤劳动和青春时的激情，才有了这个项目。但仅仅是前端项目。你们引用该项目可以免去团队开发中两个角色（产品经理和前端开发）的工作。项目日后不会继续更新， 不会提供无偿或者有偿的后端支持、数据库的支持以及服务器的支持。如果有关前端的问题欢迎咨询组长或者组员，但是该前端项目组的全体成员为女性。所以，请保持礼貌。感谢有些小规模的公司对该项目的认可。如果在产品需求上符合你们的需求，那要谢谢不在该名单内的身为医务人员的合作伙伴（谢绍雄）给我提供关于医务工作的相关细节。如果你是前端的学习者，我想说该项目的开发时间为2017年，当时用的是vue2。在的2019年，vue3已出。是否继续使用该项目作为你的项目的基础，请自行进行衡量。最后，再说一次。请保持礼貌。不要给我和组员造成骚扰。组长敬上。</h3><div class="homeHead">
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
  .home .tips
    color: #f00
    text-align: left
    text-indent: 2em
    margin-bottom: 20px
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
