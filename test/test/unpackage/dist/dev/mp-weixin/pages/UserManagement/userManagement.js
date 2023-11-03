"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  const _easycom_uni_th2 = common_vendor.resolveComponent("uni-th");
  const _easycom_uni_tr2 = common_vendor.resolveComponent("uni-tr");
  const _easycom_uni_td2 = common_vendor.resolveComponent("uni-td");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_uni_table2 = common_vendor.resolveComponent("uni-table");
  (_easycom_u_image2 + _easycom_uni_th2 + _easycom_uni_tr2 + _easycom_uni_td2 + _easycom_u_icon2 + _easycom_uni_table2)();
}
const _easycom_u_image = () => "../../uni_modules/uview-plus/components/u-image/u-image.js";
const _easycom_uni_th = () => "../../uni_modules/uni-table/components/uni-th/uni-th.js";
const _easycom_uni_tr = () => "../../uni_modules/uni-table/components/uni-tr/uni-tr.js";
const _easycom_uni_td = () => "../../uni_modules/uni-table/components/uni-td/uni-td.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_uni_table = () => "../../uni_modules/uni-table/components/uni-table/uni-table.js";
if (!Math) {
  (_easycom_u_image + _easycom_uni_th + _easycom_uni_tr + _easycom_uni_td + _easycom_u_icon + _easycom_uni_table)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "userManagement",
  setup(__props) {
    const setUserList = () => {
      console.log("编辑用户表");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          src: "/static/userManagement.png",
          mode: "aspectFit",
          width: "100%",
          height: "300"
        }),
        b: common_vendor.p({
          align: "left",
          width: "40"
        }),
        c: common_vendor.p({
          align: "left",
          width: "40"
        }),
        d: common_vendor.p({
          align: "left",
          width: "80"
        }),
        e: common_vendor.p({
          align: "left",
          width: "50"
        }),
        f: common_vendor.o(setUserList),
        g: common_vendor.p({
          name: "setting",
          size: "20"
        }),
        h: common_vendor.p({
          stripe: true,
          emptyText: "暂无更多数据"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ab0da073"], ["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/pages/UserManagement/userManagement.vue"]]);
wx.createPage(MiniProgramPage);
