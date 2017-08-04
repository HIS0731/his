import Vue from 'vue';
import Router from 'vue-router';
import VueResource from 'vue-resource';
import addNurse from '@/components/nurse/addNurse/addNurse';
import hasNurse from '@/components/nurse/hasNurse/hasNurse';
import addPatient from '@/components/patient/addPatient/addPatient';
import hasPatient from '@/components/patient/hasPatient/hasPatient';
import addRegistered from '@/components/patient/addRegistered/addRegistered';
import hospitalized from '@/components/patient/hospitalized/hospitalized';
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
    { path: '/addPatient', name: 'addPatient', component: addPatient },
    { path: '/hasPatient', name: 'hasPatient', component: hasPatient },
    { path: '/addRegistered', name: 'addRegistered', component: addRegistered },
    { path: '/hospitalized', name: 'hospitalized', component: hospitalized },
    {path: '*', redirect: '/home'}
  ]
});

