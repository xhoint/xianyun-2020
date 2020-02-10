// 用户管理
export const state = () => {
  //  return--{}
  // 根据接口返回数据
  return {
    userInfo: {
      user: {}
    }
  };
};
// 固定的属性，修改state中的值
export const mutations = {
  // 函数名自定义,
  // 第一个参数必须是state, 第二个参数调用时候传入的参数
  setUserInfo(state, data) {
    state.userInfo = data;
  },
  // 清除用户数据
  cleanUserInfo(state, data) {
    if (process.browser) {
      localStorage.removeItem("userInfo");
    }
    state.userInfo = {};
  }
};

// 固定的属性，异步修改state中的值的方法，一般存放接口的请求的
export const actions = {
  // 函数名自定义,
  // 第一个参数必须是store, 第二个参数调用时候传入的参数
  login(store, data) {
    // 提交到登录接口
    return this.$axios({
      url: "/accounts/login",
      method: "POST",
      data
    }).then(res => {
      // data是要保存到userInfo
      const { data } = res;
      // 调用commit保存数据到state
      store.commit("setUserInfo", data);
    });
  }
};
