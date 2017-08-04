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
import home from '@/components/home/home';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
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
    {path: '*', redirect: '/home'}

  ]
});
