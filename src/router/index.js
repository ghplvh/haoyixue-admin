import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login/Login";
import PageView from "@/layouts/PageView";
import MenuView from "@/layouts/MenuView";
Vue.use(VueRouter);

const routes = [
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
    redirect: "/login",
    icon: "none",
    invisible: true,
    children: [
      {
        path: "/list",
        name: "列表页",
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
  }
];

const router = new VueRouter({
  routes
});

export default router;
