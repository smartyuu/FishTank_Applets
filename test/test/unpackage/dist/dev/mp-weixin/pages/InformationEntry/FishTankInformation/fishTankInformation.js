"use strict";
const common_vendor = require("../../../common/vendor.js");
const store_index = require("../../../store/index.js");
const api_aquarium = require("../../../api/aquarium.js");
require("../../../http/httpRequest.js");
require("../../../http/auth.js");
require("../../../http/env.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_uni_th2 = common_vendor.resolveComponent("uni-th");
  const _easycom_uni_tr2 = common_vendor.resolveComponent("uni-tr");
  const _easycom_uni_td2 = common_vendor.resolveComponent("uni-td");
  const _easycom_uni_table2 = common_vendor.resolveComponent("uni-table");
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_action_sheet2 = common_vendor.resolveComponent("u-action-sheet");
  (_easycom_u_button2 + _easycom_uni_th2 + _easycom_uni_tr2 + _easycom_uni_td2 + _easycom_uni_table2 + _easycom_u_input2 + _easycom_u_action_sheet2)();
}
const _easycom_u_button = () => "../../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_uni_th = () => "../../../uni_modules/uni-table/components/uni-th/uni-th.js";
const _easycom_uni_tr = () => "../../../uni_modules/uni-table/components/uni-tr/uni-tr.js";
const _easycom_uni_td = () => "../../../uni_modules/uni-table/components/uni-td/uni-td.js";
const _easycom_uni_table = () => "../../../uni_modules/uni-table/components/uni-table/uni-table.js";
const _easycom_u_input = () => "../../../uni_modules/uview-plus/components/u-input/u-input.js";
const _easycom_u_action_sheet = () => "../../../uni_modules/uview-plus/components/u-action-sheet/u-action-sheet.js";
if (!Math) {
  (_easycom_u_button + _easycom_uni_th + _easycom_uni_tr + _easycom_uni_td + _easycom_uni_table + _easycom_u_input + _easycom_u_action_sheet)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "fishTankInformation",
  setup(__props) {
    const myStore = store_index.useMyStore();
    const fishTankList = common_vendor.ref([]);
    const show = common_vendor.ref(false);
    const customStyle = common_vendor.reactive({
      width: "100rpx",
      height: "50rpx",
      border: "none",
      position: "relative",
      top: "35px",
      left: "150px",
      zIndex: "1"
    });
    const updateFishTank = () => {
      show.value = true;
    };
    const getAquariumMess = () => {
      for (let item of myStore.aquarium) {
        api_aquarium.ApiGetAquariumMess(item).then((res) => {
          fishTankList.value.push(res);
        });
      }
    };
    const close = () => {
      show.value = false;
    };
    common_vendor.onMounted(() => {
      getAquariumMess();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(updateFishTank),
        b: common_vendor.p({
          hairline: false,
          type: "primary",
          plain: true,
          text: "+操作",
          customStyle
        }),
        c: common_vendor.p({
          align: "left",
          width: "40"
        }),
        d: common_vendor.p({
          align: "left",
          width: "50"
        }),
        e: common_vendor.p({
          align: "left",
          width: "80"
        }),
        f: common_vendor.p({
          align: "left",
          width: "80"
        }),
        g: common_vendor.f(fishTankList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(common_vendor.unref(myStore).aquarium[index]),
            b: "b4337e61-8-" + i0 + "," + ("b4337e61-7-" + i0),
            c: common_vendor.t(item.fishNum),
            d: "b4337e61-9-" + i0 + "," + ("b4337e61-7-" + i0),
            e: common_vendor.t(item.maxNum),
            f: "b4337e61-10-" + i0 + "," + ("b4337e61-7-" + i0),
            g: common_vendor.t(item.phone),
            h: "b4337e61-11-" + i0 + "," + ("b4337e61-7-" + i0),
            i: index,
            j: "b4337e61-7-" + i0 + ",b4337e61-1"
          };
        }),
        h: common_vendor.p({
          stripe: true,
          emptyText: "暂无更多数据"
        }),
        i: common_vendor.p({
          placeholder: "请输入要修改的数值"
        }),
        j: common_vendor.o(close),
        k: common_vendor.p({
          type: "primary",
          plain: true
        }),
        l: common_vendor.o(close),
        m: common_vendor.p({
          title: "修改鱼缸最大容量",
          show: show.value,
          closeOnClickOverlay: true,
          cancelText: "取消"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b4337e61"], ["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/pages/InformationEntry/FishTankInformation/fishTankInformation.vue"]]);
wx.createComponent(Component);
