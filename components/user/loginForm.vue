<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      form: {
        username: "",
        password: ""
      },
      // 表单规则
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
      //   console.log(this.form);
      // 验证表单---element-ui form表单
      //   validate---表单中的方法
      this.$refs["form"].validate(valid => {
        if (valid) {
          // this.$axios({
          //   url: "/accounts/login",
          //   method: "POST",
          //   //从表单中获取数据
          //   data: this.form
          // }).then(res => {
          // console.log(res.data);
          // 把数据存到store中
          // this.$store.state.user.userInfo=data-----错误写法
          // 通过commit调用mutations中的方法---第一个参数为user中的方法，第二个参数为数据
          // this.$store.commit('user/setUserInfo',data)

          // --------------------------------------------
          // });
          // 通过commit调用actions中的方法
          this.$store.dispatch("user/login", this.form).then(() => {
            this.$message.success("登录成功!");
            // 跳转到首页
            // this.$router.push("/");
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
