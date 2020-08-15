<template>
  <div class="jd-regist">
    <van-nav-bar title="京东注册" left-text="返回" left-arrow @click-left="back" />
    <van-field v-model.trim="username" label="账号" placeholder="请输入用户名" />
    <van-field v-model.trim="password" type="password" label="密码" placeholder="请输入密码" />
    <van-field v-model.trim="password2" type="password" label="确认密码" placeholder="请确认密码" />

    <van-button
      round
      type="info"
      @touchstart="confirm"
      color="linear-gradient(to right, #ff6034, #ee0a24)"
    >注册</van-button>
  </div>
</template>

<script>
import { NavBar, Toast, Field, Button  } from "vant";

export default {
  data() {
    return {
      username: "",
      password: "",
      password2: ""
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Button.name]: Button,
  },
  methods: {
    back() {
      this.$router.back();
    },
    confirm() {
      // 表单验证
      let data = {
        username: this.username,
        password: this.password,
        password2: this.password2
      };
      this.$http.fetchRegist(data).then(() => {
        setTimeout(() => {
          Toast.success('注册成功')
          this.$router.push("/login");
        }, 1000);
      });
    }
  }
};
</script>

<style lang="scss" scope>
.jd-regist{
  .van-button{
    padding:0 2rem;
    margin-left: 2.666667rem;
  }
}
</style>