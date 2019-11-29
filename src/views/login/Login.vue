<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <img alt="logo"
               class="logo"
               src="../../assets/logo.png" />
          <span class="title">{{ systemName }}</span>
        </div>
      </div>
      <div class="login">
        <a-form class="login-form"
                @submit="onSubmit"
                :form="form">
          <a-alert type="error"
                   :closable="true"
                   v-if="error"
                   :message="error"
                   @close="closeAlert"
                   showIcon
                   style="margin-bottom: 24px;" />
          <a-form-item>
            <a-input v-decorator="[
                'account',
                {
                  rlues: [
                    {
                      required: true,
                      message: '请输入账户名',
                      whitespace: true
                    }
                  ]
                }
              ]"
                     size="large"
                     placeholder="请输入账户名称">
              <a-icon slot="prefix"
                      type="user" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input v-decorator="[
                'password',
                {
                  rlues: [
                    {
                      required: true,
                      message: '请输入密码',
                      whitespace: true
                    }
                  ]
                }
              ]"
                     size="large"
                     placeholder="请输入密码"
                     type="password">
              <a-icon slot="prefix"
                      type="lock" />
            </a-input>
          </a-form-item>
          <div>
            <a-checkbox :checked="true">自动登录</a-checkbox>
            <a style="float: right">忘记密码</a>
          </div>
          <a-form-item>
            <a-button :loading="logging"
                      style="width: 100%;margin-top: 24px"
                      size="large"
                      htmlType="submit"
                      type="primary">登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <global-footer :link-list="linkList"
                   :copyright="copyright" />
  </div>
</template>

<script>
import GlobalFooter from "../../layouts/GlobalFooter";

export default {
  name: "Login",
  components: { GlobalFooter },
  data() {
    return {
      logging: false,
      error: "",
      form: this.$form.createForm(this, { name: "login" })
    };
  },
  computed: {
    //系统名称(左上角)
    systemName() {
      return this.$store.state.setting.systemName;
    },
    // foot栏信息
    linkList() {
      return this.$store.state.setting.footerLinks;
    },
    // copyright
    copyright() {
      return this.$store.state.setting.copyright;
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.logging = true;
          this.$api
            .loginV2({
              account: values.account,
              password: values.password
            })
            .then(res => {
              this.logging = false;
              const result = res.data;
              if (res.code === 1) {
                // 权限小于1 则直接拒绝访问
                if (result.role <= 1) {
                  this.$router.push("/exception/403");
                } else {
                  // 暂存用户信息到seesionStorage
                  sessionStorage.setItem("user", JSON.stringify(result));
                  // 存储用户信息到vuex
                  this.$store.commit("account/SET_USER");
                  this.$router.push("/");
                }
              } else {
                this.error = res.msg;
                let error = res.msg || res.message || "无反馈信息"
                this.$error({
                  title: "错误",
                  content:
                    (<div>
                      <p>登录失败</p>
                      <p>错误提示: {error}</p>
                    </div>)
                })
              }
            });
        } else {
          console.log("loginErr", err);
        }
      });
    },
    closeAlert() {
      this.error = "";
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background: #f0f2f5
    url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg")
    no-repeat center 110px;
  background-size: 100%;
  .content {
    padding: 32px 0;
    flex: 1;
    @media (min-width: 768px) {
      padding: 224px 0 24px;
    }
    .top {
      text-align: center;
      .header {
        height: 44px;
        line-height: 44px;
        a {
          text-decoration: none;
        }
        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
        }
        .title {
          font-size: 33px;
          color: rgba(0, 0, 0, 0.85);
          font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica,
            sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
    }
    .login {
      width: 368px;
      margin: 0 auto;
      @media screen and (max-width: 576px) {
        width: 95%;
      }
      @media screen and (max-width: 320px) {
        .captcha-button {
          font-size: 14px;
        }
      }
      .icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
@import "../../assets/style/mixin.scss";
.container {
  .login {
    &-form {
      background-color: $bgc;
      margin-top: 20px;
    }
  }
}
</style>
