// 获取localStorage
export const getStore = val => {
  if (!val) return;
  return JSON.parse(window.localStorage.getItem(val));
};

export const setStore = (key, val) => {
  if (!key) return;
  if (typeof val !== "string") {
    val = JSON.stringify(val);
  }
  return window.localStorage.setItem(key, val);
};

export const removeStore = val => {
  if (!val) return;
  window.localStorage.removeItem(val);
};

//提取url中param
export const getUrlParam = (name, url) => {
  // var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  // var r = window.location.search.substr(1).match(reg);
  // if (r != null) return unescape(r[2]);
  // return null;

  var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
  if (reg.test(url)) return unescape(RegExp.$2.replace(/\+/g, " "));
  return "";
};
//判断是否为安卓
export const isAndroid_ios = () => {
  var u = navigator.userAgent;
  //android终端或者uc浏览器
  var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
  return isAndroid == true ? true : false;
};
