<template>
  <page-layout :desc="setting.desc"
               :title="setting.title"
               :linkList="setting.linkList"
               id="bill-record">
    <div slot="extra"
         class="extraImg">
      <img :src="setting.extraImage" />
    </div>
    <transition name="page-toggle">
      <keep-alive>
        <a-card class="content">
          <a-form :form="searchForm.form"
                  id="search-form"
                  layout="inline"
                  @submit="onSearch">
            <a-row type="flex"
                   align="middle">
              <a-col>
                <a-form-item label="学校"
                             v-if="searchForm.schoolList.length > 0">
                  <a-select v-decorator="[
                              'schoolCode',
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
              <a-col>
                <a-form-item label="项目"
                             v-if="searchForm.billList.length > 0">
                  <a-select v-decorator="[
                              'billId',
                              {
                                initialValue: searchForm.billId,
                                rules: [{ required: true, message: '请选择项目' }]
                              }
                            ]"
                            placeholder="请选择项目"
                            showArrow>
                    <a-select-option style="width:100px;"
                                     v-for="(item, index) in searchForm.billList"
                                     :key="index"
                                     :title="item.billName"
                                     :value="item.id">
                      {{ item.billName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col>
                <a-form-item label="部门"
                             v-if="searchForm.departmentList.length > 0">
                  <a-select v-decorator="[
                              'depart_name',
                              {
                                initialValue: searchForm.depart_name,
                                rules: [{ required: true, message: '请选择部门' }]
                              }
                            ]"
                            placeholder="请选择部门"
                            showArrow>
                    <a-select-option style="width:100px;"
                                     v-for="(item, index) in searchForm.departmentList"
                                     :key="index"
                                     :title="item.depart_name"
                                     :value="item.depart_name">
                      {{ item.depart_name }}
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
                      'updateTime']"
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
          </a-table>
        </a-card>
      </keep-alive>
    </transition>
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
        // 项目列表
        billList: [],
        // 项目id
        billId: "",
        // 部门列表
        departmentList: [],
        // 部门id
        departName: "",
        // 查询按钮loading
        isLoading: false
      },
      table: {
        // 项目列表
        billList: [],
        // 表格loading
        isLoading: false,
        pagination: {
          total: 0
        },
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
      this.table.billList = [];
      let data = {
        pageSize: 10,
        pageNum: 1,
        orgNo: this.searchForm.schoolCode
      }
      this.searchForm.form.validateFields((error, values) => {
        this.searchForm.schoolCode = values.schoolCode;
        data.billId = values.billId
        data.depart = values.depart_name
      });
      await this.getBillsBy(data)
      this.searchForm.isLoading = false;
    },
    //
    // api
    async findSchoolList() {
      await this.$api.findSchoolList().then(res => {
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
    // api
    async getBillConfigBy() {
      await this.$api
        .getBillConfigBy({
          orgNo: this.searchForm.schoolCode,
          status: null
        })
        .then(res => {
          if (res.code === 1) {
            this.searchForm.billList = res.data;
            this.searchForm.billId = res.data[0].id
          } else {
            this.$error({ title: "错误", content: res.msg });
          }
        });
    },
    // api
    async getSchoolDeparts() {
      await this.$api
        .getSchoolDeparts({
          schoolCode: this.searchForm.schoolCode
        })
        .then(res => {
          if (res.code === 1) {
            this.searchForm.departmentList = res.data;
            this.searchForm.depart_name = res.data[0].depart_name
          } else {
            this.$error({ title: "错误", content: res.msg });
          }
        });
    },
    // api
    async getBillsBy(data) {
      this.table.isLoading = true;
      // 加载前清空相关数据
      this.table.billList = [];
      await this.$api
        .getBillsBy(data)
        .then(res => {
          if (!res) {
            console.log("接口出错")
            return
          }
          if (res.code === 1) {
            this.table.billList = res.data.pageData
            this.table.pagination.total = res.data.dataTotal
          } else {
            this.$error({ title: "错误", content: res.msg });
          }
        });
      this.table.isLoading = false;
    },
    // 初始化数据
    async initData() {
      await this.findSchoolList()
      await this.getBillConfigBy()
      await this.getSchoolDeparts()
    },
  },
  mounted() {
    this.initData()
  }
};
</script>
<style lang="scss">
@import "../../assets/style/mixin.scss";
#bill-record {
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
