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
                            @change='onSchoolChange'
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
                  <a-input @change="onAccountChange"
                           v-decorator="['account', { initialValue: '' }]" />
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
                   :dataSource="table.list"
                   rowKey="userId"
                   @change="onPageChange"
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
                  <a @click="() => onEdit(record.userId)">修改</a>
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

        <a-col>
          <a-form-item :wrapperCol="{span:12}"
                       label="学校">
            <a-select v-if="searchForm.schoolList.length > 0"
                      v-decorator="[
                        'orgNo',
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
                        initialValue: editForm.data.role
                      }
                    ]">
              <a-radio :value="1">家长</a-radio>
              <a-radio :value="2">老师</a-radio>
              <a-radio :value="3">管理员</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col>
          <a-form-item label="手机号码"
                       :wrapperCol="{span:12}">
            <a-input v-decorator="['phone', {
                        rules: [
                          {
                            required: true,
                            message: '请输入手机号码'
                          },
                        ], initialValue: editForm.data.phone }]" />
          </a-form-item>
        </a-col>
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
        schoolCode: "",
        // 查询账户
        account: ""
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
            scopedSlots: { customRender: "orgNo" },
            align: "center"
          },
          {
            title: "手机号码",
            dataIndex: "account",
            scopedSlots: { customRender: "account" },
            align: "center"
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
        list: [],
        cacheList: [],
        pagination: {
          total: 0,
          current: 1
        }
      }
    };
  },
  methods: {
    // 搜索
    async onSearch(e) {
      e.preventDefault();
      this.searchForm.isLoading = true;
      this.table.pagination.current = 1
      if (this.searchForm.account.length > 0) {
        await this.findUser();
      } else {
        await this.getUsers();
      }
      this.searchForm.isLoading = false;
    },
    // 学校改变 
    onSchoolChange(value) {
      this.searchForm.schoolCode = value
    },
    // 查询账户改变
    onAccountChange(e) {
      const value = e.target.value
      this.searchForm.account = value
    },
    // 修改
    onEdit(userId) {
      const newData = [...this.table.list];
      const target = newData.filter(item => userId === item.userId)[0];
      if (target) {
        this.editForm.data = target;
      }
      this.editForm.form.resetFields()
      this.editForm.isVisible = true;
    },
    // 修改.保存
    async saveEdit() {
      await this.updateUserInfo()
      // 清空缓存, 否则会导致修改的信息不呈现
      this.table.cacheList = []
      this.getUsers();
    },
    // 修改.取消
    cancelEdit() {
      this.editForm.data = {};
      this.editForm.isVisible = false;
    },
    onPageChange(pagination) {
      this.table.pagination.current = pagination.current
      this.getUsers()
    },
    // api
    async updateUserInfo() {
      this.editForm.isLoading = true;
      // 接口参数
      let data;
      let err;
      // 表单数据添加到参数中
      this.editForm.form.validateFields((error, values) => {
        err = error;
        data = {
          userId: this.editForm.data.userId,
          phone: values.phone,
          role: values.role,
          orgNo: values.orgNo
        };
      });
      // 表单校验
      if (err) {
        this.editForm.isLoading = false;
      } else {
        // 请求接口
        await this.$api.updateUserInfo(data).then(res => {
          // 接口出错 返回res为false
          if (!res) {
            console.log("接口出错")
            return
          }
          // 成功访问, 处理数据
          if (res.code === 1) {
            this.$message.success("修改成功");
          } else {
            let error = res.msg || res.message || "无反馈信息"
            this.$error({
              title: "错误",
              content:
                (<div>
                  <p>修改用户信息失败</p>
                  <p>错误提示: {error}</p>
                </div>)
            })
          }
        });
        // 成功访问, 处理数据
        this.editForm.data = {};
        this.editForm.isLoading = false;
        this.editForm.isVisible = false;
      }

    },
    // api
    async getUsers() {
      this.table.isLoading = true;
      // 加载前清空相关数据
      this.table.list = [];
      // 接口参数
      let data = {
        pageSize: 10,
        pageNum: this.table.pagination.current
      }
      let err
      this.searchForm.form.validateFields((error, values) => {
        err = error
        data.orgNo = values.schoolCode;
        data.role = values.role;
      });
      // 表单校验成功则继续
      if (!err) {
        // 检索缓存, 如果存在目标页面数据, 则不调用api,而使用缓存数据
        const cacheFilters = this.table.cacheList.filter(item => {
          return item.pageNum === data.pageNum
            && item.role === data.role
            && item.orgNo === data.orgNo
        })
        if (cacheFilters.length > 0) {
          this.table.list = cacheFilters[0].list
          this.table.pagination.total = cacheFilters[0].total
        } else {
          // 用于缓存已载入数据
          let cache = {
            pageNum: data.pageNum,
            role: data.role,
            orgNo: data.orgNo
          }
          // fetch api
          await this.$api.getUsers(data).then(res => {
            // 接口出错 返回res为false
            if (!res) {
              console.log("接口出错")
              return
            }
            // 成功访问, 处理数据
            if (res.code === 1 && res.data) {
              let list = res.data.pageData;
              // 去除chirldren(会渲染出多层表格), 添加key( 解决table组件渲染无key报错)
              list.forEach((item, index) => {
                item.children && delete item.children;
                item.key = index
              });
              this.table.list = list;
              this.table.pagination.total = res.data.dataTotal
              // 已载入数据进行缓存
              cache.list = list
              cache.total = res.data.dataTotal
              this.table.cacheList.push(cache)
            } else {
              let error = res.msg || res.message || "无反馈信息"
              this.$error({
                title: "错误",
                content:
                  (<div>
                    <p>获取用户列表失败</p>
                    <p>错误提示: {error}</p>
                  </div>)
              })
            }
          });
        }
      }

      this.table.isLoading = false;
    },
    // api
    async findUser() {
      this.table.isLoading = true;
      // 加载前清空相关数据
      this.table.list = [];
      let data = { account: this.searchForm.account };
      await this.$api.findUser(data).then(res => {
        // 接口出错 返回res为false
        if (!res) {
          console.log("接口出错")
          return
        }
        // 成功访问, 处理数据
        if (res.code === 1 && res.data) {
          let result = res.data
          result.children && delete result.children;
          this.table.list.push(result);
        } else {
          let error = res.msg || res.message || "无反馈信息"
          this.$error({
            title: "错误",
            content:
              (<div>
                <p>查询用户失败</p>
                <p>错误提示: {error}</p>
              </div>)
          })
        }
      });
      this.table.isLoading = false;
    },
    // api
    async findSchoolList() {
      await this.$api.findSchoolList().then(res => {
        // 接口出错 返回res为false
        if (!res) {
          console.log("接口出错")
          return
        }
        // 成功访问, 处理数据
        if (res.code === 1 && res.data) {
          this.searchForm.schoolList = res.data;
          this.searchForm.schoolCode = res.data[0].schoolCode;
        } else {
          this.searchForm.schoolList = [];
          this.searchForm.schoolCode = "";
          let error = res.msg || res.message || "无反馈信息"
          this.$error({
            title: "错误",
            content:
              (<div>
                <p>获取学校列表列表失败</p>
                <p>错误提示: {error}</p>
              </div>)
          })
        }
      });
    },
    async initData() {
      await this.findSchoolList()
      this.getUsers()
    }
  },
  mounted() {
    this.initData()
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
