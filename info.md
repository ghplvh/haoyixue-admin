# 
  - 账号:
    18681515464  
  - 密码:
    123456
  - 进哥api文档:
    [http://192.168.0.176:9666/swagger-ui.html#/subject-info-high-controller/getSubjectInfoHighUsingGET]
  - 侧边导航菜单修改: 
    src\layouts\GlobalLayout.vue > beforeCreate > menuData
# 流程记录
  - 全局sideMenu, menuView, globalHeader 组件
  - login登陆 (暂存sessionStorage)
  - 权限管理 
    @/router/permission.js
    @/store/modules/router.js
    @/router/index  > meta: {roles: [0,1,2,3]}
 
# commit -m
  2019-11-22 08:53:37
  
  2019-11-21 09:05:34 
  1. 修复globalLayout的高度没有撑满问题
  2. /home完成form, table, change, add
  3. /home所有请求按钮制作loading

# 上线
  - [delete]src/api/api2 
  - [delete]src/views/home/home表格....
  - [delete]src/views/devTest
  - [delete]src/views/userManager

