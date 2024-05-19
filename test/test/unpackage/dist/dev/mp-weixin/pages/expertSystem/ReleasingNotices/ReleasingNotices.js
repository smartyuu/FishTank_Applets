"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  const _easycom_u_picker2 = common_vendor.resolveComponent("u-picker");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u__textarea2 = common_vendor.resolveComponent("u--textarea");
  (_easycom_u_image2 + _easycom_u_picker2 + _easycom_u_button2 + _easycom_u_input2 + _easycom_u__textarea2)();
}
const _easycom_u_image = () => "../../../uni_modules/uview-plus/components/u-image/u-image.js";
const _easycom_u_picker = () => "../../../uni_modules/uview-plus/components/u-picker/u-picker.js";
const _easycom_u_button = () => "../../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_input = () => "../../../uni_modules/uview-plus/components/u-input/u-input.js";
const _easycom_u__textarea = () => "../../../uni_modules/uview-plus/components/u--textarea/u--textarea.js";
if (!Math) {
  (_easycom_u_image + _easycom_u_picker + _easycom_u_button + _easycom_u_input + _easycom_u__textarea)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "ReleasingNotices",
  setup(__props) {
    const show = common_vendor.ref(false);
    const pick = common_vendor.ref("选择");
    const columns = common_vendor.ref([
      ["普通通知", "重要通知"]
    ]);
    const userID = common_vendor.ref("");
    const title = common_vendor.ref("");
    const content = common_vendor.ref("");
    const pickConfirm = (index) => {
      show.value = false;
      pick.value = index.value[0];
    };
    const pickCancel = () => {
      show.value = false;
    };
    const release = () => {
      common_vendor.index.showToast({
        title: "发布成功"
      });
    };
    const empty = () => {
      content.value = "";
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          src: "/static/notice.png",
          mode: "aspectFit",
          width: "100%",
          height: "300"
        }),
        b: common_vendor.o(pickConfirm),
        c: common_vendor.o(pickCancel),
        d: common_vendor.p({
          show: show.value,
          columns: columns.value
        }),
        e: common_vendor.t(pick.value),
        f: common_vendor.o(($event) => show.value = true),
        g: common_vendor.o(($event) => userID.value = $event),
        h: common_vendor.p({
          placeholder: "请输入通知用户的ID",
          border: "bottom",
          modelValue: userID.value
        }),
        i: common_vendor.o(($event) => title.value = $event),
        j: common_vendor.p({
          placeholder: "请输入通知标题",
          border: "bottom",
          modelValue: title.value
        }),
        k: common_vendor.o(($event) => content.value = $event),
        l: common_vendor.p({
          placeholder: "请输入内容",
          count: true,
          height: "200",
          modelValue: content.value
        }),
        m: common_vendor.o(release),
        n: common_vendor.p({
          type: "primary",
          shape: "circle"
        }),
        o: common_vendor.o(empty),
        p: common_vendor.p({
          type: "info",
          shape: "circle"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a0cc30e5"], ["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/pages/expertSystem/ReleasingNotices/ReleasingNotices.vue"]]);
wx.createPage(MiniProgramPage);
