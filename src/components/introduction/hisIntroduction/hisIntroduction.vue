<template>
  <div class="hisIntroduction">
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
            <el-button style="float: right;" type="primary" @click="check1">查看更多</el-button>
          </div>
          <div v-for="o in items1" :key="o" class="text item">
            {{ o }}
          </div>
        </el-card>
      </div>
      <div class="card">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">手术科室</span>
            <el-button style="float: right;" type="primary" @click="check2">查看更多</el-button>
          </div>
          <div v-for="o in items2" :key="o" class="text item">
            {{ o }}
          </div>
        </el-card>
      </div>
      <div class="card">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">诊断相关科室</span>
            <el-button style="float: right;" type="primary" @click="check3">查看更多</el-button>
          </div>
          <div v-for="o in items3" :key="o" class="text item">
            {{ o }}
          </div>
        </el-card>
      </div>
      </el-tab-pane>
      <el-tab-pane label="医院文化" name="fourth">
      <div class="theme">
        <img src="../logo/AnYi.logo.jpg" width="50px" height="50px">
        <span class="span_font">医院文化</span>
      </div>
      <div class="culture">
        <span style="font-size:20px;color:#75604F">“协和精神”——严谨、求精、勤奋、奉献</span>
        <p style="text-indent:4em">
          “严谨、求精、勤奋、奉献”协和精神是协和的核心价值观，是协和医院文化精髓。协和文化以崇尚科学、崇尚知识、专业态度和专业精神为其思想内核，又具有深厚的人文特征，表现方式凝重、内敛、不张扬、戒浮躁，重视口碑效应。具体体现在协和人身上就是科学严谨的作风、浓厚的人文传统与学术的包容性。正如董炳琨老院长所说，协和精神，追求其渊源，则是两大主意识流汇合的结晶。一是忠于科学的事业精神，一是忠于人民的奉献精神。<br/></p>
        <p style="text-indent:4em">协和精神体现在每一位协和人的思想和行为中，通过耳濡目染、言传身教，代代相传。纪念老一辈协和人，就是继承协和的光荣传统。多年来医院从不间断举办各种纪念大会、演讲比赛、青年志愿者等各种活动，强化对员工的协和精神教育，近年来医院大力加强院报、网站等文化载体建设，借助大众媒体，加强对协和精神、协和文化的传播。在协和文化指导下，医院文化的子文化——科室文化近年来也得到不断的丰富与发展。<br/></p>  
        <p style="text-indent:4em">医院在医、教、研、管理各项活动中，以自己特定的方式蕴育、培养、积淀着协和精神、协和文化、协和人才。协和八十多年来形成的文化传统，凝聚了协和内部的各种力量，引领协和人向着以人为本、以病人为中心的目标和方向一往无前。</p>
        <span style="font-size:20px;color:#75604F">协和三宝：教授、病案、图书馆</span>
        <p style="text-indent:4em"> 协和有“三宝”，教授、病案、图书馆。协和的病案蕴藏着医院极为丰富和宝贵的临床资料，是协和人医疗技术、经验、临床思维过程的记录和结晶，也是医院开展教学和科研的基石。一些名人病历已成为宝贵的历史资料</p>
        <span style="font-size:20px;color:#75604F">协和传统“三基三严”的由来</span>
        <p style="text-indent:4em">962年，学校在《旧协和医学院教学工作经验初步总结》中，提出了著名的“三基、三严”原则。在学习上要重视“三基”即基础理论、基本知识、基本技能；在学习工作、科学研究上要强调“三严”，即严肃的态度、严格的要求、严密的方法。协和医院至今坚持以“三基、三严”为医学教育和人才培养的准则。</p>
      </div>
      <div class="culture">
         <span style="font-size:20px;color:#75604F">百年协和内涵</span>
         <p style="font-size:24px;margin-top:60px;">学术协和</p>
         <p style="margin-top:20px">创新：尊重科学 创新为魂</p>
         <p>争鸣：学术争鸣 开放包容</p>
         <p>协作：国际视野 团队合作</p>
         <p>引领：追求卓越 持续领先</p>
         <p style="font-size:24px;margin-top:60px;">品质协和 </p>
         <p style="margin-top:20px">精益：精湛医术 优质服务</p>
         <p>效率：高效低耗 执行有力</p>
         <p>智慧：数字医院 智慧医疗</p>
         <p>洁静：整洁有序 美丽协和</p>
         <p style="font-size:24px;margin-top:60px;">人文协和</p>
         <p style="margin-top:20px">尊重：平等尊重 敬畏生命</p>
         <p>人本：以人为本 人尽其才</p>
      </div>
      </el-tab-pane>
    </el-tabs>

    <div class="dialog1">
      <el-dialog title="非手术科" :visible.sync="dialogVisible1" size="tiny" :before-close="handleClose">
        <div v-for="i in dialog1" :key="i">{{ i }}</div>
      </el-dialog>
    </div>
    <div class="dialog">
      <el-dialog title="手术科" :visible.sync="dialogVisible2" size="tiny" :before-close="handleClose">
        <div v-for="i in dialog2" :key="i">{{ i }}</div>
      </el-dialog>
    </div>
    <div class="dialog">
      <el-dialog title="诊断相关科室" :visible.sync="dialogVisible3" size="tiny" :before-close="handleClose">
        <div v-for="i in dialog3" :key="i">{{ i }}</div>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        activeName: 'first',
        dialogVisible1: false,
        dialogVisible2: false,
        dialogVisible3: false,
        items1: ['内科学系', '心内科', '呼吸内科', '消化内科', '肾内科'],
        items2: ['外科学系', '基本外科', '骨科', '心外科', '胸外科'],
        items3: ['超声医学科', '病理科', '检验科', '放射科', '放射治疗科'],
        dialog1: ['血液内科', '风湿免疫科', '感染内科', '普通内科', '肿瘤内科', '内科ICU', '内分泌科', '肠外肠内营养科', '重症医学科(ICU)', '儿科', '神经科', '心理医学科', '皮肤科', '变态（过敏）反应科', '急诊科', '中医科', '老年医学科'],
        dialog2: ['泌尿外科', '神经外科', '血管外科', '整形美容外科', '乳腺外科', '肝脏外科', '妇产科', '眼科', '耳鼻喉科', '口腔科', '麻醉科'],
        dialog3: ['核医学科', '营养科', '输血科', '药剂科', '病案科', '物理医学康复科', '疾病分类中心']
      };
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event);
      },
      // 查看更多
      check1 () {
        this.dialogVisible1 = true;
      },
      check2 () {
        this.dialogVisible2 = true;
      },
      check3 () {
        this.dialogVisible3 = true;
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  .hisIntroduction .span_font
    font-size:24px
    color:blue
  .hisIntroduction .introduction
    width:700px
    height:550px
    float:left
    position:relative
    margin-top:50px
  .hisIntroduction .picture-display
    float:right
    width:600px
    height:500px
  .hisIntroduction .picture-display ul li
    float:left
    margin-top:50px
  .hisIntroduction .card
    float:left
    margin-top:50px
    padding-left:20px
  .hisIntroduction .text
    font-size:14px
  .hisIntroduction .item
    padding:18px 0
  .hisIntroduction .clearfix:before, .clearfix:after
    display: table
    content: ""
  .hisIntroduction .clearfix:after
    clear: both
  .hisIntroduction .box-card
    width: 420px
    background:green
  .hisIntroduction .culture
    margin:auto
    margin-top:50px
    width:500px 
    padding-left:150px
    float:left
</style>