"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_video_player = common_vendor.resolveComponent("video-player");
  _component_video_player();
}
if (!Math) {
  (Bar + Rose)();
}
const Bar = () => "../../components/Bar/bar.js";
const Rose = () => "../../components/Rose/rose.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const indexHelloNum = common_vendor.ref("欢迎使用智能水培农场");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(indexHelloNum)),
        b: common_vendor.p({
          controls: true
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/MyNecessaryFile/fishApplets/FishTank_Applets/test/test/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
