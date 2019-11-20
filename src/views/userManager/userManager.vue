<template>
  <page-layout :desc="desc" :title="title" :linkList="linkList">
    <div slot="extra" class="extraImg">
      <img :src="extraImage" />
    </div>
    <transition name="page-toggle">
      <keep-alive>
        <a-card>
          <div>
            <a-form layout="horizontal">
              <div>
                <a-row>
                  <a-col :md="8" :sm="24">
                    <a-form-item
                      label="学校:"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{ span: 12, offset: 1 }"
                    >
                      <a-select
                        @change="onSelectChange"
                        placeholder="请选择"
                        v-model="schoolCode"
                      >
                        <a-select-option
                          v-for="item in schoolList"
                          :key="item.schoolCode"
                          :value="item.schoolCode"
                        >
                          {{ item.schoolName }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item
                      label="角色:"
                      :labelCol="{ span: 3 }"
                      :wrapperCol="{ span: 12, offset: 1 }"
                    >
                      <a-select v-model="role" @change="onSelectChange">
                        <a-select-option :value="1">家长</a-select-option>
                        <a-select-option :value="2">老师</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
              </div>
            </a-form>
          </div>
          <a-table :columns="columns" :dataSource="userList">
            <template
              v-for="col in ['userId', 'account']"
              :slot="col"
              slot-scope="text, record"
            >
              <div :key="col">
                <a-input
                  v-if="record.editable"
                  style="margin: -5px 0"
                  :value="text"
                  @change="e => handleChange(e.target.value, record.key, col)"
                />
                <template v-else>{{ text }}</template>
              </div>
            </template>
            <template slot="operation" slot-scope="text, record">
              <div class="editable-row-operations">
                <span v-if="record.editable">
                  <a @click="() => save(record.key)">保存</a>
                  <a-popconfirm
                    title="Sure to cancel?"
                    @confirm="() => cancel(record.key)"
                  >
                    <a>取消</a>
                  </a-popconfirm>
                </span>
                <span v-else>
                  <a @click="() => edit(record.key)">编辑</a>
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
      columns, // 标题栏
      schoolList: [], // 学校列表
      schoolCode: "", // 选中学习的code
      userList: [],
      role: 1,
      title: "",
      desc: "",
      linkList: [],
      extraImage: ""
    };
  },
  methods: {
    onSelectChange() {
      this.getUsers();
    },
    getUsers() {
      const loading = this.$message.loading("正在载入", 0);
      this.$api
        .getUsers({
          pagesize: 10,
          orgNo: this.schoolCode,
          pageNum: 1,
          role: this.role
        })
        .then(res => {
          loading();
          if (res.code === 1) {
            this.userList = res.data.pageData;
          } else {
            console.log(res.msg);
            this.$message.error(res.msg);
          }
        });
    },
    onTableChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
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
    }
  },
  mounted() {
    this.$api.findSchoolList().then(res => {
      if (res.code === 1) {
        this.schoolList = res.data;
        this.schoolCode = res.data[0].schoolCode;
        this.onSelectChange();
      } else {
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
