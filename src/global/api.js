// 接口配置

// 把全体接口封装在的前端配置文件（序号与接口文档一一对应），多个环境配置时可快速切换整站式的全部接口，不用逐个页面去改。
const config = require('../../config');

let url = {
  // staticPath:config.dev.staticPath,       //开发环境静态资源路径
  // 条件 ? 结果1 : 结果2 //三元运算符，表示条件为true时，等式的结果就为结果1（'./'），否则为结果2('/static/')。
  // development为开发环境（npm run dev），另外一个是生产环境（www.jd.com）
  // 生产环境时staticPath的值为'./'，开发环境时staticPath的值为'/static/'。
  staticPath: process.env.NODE_ENV !== 'development' ? config.build.staticPath : config.dev.staticPath
};
// ----------------请注意：如果正式环境，不需要本地json数据模拟，请删除以上代码和api中的模拟接口。----------------
export const api = {
  'login': url.staticPath + 'static/userLogin.json',
  'home': url.staticPath + 'static/home.json',
  'department': url.staticPath + 'static/department.json',
  'patientList': url.staticPath + 'static/patientList.json',
  'doctor': url.staticPath + 'static/doctor/doctor.json',
  'complaintPatient': url.staticPath + 'static/doctor/complaintPatient.json',
  'shiftList': url.staticPath + 'static/doctor/shiftList.json',
  'staffFlow': url.staticPath + 'static/doctor/staffFlow.json',
  'Storage': url.staticPath + 'static/Storage.json',
  'putInStorage': url.staticPath + 'static/putInStorage.json',
  'stockRemoval': url.staticPath + 'static/stockRemoval.json',
  'complaints': url.staticPath + 'static/complaints.json',
  'patientCount': url.staticPath + 'static/patientCount.json',
  'staffIntroduction': url.staticPath + 'static/staffIntroduction.json',
  'complainInfo': url.staticPath + 'static/complainInfo.json',
  'hasNurse': url.staticPath + 'static/hasNurse.json',
  'table_shift': url.staticPath + 'static/table_shift.json',
  'turnOver': url.staticPath + 'static/turnOver.json',
  'drugs': url.staticPath + 'static/drugs.json',
  'registered': url.staticPath + 'static/doctor/registered.json',
  'trashy': url.staticPath + 'static/trashy.json',
  'provinces': url.staticPath + 'static/provinces.json',
  'patientList1': url.staticPath + 'static/patientList1.json'
};
