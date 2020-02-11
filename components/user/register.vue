<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <!-- 添加对应的prop属性 -->
    <el-form-item class="form-item" prop="username">
      <!-- 动态绑定表单 v-model -->
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input placeholder="确认密码" type="password" v-model="form.checkPassword"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit" v-model="form.captcha">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    //elment-ui  认证密码
    //   rule--规则  value--值

    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPassword !== "") {
          // 验证和确认密码是否一致, 手动触发确认密码验证
          this.$refs.form.validateField("checkPassword");
        }
        callback();
      }
    };
    // 认证确认密码
    const validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // 验证手机号码
    const validateUsername = (rule, value, callback) => {
      if (value == "") {
        console.log(value);

        callback(new Error("请再次手机号码"));
      } else if (/^1[3,5,7,9][0-9]{9}$/.test(value) == false) {
        // 判断是否是手机号码的正则
        callback(new Error("手机号码格式错误"));
      } else {
        callback();
      }
    };

    return {
      // 表单数据
      form: {
        username: "", // 登录用户名/手机
        password: "", // 登录密码
        checkPassword: "", // 确认密码
        nickname: "", // 昵称
        captcha: "" // 手机验证码
      },
      // 表单规则
      rules: {
        username: [
          // required表示必填，message错误的提示信息. trigger输入框失去焦点时候触发验证
          // { required: true, message: "请输入用户名", trigger: "blur" }
          { validator: validateUsername, trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [
          // validator是验证的函数，输入框失去焦点时候触发函数执行
          { validator: validatePass, trigger: "blur" }
        ],
        checkPassword: [{ validator: validateCheckPass, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      // 判断手机号不为空
      if (this.form.username == "") {
        return;
      }
      // 调用方法--store仓库中user模块下验证码的方法
      this.$store.dispatch("user/sendCaptcha", this.form.username).then(res => {
        this.$message.success("手机验证码：000000");
      });
    },

    // 注册
    handleRegSubmit() {
      console.log(this.form); //查看表单内的属性
      //   表单验证
      this.$refs["form"].validate(valid => {
        if (valid) {
          // 注册提交
          //解构赋值---结构除了checkPassword的data属性
          const { checkPassword, ...data } = this.form;
          // 调用方法--store中user模块下的注册方法
          this.$store.dispatch("user/register", data).then(res => {
            this.$message.success("注册成功!");
            // 跳转到首页
            this.$router.push("/");
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