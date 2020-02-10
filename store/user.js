// 用户管理
export const state = () => ({
  //  return--{}
  // 根据接口返回数据
  userInfo: {
    user: {}
  }
});
// 固定的属性，修改state中的值
export const mutations = {
  // 函数名自定义,
  // 第一个参数必须是state, 第二个参数调用时候传入的参数
  setUserInfo(state, data) {
    state.userInfo = data;
  }
};
