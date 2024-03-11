"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_image2 + _easycom_u_button2)();
}
const _easycom_u_image = () => "../../uni_modules/uview-plus/components/u-image/u-image.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_image + Gird + _easycom_u_button)();
}
const Gird = () => "./Grid/grid.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "expertSystem",
  setup(__props) {
    const customStyle = common_vendor.reactive({
      width: "75%",
      height: "150rpx",
      backgroundColor: "#dce6fd",
      boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.3)",
      borderRadius: "50rpx",
      fontWeight: "700",
      fontSize: "45rpx"
    });
    const phoneButton = () => {
      console.log("打电话");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          src: "/static/expertSystem.png",
          mode: "aspectFit",
          width: "100%",
          height: "300"
        }),
        b: common_vendor.o(phoneButton),
        c: common_vendor.p({
          customStyle
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-50b2af9e"], ["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/pages/expertSystem/expertSystem.vue"]]);
wx.createPage(MiniProgramPage);
