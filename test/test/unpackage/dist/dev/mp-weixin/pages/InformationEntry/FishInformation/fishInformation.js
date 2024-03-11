"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_uni_th2 = common_vendor.resolveComponent("uni-th");
  const _easycom_uni_tr2 = common_vendor.resolveComponent("uni-tr");
  const _easycom_uni_td2 = common_vendor.resolveComponent("uni-td");
  const _easycom_uni_table2 = common_vendor.resolveComponent("uni-table");
  (_easycom_u_button2 + _easycom_uni_th2 + _easycom_uni_tr2 + _easycom_uni_td2 + _easycom_uni_table2)();
}
const _easycom_u_button = () => "../../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_uni_th = () => "../../../uni_modules/uni-table/components/uni-th/uni-th.js";
const _easycom_uni_tr = () => "../../../uni_modules/uni-table/components/uni-tr/uni-tr.js";
const _easycom_uni_td = () => "../../../uni_modules/uni-table/components/uni-td/uni-td.js";
const _easycom_uni_table = () => "../../../uni_modules/uni-table/components/uni-table/uni-table.js";
if (!Math) {
  (_easycom_u_button + _easycom_uni_th + _easycom_uni_tr + _easycom_uni_td + _easycom_uni_table)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "fishInformation",
  setup(__props) {
    const customStyle = common_vendor.reactive({
      width: "100rpx",
      height: "50rpx",
      border: "none",
      position: "relative",
      top: "35px",
      left: "130px",
      zIndex: "1"
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          hairline: false,
          type: "primary",
          plain: true,
          text: "+操作",
          customStyle
        }),
        b: common_vendor.p({
          align: "left",
          width: "40"
        }),
        c: common_vendor.p({
          align: "left",
          width: "50"
        }),
        d: common_vendor.p({
          align: "left",
          width: "40"
        }),
        e: common_vendor.p({
          align: "left",
          width: "80"
        }),
        f: common_vendor.p({
          stripe: true,
          emptyText: "暂无更多数据"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-63335436"], ["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/pages/InformationEntry/FishInformation/fishInformation.vue"]]);
wx.createComponent(Component);
