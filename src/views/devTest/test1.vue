<template>
  <div>
    权限测试, 当前roles: [0, 1, 2, 3]
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    };
  },
  mounted () {
    this.fetch(
      "http://120.24.181.77:8888/base/user/getSiteList",
      {
        id: "a7a2dfc7b28349be97ada29c6d3522d3",
        buildingName: "测试04"
      },
      "POST"
    ).then(res => {
      this.list = res.data.alrList;
      let resList = this.totalFuck(this.list);
      return resList;
    });
  },
  methods: {
    getRList (list) {
      let oList = [];
      list.forEach(item1 => {
        let pList = [];
        item1.bsList.forEach(item2 => {
          item2.advertName = item1.advertName;
          pList.push(item2);
        });
        oList.push(pList);
      });
      return oList;
    },
    getPlist (list) {
      let count = 0;
      let gList = [];
      let kList = [];
      list.forEach(item1 => {
        item1.forEach(item2 => {
          if (count > 9) {
            gList.push(kList);
            kList = [];
            count = 0;
          }
          kList.push(item2);
          count++;
        });
      });
      gList.push(kList);
      kList = [];
      return gList;
    },
    fuckFive (g) {
      let list = g.concat();
      let name = "";
      let count = 1;
      let index = 0;
      for (let i = 0; i < list.length; i++) {
        if (i === 0) {
          name = list[i].advertName;
          count = 1;
        } else if (list[i].advertName === name) {
          list[i].rowSpan = 0;
          count++;
        } else {
          list[index].rowSpan = count;
          name = list[i].advertName;
          count = 1;
          index = i;
        }
      }
      list[index].rowSpan = count;
      return list;
    },
    totalFuck (list) {
      let rList = this.getRList(list);
      let pList = this.getPlist(rList);
      let resList = [];
      pList.forEach(item => {
        let jssList = this.fuckFive(item);
        resList.push(jssList);
      });
      return resList;
    },
    async fetch (url = "", data = {}, type = "GET", method = "fetch") {
      type = type.toUpperCase();

      // 此处规定get请求的参数使用时放在data中，如同post请求
      if (type == "GET") {
        let dataStr = "";
        Object.keys(data).forEach(key => {
          dataStr += key + "=" + data[key] + "&";
        });

        if (dataStr !== "") {
          dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"));
          url = url + "?" + dataStr;
        }
      }

      // 对于支持fetch方法的浏览器，处理如下：
      if (window.fetch && method == "fetch") {
        let requestConfig = {
          // fetch默认不会带cookie，需要添加配置项credentials允许携带cookie
          // credentials: "include",
          method: type,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          mode: "cors", // 以CORS的形式跨域
          cache: "force-cache"
        };

        if (type == "POST") {
          Object.defineProperty(requestConfig, "body", {
            value: JSON.stringify(data)
          });
        }

        try {
          const response = await fetch(url, requestConfig);
          const responseJson = await response.json();
          return responseJson;
        } catch (error) {
          throw new Error(error);
        }
      } else {
        // 对于不支持fetch的浏览器，便自动使用 ajax + promise
        return new Promise((resolve, reject) => {
          let requestObj;
          if (window.XMLHttpRequest) {
            requestObj = new XMLHttpRequest();
          }

          let sendData = "";
          if (type == "POST") {
            sendData = JSON.stringify(data);
          }

          requestObj.open(type, url, true);
          requestObj.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
          );
          requestObj.send(sendData);

          requestObj.onreadystatechange = () => {
            if (requestObj.readyState == 4) {
              if (requestObj.status == 200) {
                let obj = requestObj.response;
                if (typeof obj !== "object") {
                  obj = JSON.parse(obj);
                }
                resolve(obj);
              } else {
                reject(requestObj);
              }
            }
          };
        });
      }
    }
  }
};
</script>
