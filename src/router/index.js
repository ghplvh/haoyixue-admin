import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login/Login";
import PageView from "@/layouts/PageView";
import MenuView from "@/layouts/MenuView";
import RouteView from "@/layouts/RouteView";
Vue.use(VueRouter);

export const constantRouterMap = [
  {
    path: "/login",
    name: "登录页",
    component: Login,
    invisible: true
  },
  {
    path: "/",
    name: "首页",
    component: MenuView,
    redirect: "/userManager",
    icon: "none",
    invisible: true,
    children: [
      {
        path: "/userManager",
        name: "用户管理",
        component: () => import("@/views/userManager/userManager"),
        icon: "table"
      },
      {
        path: "/list",
        name: "列表",
        component: PageView,
        icon: "table",
        children: [
          {
            path: "/list/query",
            name: "查询表格",
            component: () => import("@/views/list/QueryList"),
            icon: "none"
          }
        ]
      }
    ]
  },
  {
    path: "/exception",
    name: "异常页",
    icon: "warning",
    component: RouteView,
    children: [
      {
        path: "/exception/404",
        name: "404",
        icon: "none",
        component: () => import("@/views/exception/404")
      },
      {
        path: "/exception/403",
        name: "403",
        icon: "none",
        component: () => import("@/views/exception/403")
      },
      {
        path: "/exception/500",
        name: "500",
        icon: "none",
        component: () => import("@/views/exception/500")
      }
    ]
  }
];

export const asyncRouterMap = [
  {
    path: "/permission/test1",
    name: "路由测试",
    component: () => import("@/views/permissionTest/test1"),
    meta: {
      roles: [0, 1, 2]
    }
  },
  {
    path: "/permission/test2",
    name: "路由测试",
    component: () => import("@/views/permissionTest/test2"),
    meta: {
      roles: [0, 1]
    }
  },
  {
    path: "/permission/test3",
    name: "路由测试",
    component: () => import("@/views/permissionTest/test3"),
    meta: {
      roles: [0]
    }
  },
  { path: "*", redirect: "/exception/403", hidden: true } // 404配置需放到路由配置最后
];

const router = new VueRouter({
  routes: constantRouterMap
});

export default router;
