<template>
  <div class="hisIntroduction">
    <!-- 医院基本介绍 -->
    
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="医院简介" name="first">
      <div class="theme">
        <img src="../logo/AnYi.logo.jpg" width="50px" height="50px">
        <span class="span_font">医院简介</span>
      </div>
      <div class="introduction">
      <p style="line-height:30px"><em style="font-size:24px">广州市安逸医院</em>是一家集医疗、教学、科研、预防、保健为一体的非营利性综合二级甲等医院，医院始建于2017年，位于广州市的东面，是广州市著名的公立医院之一，承担市内几十万到几百万人口的医疗、保健、疾病防治任务，是广东省高等医学院教学医院，其影响辐射到整个广州市以及周边地区。
       <p style="line-height:30px;text-indent:2em">医院占地面积4万平方米，建筑面积6万多平方米，现开放病床448张，现有职工700多人，设有5个下属门诊部，年门诊量超过100万人次，年住院病人2万多人。</p>　　  
       <p style="line-height:30px;text-indent:2em">医院拥有教授等一大批高、中级专业技术人才，配备了国内领先水平的飞利浦1.5T磁共振仪、美国GE螺旋CT机，飞利浦数字化X光机、日本柯尼卡CR机、柯达DR机、奥林巴斯全自动生化仪、飞利浦iu22实时三维彩超、美国爱尔康白内障超声乳化仪、奥林巴斯腹腔镜及胃肠镜等一批先进医疗设备。</p>
       <p style="line-height:30px;text-indent:2em">医院设有：急诊科、内科（内一科、内二科）、外科（外一科、外二科）、妇产科、儿科、NICU、手外科、泌尿外科、神经外科、ICU、五官科、中医康复科、手术室、麻醉科、口腔科、皮肤科、功能检查、检验科科，影像科等科室。拥有国际标准的千级、万级层流手术室，能够开展一批难度较大的专科新技术。</p>
       <p style="line-height:30px;text-indent:2em">医院以救死扶伤为已任，以社会效益为目标，竭诚为人民群众提供优质的医疗服务，先后被评为广东省：“文明单位”、 “文明窗口”、“百家文明医院”、“巾帼文明示范岗”和东莞市“文明单位”、 “文明示范单位”、“文明单位标兵”等荣誉称号。</p>
      </p>
      </div>
      <div class="picture-display">
        <ul>
          <li><img src="../logo/picture1.jpg" width="300px" height="200px"></li>
          <li><img src="../logo/picture2.jpg" width="300px" height="200px"></li>
          <li><img src="../logo/picture3.jpg" width="300px" height="200px"></li>
          <li><img src="../logo/picture4.jpg" width="300px" height="200px"></li>
        </ul>
      </div>
      </el-tab-pane>
      <el-tab-pane label="就医指南" name="second">
      <div class="theme">
        <img src="../logo/AnYi.logo.jpg" width="50px" height="50px">
        <span class="span_font">就医指南</span>
      </div>
      <el-steps :space="100" direction="vertical" :active="1">
        <el-step title="步骤 1 " description="—— 材料准备-做好看病需要的材料，比如身份证，社保卡。银行卡，足够的现金。如有病例单也最好带上，村里办了合作医疗的也可以带上，如需要产子什么的，户口本，准生证也要准备好。">
        </el-step>
        <el-step title="步骤 2" description="—— 挂号"></el-step>
        <el-step title="步骤 3" description="—— 门诊部-挂号之后，有的会让你等待，通知你去哪个门诊部看病。找相关的医生给你诊断治疗。"></el-step>
        <el-step title="步骤 4" description="—— 收费站-在门诊部"></el-step>
        <el-step title="步骤 5" description="—— 开药治疗-拿到报告单之后，给给你看病的医生查看。门诊部的医生根据你的报告单做出合适的治疗措施，当然如一些需要做手术之类的要经过你的同意方可进行。普通疾病的话会给你开药治疗等。">
        </el-step>
        <el-step title="步骤 6" description="—— 药房取药-医生已经开好了药单，到收费处同样要先缴费才能取药。把药单给收费员之后，去药房取药。">
        </el-step>
        <el-step title="步骤 7" description="—— 定期复查-为了你的身体健康，医生建议你复查的就去复查，按医生的叮嘱按时吃药，定期复查。有任何问题可拨打医院的服务热线。">
        </el-step>
      </el-steps>
      </el-tab-pane>
      <el-tab-pane label="科室导航" name="third">
      <div class="theme">
        <img src="../logo/AnYi.logo.jpg" width="50px" height="50px">
        <span class="span_font">科室导航</span>
      </div>
      <div class="card">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">非手术科室</span>
            <el-button style="float: right;" type="primary">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </div>
      <div class="card">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">手术科室</span>
            <el-button style="float: right;" type="primary">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </div>
      <div class="card">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">诊断相关科室</span>
            <el-button style="float: right;" type="primary">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </div>
      </el-tab-pane>
      <el-tab-pane label="医院文化" name="fourth">
      <div class="theme">
        <img src="../logo/AnYi.logo.jpg" width="50px" height="50px">
        <span class="span_font">医院文化</span>
      </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  .span_font
    font-size:24px
    color:blue
  .introduction
    width:700px
    height:550px
    float:left
    position:relative
    margin-top:50px
  .picture-display
    float:right
    width:600px
    height:500px
  .picture-display ul li
    float:left
    margin-top:50px
  .card
    float:left
    margin-top:50px
    padding-left:20px
  .text
    font-size:14px
  .item
    padding:18px 0
  .clearfix:before, .clearfix:after
    display: table
    content: ""
  .clearfix:after
    clear: both
  .box-card
    width: 420px
</style>