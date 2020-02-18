export const state = () => {
  return {
    // 历史查询
    history: [],
    // 订单的详细信息
    orderDetail: {
      // 为了避免模板报错
      seat_infos: {}
    }
  };
};

// 修改state中的值
export const mutations = {
  // 设置历史查询方法
  // 第一个参数必须是state, 第二个参数调用时候传入的参数
  setHistory(state, data) {
    // 将数据传入到history中
    // state.history.push(data);
    state.history.unshift(data);

    // 判断历史记录
    if (state.history.length > 5) {
      state.history.length = 5;
    }
  },
  // 修改orderDetail的数据
  setOrderDetail(state, data) {
    state.orderDetail = data;
  }
};
