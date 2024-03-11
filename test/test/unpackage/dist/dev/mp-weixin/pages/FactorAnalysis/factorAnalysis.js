"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  _easycom_u_image2();
}
const _easycom_u_image = () => "../../uni_modules/uview-plus/components/u-image/u-image.js";
if (!Math) {
  (_easycom_u_image + AnalyseSearch + Temperature)();
}
const AnalyseSearch = () => "./AnalyseSearch/AnalyseSearch.js";
const Temperature = () => "./Temperature/Temperature.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "factorAnalysis",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          src: "/static/factorAnalysis.png",
          mode: "aspectFit",
          width: "100%",
          height: "300"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c28778dd"], ["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/pages/FactorAnalysis/factorAnalysis.vue"]]);
wx.createPage(MiniProgramPage);
