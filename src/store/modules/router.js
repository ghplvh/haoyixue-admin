import { asyncRouterMap, constantRouterMap } from "@/router";
import { filterAsyncRouter } from "@/assets/js/common.js";

export default {
  namespaced: true,
  state: {
    routes: constantRouterMap,
    addRoutes: [],
    roles: []
  },
  mutations: {
    SET_ROLES(state, roles) {
      state.roles = roles;
    },
    SET_ROUTES(state, routes) {
      state.addRoutes = routes;
      state.routes = constantRouterMap.concat(routes);
    }
  },
  actions: {
    GENERATE_ROUTES({ commit }, data) {
      // data:当前登录账号的角色数组
      return new Promise(resolve => {
        const { roles } = data;
        let accessedRoutes;
        accessedRoutes = filterAsyncRouter(asyncRouterMap, roles);
        commit("SET_ROUTES", accessedRoutes);
        resolve();
      });
    }
  }
};
