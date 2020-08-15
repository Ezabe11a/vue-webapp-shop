<template>
  <div class="jd-login">
    <van-nav-bar title="登录京东" left-text="返回" left-arrow @click-left="back" />
    <van-field v-model.trim="username" label="账号" placeholder="请输入用户名" />
    <van-field v-model.trim="password" type="password" label="密码" placeholder="请输入密码" />

    <van-button
      round
      type="info"
      @touchstart="confirm"
      color="linear-gradient(to right, #ff6034, #ee0a24)"
    >登录</van-button>
    <van-button
      round
      type="info"
      @touchstart="skipRegist"
      color="linear-gradient(to right, #ee0a24, #ff6034)"
    >去注册</van-button>
  </div>
</template>

<script>
import { NavBar, Toast, Field, Button } from "vant";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Button.name]: Button,
  },
  methods: {
    skipRegist() {
      this.$router.push("/regist");
    },
    back() {
      this.$router.push("/home");
    },

    confirm() {
      let data = {
        username: this.username,
        password: this.password,
      };
      if (this.username && this.password) {
        this.$http.fetchLogin(data).then((result) => {
          localStorage.setItem("token", result.token);
          Toast.success("登录成功");
          this.$router.back();
        });
      } else {
        Toast.fail("账号密码不能为空");
      }
    },
  },
};
</script>

<style lang="scss" scope>
.jd-login {
  width: 100%;
  height: 100%;
  .van-button {
    width: 3.333333rem;
    padding: 0 0.666667rem;
    margin-left: 0.666667rem;
    &:first-of-type {
      margin-left: 1.333333rem;
    }
  }
}
</style>