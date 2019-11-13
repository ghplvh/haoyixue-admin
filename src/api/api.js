import fetch from "../config/fetch.js";

export const api = {
  loginV2: ({ account, password }) =>
    fetch("ws-study/app/user/loginV2", { account, password }, "POST"),
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
  findSchoolList: () => fetch("ws-study/app/school/findSchoolList", {}, "GET")
};
