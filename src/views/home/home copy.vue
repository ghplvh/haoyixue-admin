<template>
  <page-layout :desc="desc"
               :title="title"
               :linkList="linkList"
               id="home">
    <div slot="extra"
         class="extraImg">
      <img :src="extraImage" />
    </div>
    <transition name="page-toggle">
      <keep-alive>
        <a-card class="content">
          <a-form :form="form"
                  layout="inline"
                  @submit="onSubmit">
            <a-row type="flex"
                   align="middle">
              <a-col>
                <a-form-item style="width:100%"
                             label="学校">
                  <a-select v-if="schoolList.length > 0"
                            v-decorator="[
                      'school',
                      {
                        initialValue: schoolCode,
                        rules: [{ required: true, message: '请选择学校' }]
                      }
                    ]"
                            placeholder="请选择学校"
                            showArrow>
                    <a-select-option v-for="(item, index) in schoolList"
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
                            :loading="isBtnLoading"
                            :disabled="isBtnLoading">
                    查询
                  </a-button>
                </a-form-item>
              </a-col>
              <a-col>
                <a-button type="primary"
                          @click="editAdd">
                  新增收费项目
                </a-button>
              </a-col>
            </a-row>
          </a-form>
          <a-table class="table"
                   :columns="columns"
                   :dataSource="billList"
                   rowKey="id"
                   bordered
                   :loading="isTableLoading">
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
                  <a @click="() => editChange(record.id)">修改</a>
                </span>
              </div>
            </template>
          </a-table>
        </a-card>
      </keep-alive>
    </transition>
    <a-modal class="change-modal"
             :visible="isChangeVisible"
             title="更新缴费项目"
             okText="确定"
             cancelText="取消"
             @cancel="cancelChange"
             @ok="saveChange"
             :okButtonProps="{ props: { loading: isChangeConfirmLoading } }">
      <a-form layout="vertical"
              :form="changeForm">
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
                initialValue: changeData.billName
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
                initialValue: changeData.description
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
                initialValue: changeData.status
              }
            ]">
            <a-radio :value="0">正常</a-radio>
            <a-radio :value="1">下线</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal class="add-modal"
             :visible="isAddVisible"
             title="新增缴费项目"
             okText="确定"
             cancelText="取消"
             @cancel="cancelAdd"
             @ok="saveAdd"
             :okButtonProps="{ props: { loading: isAddConfirmLoading } }">
      <a-form layout="vertical"
              :form="addForm">
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
            <a-checkbox v-for="item in billProductsList"
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

const columns = [
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
];

export default {
  name: "QueryList",
  components: { PageLayout },
  data () {
    return {
      // table标题列表
      columns,
      // 全局配置
      title: "",
      desc: "",
      linkList: [],
      extraImage: "",
      // 查询form依赖
      form: this.$form.createForm(this, {
        name: "form"
      }),
      // 项目列表
      billList: [],
      //学校列表
      schoolList: [],
      // 学校code
      schoolCode: "",
      // 修改form依赖
      changeForm: this.$form.createForm(this, {
        name: "changeForm"
      }),
      // 是否显示修改form
      isChangeVisible: false,
      // 修改按钮依赖数据
      changeData: {},
      // 新增form依赖
      addForm: this.$form.createForm(this, {
        name: "addForm"
      }),
      // 是否显示新增form
      isAddVisible: false,
      // 项目产品列表
      billProductsList: [],
      // 查询按钮loading
      isBtnLoading: false,
      // 表格loading
      isTableLoading: false,
      // 修改确定loading
      isChangeConfirmLoading: false,
      // 新增确定loading
      isAddConfirmLoading: false
    };
  },
  methods: {
    async onSubmit (e) {
      e.preventDefault();
      this.isBtnLoading = true;
      this.billList = [];
      this.cacheBillList = [];
      this.form.validateFields((error, values) => {
        this.schoolCode = values.school;
      });
      await this.getBillConfig();
      this.getBillProductsByOrg();
      this.isBtnLoading = false;
    },
    editChange (id) {
      // console.log("id", id);
      const newData = [...this.billList];
      const target = newData.filter(item => id === item.id)[0];
      if (target) {
        this.changeData = target;
      }
      this.isChangeVisible = true;
    },
    async saveChange () {
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
    cancelChange () {
      this.changeData = {};
      this.isChangeVisible = false;
    },
    editAdd () {
      this.isAddVisible = true;
    },
    async saveAdd () {
      this.isAddConfirmLoading = true;
      let data;
      let err;
      this.addForm.validateFields((error, values) => {
        err = error;
        data = {
          orgNo: this.schoolCode,
          billName: values.billName,
          description: values.description,
          productIds: [...values.productIds]
        };
      });
      if (err) {
        return;
      }
      await this.$api.createBillConfig(data).then(res => {
        this.billProductsList = [];
        if (res.code === 1) {
          this.$message.success("添加成功");
        } else {
          this.$error({ title: "错误", content: res.msg });
        }
        this.getBillConfig();
        this.getBillProductsByOrg();
      });
      this.isAddConfirmLoading = false;
      this.isAddVisible = false;
    },
    cancelAdd () {
      this.isAddVisible = false;
    },
    // api
    async getBillConfig () {
      this.isTableLoading = true;
      // 加载前清空相关数据
      this.billList = [];
      this.cacheBillList = [];
      await this.$api
        .getBillConfigBy({
          orgNo: this.schoolCode,
          status: 0
        })
        .then(res => {
          if (res.code === 1) {
            this.billList = res.data;
            this.cacheBillList = res.data;
          } else {
            this.$error({ title: "错误", content: res.msg });
          }
        });
      this.isTableLoading = false;
    },
    // api 
    async getBillProductsByOrg () {
      // 加载前清空相关数据
      this.billProductsList = [];
      await this.$api
        .getBillProductsByOrg({
          orgNo: this.schoolCode
        })
        .then(res => {
          if (res.code === 1) {
            this.billProductsList = res.data;
          } else {
            this.$message.error(res.msg);
          }
        });
    }
  },
  mounted () {
    this.$api.findSchoolList().then(res => {
      if (res.code === 1) {
        this.schoolList = res.data;
        this.schoolCode = res.data[0].schoolCode;
        this.getBillConfig();
        this.getBillProductsByOrg();
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
