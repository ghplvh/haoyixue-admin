<template>
  <page-layout :desc="desc" :title="title" :linkList="linkList">
    <div slot="extra" class="extraImg">
      <img :src="extraImage" />
    </div>
    <transition name="page-toggle">
      <keep-alive>
        <a-card class="content">
          <a-form :form="form" layout="inline" @submit="onSubmit">
            <a-row type="flex" align="middle">
              <a-col>
                <a-form-item style="width:100%" label="学校">
                  <a-select
                    v-if="schoolList.length > 0"
                    v-decorator="[
                      'school',
                      {
                        initialValue: schoolCode,
                        rules: [{ required: true, message: '请选择学校' }]
                      }
                    ]"
                    placeholder="请选择学校"
                    showArrow
                  >
                    <a-select-option
                      v-for="(item, index) in schoolList"
                      :key="index"
                      :value="item.schoolCode"
                    >
                      {{ item.schoolName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col style="flex-grow:1">
                <a-form-item>
                  <a-button type="primary" html-type="submit">
                    查询
                  </a-button>
                </a-form-item>
              </a-col>
              <a-col>
                <a-button type="primary">
                  新增收费项目
                </a-button>
              </a-col>
            </a-row>
          </a-form>
          <a-table
            class="table"
            :columns="columns"
            :dataSource="billList"
            bordered
          >
            <template
              v-for="col in [
                'id',
                'orgNo',
                'billName',
                'description',
                'status',
                'createTime',
                'updateTime'
              ]"
              :slot="col"
              slot-scope="text, record"
            >
              <div :key="col">
                <a-input
                  v-if="record.editable"
                  style="margin: -5px 0"
                  :value="text"
                  @change="e => onTableChange(e.target.value, record.key, col)"
                />
                <template v-else>{{ text }}</template>
              </div>
            </template>
            <template slot="operation" slot-scope="text, record">
              <div class="editable-row-operations">
                <span v-if="record.editable">
                  <a-popconfirm
                    @confirm="() => save(record.id)"
                    title="确定保存吗?"
                    okText="是"
                    cancelText="否"
                  >
                    <a style="display:inline-block">保存</a>
                  </a-popconfirm>
                  <a-popconfirm
                    title="确定取消吗?"
                    okText="是"
                    cancelText="否"
                    @confirm="() => cancel(record.id)"
                  >
                    <a style="display:inline-block">取消</a>
                  </a-popconfirm>
                </span>
                <span v-else>
                  <a @click="() => edit(record.id)">修改</a>
                </span>
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

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    scopedSlots: { customRender: "id" }
  },
  {
    title: "学校编码",
    dataIndex: "orgNo",
    scopedSlots: { customRender: "orgNo" }
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
    scopedSlots: { customRender: "status" }
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    scopedSlots: { customRender: "createTime" }
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    scopedSlots: { customRender: "updateTime" }
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];

export default {
  name: "QueryList",
  components: { PageLayout },
  data() {
    return {
      columns, // 列
      // 全局配置
      title: "",
      desc: "",
      linkList: [],
      extraImage: "",
      // form依赖
      form: this.$form.createForm(this, {
        name: "form"
      }),
      billList: [],
      cacheBillList: [],
      schoolList: [], //学校列表
      schoolCode: "" // 学校code
    };
  },
  methods: {
    onTableChange(value, key, column) {
      const newData = [...this.billList];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.billList = newData;
      }
    },
    onSubmit(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        console.log("Received values of form: ", values);
        this.schoolCode = values.school;
        this.getBillConfig();
      });
    },
    edit(id) {
      const newData = [...this.billList];
      // console.log("newData", newData);
      const target = newData.filter(item => id === item.id)[0];
      // console.log("target", target);
      if (target) {
        target.editable = true;
        this.billList = newData;
      }
    },
    save(id) {
      const newData = [...this.billList];
      const target = newData.filter(item => id === item.id)[0];
      if (target) {
        delete target.editable;
        this.billList = newData;
        this.cacheBillList = newData.map(item => ({ ...item }));
        // 下面调用修改接口
      }
    },
    cancel(id) {
      const newData = [...this.billList];
      console.log("newData", newData);
      const target = newData.filter(item => id === item.id)[0];
      console.log("target", target);
      if (target) {
        Object.assign(
          target,
          this.cacheBillList.filter(item => id === item.id)[0]
        );
        delete target.editable;
        this.billList = newData;
      }
    },
    getBillConfig() {
      const loading = this.$message.loading("正在加载", 0);
      this.$api
        .getBillConfigBy({
          orgNo: this.schoolCode,
          status: 0
        })
        .then(res => {
          loading();
          this.$message.success("加载完成", 1.2);
          if (res.code === 1) {
            this.billList = res.data;
            this.cacheBillList = res.data;
          } else {
            this.billList = [];
            this.cacheBillList = [];
            this.$message.error(res.msg);
          }
        });
    }
  },
  mounted() {
    this.$api.findSchoolList().then(res => {
      if (res.code === 1) {
        this.schoolList = res.data;
        this.schoolCode = res.data[0].schoolCode;
        this.getBillConfig();
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
.content {
  min-width: $minWidth;
}
.table {
  margin-top: 2vh;
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
