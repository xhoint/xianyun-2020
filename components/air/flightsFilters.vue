<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        <!-- 渲染出发城市和到达城市 -->
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        <!--  渲染日期-->
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <!-- 机场列表  -->
        <!-- select中option的label是展示出来的文字，value是选择时候的值-->
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            v-for="(item, index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <!-- 时间 
           截取首个数字 
           0-6
           6-12
           12-18
          -->
          <el-option
            v-for="(item, index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <!-- 航空公司列表 -->
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            v-for="(item, index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <!-- 机型大小 -->
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            v-for="(item, index) in airSizeList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 组件可以接收的属性
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      airSizeList: [
        { label: "大", value: "L" },
        { label: "中", value: "M" },
        { label: "小", value: "S" }
      ],
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "" // 机型大小
    };
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      console.log(value);
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {},

    // 选择航空公司时候触发
    handleCompany(value) {},

    // 选择机型时候触发
    handleAirSize(value) {},

    // 撤销条件时候触发
    handleFiltersCancel() {}
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>