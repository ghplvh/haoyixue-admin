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
      // 当前登录账号的角色数组
      return new Promise(resolve => {
        const { roles } = data;
        let accessedRouters;
        // 如果当前账号级别为0，则拥有所有的权限
        if (roles.indexOf(0) >= 0) {
          accessedRouters = asyncRouterMap;
        } else {
          // 过滤账户权限
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles);
        }
        commit("SET_ROUTERS", accessedRouters);
        resolve();
      });
    }
  }
};
