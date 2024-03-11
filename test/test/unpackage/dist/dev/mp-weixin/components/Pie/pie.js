"use strict";
const common_vendor = require("../../common/vendor.js");
const api_echarts = require("../../api/echarts.js");
require("../../http/httpRequest.js");
require("../../http/auth.js");
require("../../http/env.js");
if (!Array) {
  const _easycom_u_line_progress2 = common_vendor.resolveComponent("u-line-progress");
  _easycom_u_line_progress2();
}
const _easycom_u_line_progress = () => "../../uni_modules/uview-plus/components/u-line-progress/u-line-progress.js";
if (!Math) {
  (LEchart + _easycom_u_line_progress)();
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
    const stateCountList = common_vendor.ref([]);
    const maxCount = common_vendor.ref(null);
    const lineColor = common_vendor.ref(["#5470c6", "#91cc75", "#fac858"]);
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
    common_vendor.onMounted(() => {
      (async function() {
        const resData = await api_echarts.ApiGetPie();
        maxCount.value = resData.maxCount;
        stateCountList.value = resData.stateCountList.map((item, index) => {
          return {
            ...item,
            color: lineColor.value[index]
          };
        });
        const option = common_vendor.ref({
          legend: {
            top: "5%",
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
              data: stateCountList.value
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
        a: common_vendor.sr(chart, "9dce15ff-0", {
          "k": "chart"
        }),
        b: common_vendor.t(maxCount.value),
        c: common_vendor.p({
          percentage: 100,
          activeColor: "#409eff",
          height: "16"
        }),
        d: common_vendor.f(stateCountList.value, (stateCountList2, index, i0) => {
          return {
            a: common_vendor.t(stateCountList2.name),
            b: common_vendor.t(stateCountList2.value),
            c: common_vendor.t((stateCountList2.value / maxCount.value).toFixed(2) * 100),
            d: "9dce15ff-2-" + i0,
            e: common_vendor.p({
              percentage: (stateCountList2.value / maxCount.value).toFixed(2) * 100,
              activeColor: stateCountList2.color,
              height: "16"
            })
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9dce15ff"], ["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/components/Pie/pie.vue"]]);
wx.createComponent(Component);
