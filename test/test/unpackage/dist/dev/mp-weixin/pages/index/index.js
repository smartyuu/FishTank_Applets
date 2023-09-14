"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (Rose + Pie)();
}
const Rose = () => "../../components/Rose/rose.js";
const Pie = () => "../../components/Pie/pie.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const indexHelloNum = common_vendor.ref("欢迎使用智能水培农场");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(indexHelloNum))
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
