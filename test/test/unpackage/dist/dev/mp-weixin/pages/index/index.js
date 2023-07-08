"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_video_player = common_vendor.resolveComponent("video-player");
  _component_video_player();
}
if (!Math) {
  LEchart();
}
const LEchart = () => "../../uni_modules/lime-echart/components/l-echart/l-echart.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
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
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        },
        confine: true
      },
      legend: {
        data: ["热度", "正面", "负面"]
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#999999"
            }
          },
          axisLabel: {
            color: "#666666"
          }
        }
      ],
      yAxis: [
        {
          type: "category",
          axisTick: { show: false },
          data: ["汽车之家", "今日头条", "百度贴吧", "一点资讯", "微信", "微博", "知乎"],
          axisLine: {
            lineStyle: {
              color: "#999999"
            }
          },
          axisLabel: {
            color: "#666666"
          }
        }
      ],
      series: [
        {
          name: "热度",
          type: "bar",
          label: {
            normal: {
              show: true,
              position: "inside"
            }
          },
          data: [300, 270, 340, 344, 300, 320, 310]
        },
        {
          name: "正面",
          type: "bar",
          stack: "总量",
          label: {
            normal: {
              show: true
            }
          },
          data: [120, 102, 141, 174, 190, 250, 220]
        },
        {
          name: "负面",
          type: "bar",
          stack: "总量",
          label: {
            normal: {
              show: true,
              position: "left"
            }
          },
          data: [-20, -32, -21, -34, -90, -130, -110]
        }
      ]
    });
    common_vendor.onMounted(() => {
      chart.value.init(common_vendor.echarts, (chart2) => {
        chart2.setOption(option.value);
      });
    });
    const indexHelloNum = common_vendor.ref("欢迎使用智能水培农场");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(indexHelloNum.value),
        b: common_vendor.p({
          controls: true
        }),
        c: common_vendor.sr(chart, "1cf27b2a-1", {
          "k": "chart"
        }),
        d: common_vendor.p({
          id: "aaa"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/MyNecessaryFile/fishApplets/FishTank_Applets/test/test/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
