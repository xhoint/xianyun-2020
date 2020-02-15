<template>
  <!--
       思路
       1. 搜索分析
       2. 获取出发城市和到达的数据
       3. 下拉数据列表选择选项时候赋值
       4. 搜索跳转/ 自定义验证
       5. 出发城市和到达城市切换
       6. 往返
  -->
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 监听输入框的输入，可以在这个事件中请求API数据,类似input事件 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @blur="handleDepartBlur"
          @select="handleDepartSelect"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @blur="handleDestBlur"
          @select="handleDestSelect"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- DatePicker 日期选择器  -->
        <!-- change 用户确认选择日期时触发 -->
        <!-- picker-options	当前时间日期选择器特有的选项参考下表  disabledDate -->
        <el-date-picker
          v-model="form.departDate"
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      // 切换
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      //   form表单字段
      form: {
        departCity: "", // 出发城市
        departCode: "", // 出发城市代码
        destCity: "", // 到达城市
        destCode: "", // 到达城市代码
        departDate: "" // 日期字符串
      },
      // 出发城市列表
      departData: [],
      // 到达城市列表
      destData: [],

      // DatePicker 日期选择器
      // 日期可选配置
      pickerOptions: {
        // 如果返回true表示可选
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 * 24 < Date.now();
        }
      }
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      // MessageBox 弹框--消息提示
      if (index == 1) {
        this.$alert("目前暂不支持往返，请使用单程选票！", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }
    },

    // -------------------------------------------------

    // 封装出发城市和到达城市的请求函数
    querySearch(value) {
      return this.$axios({
        url: "/airs/city",
        // axios的get请求的参数使用params, 如果是post请求使用data
        params: {
          name: value //将value赋值给name
        }
      }).then(res => {
        // data是数组，但是数组中的对象没有value值
        const { data } = res.data;
        // 给data中的每一项都添加一个value属性--map变量数组
        const newData = data.map(v => {
          v.value = v.name.replace("市", ""); //截取数组，
          // map返回的数组由return组成的替换为空字符串
          return v;
        });
        return newData;
      });
    },

    // -----------------------------------------

    // 出发城市输入框的事件
    queryDepartSearch(value, cb) {
      // 如果输入框没有值就直接返回
      if (!value) {
        // 1.（bug）如果value是空的，把原来的城市列表清空
        this.departData = [];
        // 2.（bug）调用cb传入空数组，不会出现空白的加载中的下拉面板
        cb([]);
        return;
      }
      // 调用封装后的函数
      this.querySearch(value).then(newData => {
        this.departData = newData;
        cb(newData);
      });
    },
    // ----------------------------------------------------------
    // 到达城市输入框
    queryDestSearch(value, cb) {
      // 如果输入框没有值就直接返回
      if (!value) {
        // 如果value是空的，把原来的城市列表清空
        this.destData = [];
        // 调用cb传入空数组，不会出现空白的加载中的下拉面板
        cb([]);
        return;
      }
      // 调用封装后的函数
      this.querySearch(value).then(newData => {
        this.destData = newData;
        cb(newData);
      });
    },

    // --------------------------------------------------------------------------

    // 未封装时  出发城市输入框
    /*
    // 监听出发城市输入框的事件
    // value 是输入框的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      //   console.log(value);
      // 如果输入框没有值就直接返回
      if (!value) {
        // 如果value是空的，把原来的城市列表清空
        this.departData = [];
        // 调用cb传入空数组，不会出现空白的加载中的下拉面板
        cb([]);
        return;
      }
      // 模拟数据
      //   const arr = [
      //     { value: "广州", sort: "CAN" },
      //     { value: "广元", sort: "yuan" },
      //     { value: "广安", sort: "guangan" }
      //   ];
      //   // cb把数组展示到列表中, 数组中每一项必须是对象，对象中必须有value属性
      //   cb(arr);

      //根据value请求城市列表
      this.$axios({
        url: "/airs/city",
        // axios的get请求的参数使用params, 如果是post请求使用data
        params: {
          name: value //将value赋值给name
        }
      }).then(res => {
        // data是数组，但是数组中的对象没有value值
        const { data } = res.data;
        // 给data中的每一项都添加一个value属性--map变量数组
        const newData = data.map(v => {
          v.value = v.name.replace("市", ""); //截取数组，
          // map返回的数组由return组成的替换为空字符串
          return v;
        });

        // 把newData保存到data中
        this.departData = newData;

        // cb把数组展示到列表中, 数组中每一项必须是对象，
        cb(newData);
      });
    },
    */

    // ----------------------------------------------
    // 出发城市输入框失去焦点时候触发-------失去焦点时判断  清空出发城市的值this.departData.value=""
    handleDepartBlur() {
      if (this.departData.length === 0) {
        return;
      }
      // 默认获取数组中第一个城市
      this.form.departCity = this.departData[0].value;
      this.form.departCode = this.departData[0].sort;
    },

    // ---------------------------------------------------------------

    /*
  未封装时 目标城市输入框
  // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      if (!value) {
        // 如果value是空的，把原来的城市列表清空
        this.destData = [];
        // 调用cb传入空数组，不会出现空白的加载中的下拉面板
        cb([]);
        return;
      }
      // 根据value请求城市列表
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;
        const newData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        // 把newData保存到data中(出了这里和出发城市不一样，函数内的其他代码和出发城市都是一样的)
        this.destData = newData;
        cb(newData);
      });
    },
   */

    // ----------------------------------------------

    // 到达城市输入框焦点时候触发
    handleDestBlur() {
      if (this.destData.length === 0) {
        return;
      }
      // 默认获取数组中第一个城市
      this.form.destCity = this.destData[0].value;
      this.form.destCode = this.destData[0].sort;
    },
    // ------------------------------------------------------------------------
    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      // 出发城市和出发城市代码
      this.form.departCity = item.value;
      this.form.departCode = item.sort;
    },
    // -----------------------------------------------------------------
    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCity = item.value;
      this.form.destCode = item.sort;
    },
    //--------------------------------------------------------------------

    // 确认选择日期时触发
    //value 是个时间对象
    handleDate(value) {
      // 修改日期的格式
      // console.log("测试打印日期：", value)
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },

    // ---------------------------------------------------------------------
    // 触发和目标城市切换时触发
    handleReverse() {
      // 出发城市，出发城市sort  到达城市， 到达城市sort
      const { departCity, departCode, destCity, destCode } = this.form;
      this.form.departCity = destCity;
      this.form.departCode = destCode;
      this.form.destCity = departCity;
      this.form.destCode = departCode;
    },

    // --------------------------------------------------------------------

    // 提交表单是触发
    handleSubmit() {
      //   console.log(this.form);
      if (!this.form.departCity) {
        this.$message.error("请输入出发城市");
        return;
      }
      if (!this.form.destCity) {
        this.$message.error("请输入到达城市");
        return;
      }
      if (!this.form.departDate) {
        this.$message.error("请选择时间");
        return;
      }
      // 把this.form保存到store中
      this.$store.commit("air/setHistory", this.form);
      // 跳转到 /air/flights，保证该页面url的参数有5个参数
      this.$router.push({
        path: "/air/flights",
        // query是url的参数
        query: this.form
      });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
