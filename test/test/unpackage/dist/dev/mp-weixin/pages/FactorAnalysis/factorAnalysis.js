"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  _easycom_u_image2();
}
const _easycom_u_image = () => "../../uni_modules/uview-plus/components/u-image/u-image.js";
if (!Math) {
  (_easycom_u_image + AnalyseSearch + Temperature + PH + Muddy + Electrical)();
}
const AnalyseSearch = () => "./AnalyseSearch/AnalyseSearch.js";
const Temperature = () => "./Temperature/Temperature.js";
const PH = () => "./PH/PH.js";
const Muddy = () => "./Muddy/Muddy.js";
const Electrical = () => "./Electrical/Electrical.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "factorAnalysis",
  setup(__props) {
    const type = common_vendor.ref("温度");
    const date = common_vendor.ref();
    const judgeType = (e) => {
      type.value = e;
    };
    const getDate = (e) => {
      date.value = e;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          src: "/static/factorAnalysis.png",
          mode: "aspectFit",
          width: "100%",
          height: "300"
        }),
        b: common_vendor.o(judgeType),
        c: common_vendor.o(getDate),
        d: type.value === "温度"
      }, type.value === "温度" ? {
        e: common_vendor.p({
          date: date.value
        })
      } : {}, {
        f: type.value === "PH"
      }, type.value === "PH" ? {
        g: common_vendor.p({
          date: date.value
        })
      } : {}, {
        h: type.value === "浑浊度"
      }, type.value === "浑浊度" ? {
        i: common_vendor.p({
          date: date.value
        })
      } : {}, {
        j: type.value === "电导率"
      }, type.value === "电导率" ? {
        k: common_vendor.p({
          date: date.value
        })
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c28778dd"], ["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/pages/FactorAnalysis/factorAnalysis.vue"]]);
wx.createPage(MiniProgramPage);
