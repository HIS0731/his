/**
 * Created by admin on 2017/8/7.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { // 模块
    user
  }
});
