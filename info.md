# 资源
- 账号:

  18681515464

- 密码:

  123456

- 进哥 api 文档:
  [http://192.168.0.176:9666/swagger-ui.html#/subject-info-high-controller/getSubjectInfoHighUsingGET]

- 侧边导航菜单列表修改地址:

  src\layouts\GlobalLayout.vue > beforeCreate > menuData

# 进程
  ...
  - [bug][done] fetch 服务器返回400, 无法被.json()解析, 此时报错;修复成返回false, 调用接口时判断, 如果false, 则取消后续操作
  - [dev][done] 页面代码逻辑修整(执行位置等...)
  - [bug][done] /userManager 点击修改按钮后, form有缓存, 应该修改成对应的value
  - [bug][done] api中需要用到res.data的地方, 都先判断有无data
  - [bug][done] /home form中, 应该用resetInitValue, 否则会有情况引发报错, cant set before render
  - [bug][done] /userManager 修改按钮修改的账户, 后台修改的是phone
  - [requirement][done] /userManager /billRecord /order分页加载的内容已加载部分进行缓存
  
# commit -m

- 2019-11-29 

  - [requirement][done] ~~修改所有api调用失败接口反馈提示, 展示接口名字与 反馈信息
  - [bug][done] /userManager 修复修改按钮没有对应到数据(id改成userId)
  - [requirement][done] api中需要用到res.data的地方, 都先判断有无data
  - [requirement][done] /userManager /billRecord /order分页加载的内容已加载部分进行缓存
  
- 2019-11-27

  1. /orderSelect init
  2. /orderSelect [done]
  3. form表单校验应该放在按钮处, 待修改

- 2019-11-26 

  1. [git]/billRecord [done]
  2. /order init
  3. userManager 修改操作补全
  4. 页面代码逻辑修整(执行位置等...):/home, /userManager, /billProduct, /billRecord

- 2019-11-24 

  1. [git]/userMnager 表格分页 
  2. [git]/billProduct init
  3. [git]/billRecord init

- 2019-11-22 
  1. [git]/userManger init
  2. [git]重构代码布局, 数据分类维护

- 2019-11-21 

  1. 修复 globalLayout 的高度没有撑满问题
  2. /home 完成 form, table, change, add
  3. /home 所有请求按钮制作 loading

# 上线

- [delete]src/api/api2
- [delete]src/views/devTest
- [delete]删除 dev 相关 route
- [notify]/order getOrders.data.status 写死为2 (业务不明)
- [notify]/home getBillConfig.data.status 写死为0 (业务不明)
- [notify]/billProduct createBillProduct.data.sendId,type 写死(业务不明)
- [notify]/order 订单状态未定义, 义务需求不清晰
- [notify]所有页面setting全局设置都还未载入(footlinks等)
- [requirement]所有页面form表单校验完善
- [requirement]权限管理设置(需配合后端完成)
- [notify]login 的userinfo现在暂存sessionStorage, 按需更改成cookie
- [requirement] form表单校验应该放在按钮处, 待修改
- [requirement] form表单校验规则新增
- [api] /orderSelect findUser接口,查询到内容为空时, 返回参数没有data, 且msg为success
- [api] /orderSelect getUserOrders接口,不传入id也会返回值
- [notify]api失败回调应写明哪个部分出错(参考:/billRecord api.getSchoolDepart)