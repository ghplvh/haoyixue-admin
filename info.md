#

- 账号:
  18681515464
- 密码:
  123456
- 进哥 api 文档:
  [http://192.168.0.176:9666/swagger-ui.html#/subject-info-high-controller/getSubjectInfoHighUsingGET]
- 侧边导航菜单修改:
  src\layouts\GlobalLayout.vue > beforeCreate > menuData
# 进程
  ...
  - [bug]fetch 服务器返回400, 无法被.json()解析, 此时报错;修复成返回false, 调用接口时判断, 如果false, 则取消后续操作
  - [view] /billRecord 
# commit -m

- 2019-11-26 
  1. /billRecord 初步完成
  
- 2019-11-24 

  1. /userMnager 表格分页 
  2. /billProduct init
  3. /billRecord init

- 2019-11-22 
  1. /userManger init
  2. 重构代码布局, 数据分类维护

- 2019-11-21 

  1. 修复 globalLayout 的高度没有撑满问题
  2. /home 完成 form, table, change, add
  3. /home 所有请求按钮制作 loading

# 上线

- [delete]src/api/api2
- [delete]src/views/home/home 表格....
- [delete]src/views/devTest
- [delete]src/views/userManager
- [delete]删除 dev 相关 route
- [delete]/home/home copy
