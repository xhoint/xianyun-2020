export const state = () => {
  return {
    // 历史查询
    history: []
  };
};

// 修改state中的值
export const mutations = {
  // 设置历史查询方法
  // 第一个参数必须是state, 第二个参数调用时候传入的参数
  setHistory(state, data) {
    // 将数据传入到history中
    state.history.push(data);
  }
};
