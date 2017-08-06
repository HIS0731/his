
import Vuex from 'vuex';
// action
var state = {
  isCollapse: true
};
const mutations = {
  nav_toggle (state) {
    state.isCollapse = !state.isCollapse;
  }
};
const actions = {// 处理异步请求，判断，流程控制
  navToggle: ({commit, state}) => {
    commit('nav_toggle');
  },
  navColse: ({commit, state}) => {
    if (!state.isCollapse) {
      commit('nav_toggle');
    }
  }
};

const getters = {
  isCollapse (state) {
    return state.isCollapse;
  }
};
// 需要导出Store对象
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
