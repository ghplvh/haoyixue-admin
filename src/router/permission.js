import router from "../router";
import store from "../store";
// import { hasPermission } from "@/assets/js/common.js";
// import cookie from "js-cookie";

const whiteList = [
  // 不需要登录就可以访问的页面
  "/",
  "/login",
  "/exception/404",
  "/exception/403",
  "/exception/500"
];

router.beforeEach((to, from, next) => {
  // const shiroCookie = cookie.get("userInfo");
  const isLogin = store.state.account.isLogin;
  if (isLogin) {
    // if (store.state.roles.length === 0) {
    //   // 登录操作后，以及当刷新页面是store中的数据恢复到初始值，需要重新设置
    //   const roles = [JSON.parse(cookie.get("userInfo")).position];
    //   store.commit("SET_ROLES", roles);
    //   store.dispatch("GenerateRoutes", { roles }).then(() => {
    //     // 根据roles权限生成可访问的路由表
    //     router.addRoutes(store.state.addRouters); // 动态添加可访问路由表
    //     next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
    //   });
    // } else {
    //   // 没有刷新页面对路由权限验证
    //   if (to.meta.roles && to.meta.roles.length) {
    //     // 当前路由有权限限制时，经过验证后，允许跳转
    //     if (hasPermission(store.state.roles, to.meta.roles)) {
    //       next();
    //     }
    //   } else {
    //     // 不存在权限限制时，则允许跳转
    //     next();
    //   }
    // }
    next();
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果在白名单之列，则允许跳转
      next();
    } else {
      // 如果不在白名单之列，则返回登录页
      next("/login");
    }
  }
});
