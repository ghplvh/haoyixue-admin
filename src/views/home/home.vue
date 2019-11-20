<template>
  <page-layout :desc="desc" :title="title" :linkList="linkList">
    <div slot="extra" class="extraImg">
      <img :src="extraImage" />
    </div>
    <transition name="page-toggle">
      <keep-alive>
        <a-card>
          <a-form :form="form" layout="inline" @submit="onSubmit">
            <a-row>
              <a-col :span="8">
                <a-form-item
                  style="width:100%"
                  label="学校"
                  :label-col="{ span: 4 }"
                  :wrapper-col="{ span: 16, offset: 1 }"
                >
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
              <a-col :span="13">
                <a-form-item :wrapper-col="{ span: 12, offset: 2 }">
                  <a-button type="primary" html-type="submit">
                    查询
                  </a-button>
                </a-form-item>
              </a-col>
              <a-col :span="3">
                <a-button type="primary">
                  新增收费项目
                </a-button>
              </a-col>
            </a-row>
          </a-form>
          <!-- <a-table :columns="columns"> </a-table> -->
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
    dataIndex: "userId",
    width: "25%",
    scopedSlots: { customRender: "userId" }
  },
  {
    title: "账户",
    dataIndex: "account",
    width: "15%",
    scopedSlots: { customRender: "account" }
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
      schoolList: [], //学校列表
      schoolCode: "" // 学校code
    };
  },
  methods: {
    onTableChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
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
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        delete target.editable;
        this.data = newData;
        this.cacheData = newData.map(item => ({ ...item }));
      }
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter(item => key === item.key)[0]
        );
        delete target.editable;
        this.data = newData;
      }
    },
    getBillConfig() {
      const loading = this.$message.loading("正在载入", 0);
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
          } else {
            this.billList = [];
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
