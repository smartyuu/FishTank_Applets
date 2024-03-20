"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  LEchart();
}
const LEchart = () => "../../uni_modules/lime-echart/components/l-echart/l-echart.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "AnalyseEcharts",
  props: {
    option: {
      type: Object,
      default: {
        text: "查看鱼缸温度趋势",
        xAxisData: ["0时", " 6时", " 12时", "18时", "24时"],
        yAxisFormatter: "{value}°C",
        data: [25, 30, 35, 31, 26]
      }
    }
  },
  setup(__props) {
    const props = __props;
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
      common_vendor.install$9
    ]);
    const chart = common_vendor.ref(null);
    const option = common_vendor.ref({
      legend: {
        top: "90%"
      },
      toolbox: {
        show: true,
        trigger: "axis",
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          dataZoom: {
            yAxisIndex: "none"
          },
          magicType: { type: ["line", "bar"] }
        }
      },
      title: {
        text: props.option.text,
        top: "2%",
        left: "2%"
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: props.option.xAxisData
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: props.option.yAxisFormatter
        }
      },
      series: [
        {
          name: "Access From",
          type: "line",
          roseType: "area",
          showBackground: true,
          backgroundStyle: {
            color: "#fff"
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
          data: props.option.data
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
        a: common_vendor.sr(chart, "0c46c04b-0", {
          "k": "chart"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0c46c04b"], ["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/components/AnalyseEcharts/AnalyseEcharts.vue"]]);
wx.createComponent(Component);
