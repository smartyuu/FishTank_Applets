"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_u_sticky2 = common_vendor.resolveComponent("u-sticky");
  (_easycom_u_tabs2 + _easycom_u_sticky2)();
}
const _easycom_u_tabs = () => "../../uni_modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_u_sticky = () => "../../uni_modules/uview-plus/components/u-sticky/u-sticky.js";
if (!Math) {
  (_easycom_u_tabs + _easycom_u_sticky + FishTankInformation + FishInformation)();
}
const FishInformation = () => "./FishInformation/fishInformation.js";
const FishTankInformation = () => "./FishTankInformation/fishTankInformation.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "informationEntry",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "07ee3fe6": firstColor.value,
      "9e40828c": lastColor.value
    }));
    const tabsList = common_vendor.ref([{
      name: "鱼缸信息",
      iconCode: "icon-yugang"
    }, {
      name: "鱼类信息",
      iconCode: "icon-yu"
    }]);
    const current = common_vendor.ref(0);
    const itemStyle = {
      padding: "0 65px",
      height: "45px"
    };
    const firstColor = common_vendor.ref("#0000FF");
    const lastColor = common_vendor.ref("black");
    const changeColor = (index) => {
      if (index === 0) {
        firstColor.value = "#0000FF";
        lastColor.value = "black";
      } else {
        firstColor.value = "black";
        lastColor.value = "#0000FF";
      }
    };
    const changeIcon = (index) => {
      current.value = index;
      changeColor(index);
    };
    const clickTabs = (item) => {
      changeColor(item.index);
      changeIcon(item.index);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(tabsList.value, (item, index, i0) => {
          return {
            a: index,
            b: common_vendor.n(item.iconCode),
            c: common_vendor.o(($event) => changeIcon(index), index)
          };
        }),
        b: common_vendor.o(clickTabs),
        c: common_vendor.p({
          list: tabsList.value,
          itemStyle,
          lineColor: "#0000FF",
          lineWidth: "50",
          current: current.value
        }),
        d: common_vendor.p({
          bgColor: "#f2f8f9"
        }),
        e: current.value === 0
      }, current.value === 0 ? {} : {}, {
        f: current.value === 1
      }, current.value === 1 ? {} : {}, {
        g: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6c83341e"], ["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/pages/InformationEntry/informationEntry.vue"]]);
wx.createPage(MiniProgramPage);
