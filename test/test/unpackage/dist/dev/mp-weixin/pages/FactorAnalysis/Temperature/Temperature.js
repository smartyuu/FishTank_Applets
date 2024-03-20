"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_sensorData = require("../../../api/sensorData.js");
require("../../../http/httpRequest.js");
require("../../../http/auth.js");
require("../../../http/env.js");
require("../../../store/index.js");
if (!Math) {
  AnalyseEcharts();
}
const AnalyseEcharts = () => "../../../components/AnalyseEcharts/AnalyseEcharts.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "Temperature",
  props: {
    date: {
      type: Number
    }
  },
  setup(__props) {
    const props = __props;
    const TemList = common_vendor.ref([]);
    const option = common_vendor.ref({
      text: "查看鱼缸温度趋势",
      xAxisData: ["0时", " 6时", " 12时", "18时", "24时"],
      yAxisFormatter: "{value}°C",
      data: [25.5, 26, 27.2, 26.3, 25.7]
    });
    const getTemList = (date) => {
      api_sensorData.getTem(date).then((res) => {
        TemList.value = res;
      });
    };
    common_vendor.watch(() => props.date, (newValue) => {
      getTemList(newValue);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          option: option.value
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/pages/FactorAnalysis/Temperature/Temperature.vue"]]);
wx.createComponent(Component);
