"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  LEchart();
}
const LEchart = () => "../../uni_modules/lime-echart/components/l-echart/l-echart.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "pie",
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
        top: "10%",
        left: "7%",
        orient: "vertical"
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
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 8
          },
          label: {
            show: false,
            position: "center"
          },
          emphasis: {
            label: {
              show: true,
              fontWeight: "bold"
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 12, name: "良好" },
            { value: 1, name: "死亡" }
          ]
        }
      ]
    });
    common_vendor.onMounted(() => {
      chart.value.init(common_vendor.echarts, (chart2) => {
        console.log("调用echarts");
        chart2.setOption(option.value);
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr(chart, "9dce15ff-0", {
          "k": "chart"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9dce15ff"], ["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/components/Pie/pie.vue"]]);
wx.createComponent(Component);
