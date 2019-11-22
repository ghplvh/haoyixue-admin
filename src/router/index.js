import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login/Login";
import PageView from "@/layouts/PageView";
import MenuView from "@/layouts/MenuView";
import RouteView from "@/layouts/RouteView";
Vue.use(VueRouter);
//普通路由, 所有权限都能访问的路由部分
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
    redirect: "/home",
    icon: "none",
    children: [
      {
        path: "/home",
        name: "首页",
        component: () => import("@/views/home/home.vue"),
        icon: "table"
      },
      {
        path: "/userManager",
        name: "用户管理",
        component: () => import("@/views/userManager/userManager"),
        icon: "table"
      },
      {
        path: "/formTest",
        name: "表单测试",
        component: () => import("@/views/devTest/formTest"),
        icon: "table"
      },
      {
        path: "/form2",
        name: "表单2",
        component: () => import("@/views/devTest/form2"),
        icon: "table"
      },
      {
        path: "/table1",
        name: "表格1",
        component: () => import("@/views/devTest/table1"),
        icon: "table"
      },
      {
        path: "/test1",
        name: "test1",
        component: () => import("@/views/devTest/test1"),
        icon: "table"
      },
      {
        path: "/test2",
        name: "test2",
        component: () => import("@/views/devTest/test2"),
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
            component: () => import("@/views/devTest/QueryList"),
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
    invisible: true,
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
// 异步路由, 需要权限管理的路由
export const asyncRouterMap = [
  {
    path: "/permission/test1",
    name: "路由测试4",
    component: () => import("@/views/devTest/test1"),
    meta: {
      roles: [0, 1, 2, 3]
    }
  },
  {
    path: "/permission/test2",
    name: "路由测试5",
    component: () => import("@/views/devTest/test2"),
    meta: {
      roles: [0]
    }
  },
  {
    path: "/permission/test3",
    name: "路由测试6",
    component: () => import("@/views/devTest/test3"),
    meta: {
      roles: [0]
    }
  },
  { path: "*", redirect: "/exception/403", hidden: true, invisible: true } // 404配置需放到路由配置最后
];

// 解决navigationDuplicated 路由连续点击报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  routes: constantRouterMap
});

export default router;
