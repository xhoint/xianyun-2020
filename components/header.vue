<template>
  <div class="header">
    <el-row type="flex" justify="space-between" class="head">
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="/logo.jpg" alt />
        </nuxt-link>
      </div>

      <!-- 菜单栏 -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- 登录注册 -->
      <el-row type="flex" align="middle">
        <nuxt-link to="/user/login">登录/注册</nuxt-link>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.header {
  height: 60px;
  background-color: #fff;
  border-bottom: 2px solid #fff;
  box-shadow: 0 4px 2px #f6f6f6;
  min-width: 1000px;
  position: relative;
  z-index: 2;
}
.head {
  width: 1000px;
  height: 60px;
  margin: 0 auto;

  .logo {
    img {
      margin-top: 10px;
      width: 156px;
      height: 42px;
      display: block;
    }
  }

  .navs {
    margin-left: 30px;
    flex: 1;

    a {
      display: block;
      height: 60px;
      line-height: 60px;
      box-sizing: border-box; //內减模式
      padding: 0 30px;

      &:hover {
        border-bottom: 5px #409eff solid;
        color: #409eff;
      }
    }

    //如果高亮没有反应则加上/deep/
    .nuxt-link-exact-active {
      background: #409eff;
      color: #fff;

      &:hover {
        color: #fff;
      }
    }
  }
}
</style> 