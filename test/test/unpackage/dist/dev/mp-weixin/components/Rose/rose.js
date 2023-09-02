"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  LEchart();
}
const LEchart = () => "../../uni_modules/lime-echart/components/l-echart/l-echart.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "rose",
  props: {
    titleText: {
      type: String
    },
    data: {
      type: Array
    }
  },
  setup(__props) {
    common_vendor.use([
      common_vendor.install,
      common_vendor.install$1,
      common_vendor.install$2,
      common_vendor.install$3,
      common_vendor.install$4,
      common_vendor.install$5,
      common_vendor.install$6,
      common_vendor.install$7,
      common_vendor.installLabelLayout,
      common_vendor.installUniversalTransition,
      common_vendor.install$8,
      common_vendor.install$9,
      common_vendor.install$10
    ]);
    const chart = common_vendor.ref(null);
    common_vendor.reactive([
      "#4A79FF",
      "#14D58A",
      "#FFD264",
      "#FF7683",
      "#9F99FF",
      "#56B5FF",
      "#80EF98"
    ]);
    const option = common_vendor.ref({
      legend: {
        top: "bottom"
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          name: "Nightingale Chart",
          type: "pie",
          radius: [50, 250],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 8
          },
          data: [
            { value: 40, name: "rose 1" },
            { value: 38, name: "rose 2" },
            { value: 32, name: "rose 3" },
            { value: 30, name: "rose 4" },
            { value: 28, name: "rose 5" },
            { value: 26, name: "rose 6" },
            { value: 22, name: "rose 7" },
            { value: 18, name: "rose 8" }
          ]
        }
      ]
    });
    common_vendor.onMounted(() => {
      chart.value.init(common_vendor.echarts, (chart2) => {
        chart2.setOption(option.value);
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr(chart, "89612de1-0", {
          "k": "chart"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-89612de1"], ["__file", "D:/MyNecessaryFile/fishApplets/FishTank_Applets/test/test/components/Rose/rose.vue"]]);
wx.createComponent(Component);
