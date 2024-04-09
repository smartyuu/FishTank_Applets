"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_grid_item2 = common_vendor.resolveComponent("u-grid-item");
  const _easycom_u_grid2 = common_vendor.resolveComponent("u-grid");
  (_easycom_u_icon2 + _easycom_u_grid_item2 + _easycom_u_grid2)();
}
const _easycom_u_icon = () => "../../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_grid_item = () => "../../../uni_modules/uview-plus/components/u-grid-item/u-grid-item.js";
const _easycom_u_grid = () => "../../../uni_modules/uview-plus/components/u-grid/u-grid.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_grid_item + _easycom_u_grid)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "grid",
  setup(__props) {
    const baseList = common_vendor.ref([
      {
        name: "chat",
        title: "疾病自诊"
      },
      {
        name: "setting",
        title: "专家审核"
      },
      {
        name: "email",
        title: "发布通知"
      },
      {
        name: "pushpin",
        title: "百科全书"
      }
    ]);
    const click = (name) => {
      switch (name) {
        case 0:
          common_vendor.index.navigateTo({
            url: "/pages/expertSystem/SelfDiagnosis/SelfDiagnosis"
          });
          break;
        case 1:
        case 0:
          common_vendor.index.navigateTo({
            url: "/pages/expertSystem/ExpertReview/ExpertReview"
          });
          break;
        case 2:
        case 0:
          common_vendor.index.navigateTo({
            url: "/pages/expertSystem/ReleasingNotices/ReleasingNotices"
          });
          break;
        case 3:
        case 0:
          common_vendor.index.navigateTo({
            url: "/pages/expertSystem/Encyclopaedia/Encyclopaedia"
          });
          break;
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(baseList.value, (baseListItem, baseListIndex, i0) => {
          return {
            a: "1e95c951-2-" + i0 + "," + ("1e95c951-1-" + i0),
            b: common_vendor.p({
              customStyle: {
                paddingTop: "40rpx"
              },
              name: baseListItem.name,
              size: 35
            }),
            c: common_vendor.t(baseListItem.title),
            d: baseListIndex,
            e: "1e95c951-1-" + i0 + ",1e95c951-0"
          };
        }),
        b: common_vendor.p({
          bgColor: "#fff"
        }),
        c: common_vendor.o(click),
        d: common_vendor.p({
          col: "2",
          align: "center"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1e95c951"], ["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/pages/expertSystem/Grid/grid.vue"]]);
wx.createComponent(Component);
