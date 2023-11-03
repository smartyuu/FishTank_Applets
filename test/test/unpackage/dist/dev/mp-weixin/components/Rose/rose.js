"use strict";
const common_vendor = require("../../common/vendor.js");
const api_echarts = require("../../api/echarts.js");
require("../../http/httpRequest.js");
require("../../http/auth.js");
require("../../http/env.js");
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
    const dataList = common_vendor.ref([]);
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
    common_vendor.onMounted(() => {
      (async function() {
        dataList.value = await api_echarts.ApiGetNightingale();
        const option = common_vendor.ref({
          legend: {
            top: "85%"
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
          title: {
            text: "鱼类统计",
            top: "5%",
            left: "2%"
          },
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: ["20%", "80%"],
              center: ["50%", "50%"],
              roseType: "area",
              avoidLabelOverlap: false,
              showBackground: true,
              backgroundStyle: {
                color: "#fff"
              },
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
              data: dataList.value
            }
          ]
        });
        chart.value.init(common_vendor.echarts, (chart2) => {
          chart2.setOption(option.value);
        });
      })();
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
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-89612de1"], ["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/components/Rose/rose.vue"]]);
wx.createComponent(Component);
