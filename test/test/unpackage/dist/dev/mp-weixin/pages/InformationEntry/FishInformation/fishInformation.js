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
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _component_nui_td = common_vendor.resolveComponent("nui-td");
  const _easycom_uni_table2 = common_vendor.resolveComponent("uni-table");
  const _easycom_u_modal2 = common_vendor.resolveComponent("u-modal");
  (_easycom_u_button2 + _easycom_uni_th2 + _easycom_uni_tr2 + _easycom_uni_td2 + _easycom_u_icon2 + _component_nui_td + _easycom_uni_table2 + _easycom_u_modal2)();
}
const _easycom_u_button = () => "../../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_uni_th = () => "../../../uni_modules/uni-table/components/uni-th/uni-th.js";
const _easycom_uni_tr = () => "../../../uni_modules/uni-table/components/uni-tr/uni-tr.js";
const _easycom_uni_td = () => "../../../uni_modules/uni-table/components/uni-td/uni-td.js";
const _easycom_u_icon = () => "../../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_uni_table = () => "../../../uni_modules/uni-table/components/uni-table/uni-table.js";
const _easycom_u_modal = () => "../../../uni_modules/uview-plus/components/u-modal/u-modal.js";
if (!Math) {
  (_easycom_u_button + _easycom_uni_th + _easycom_uni_tr + _easycom_uni_td + _easycom_u_icon + _easycom_uni_table + _easycom_u_modal)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "fishInformation",
  setup(__props) {
    const myStore = store_index.useMyStore();
    const fishList = common_vendor.ref([]);
    const show = common_vendor.ref(false);
    const content = common_vendor.ref("是否删除该数据");
    const aquariumId = common_vendor.ref();
    const fishId = common_vendor.ref("");
    const customStyle = common_vendor.reactive({
      width: "100rpx",
      height: "50rpx",
      border: "none",
      position: "relative",
      top: "35px",
      left: "145px",
      zIndex: "1"
    });
    const updateFish = () => {
      console.log("点击鱼类信息操作");
    };
    const getAllFish = () => {
      api_aquarium.ApiGetAllFish(myStore.aquarium[0]).then((res) => {
        fishList.value = res;
      });
    };
    const deleteFish = (pid, id) => {
      api_aquarium.ApiDeleteFish(pid, id);
    };
    const setFishList = (pid, id) => {
      show.value = true;
      aquariumId.value = pid;
      fishId.value = id;
    };
    const close = () => {
      show.value = false;
    };
    const confirm = () => {
      show.value = false;
      deleteFish(aquariumId.value, fishId.value);
      getAllFish();
    };
    const cancel = () => {
      show.value = false;
    };
    common_vendor.onMounted(() => {
      getAllFish();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(updateFish),
        b: common_vendor.p({
          hairline: false,
          type: "primary",
          plain: true,
          text: "+操作",
          customStyle
        }),
        c: common_vendor.p({
          align: "left",
          width: "50"
        }),
        d: common_vendor.p({
          align: "left",
          width: "50"
        }),
        e: common_vendor.p({
          align: "left",
          width: "40"
        }),
        f: common_vendor.p({
          align: "left",
          width: "40"
        }),
        g: common_vendor.p({
          align: "left",
          width: "50"
        }),
        h: common_vendor.f(fishList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.pid),
            b: "63335436-9-" + i0 + "," + ("63335436-8-" + i0),
            c: common_vendor.t(item.type),
            d: "63335436-10-" + i0 + "," + ("63335436-8-" + i0),
            e: common_vendor.t(item.name),
            f: "63335436-11-" + i0 + "," + ("63335436-8-" + i0),
            g: common_vendor.t(item.inAge),
            h: "63335436-12-" + i0 + "," + ("63335436-8-" + i0),
            i: common_vendor.o(($event) => setFishList(item.pid, item.id), index),
            j: "63335436-14-" + i0 + "," + ("63335436-13-" + i0),
            k: "63335436-13-" + i0 + "," + ("63335436-8-" + i0),
            l: index,
            m: "63335436-8-" + i0 + ",63335436-1"
          };
        }),
        i: common_vendor.p({
          name: "trash",
          size: "20"
        }),
        j: common_vendor.p({
          stripe: true,
          emptyText: "暂无更多数据"
        }),
        k: common_vendor.o(close),
        l: common_vendor.o(confirm),
        m: common_vendor.o(cancel),
        n: common_vendor.p({
          show: show.value,
          content: content.value,
          showCancelButton: true,
          confirmColor: "red",
          closeOnClickOverlay: true
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-63335436"], ["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/pages/InformationEntry/FishInformation/fishInformation.vue"]]);
wx.createComponent(Component);
