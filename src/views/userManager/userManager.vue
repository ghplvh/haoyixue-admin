<template>
  <page-layout :desc="setting.desc"
               :title="setting.title"
               :linkList="setting.linkList"
               id="user-manager">
    <div slot="extra"
         class="extraImg">
      <img :src="setting.extraImage" />
    </div>
    <transition name="page-toggle">
      <keep-alive>
        <a-card class="content">
          <a-form :form="searchForm.form"
                  layout="inline"
                  @submit="onSearch">
            <a-row type="flex"
                   align="middle">
              <a-col>
                <a-form-item style="width:100%"
                             label="学校">
                  <a-select v-if="searchForm.schoolList.length > 0"
                            v-decorator="[
                      'schoolCode',
                      {
                        initialValue: searchForm.schoolCode,
                        rules: [{ required: true }]
                      }
                    ]"
                            placeholder="请选择学校"
                            showArrow>
                    <a-select-option v-for="(item, index) in searchForm.schoolList"
                                     :key="index"
                                     :title="item.schoolName"
                                     :value="item.schoolCode">
                      {{ item.schoolName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col>
                <a-form-item label="项目状态">
                  <a-radio-group name="role"
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
                    ]">
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
                  <a-button type="primary"
                            html-type="submit"
                            :loading="searchForm.isLoading"
                            :disabled="searchForm.isLoading">
                    查询
                  </a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <a-table class="table"
                   :pagination="table.pagination"
                   :columns="table.columns"
                   :dataSource="table.userList"
                   rowKey="userId"
                   @change="pageChange"
                   bordered
                   :loading="table.isLoading">
            <template v-for="col in [
                'id',
                'schoolCode',
                'billName',
                'description',
                'role',
                'createTime',
                'updateTime'
              ]"
                      :slot="col"
                      slot-scope="text, record">
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
            <template slot="operation"
                      slot-scope="text, record">
              <div class="editable-row-operations">
                <span>
                  <a @click="() => onEdit(record.id)">修改</a>
                </span>
              </div>
            </template>
          </a-table>
        </a-card>
      </keep-alive>
    </transition>
    <a-modal class="change-modal"
             :visible="editForm.isVisible"
             title="更新缴费项目"
             okText="确定"
             cancelText="取消"
             @cancel="cancelEdit"
             @ok="saveEdit"
             :okButtonProps="{ props: { loading: editForm.isLoading } }">
      <a-form layout="vertical"
              :form="editForm.form">
        <a-form-item label="缴费项目名称">
          <a-input autoFocus
                   v-decorator="[
              'billName',
              {
                rules: [
                  {
                    required: true,
                    message: '请填写缴费项目名称'
                  }
                ],
                initialValue: editForm.data.billName
              }
            ]" />
        </a-form-item>
        <a-form-item label="内容描述">
          <a-input type="textarea"
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
                initialValue: editForm.data.description
              }
            ]" />
        </a-form-item>
        <a-form-item label="项目状态">
          <a-radio-group v-decorator="[
              'status',
              {
                rules: [
                  {
                    required: true
                  }
                ],
                initialValue: editForm.data.status
              }
            ]">
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

export default {
  name: "QueryList",
  components: { PageLayout },
  data() {
    return {
      // 全局配置
      setting: {
        title: "",
        desc: "",
        linkList: [],
        extraImage: ""
      },
      searchForm: {
        // 查询form依赖
        form: this.$form.createForm(this, {
          name: "form"
        }),
        // 查询按钮loading
        isLoading: false,
        //学校列表
        schoolList: [],
        // 学校code
        schoolCode: ""
      },
      editForm: {
        // 修改form依赖
        form: this.$form.createForm(this, {
          name: "changeForm"
        }),
        // 修改确定loading
        isLoading: false,
        // 是否显示修改form
        isVisible: false,
        // 修改按钮依赖数据
        data: {}
      },
      table: {
        // table标题列表
        columns: [
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
        ],
        // 表格loading
        isLoading: false,
        // 用户列表
        userList: [],
        pagination: {
          total: 0
        }
      }
    };
  },
  methods: {
    // 搜索
    async onSearch(e) {
      e.preventDefault();
      this.searchForm.isLoading = true;
      this.table.userList = [];
      let account;
      this.searchForm.form.validateFields((error, values) => {
        this.searchForm.schoolCode = values.schoolCode;
        account = values.account;
      });
      if (account.length > 0) {
        await this.findUser(account);
      } else {
        await this.getUsers(1);
      }
      this.searchForm.isLoading = false;
    },
    // 修改
    onEdit(id) {
      const newData = [...this.table.userList];
      const target = newData.filter(item => id === item.id)[0];
      if (target) {
        this.editForm.data = target;
      }
      this.editForm.isVisible = true;
    },
    // 修改.保存
    async saveEdit() {
      this.editForm.isLoading = true;
      let data;
      let err;
      this.editForm.form.validateFields((error, values) => {
        err = error;
        data = {
          id: this.editForm.data.id,
          billName: values.billName,
          status: values.status,
          description: values.description
        };
      });
      if (err) {
        return;
      }
      await this.$api.updateBillConfig(data).then(res => {
        this.editForm.data = {};
        if (res.code === 1) {
          this.$message.success("修改成功");
        } else {
          this.$message.fail(res.msg);
        }
        this.getBillConfig();
        this.getBillProductsByOrg();
      });
      this.editForm.isLoading = false;
      this.editForm.isVisible = false;
    },
    // 修改.取消
    cancelEdit() {
      this.editForm.data = {};
      this.editForm.isVisible = false;
    },
    pageChange(pagination) {
      console.log("pagination", pagination)
      this.getUsers(pagination.current)
    },
    // api
    async getUsers(pageNum) {
      this.table.isLoading = true;
      // 加载前清空相关数据
      this.table.userList = [];
      let data = {
        pageSize: 10,
        pageNum
      };
      this.searchForm.form.validateFields((error, values) => {
        data.orgNo = this.searchForm.schoolCode;
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
          this.table.userList = list;
          this.table.pagination.total = res.data.dataTotal
        } else {
          this.$error({ title: "错误", content: res.msg });
        }
      });
      this.table.isLoading = false;
    },
    // api
    async findUser(account) {
      this.table.isLoading = true;
      // 加载前清空相关数据
      this.table.userList = [];
      let data = { account };
      await this.$api.findUser(data).then(res => {
        if (res.code === 1) {
          this.table.userList.push(res.data);
        } else {
          this.$error({ title: "错误", content: res.msg });
        }
      });
      this.table.isLoading = false;
    }
  },
  mounted() {
    this.$api.findSchoolList().then(res => {
      if (res.code === 1) {
        this.searchForm.schoolList = res.data;
        this.searchForm.schoolCode = res.data[0].schoolCode;
        this.getUsers(1);
      } else {
        this.searchForm.schoolList = [];
        this.searchForm.schoolCode = "";
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
  .ant-select {
    width: 200px;
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
