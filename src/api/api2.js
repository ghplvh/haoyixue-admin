import fetch from "./fetch.js";
import {
  formatDate
} from "../assets/js/common/formatDate"
import {
  formatObjKeyByDel,
  formatObjKey
} from "../assets/js/common"

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
      type: "POST"
    }),
  // 2. 获取学校列表 /home, /billProduct, /billRecord, /order, /userManager
  findSchoolList: () => fetch({
    url: "/app/school/findSchoolList",
    type: "GET"
  }),
  // 3. 获取某学校缴费"活动" /home, /billRecord  [done]
  getBillConfigBy: async data => {
    const res = await fetch({
      url: "/app/bill/getBillConfigBy",
      data,
      type: "POST"
    }).then(res => {
      res.data.forEach(item => {
        item.createTime = formatDate(new Date(item.createTime), "YYYY-MM-DD HH:ii:ss")
        item.updateTime = formatDate(new Date(item.updateTime), "YYYY-MM-DD HH:ii:ss")
      })
      return res
    })
    return new Promise(resolve => {
      resolve(res)
    })
  },
  // 4. 获取某学校的缴费项目(商品) /home, /billProduct, /order  [done]
  getBillProductsByOrg: async ({
    orgNo
  }) => {
    const res = await fetch({
      url: "/app/product/getBillProductsByOrg",
      data: {
        orgNo
      },
      type: "POST"
    }).then(res => {
      res.data.forEach(item => {
        formatObjKeyByDel(item, {
          "productname": "productName"
        })
      })
      return res
    })
    return new Promise(resolve => {
      resolve(res)
    })
  },
  // 5. 更新某学校缴费"活动" /home
  updateBillConfig: ({
      id,
      billName,
      status,
      description
    }) =>
    fetch({
      url: "/app/bill/updateBillConfig",
      data: {
        id,
        billName,
        status,
        description
      },
      type: "POST"
    }),
  // 6. 创建缴费"活动" /home
  createBillConfig: data => fetch({
    url: "/app/bill/createBillConfig",
    data,
    type: "POST"
  }),
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
    fetch({
      url: "/app/product/createBillProduct",
      data: {
        senderId,
        type,
        productName,
        price,
        discountPrice,
        desc,
        orgNo
      },
      type: "POST"
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
      type: "GET"
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
      type: "POST"
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
      type: "POST"
    }),
  // 11. 根据账号（手机号码）获取用户信息 /selectOrder, /userManager
  findUser: async data => {
    const res = await fetch({
      url: "/app/user/findUser",
      data,
      type: "POST"
    }).then(res => {
      res.data.pageData.forEach(item => {
        formatObjKeyByDel(item, {
          "orgno": "orgNo"
        })
        item.lastLoginTime = formatDate(new Date(item.lastLoginTime), "YYYY-MM-DD HH:ii:ss")
        item.createTime = formatDate(new Date(item.createTime), "YYYY-MM-DD HH:ii:ss")
        item.lastUpdateTime = formatDate(new Date(item.lastUpdateTime), "YYYY-MM-DD HH:ii:ss")
      })
      return res
    })
    return new Promise(resolve => {
      resolve(res)
    })
  },
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
      type: "POST"
    }),
  // 13. 获取用户  /userManager
  getUsers: async data => {
    const res = await fetch({
      url: "/app/user/getUsers",
      data,
      type: "POST"
    }).then(res => {
      res.data.pageData.forEach(item => {
        formatObjKeyByDel(item, {
          "orgno": "orgNo"
        })
        item.lastLoginTime = formatDate(new Date(item.lastLoginTime), "YYYY-MM-DD HH:ii:ss")
        item.createTime = formatDate(new Date(item.createTime), "YYYY-MM-DD HH:ii:ss")
        item.lastUpdateTime = formatDate(new Date(item.lastUpdateTime), "YYYY-MM-DD HH:ii:ss")
      })
      return res
    })
    return new Promise(resolve => {
      resolve(res)
    })
  },
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
      type: "POST"
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
      type: "POST"
    }),
  // 16. 给账号绑定班级  /userManager
  addClassRelationV3: ({
      userId,
      classList
    }) =>
    fetch({
      url: "/app/user/addClassRelationV3",
      data: {
        userId,
        classList
      },
      type: "POST"
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
      type: "POST"
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
      type: "POST"
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
      type: "POST"
    }),
  // 20. 获取上传图片的Token  /mall, /banner, /homework, /news
  getUploadToken: () => fetch({
    url: "/app/tool/getUploadToken",
    type: "POST"
  }),
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
    fetch({
      url: "/app/product/create",
      data: {
        senderId,
        type,
        productName,
        pics,
        price,
        discountPrice,
        desc
      },
      type: "POST"
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
      type: "POST"
    }),
  // 23. 获取首页banner  /banner
  getHomeBanner: () => fetch({
    url: "/app/common/getHomeBanner",
    type: "POST"
  }),
  // 24. 发作业  /homework
  createHomework: data =>
    fetch({
      url: "/app/homework/create",
      data,
      type: "POST"
    }),
  // 25. 获取作业  /homework
  getUserHomeworks: data =>
    fetch({
      url: "/app/homework/getUserHomeworks",
      data: data,
      type: "POST"
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
      type: "POST"
    }),
  // 27. 图片上传 /mall
  imgUpload: data =>
    fetch({
      formData: data,
      type: "POST",
      redirectUrl: "https://upload.qiniup.com"
    }),
  getClassByUserId: data => fetch({
    data,
    type: "POST",
    redirectUrl: "https://duchengedu.com/wechatHyx/forLeave/getClassByUserId"
  }),
  getUserNotifications: data => fetch({
    data,
    type: "POST",
    redirectUrl: "https://duchengedu.com/ws-study/app/notification/getUserNotifications"
  }),
  syncSchoolData: data => fetch({
    url: `/syncStu/syncStuBySchoolCode?schoolCode=${data.schoolCode}`,
    data: {},
    type: "POST",
  }),
};