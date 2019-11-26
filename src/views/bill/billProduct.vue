<template>
  <page-layout :desc="setting.desc"
               :title="setting.title"
               :linkList="setting.linkList"
               id="bill-product">
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
                  新增缴费项目
                </a-button>
              </a-col>
            </a-row>
          </a-form>
          <a-table class="table"
                   id="table"
                   :columns="table.columns"
                   :dataSource="table.billProductsList"
                   rowKey="id"
                   bordered
                   :loading="table.isLoading">
            <template v-for="col in [
                        'orgNo',
                        'productName',
                        'desc',
                        'price',
                        'discountPrice',
                        'updateTime'
                      ]"
                      :slot="col"
                      slot-scope="text">
              <p :title="text"
                 class="desc"
                 v-if="col==='desc'"
                 :value="text"
                 :key="col">
                {{text}}
              </p>
              <template v-else>
                {{text}}
              </template>
            </template>
            <template slot="operation"
                      slot-scope="text, record">
              <div class="editable-row-operations">
                <span>
                  <a @click="() => onDelete(record.id)"
                     style="color:#f5222d;">删除</a>
                </span>
              </div>
            </template>
          </a-table>
        </a-card>
      </keep-alive>
    </transition>
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
        <a-form-item label="项目名称">
          <a-input autoFocus
                   v-decorator="[
                    'productName',
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
        <a-form-item label="项目描述">
          <a-input type="textarea"
                   rows="5"
                   style="resize:none;"
                   v-decorator="[
                    'desc',
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
        <a-form-item label="项目价格"
                     :wrapperCol="{span:12}">
          <a-input type="number"
                   v-decorator="[
                    'price',
                    {
                      rules: [
                        {
                          required: true,
                          message: '价格不能为空,且需要数字'
                        }
                      ]
                    }
                  ]" />
        </a-form-item>
        <a-form-item label="项目折扣格"
                     :wrapperCol="{span:12}">
          <a-input type="number"
                   v-decorator="[
                    'discountPrice',
                    {
                      rules: [
                        {
                          required: true,
                          message: '价格不能为空,且需要数字'
                        }
                      ]
                    }
                  ]" />
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
        // 是否显示新增form
        isVisible: false,
        // 新增确定loading
        isLoading: false
      },
      table: {
        // 项目列表
        billProductsList: [],
        // 表格loading
        isLoading: false,
        // table标题列表
        columns: [
          {
            title: "学校编码",
            dataIndex: "orgNo",
            scopedSlots: { customRender: "orgNo" },
            align: "center"
          },
          {
            title: "项目名称",
            dataIndex: "productName",
            scopedSlots: { customRender: "productName" }
          },
          {
            title: "项目描述",
            dataIndex: "desc",
            scopedSlots: { customRender: "desc" },
            width: "40%"
          },
          {
            title: "价格",
            dataIndex: "price",
            scopedSlots: { customRender: "price" },
            align: "center"
          },
          {
            title: "折扣价",
            dataIndex: "discountPrice",
            scopedSlots: { customRender: "discountPrice" },
            align: "center"
          },
          {
            title: "创建时间",
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
      await this.getBillProductsByOrg();
      this.searchForm.isLoading = false;
    },
    // 学校改变 
    async onSchoolChange(value) {
      this.searchForm.schoolCode = value
    },
    // 删除
    onDelete(id) {
      this.$info({
        title: '此功能还未启用',
        onOk() { }
      });
    },
    // 添加
    onAdd() {
      this.addForm.isVisible = true;
    },
    // 添加.保存
    async saveAdd() {
      await this.createBillProduct();
      this.getBillProductsByOrg();
    },
    // 添加.取消
    cancelAdd() {
      this.addForm.isVisible = false;
    },
    // api
    async createBillProduct() {
      this.addForm.isLoading = true;
      // 接口参数
      let data;
      let err;
      // 表单数据添加到参数中
      this.addForm.form.validateFields((error, values) => {
        err = error;
        data = {
          sendId: 1,
          type: 98,
          price: values.price,
          orgNo: values.schoolCode,
          productName: values.productName,
          desc: values.desc,
          discountPrice: values.discountPrice
        };
      });
      // 表单校验
      if (err) {
        this.addForm.isLoading = false;
      } else {
        // 请求接口
        await this.$api.createBillProduct(data).then(res => {
          // 接口出错 返回res为false
          if (!res) {
            console.log("接口出错")
            return
          }
          // 成功访问, 处理数据
          if (res.code === 1) {
            this.$message.success("添加成功");
          } else {
            this.$error({ title: "错误", content: "添加失败" });
          }
        });
        this.addForm.isLoading = false;
        this.addForm.isVisible = false;
      }
    },
    // api
    async getBillProductsByOrg() {
      this.table.isLoading = true;
      // 加载前清空相关数据
      this.table.billProductsList = [];
      // 请求接口
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
            this.table.billProductsList = res.data;
          } else {
            this.$error({ title: "错误", content: res.msg });
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
        if (res.code === 1) {
          this.searchForm.schoolCode = res.data[0].schoolCode;
          this.searchForm.schoolList = res.data;
        } else {
          this.searchForm.schoolList = [];
          this.searchForm.schoolCode = "";
          this.$message.error(res.msg);
        }
      });
    },
    // 初始化数据
    async initData() {
      await this.findSchoolList()
      this.getBillProductsByOrg()
    }
  },
  mounted() {
    this.initData()
  }
};
</script>
<style lang="scss">
@import "../../assets/style/mixin.scss";
#bill-product {
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
  #table {
    .desc {
      @include ellipsis(3);
      resize: none;
      border: none;
    }
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
