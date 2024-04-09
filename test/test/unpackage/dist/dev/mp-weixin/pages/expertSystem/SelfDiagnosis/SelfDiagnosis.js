"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_image2 + _easycom_u_button2)();
}
const _easycom_u_image = () => "../../../uni_modules/uview-plus/components/u-image/u-image.js";
const _easycom_u_button = () => "../../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_image + _easycom_u_button)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "SelfDiagnosis",
  setup(__props) {
    const src = common_vendor.ref("/static/doctor1.png");
    const customStyle = common_vendor.reactive({
      float: "right",
      width: "70px",
      height: "30px",
      marginRight: "10px"
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["show-loading"]: true,
          src: src.value,
          width: "100px",
          height: "120px"
        }),
        b: common_vendor.p({
          type: "primary",
          customStyle
        }),
        c: common_vendor.p({
          ["show-loading"]: true,
          src: src.value,
          width: "100px",
          height: "120px"
        }),
        d: common_vendor.p({
          type: "primary",
          customStyle
        }),
        e: common_vendor.p({
          ["show-loading"]: true,
          src: src.value,
          width: "100px",
          height: "120px"
        }),
        f: common_vendor.p({
          type: "primary",
          customStyle
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f5924a2b"], ["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/pages/expertSystem/SelfDiagnosis/SelfDiagnosis.vue"]]);
wx.createPage(MiniProgramPage);
