export default {
  namespaced: true,
  state: {
    userInfo: {},
    isLogin: false
  },
  mutations: {
    setUser(state) {
      let userInfo = JSON.parse(sessionStorage.getItem("user"));
      state.userInfo = userInfo;
      state.isLogin = !!userInfo.userId;
    }
  }
};
