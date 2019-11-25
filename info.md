# 
  - 账号:
    18681515464  
  - 密码:
    123456
  - 进哥api文档:
    [http://192.168.0.176:9666/swagger-ui.html#/subject-info-high-controller/getSubjectInfoHighUsingGET]
  - 侧边导航菜单修改: 
    src\layouts\GlobalLayout.vue > beforeCreate > menuData

# commit -m
  - 2019-11-24 14:32:24
    1. 重构代码布局, 数据分类维护
    2. /userMnager 表格分页
    
  - 2019-11-22 08:53:37
    1. /userManger init

  - 2019-11-21 09:05:34 
    1. 修复globalLayout的高度没有撑满问题
    2. /home完成form, table, change, add
    3. /home所有请求按钮制作loading

# 上线
  - [delete]src/api/api2 
  - [delete]src/views/home/home表格....
  - [delete]src/views/devTest
  - [delete]src/views/userManager
  - [delete]删除dev 相关route
  - [delete]/home/home copy