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
                                initialValue: '全部',
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
                                initialValue: '全部',
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
                   id="table"
                   :columns="table.columns"
                   :dataSource="table.billList"
                   rowKey="id"
                   bordered
                   :pagination="table.pagination"
                   @change="onPageChange"
                   :loading="table.isLoading">
            <template v-for="col in [
                      'id',
                      'billId',
                      'orgNo',
                      'orgName',
                      'depart',
                      'studentName',
                      'contact',
                      'orderNo',
                      'payment',
                      'createTime']"
                      :slot="col"
                      slot-scope="text, record">
              <div :key="col">
                <template v-if="col === 'payment'">
                  <template v-if="record.payment === 1">
                    已付款
                  </template>
                  <template v-else>
                    未付款
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
        // 部门列表
        departmentList: [],
        // 查询按钮loading
        isLoading: false
      },
      table: {
        // 项目列表
        billList: [],
        // 表格loading
        isLoading: false,
        pagination: {
          total: 0,
          current: 1
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
            title: "项目ID",
            dataIndex: "billId",
            scopedSlots: { customRender: "billId" },
            align: "center"
          },
          {
            title: "学校编号",
            dataIndex: "orgNo",
            scopedSlots: { customRender: "orgNo" }
          },
          {
            title: "学校名称",
            dataIndex: "orgName",
            scopedSlots: { customRender: "orgName" }
          },
          {
            title: "部门",
            dataIndex: "depart",
            scopedSlots: { customRender: "depart" },
            align: "center"
          },
          {
            title: "被缴费人",
            dataIndex: "studentName",
            scopedSlots: { customRender: "studentName" },
            align: "center"
          },
          {
            title: "联系电话",
            dataIndex: "contact",
            scopedSlots: { customRender: "contact" },
            align: "center"
          },
          {
            title: "订单号",
            dataIndex: "orderNo",
            scopedSlots: { customRender: "orderNo" },
            align: "center"
          },
          {
            title: "付款状态",
            dataIndex: "payment",
            scopedSlots: { customRender: "payment" },
            align: "center"
          },
          {
            title: "缴费时间",
            dataIndex: "createTime",
            scopedSlots: { customRender: "createTime" },
            align: "center"
          }
        ]
      }
    };
  },
  methods: {
    // 查询
    async onSearch(e) {
      e && e.preventDefault()
      this.searchForm.isLoading = true;
      this.table.pagination.current = 1
      await this.getBillsBy()
      this.searchForm.isLoading = false;
    },
    // 学校改变 
    onSchoolChange(value, option) {
      this.searchForm.schoolCode = value
      this.getBillConfigBy()
      this.getSchoolDeparts()
    },
    // 页号改变
    async onPageChange(pagination) {
      this.table.pagination.current = pagination.current
      this.getBillsBy()
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
                <p>获取学校列表出错</p>
                <p>错误提示: {error}</p>
              </div>)
          })
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
          // 接口出错 返回res为false
          if (!res) {
            console.log("接口出错")
            return
          }
          // 成功访问, 处理数据
          if (res.code === 1) {
            let list = [{ billName: "全部", id: "全部" }]
            list = [...list, ...res.data]
            this.searchForm.billList = list;
          } else {
            let error = res.msg || res.message || "无反馈信息"
            this.$error({
              title: "错误",
              content:
                (<div>
                  <p>获取缴费信息失败</p>
                  <p>错误提示: {error}</p>
                </div>)
            })
          }
        });
      this.searchForm.form.setFieldsValue({ billId: "全部" })
    },
    // api
    async getSchoolDeparts() {
      await this.$api
        .getSchoolDeparts({
          schoolCode: this.searchForm.schoolCode
        })
        .then(res => {
          // 接口出错 返回res为false
          if (!res) {
            console.log("接口出错")
            return
          }
          // 成功访问, 处理数据
          if (res.code === 1) {
            let list = [{ depart_name: "全部" }]
            list = [...list, ...res.data]
            this.searchForm.departmentList = list;
          } else {
            let error = res.msg || res.message || "无反馈信息"
            this.$error({
              title: "错误",
              content:
                (<div>
                  <p>获取部门失败</p>
                  <p>错误提示: {error}</p>
                </div>)
            })
          }
        });
      this.searchForm.form.setFieldsValue({ depart_name: "全部" })
    },
    // api
    async getBillsBy() {
      this.table.isLoading = true;
      // 加载前清空相关数据
      this.table.billList = [];
      // 接口参数
      let data = {
        pageSize: 10,
        pageNum: this.table.pagination.current,
        orgNo: this.searchForm.schoolCode
      }
      let err
      // 表单数据
      this.searchForm.form.validateFields((error, values) => {
        err = error
        data.billId = values.billId === "全部" ? null : values.billId
        data.depart = values.depart_name === "全部" ? null : values.depart_name
      });
      // 表单校验
      if (err) {
        this.table.isLoading = false;
      } else {
        // 请求接口
        await this.$api
          .getBillsBy(data)
          .then(res => {
            // 接口出错 返回res为false
            if (!res) {
              console.log("接口出错")
              return
            }
            // 成功访问, 处理数据
            if (res.code === 1) {
              this.table.billList = res.data.pageData
              this.table.pagination.total = res.data.dataTotal
            } else {
              let error = res.msg || res.message || "无反馈信息"
              this.$error({
                title: "错误",
                content:
                  (<div>
                    <p>获取缴费列表失败</p>
                    <p>错误提示: {error}</p>
                  </div>)
              })
            }
          });
        this.table.isLoading = false;
      }
    },
    // 初始化数据
    async initData() {
      await this.findSchoolList()
      await this.getBillConfigBy()
      await this.getSchoolDeparts()
      this.getBillsBy()
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
