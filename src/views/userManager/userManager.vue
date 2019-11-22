<template>
  <page-layout
    :desc="desc"
    :title="title"
    :linkList="linkList"
    id="user-manager"
  >
    <div slot="extra" class="extraImg">
      <img :src="extraImage" />
    </div>
    <transition name="page-toggle">
      <keep-alive>
        <a-card class="content">
          <a-form :form="searchForm" layout="inline" @submit="onSearch">
            <a-row type="flex" align="middle">
              <a-col>
                <a-form-item style="width:100%" label="学校">
                  <a-select
                    v-if="schoolList.length > 0"
                    v-decorator="[
                      'schoolCode',
                      {
                        initialValue: schoolCode,
                        rules: [{ required: true }]
                      }
                    ]"
                    placeholder="请选择学校"
                    showArrow
                  >
                    <a-select-option
                      v-for="(item, index) in schoolList"
                      :key="index"
                      :title="item.schoolName"
                      :value="item.schoolCode"
                    >
                      {{ item.schoolName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col>
                <a-form-item label="项目状态">
                  <a-radio-group
                    name="role"
                    :disabled="canRoleRodio"
                    v-decorator="[
                      'role',
                      {
                        rules: [
                          {
                            required: true
                          }
                        ],
                        initialValue: 1
                      }
                    ]"
                  >
                    <a-radio :value="1">家长</a-radio>
                    <a-radio :value="2">老师</a-radio>
                    <a-radio :value="3">管理员</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
              <a-col>
                <a-form-item label="账户">
                  <a-input v-decorator="['account', { initialValue: '' }]" />
                </a-form-item>
              </a-col>
              <a-col style="flex-grow:1">
                <a-form-item>
                  <a-button
                    type="primary"
                    html-type="submit"
                    :loading="isSearchLoading"
                    :disabled="isSearchLoading"
                  >
                    查询
                  </a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <a-table
            class="table"
            :columns="columns"
            :dataSource="userList"
            rowKey="id"
            bordered
            :loading="isTableLoading"
          >
            <template
              v-for="col in [
                'id',
                'schoolCode',
                'billName',
                'description',
                'role',
                'createTime',
                'updateTime'
              ]"
              :slot="col"
              slot-scope="text, record"
            >
              <div :key="col">
                <template v-if="col === 'role'">
                  <template v-if="record.role === 1">
                    家长
                  </template>
                  <template v-if="record.role === 2">
                    老师
                  </template>
                  <template v-if="record.role === 3">
                    管理员
                  </template>
                </template>
                <template v-else>{{ text }}</template>
              </div>
            </template>
            <template slot="operation" slot-scope="text, record">
              <div class="editable-row-operations">
                <span>
                  <a @click="() => editChange(record.id)">修改</a>
                </span>
              </div>
            </template>
          </a-table>
        </a-card>
      </keep-alive>
    </transition>
    <a-modal
      class="change-modal"
      :visible="isChangeVisible"
      title="更新缴费项目"
      okText="确定"
      cancelText="取消"
      @cancel="cancelChange"
      @ok="saveChange"
      :okButtonProps="{ props: { loading: isChangeConfirmLoading } }"
    >
      <a-form layout="vertical" :form="changeForm">
        <a-form-item label="缴费项目名称">
          <a-input
            autoFocus
            v-decorator="[
              'billName',
              {
                rules: [
                  {
                    required: true,
                    message: '请填写缴费项目名称'
                  }
                ],
                initialValue: changeData.billName
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="内容描述">
          <a-input
            type="textarea"
            rows="5"
            style="resize:none;"
            v-decorator="[
              'description',
              {
                rules: [
                  {
                    required: true,
                    message: '请填写内容描述'
                  }
                ],
                initialValue: changeData.description
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="项目状态">
          <a-radio-group
            v-decorator="[
              'status',
              {
                rules: [
                  {
                    required: true
                  }
                ],
                initialValue: changeData.status
              }
            ]"
          >
            <a-radio :value="0">正常</a-radio>
            <a-radio :value="1">下线</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </page-layout>
</template>

<script>
import PageLayout from "@/layouts/PageLayout";

const columns = [
  {
    title: "ID",
    dataIndex: "userId",
    scopedSlots: { customRender: "userId" },
    align: "center"
  },
  {
    title: "昵称",
    dataIndex: "nickName",
    scopedSlots: { customRender: "nickName" },
    align: "center"
  },
  {
    title: "学校编码",
    dataIndex: "orgNo",
    scopedSlots: { customRender: "orgNo" }
  },
  {
    title: "手机号码",
    dataIndex: "account",
    scopedSlots: { customRender: "account" }
  },
  {
    title: "角色",
    dataIndex: "role",
    scopedSlots: { customRender: "role" },
    align: "center"
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    scopedSlots: { customRender: "createTime" },
    align: "center"
  },
  {
    title: "更新时间",
    dataIndex: "lastUpdateTime",
    scopedSlots: { customRender: "lastUpdateTime" },
    align: "center"
  },
  {
    title: "登录时间",
    dataIndex: "lastLoginTime",
    scopedSlots: { customRender: "lastLoginTime" },
    align: "center"
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
    align: "center"
  }
];

export default {
  name: "QueryList",
  components: { PageLayout },
  data() {
    return {
      // 是否可以选择角色
      canRoleRodio: false,
      // table标题列表
      columns,
      // 全局配置
      title: "",
      desc: "",
      linkList: [],
      extraImage: "",
      // 查询form依赖
      searchForm: this.$form.createForm(this, {
        name: "form"
      }),
      //学校列表
      schoolList: [],
      // 学校code
      schoolCode: "",
      // 用户列表
      userList: [],
      // 修改form依赖
      changeForm: this.$form.createForm(this, {
        name: "changeForm"
      }),
      // 是否显示修改form
      isChangeVisible: false,
      // 修改按钮依赖数据
      changeData: {},
      // 查询按钮loading
      isSearchLoading: false,
      // 表格loading
      isTableLoading: false,
      // 修改确定loading
      isChangeConfirmLoading: false
    };
  },
  methods: {
    async onSearch(e) {
      e.preventDefault();
      this.isSearchLoading = true;
      this.userList = [];
      let account;
      this.searchForm.validateFields((error, values) => {
        this.schoolCode = values.schoolCode;
        account = values.account;
      });
      if (account.length > 0) {
        await this.findUser(account);
      } else {
        await this.getUsers(1);
      }
      this.isSearchLoading = false;
    },
    editChange(id) {
      const newData = [...this.userList];
      const target = newData.filter(item => id === item.id)[0];
      if (target) {
        this.changeData = target;
      }
      this.isChangeVisible = true;
    },
    async saveChange() {
      this.isChangeConfirmLoading = true;
      let data;
      let err;
      this.changeForm.validateFields((error, values) => {
        err = error;
        data = {
          id: this.changeData.id,
          billName: values.billName,
          status: values.status,
          description: values.description
        };
      });
      if (err) {
        return;
      }
      await this.$api.updateBillConfig(data).then(res => {
        this.changeData = {};
        if (res.code === 1) {
          this.$message.success("修改成功");
        } else {
          this.$message.fail(res.msg);
        }
        this.getBillConfig();
        this.getBillProductsByOrg();
      });
      this.isChangeConfirmLoading = false;
      this.isChangeVisible = false;
    },
    cancelChange() {
      this.changeData = {};
      this.isChangeVisible = false;
    },
    async getUsers({ pageNum = 1 }) {
      this.isTableLoading = true;
      // 加载前清空相关数据
      this.userList = [];
      let data = {
        pageSize: 10,
        pageNum
      };
      this.searchForm.validateFields((error, values) => {
        data.orgNo = this.schoolCode;
        data.role = values.role;
      });
      await this.$api.getUsers(data).then(res => {
        if (res.code === 1) {
          let list = res.data.pageData;
          list.forEach(item => {
            if (!item.children.length > 0) {
              delete item.children;
            }
          });
          this.userList = list;
        } else {
          this.$error({ title: "错误", content: res.msg });
        }
      });
      this.isTableLoading = false;
    },
    async findUser(account) {
      this.isTableLoading = true;
      // 加载前清空相关数据
      this.userList = [];
      let data = { account };
      await this.$api.findUser(data).then(res => {
        console.log("findUser", res);
        if (res.code === 1) {
          this.userList.push(res.data);
        } else {
          this.$error({ title: "错误", content: res.msg });
        }
      });
      this.isTableLoading = false;
    }
  },
  mounted() {
    this.$api.findSchoolList().then(res => {
      if (res.code === 1) {
        this.schoolList = res.data;
        this.schoolCode = res.data[0].schoolCode;
        this.getUsers(1);
      } else {
        this.schoolList = [];
        this.schoolCode = "";
        this.$message.error(res.msg);
      }
    });
  }
};
</script>
<style lang="scss">
@import "../../assets/style/mixin.scss";
#user-manager {
  .ant-form-item-label label {
    font-weight: 800;
    font-size: 14px;
  }
  .content {
    min-width: $minWidth;
  }
  .table {
    margin-top: 2vh;
  }
}
</style>

<style lang="less" scoped>
.operator {
  margin-bottom: 18px;
}
@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
.extraImg {
  margin-top: -60px;
  text-align: center;
  width: 195px;
  img {
    width: 100%;
  }
}
</style>
