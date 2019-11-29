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
          <a-button type="primary"
                    @click="onAdd">
            新增收费项目
          </a-button>
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
        <a-form-item label="商品名称">
          <a-input autoFocus
                   v-decorator="[
                    'productName',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请填写商品名称'
                        }
                      ]
                    }
                  ]" />
        </a-form-item>
        <a-form-item label="商品价格"
                     :wrapperCol="{span:12}">
          <a-input autoFocus
                   type="number"
                   v-decorator="[
                    'price',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请填写商品价格'
                        }
                      ]
                    }
                  ]" />
        </a-form-item>
        <a-form-item label="商品价格"
                     :wrapperCol="{span:12}">
          <div class="clearfix">
            <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-card"
                      :fileList="fileList"
                      @preview="handlePreview"
                      @change="handleChange">
              <div v-if="fileList.length < 3">
                <a-icon type="plus" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible"
                     :footer="null"
                     @cancel="handleCancel">
              <img alt="example"
                   style="width: 100%"
                   :src="previewImage" />
            </a-modal>
          </div>
        </a-form-item>
        <a-form-item label="商品描述">
          <a-input type="textarea"
                   rows="5"
                   style="resize:none;"
                   v-decorator="[
                    'desc',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请填写商品描述'
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
      addForm: {
        // 新增form依赖
        form: this.$form.createForm(this, {
          name: "addForm"
        }),
        // 项目产品列表
        billProductsList: [],
        // 文件列表
        fileList: [],
        // 是否显示新增form
        isVisible: false,
        // 新增确定loading
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
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },

    //api

    // 初始数据
    async initData() {

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
