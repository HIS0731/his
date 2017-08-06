import Vue from 'vue';
import Router from 'vue-router';
import VueResource from 'vue-resource';
import addNurse from '@/components/nurse/addNurse/addNurse';
import hasNurse from '@/components/nurse/hasNurse/hasNurse';
import drugInfosC from '@/components/pharmacy/drugInfosC/drugInfosC';
import drugApplyC from '@/components/pharmacy/drugApplyC/drugApplyC';
import prescriptionManageC from '@/components/pharmacy/prescriptionManageC/prescriptionManageC';
import drugInfosW from '@/components/pharmacy/drugInfosW/drugInfosW';
import drugApplyW from '@/components/pharmacy/drugApplyW/drugApplyW';
import prescriptionManageW from '@/components/pharmacy/prescriptionManageW/prescriptionManageW';
import register from '@/components/cash_system/register/register';
import home from '@/components/home/home';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import addPatient from '@/components/patient/addPatient/addPatient';
import hasPatient from '@/components/patient/hasPatient/hasPatient';
import addRegistered from '@/components/patient/addRegistered/addRegistered';
import hospitalized from '@/components/patient/hospitalized/hospitalized';
import drugStorage from '@/components/drugStorage/putInStorage/putInStorage';
import checkDrugStorage from '@/components/drugStorage/checkDrugStorage/checkDrugStorage';
import stockRemoval from '@/components/drugStorage/stockRemoval/stockRemoval';
import trashy from '@/components/drugStorage/trashy/trashy';
import addTrashy from '@/components/drugStorage/trashy/addTrashy/addTrashy';
import addDoctor from '@/components/doctor/addDoctor/addDoctor';
import editDoctor from '@/components/doctor/editDoctor/editDoctor';
import shiftDoctor from '@/components/doctor/shiftDoctor/shiftDoctor';
import staffFlow from '@/components/doctor/staffFlow/staffFlow';
import officeComplaints from '@/components/doctor/officeComplaints/officeComplaints';
import shift from '@/components/nurse/shift/shift';
import turnOver from '@/components/nurse/turnOver/turnOver';
import complainInfo from '@/components/nurse/checkInfo/complainInfo';
import hisIntroduction from '@/components/introduction/hisIntroduction/hisIntroduction';
import staffIntroduction from '@/components/introduction/staffIntroduction/staffIntroduction';
import patientCount from '@/components/introduction/patientCount/patientCount';
import patientFeedback from '@/components/introduction/patientFeedback/patientFeedback';
import Vuex from 'vuex';
Vue.use(Vuex);
Vue.use(Router);
Vue.use(VueResource);
Vue.use(ElementUI);
export default new Router({
  routes: [
    { path: '/home', name: 'home', component: home },
    { path: '/addNurse', name: 'addNurse', component: addNurse },
    { path: '/hasNurse', name: 'hasNurse', component: hasNurse },
    { path: '/drugInfosC', name: 'drugInfosC', component: drugInfosC },
    { path: '/drugApplyC', name: 'drugApplyC', component: drugApplyC },
    { path: '/prescriptionManageC', name: 'prescriptionManageC', component: prescriptionManageC },
    { path: '/drugInfosW', name: 'drugInfosW', component: drugInfosW },
    { path: '/drugApplyW', name: 'drugApplyW', component: drugApplyW },
    { path: '/prescriptionManageW', name: 'prescriptionManageW', component: prescriptionManageW },
    { path: '/register', name: 'register', component: register },
    { path: '/addPatient', name: 'addPatient', component: addPatient },
    { path: '/hasPatient', name: 'hasPatient', component: hasPatient },
    { path: '/addRegistered', name: 'addRegistered', component: addRegistered },
    { path: '/hospitalized', name: 'hospitalized', component: hospitalized },
    { path: '/drugStorage', name: 'drugStorage', component: drugStorage },
    { path: '/checkDrugStorage', name: 'checkDrugStorage', component: checkDrugStorage },
    { path: '/stockRemoval', name: 'stockRemoval', component: stockRemoval },
    { path: '/trashy', name: 'trashy', component: trashy },
    { path: '/addDoctor', name: 'addDoctor', component: addDoctor },
    { path: '/editDoctor', name: 'editDoctor', component: editDoctor },
    { path: '/shiftDoctor', name: 'shiftDoctor', component: shiftDoctor },
    { path: '/staffFlow', name: 'staffFlow', component: staffFlow },
    { path: '/shift', name: 'shift', component: shift },
    { path: '/turnOver', name: 'turnOver', component: turnOver },
    { path: '/complainInfo', name: 'complainInfo', component: complainInfo },
    { path: '/hisIntroduction', name: 'hisIntroduction', component: hisIntroduction },
    { path: '/staffIntroduction', name: 'staffIntroduction', component: staffIntroduction },
    { path: '/patientCount', name: 'patientCount', component: patientCount },
    { path: '/patientFeedback', name: 'patientFeedback', component: patientFeedback },
    { path: '/officeComplaints', name: 'officeComplaints', component: officeComplaints },
    {
      path: '/addTrashy',
      component: addTrashy,
      name: 'addTrashy',
      beforeEnter: (to, from, next) => {
        next();
      }
    },
    {path: '*', redirect: '/home'}

  ]
});
