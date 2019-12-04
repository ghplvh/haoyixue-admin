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
  - [view] /login [api][✔][dom][✔][script][✔]
  - [view] /home [api][✔][dom][✔][script][✔]
  - [view] /order/order [api][✔][dom][✔][script][✔]
  - [view] /order/orderSelect [api][✔][dom][✔][script][✔]
  - [view] /userManager [api][✔][dom][✔][script][✔]
  - [view] /bill/billProduct [api][✔][dom][✔][script][✔]
  - [view] /bill/billRecord [api][✔][dom][✔][script][✔]
  - [view] /news [api][✔][dom][✔][script][✔]
  - [view] /banner [api][✔][dom][✔][script][✔]
  - [view] /inform [api][✔][dom][✔][script][✔]
  - [view] /homework [api][✔][dom][✔][script][✔] 
# commit -m
- 2019-12-04 

 - [bug] @\layout\GlobalLayout.vue  添加css minheight = 100vh - ** px 自适应高度
 - [view] /homework [api][✔][dom][✔][script][✔] 

- 2019-12-03

  - [view] /mall [api][✔][dom][✔][script][✔]
  - [view] /news [api][✔][dom][✔][script][✔]
  - [view] /banner [api][✔][dom][✔][script][✔]
  - [view] /inform [api][✔][dom][✔][script][✔]

- 2019-12-02 

  - [bug][done] /mall 如果用fetch进行formData的表单上传, 设置contentType会上传失败,去掉content-type字段即可

- 2019-11-29 

  - [requirement][done] ~~修改所有api调用失败接口反馈提示, 展示接口名字与 反馈信息
  - [bug][done] /userManager 修复修改按钮没有对应到数据(id改成userId)
  - [requirement][done] api中需要用到res.data的地方, 都先判断有无data
  - [requirement][done] /userManager /billRecord /order分页加载的内容已加载部分进行缓存
  - [view] /mall init

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

- [delete][✔]src/views/devTest
- [delete][✔]删除 dev 相关 route
- [notify]/order getOrders.data.status 写死为2 (业务不明)
- [notify]/home getBillConfig.data.status 写死为0 (业务不明)
- [notify]/billProduct createBillProduct.data.sendId,type 写死(业务不明)
- [notify]/mall createProduct senderId type discountPrice写死(业务不明)
- [notify]/inform  api.getClassByUserId{type}写死(业务不明)
- [notify]/homework  api.getHomeworkById{category}科目为0 是目标为所有科目数据, 结果为空.
- [notify]/order 订单状态未定义, 义务需求不清晰
- [notify]所有页面setting全局设置都还未载入(footlinks等)
- [requirement]所有页面form表单校验完善
- [requirement]权限管理设置(需配合后端完成)
- [notify]login 的userinfo现在暂存sessionStorage, 按需更改成cookie
- [requirement] form表单校验应该放在按钮处, 待修改
- [requirement] form表单校验规则新增
- [api] /orderSelect findUser接口,查询到内容为空时, 返回参数没有data, 且msg为success
- [api] /orderSelect getUserOrders接口,不传入id也会返回值
- [notify] api失败回调应写明哪个部分出错(参考:/billRecord api.getSchoolDepart)
- [notify] 做了分页缓存的页面, 如果带有修改或者上传数据功能, 应该在上传或者修改数据之后, 对缓存进行清空
- [notify] 检查所有分页依赖的cache的数据
- [notify] 检查页面是否有多余的复制部分, 删...
- [notify] 检查页面所有文字信息是否有误