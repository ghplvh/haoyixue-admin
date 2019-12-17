import fetch from "./fetch.js";
import {
  Modal
} from "ant-design-vue"
export const api = {
  // 1. /login
  loginV2: ({
      account,
      password
    }) =>
    fetch({
      url: "/app/user/loginV2",
      data: {
        account,
        password
      },
      onFail: function (res) {
        Modal.error({
          title: '登录失败',
          content: res.message || res.msg
        })
      },
      method: "POST"
    }),
  // 2. 获取学校列表 /home, /billProduct, /billRecord, /order, /userManager
  findSchoolList: () => fetch({
    url: "/app/school/findSchoolList",
    method: "GET"
  }),
  // 3. 获取某学校缴费"活动" /home, /billRecord
  getBillConfigBy: ({
      orgNo,
      status
    }) =>
    fetch({
      url: "/app/bill/getBillConfigBy",
      data: {
        orgNo,
        status
      },
      method: "POST"
    }),
  // 4. 获取某学校的缴费项目(商品) /home, /billProduct, /order
  getBillProductsByOrg: data => fetch({
    url: "/app/product/getBillProductsByOrg",
    data,
    method: "POST"
  }),
  // 5. 更新某学校缴费"活动" /home
  updateBillConfig: data =>
    fetch({
      url: "/app/bill/updateBillConfig",
      data,
      method: "POST"
    }),
  // 6. 创建缴费"活动" /home
  createBillConfig: data => fetch({
    url: "/app/bill/createBillConfig",
    data,
    method: "POST"
  }),
  // 7. 创建缴费项目(商品) /billProduct
  createBillProduct: ({
      senderId,
      method,
      productName,
      price,
      discountPrice,
      desc,
      orgNo
    }) =>
    fetch({
      url: "/app/product/createBillProduct",
      data: {
        senderId,
        method,
        productName,
        price,
        discountPrice,
        desc,
        orgNo
      },
      method: "POST"
    }),

  // 8. 获取某学校的部门 /billRecord, /order, /userManager
  getSchoolDeparts: ({
      schoolCode
    }) =>
    fetch({
      url: "/app/school/getSchoolDeparts",
      data: {
        schoolCode
      },
      method: "GET"
    }),
  // 9. 获取缴费记录 /billRecord
  getBillsBy: ({
      orgNo,
      billId,
      depart,
      pageSize,
      pageNum
    }) =>
    fetch({
      url: "/app/bill/getBillsBy",
      data: {
        orgNo,
        billId,
        depart,
        pageSize,
        pageNum
      },
      method: "POST"
    }),
  // 10. 获取订单 /order
  getOrders: ({
      orgNo,
      depart,
      productId,
      pageSize,
      pageNum,
      status
    }) =>
    fetch({
      url: "/app/order/getOrders",
      data: {
        orgNo,
        depart,
        productId,
        pageSize,
        pageNum,
        status
      },
      method: "POST"
    }),
  // 11. 根据账号（手机号码）获取用户信息 /selectOrder, /userManager
  findUser: ({
    account
  }) => fetch({
    url: "/app/user/findUser",
    data: {
      account
    },
    method: "POST"
  }),
  // 12. 获取用户订单列表 /selectOrder
  getUserOrders: ({
      buyerId,
      pageSize,
      pageNum
    }) =>
    fetch({
      url: "/app/order/getUserOrders",
      data: {
        buyerId,
        pageSize,
        pageNum
      },
      method: "POST"
    }),
  // 13. 获取用户  /userManager
  getUsers: (data) =>
    fetch({
      url: "/app/user/getUsers",
      data,
      method: "POST"
    }),
  // 14. 更新用户信息  /userManager
  updateUserInfo: ({
      userId,
      orgNo,
      phone,
      role
    }) =>
    fetch({
      url: "/app/user/updateUserInfo",
      data: {
        userId,
        orgNo,
        phone,
        role
      },
      method: "POST"
    }),
  // 15. 查询绑定的班级  /userManager
  getTeacherClazzList: ({
      userId
    }) =>
    fetch({
      url: "/app/user/getTeacherClazzList",
      data: {
        userId
      },
      method: "POST"
    }),
  // 16. 给账号绑定班级  /userManager
  addClassRelationV3: data =>
    fetch({
      url: "/app/user/addClassRelationV3",
      data,
      method: "POST"
    }),
  // 17. 删除账号绑定班级  /userManager
  deleteClassRelationV2: ({
      userId,
      classList
    }) =>
    fetch({
      url: "/app/user/deleteClassRelationV2",
      data: {
        userId,
        classList
      },
      method: "POST"
    }),
  // 18. 发送通知  /inform
  sendInform: ({
      title,
      content,
      clazz,
      senderId
    }) =>
    fetch({
      url: "/app/notification/sendInform",
      data: {
        title,
        content,
        clazz,
        senderId
      },
      method: "POST"
    }),
  // 19. 查询通知  /inform
  getInform: ({
      clazz,
      pageSize,
      pageNum
    }) =>
    fetch({
      url: "/app/getUserNotifications",
      data: {
        clazz,
        pageSize,
        pageNum
      },
      method: "POST"
    }),
  // 20. 获取上传图片的Token  /mall, /banner, /homework, /news
  getUploadToken: () => fetch({
    url: "/app/tool/getUploadToken",
    method: "POST"
  }),
  // 21. 创建商品  /mall
  createProduct: ({
      senderId,
      method,
      productName,
      pics,
      price,
      discountPrice,
      desc
    }) =>
    fetch({
      url: "/app/product/create",
      data: {
        senderId,
        method,
        productName,
        pics,
        price,
        discountPrice,
        desc
      },
      method: "POST"
    }),
  // 22. 获取商品  /mall
  getUserProducts: ({
      pageSize,
      pageNum
    }) =>
    fetch({
      url: "/app/product/getUserProducts",
      data: {
        pageSize,
        pageNum
      },
      method: "POST"
    }),
  // 23. 获取首页banner  /banner
  getHomeBanner: () => fetch({
    url: "/app/common/getHomeBanner",
    method: "POST"
  }),
  // 24. 发作业  /homework
  createHomework: data =>
    fetch({
      url: "/app/homework/create",
      data,
      method: "POST"
    }),
  // 25. 获取作业  /homework
  getUserHomeworks: data =>
    fetch({
      url: "/app/homework/getUserHomeworks",
      data: data,
      method: "POST"
    }),
  // 26. 获取新闻  /news
  getNews: ({
      pageSize,
      pageNum
    }) =>
    fetch({
      url: "/app/news/getNews",
      data: {
        pageSize,
        pageNum
      },
      method: "POST"
    }),
  // 27. 图片上传 /mall
  imgUpload: data =>
    fetch({
      data: data,
      method: "POST",
      baseUrl: "https://upload.qiniup.com",
      header: {
        "Content-Type": "multipart/form-data"
      },
      onFail: () => {}
    }),
  getClassByUserId: data => fetch({
    data,
    code: 0,
    method: "POST",
    // baseUrl: "https://duchengedu.com/wechatHyx/forLeave/getClassByUserId",
    url: "/forLeave/getClassByUserId"
  }),
  getUserNotifications: data => fetch({
    data,
    method: "POST",
    url: "/app/notification/getUserNotifications"
  }),
  syncSchoolData: data => fetch({
    url: `/syncStu/syncStuBySchoolCode?schoolCode=${data.schoolCode}`,
    data: {},
    method: "POST",
    code: 0
  }),
};