import fetch from "../config/fetch.js";

export const api = {
  //login
  loginV2: ({ account, password }) =>
    fetch("ws-study/app/user/loginV2", { account, password }, "POST"),
  //获取用户
  getUsers: ({ pageSize = 10, orgNo, pageNum, role }) =>
    fetch(
      "ws-study/app/user/getUsers",
      {
        pageSize,
        orgNo,
        pageNum,
        role
      },
      "POST"
    ),
  // 获取学校列表
  findSchoolList: () => fetch("ws-study/app/school/findSchoolList", {}, "GET")
};
