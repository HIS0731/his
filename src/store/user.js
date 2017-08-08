import * as userInfo from './userInfo';
// 重新刷新页面不出来了 mark!!!!
const state = {
  // 用户登录状态,存储在sessionStorage中，防止刷新后没了
  // easeHis: sessionStorage.getItem('easeHis') ? JSON.parse(sessionStorage.getItem('easeHis')) : false,
  // easeHisType: sessionStorage.getItem('easeHisType') ? JSON.parse(sessionStorage.getItem('easeHisType')) : false
  easeHis: sessionStorage.getItem('easeHis') ? sessionStorage.getItem('easeHis') : false,
  easeHisType: sessionStorage.getItem('easeHisType') ? sessionStorage.getItem('easeHisType') : false
};

const actions = {
  /**
   * 用户登录
   */
  setUserInfo ({commit}, res) { // 这里的res可以由页面传过来，改变底下的true或者false
    sessionStorage.setItem('easeHis', res.name);
    sessionStorage.setItem('easeHisType', res.type);
    commit(userInfo.SET_LOGIN_NAME, res.name);
    commit(userInfo.SET_LOGIN_TYPE, res.type);
  },

  /**
   * 退出登录
   */
  setSignOut ({commit}) {
    sessionStorage.removeItem('easeHis');
    sessionStorage.removeItem('easeHisType');
    commit(userInfo.SET_LOGIN_NAME, false);
  }

};

const getters = {
  easeHis: state => state.easeHis,
  easeHisType: state => state.easeHisType
};

const mutations = {
  [userInfo.SET_LOGIN_TYPE] (state, type) {
    state.easeHisType = type;
  },
  [userInfo.SET_LOGIN_NAME] (state, name) {
    state.easeHis = name;
  }
};

export default {
  state, // 状态
  actions, // 提交mutations,可做异步操作
  getters, // 对数据进行一些操作
  mutations// 对状态做更改（同步）
};
