// 账户相关
export default {
  namespaced: true,
  state: {
    userInfo: {},
    isLogin: false
  },
  mutations: {
    SET_USER(state) {
      const userInfo = JSON.parse(sessionStorage.getItem("user"));
      state.userInfo = userInfo;
      state.isLogin = (userInfo && !!userInfo.userId) || false;
    }
  }
};
