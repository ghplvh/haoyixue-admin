<template>
  <page-layout :desc="setting.desc"
               :title="setting.title"
               :linkList="setting.linkList"
               id="home">
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
                <a-form-item label="学校"
                             v-if="searchForm.schoolList.length > 0">
                  <a-select v-decorator="[
                              'school',
                              {
                                initialValue: searchForm.schoolCode,
                                rules: [{ required: true, message: '请选择学校' }]
                              }
                            ]"
                            @change="onSchoolChange"
                            placeholder="请选择学校"
                            showArrow>
                    <a-select-option style="width:100px;"
                                     v-for="(item, index) in searchForm.schoolList"
                                     :key="index"
                                     :title="item.schoolName"
                                     :value="item.schoolCode">
                      {{ item.schoolName }}
                    </a-select-option>
                  </a-select>
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
              <a-col>
                <a-button type="primary"
                          @click="onAdd">
                  新增收费项目
                </a-button>
              </a-col>
            </a-row>
          </a-form>
          <a-table class="table"
                   :columns="table.columns"
                   :dataSource="table.billList"
                   rowKey="id"
                   bordered
                   :loading="table.isLoading">
            <template v-for="col in [
                'id',
                'orgNo',
                'billName',
                'description',
                'status',
                'createTime',
                'updateTime'
              ]"
                      :slot="col"
                      slot-scope="text, record">
              <div :key="col">
                <template v-if="col === 'status'">
                  <template v-if="record.status === 0">
                    正常
                  </template>
                  <template v-else>
                    下线
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
    <a-modal class="add-modal"
             :visible="addForm.isVisible"
             title="新增缴费项目"
             okText="确定"
             cancelText="取消"
             @cancel="cancelAdd"
             @ok="saveAdd"
             :okButtonProps="{ props: { loading: addForm.isLoading } }">
      <a-form layout="vertical"
              :form="addForm.form">
        <a-form-item label="学校"
                     v-if="searchForm.schoolList.length > 0">
          <a-select v-decorator="[
                      'schoolCode',
                      {
                        initialValue: searchForm.schoolCode,
                        rules: [{ required: true, message: '请选择学校' }]
                      }
                    ]"
                    placeholder="请选择学校"
                    showArrow>
            <a-select-option style="width:100px;"
                             v-for="(item, index) in searchForm.schoolList"
                             :key="index"
                             :title="item.schoolName"
                             :value="item.schoolCode">
              {{ item.schoolName }}
            </a-select-option>
          </a-select>
        </a-form-item>
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
                ]
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
                ]
              }
            ]" />
        </a-form-item>
        <a-form-item label="缴费条目">
          <a-checkbox-group style="display:flex;flex-wrap:wrap;"
                            v-decorator="[
              'productIds',
              {
                rules: [
                  {
                    required: true,
                    message: '请选择条目'
                  }
                ]
              }
            ]">
            <a-checkbox v-for="item in addForm.billProductsList"
                        :value="item.id"
                        :key="item.id"
                        style="flex-grow:1;margin-left:0;">
              {{ item.productName }}
            </a-checkbox>
          </a-checkbox-group>
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
      // 查询form
      searchForm: {
        // form创建依赖
        form: this.$form.createForm(this, {
          name: "form"
        }),
        //学校列表
        schoolList: [],
        // 学校code
        schoolCode: "",
        // 查询按钮loading
        isLoading: false
      },
      addForm: {
        // 新增form依赖
        form: this.$form.createForm(this, {
          name: "addForm"
        }),
        // 项目产品列表
        billProductsList: [],
        // 是否显示新增form
        isVisible: false,
        // 新增确定loading
        isLoading: false
      },
      editForm: {
        // 修改form依赖
        form: this.$form.createForm(this, {
          name: "editForm"
        }),
        // 修改按钮依赖数据
        data: {},
        // 是否显示修改form
        isVisible: false,
        // 修改确定loading
        isLoading: false
      },
      table: {
        // 项目列表
        billList: [],
        // 表格loading
        isLoading: false,
        // table标题列表
        columns: [
          {
            title: "ID",
            dataIndex: "id",
            scopedSlots: { customRender: "id" },
            align: "center"
          },
          {
            title: "学校编码",
            dataIndex: "orgNo",
            scopedSlots: { customRender: "orgNo" },
            align: "center"
          },
          {
            title: "项目名称",
            dataIndex: "billName",
            scopedSlots: { customRender: "billName" }
          },
          {
            title: "项目描述",
            dataIndex: "description",
            scopedSlots: { customRender: "description" }
          },
          {
            title: "状态",
            dataIndex: "status",
            scopedSlots: { customRender: "status" },
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
            dataIndex: "updateTime",
            scopedSlots: { customRender: "updateTime" },
            align: "center"
          },
          {
            title: "操作",
            dataIndex: "operation",
            scopedSlots: { customRender: "operation" },
            align: "center"
          }
        ]
      }
    };
  },
  methods: {
    // 查询
    async onSearch(e) {
      e.preventDefault();
      this.searchForm.isLoading = true;
      await this.getBillConfig();
      this.getBillProductsByOrg();
      this.searchForm.isLoading = false;
    },
    // 学校改变 
    async onSchoolChange(value) {
      this.searchForm.schoolCode = value
      await this.getBillProductsByOrg()
      this.searchForm.form.setFieldsValue({ productId: "全部" })
      await this.getSchoolDeparts()
      this.searchForm.form.setFieldsValue({ depart_name: "全部" })
    },
    // 修改
    onEdit(id) {
      // 从列表之中提取出目标行数据
      const newData = [...this.table.billList];
      const target = newData.filter(item => id === item.id)[0];
      if (target) {
        this.editForm.data = target;
      } else {
        this.editForm.data = {}
      }
      this.editForm.form.resetFields()
      // 打开form
      this.editForm.isVisible = true;
    },
    // 修改.保存
    async saveEdit() {
      await this.updateBillConfig()
      this.getBillConfig();
      this.getBillProductsByOrg();
    },
    // 修改.取消
    cancelEdit() {
      this.editForm.data = {};
      this.editForm.isVisible = false;
    },
    // 添加
    onAdd() {
      this.addForm.isVisible = true;
    },
    // 添加.保存
    async saveAdd() {
      await this.createBillConfig()
      this.getBillConfig();
      this.getBillProductsByOrg();
    },
    // 添加.取消
    cancelAdd() {
      this.addForm.isVisible = false;
    },
    // api
    async updateBillConfig() {
      this.editForm.isLoading = true;
      // 接口参数
      let data;
      let err;
      // 表单数据添加到参数中
      this.editForm.form.validateFields((error, values) => {
        err = error;
        data = {
          id: this.editForm.data.id,
          billName: values.billName,
          status: values.status,
          description: values.description
        }
      })
      // 表单校验
      if (err) {
        this.editForm.isLoading = false;
      } else {
        // 请求接口
        await this.$api.updateBillConfig(data).then(res => {
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
                  <p>更新缴费信息失败</p>
                  <p>错误提示: {error}</p>
                </div>)
            })
          }
        });
        this.editForm.data = {};
        this.editForm.isLoading = false;
        this.editForm.isVisible = false;
      }
    },
    async createBillConfig() {
      this.addForm.isLoading = true;
      // 接口参数
      let data;
      let err;
      // 表单数据添加到参数中
      this.addForm.form.validateFields((error, values) => {
        err = error;
        data = {
          orgNo: values.schoolCode,
          billName: values.billName,
          description: values.description,
          productIds: [...values.productIds]
        };
      });
      // 表单校验
      if (err) {
        this.addForm.isLoading = false;
      } else {
        // 请求接口
        await this.$api.createBillConfig(data).then(res => {
          this.addForm.billProductsList = [];
          // 接口出错 返回res为false
          if (!res) {
            console.log("接口出错")
            return
          }
          // 成功访问, 处理数据
          if (res.code === 1) {
            this.$message.success("添加成功");
          } else {
            let error = res.msg || res.message || "无反馈信息"
            this.$error({
              title: "错误",
              content:
                (<div>
                  <p>创建缴费信息失败</p>
                  <p>错误提示: {error}</p>
                </div>)
            })
          }
        });
        this.addForm.isLoading = false;
        this.addForm.isVisible = false;
      }
    },
    // api
    async getBillConfig() {
      this.table.isLoading = true;
      // 加载前清空相关数据
      this.table.billList = [];
      // 请求接口
      await this.$api
        .getBillConfigBy({
          orgNo: this.searchForm.schoolCode,
          status: 0
        })
        .then(res => {
          // 接口出错 返回res为false
          if (!res) {
            console.log("接口出错")
            return
          }
          // 成功访问, 处理数据
          if (res.code === 1) {
            this.table.billList = res.data;
          } else {
            let error = res.msg || res.message || "无反馈信息"
            this.$error({
              title: "错误",
              content:
                (<div>
                  <p>获取缴费失败</p>
                  <p>错误提示: {error}</p>
                </div>)
            })
          }
        });
      this.table.isLoading = false;
    },
    // api
    async getBillProductsByOrg() {
      // 加载前清空相关数据
      this.addForm.billProductsList = [];
      await this.$api
        .getBillProductsByOrg({
          orgNo: this.searchForm.schoolCode
        })
        .then(res => {
          // 接口出错 返回res为false
          if (!res) {
            console.log("接口出错")
            return
          }
          // 成功访问, 处理数据
          if (res.code === 1) {
            this.addForm.billProductsList = res.data;
          } else {
            let error = res.msg || res.message || "无反馈信息"
            this.$error({
              title: "错误",
              content:
                (<div>
                  <p>获取缴费产品列表失败</p>
                  <p>错误提示: {error}</p>
                </div>)
            })
          }
        });
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
        if (res.code === 1) {
          this.searchForm.schoolCode = res.data[0].schoolCode;
          this.searchForm.schoolList = res.data;
        } else {
          this.searchForm.schoolList = [];
          this.searchForm.schoolCode = "";
          let error = res.msg || res.message || "无反馈信息"
          this.$error({
            title: "错误",
            content:
              (<div>
                <p>获取学校列表失败</p>
                <p>错误提示: {error}</p>
              </div>)
          })
        }
      });
    },
    // 初始数据
    async initData() {
      await this.findSchoolList()
      this.getBillConfig();
      this.getBillProductsByOrg();
    }
  },
  mounted() {
    this.initData()
  }

};
</script>
<style lang="scss">
@import "../../assets/style/mixin.scss";
#home {
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
