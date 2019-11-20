/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = "";
let routerMode = "hash";
let imgBaseUrl = "";

if (process.env.NODE_ENV == "development") {
  imgBaseUrl = "";
  baseUrl = "https://duchengedu.com/ws-study";
  // baseUrl = "http://192.168.0.176:9666"; //进哥的接口
} else if (process.env.NODE_ENV == "production") {
  baseUrl = "https://duchengedu.com/ws-study";
  // baseUrl = "http://192.168.0.176:9666"; //进哥的接口
}

export { baseUrl, routerMode, imgBaseUrl };