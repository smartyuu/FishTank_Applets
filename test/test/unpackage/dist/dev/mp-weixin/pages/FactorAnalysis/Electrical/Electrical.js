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
  __name: "Electrical",
  props: {
    date: {
      type: Number
    }
  },
  setup(__props) {
    const props = __props;
    const TemList = common_vendor.ref([]);
    const option = common_vendor.ref({
      text: "查看鱼缸电导率趋势",
      xAxisData: ["0时", " 6时", " 12时", "18时", "24时"],
      yAxisFormatter: "{value}",
      data: [300, 320, 330, 340, 320]
    });
    const getDianDaoList = (date) => {
      api_sensorData.getDianDao(date).then((res) => {
        TemList.value = res;
      });
    };
    common_vendor.watch(() => props.date, (newValue) => {
      getDianDaoList(newValue);
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
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/pages/FactorAnalysis/Electrical/Electrical.vue"]]);
wx.createComponent(Component);
