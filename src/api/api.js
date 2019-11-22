import fetch from "./fetch.js";

export const api = {
  // 1. /login
  loginV2: ({ account, password }) =>
    fetch("/app/user/loginV2", { account, password }, "POST"),
  // 2. 获取学校列表 /home, /billProduct, /billRecord, /order, /userManager
  findSchoolList: () => fetch("/app/school/findSchoolList", {}, "GET"),
  // 3. 获取某学校缴费"活动" /home, /billRecord
  getBillConfigBy: ({ orgNo, status }) =>
    fetch("/app/bill/getBillConfigBy", { orgNo, status }, "POST"),
  // 4. 获取某学校的缴费项目(商品) /home, /billProduct, /order
  getBillProductsByOrg: ({ orgNo }) =>
    fetch("/app/product/getBillProductsByOrg", { orgNo }, "POST"),
  // 5. 更新某学校缴费"活动" /home
  updateBillConfig: ({ id, billName, status, description }) =>
    fetch(
      "/app/bill/updateBillConfig",
      { id, billName, status, description },
      "POST"
    ),
  // 6. 创建缴费"活动" /home
  createBillConfig: data => fetch("/app/bill/createBillConfig", data, "POST"),
  // 7. 创建缴费项目(商品) /billProduct
  createBillProduct: ({
    senderId,
    type,
    productName,
    price,
    discountPrice,
    desc,
    orgNo
  }) =>
    fetch(
      "/app/product/createBillProduct",
      {
        senderId,
        type,
        productName,
        price,
        discountPrice,
        desc,
        orgNo
      },
      "POST"
    ),

  // 8. 获取某学校的部门 /billRecord, /order, /userManager
  getSchoolDeparts: ({ schoolCode }) =>
    fetch("/app/school/getSchoolDeparts", { schoolCode }, "GET"),
  // 9. 获取缴费记录 /billRecord
  getBillsBy: ({ orgNo, billId, depart, pageSize, pageNum }) =>
    fetch(
      "/app/school/getSchoolDeparts",
      {
        orgNo,
        billId,
        depart,
        pageSize,
        pageNum
      },
      "POST"
    ),
  // 10. 获取订单 /order
  getOrders: ({ orgNo, depart, productId, pageSize, pageNum, status }) =>
    fetch(
      "/app/order/getOrders",
      {
        orgNo,
        depart,
        productId,
        pageSize,
        pageNum,
        status
      },
      "POST"
    ),
  // 11. 根据账号（手机号码）获取用户信息 /selectOrder, /userManager
  findUser: ({ account }) => fetch("/app/user/findUser", { account }, "POST"),
  // 12. 获取用户订单列表 /selectOrder
  getUserOrders: ({ buyerId, pageSize, pageNum }) =>
    fetch(
      "/app/order/getUserOrders",
      {
        buyerId,
        pageSize,
        pageNum
      },
      "POST"
    ),
  // 13. 获取用户  /userManager
  getUsers: ({ pageSize, orgNo, pageNum, role }) =>
    fetch(
      "/app/user/getUsers",
      {
        pageSize,
        orgNo,
        pageNum,
        role
      },
      "POST"
    ),
  // 14. 更新用户信息  /userManager
  updateUserInfo: ({ userId, orgNo, phone, role }) =>
    fetch(
      "/app/user/updateUserInfo",
      {
        userId,
        orgNo,
        phone,
        role
      },
      "POST"
    ),
  // 15. 查询绑定的班级  /userManager
  getTeacherClazzList: ({ userId }) =>
    fetch("/app/user/getTeacherClazzList", { userId }, "POST"),
  // 16. 给账号绑定班级  /userManager
  addClassRelationV3: ({ userId, classList }) =>
    fetch("/app/user/addClassRelationV3", { userId, classList }, "POST"),
  // 17. 删除账号绑定班级  /userManager
  deleteClassRelationV2: ({ userId, classList }) =>
    fetch("/app/user/deleteClassRelationV2", { userId, classList }, "POST"),
  // 18. 发送通知  /inform
  sendInform: ({ title, content, clazz, senderId }) =>
    fetch(
      "/app/notification/sendInform",
      {
        title,
        content,
        clazz,
        senderId
      },
      "POST"
    ),
  // 19. 查询通知  /inform
  getInform: ({ clazz, pageSize, pageNum }) =>
    fetch("/app/notification/getInform", { clazz, pageSize, pageNum }, "POST"),
  // 20. 获取七牛上传图片的Token  /mall, /banner, /homework, /news
  getUploadToken: () => fetch("/app/tool/getUploadToken", {}, "POST"),
  // 21. 创建商品  /mall
  createProduct: ({
    senderId,
    type,
    productName,
    pics,
    price,
    discountPrice,
    desc
  }) =>
    fetch(
      "/app/product/createProduct",
      {
        senderId,
        type,
        productName,
        pics,
        price,
        discountPrice,
        desc
      },
      "POST"
    ),
  // 22. 获取商品  /mall
  getUserProducts: ({ pageSize, pageNum }) =>
    fetch("/app/product/getUserProducts", { pageSize, pageNum }, "POST"),
  // 23. 获取首页banner  /banner
  getHomeBanner: () => fetch("/app/common/getHomeBanner", {}, "POST"),
  // 24. 发作业  /homework
  createHomework: ({ senderId, category, content, pics, clazz }) =>
    fetch(
      "/app/homework/create",
      {
        senderId,
        category,
        content,
        pics,
        clazz
      },
      "POST"
    ),
  // 25. 获取作业  /homework
  getUserHomeworks: ({ pageSize, pageNum }) =>
    fetch("/app/homework/getUserHomeworks", { pageSize, pageNum }, "POST"),
  // 26. 获取新闻  /news
  getNews: ({ pageSize, pageNum }) =>
    fetch("/app/news/getNews", { pageSize, pageNum }, "GET")
};
