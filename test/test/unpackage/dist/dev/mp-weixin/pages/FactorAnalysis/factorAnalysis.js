"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_calendar2 = common_vendor.resolveComponent("u-calendar");
  const _easycom_u_picker2 = common_vendor.resolveComponent("u-picker");
  (_easycom_u_image2 + _easycom_u_button2 + _easycom_u_calendar2 + _easycom_u_picker2)();
}
const _easycom_u_image = () => "../../uni_modules/uview-plus/components/u-image/u-image.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_calendar = () => "../../uni_modules/uview-plus/components/u-calendar/u-calendar.js";
const _easycom_u_picker = () => "../../uni_modules/uview-plus/components/u-picker/u-picker.js";
if (!Math) {
  (_easycom_u_image + _easycom_u_button + _easycom_u_calendar + _easycom_u_picker)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "factorAnalysis",
  setup(__props) {
    const calendarShow = common_vendor.ref(false);
    const pickerShow = common_vendor.ref(false);
    const analysisType = common_vendor.ref("温度");
    const d = /* @__PURE__ */ new Date();
    const year = d.getFullYear();
    let month = d.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    const day = d.getDate();
    const maxDate = `${year}-${month}-${day + 14}`;
    const data = common_vendor.ref(year + "-" + month + "-" + day);
    const calendarConfirm = (e) => {
      console.log(e[0]);
      data.value = e[0];
      calendarShow.value = false;
    };
    const columns = common_vendor.reactive([
      ["温度", "PH", "电导率", "浑浊度"]
    ]);
    const pickerConfirm = (e) => {
      console.log(e.value[0]);
      analysisType.value = e.value[0];
      pickerShow.value = false;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          src: "/static/factorAnalysis.png",
          mode: "aspectFit",
          width: "100%",
          height: "300"
        }),
        b: common_vendor.o(($event) => calendarShow.value = true),
        c: common_vendor.p({
          text: data.value,
          shape: "circle",
          plain: true,
          type: "primary",
          icon: "calendar"
        }),
        d: common_vendor.o(($event) => pickerShow.value = true),
        e: common_vendor.p({
          text: analysisType.value,
          shape: "circle",
          plain: true,
          type: "primary",
          icon: "grid"
        }),
        f: common_vendor.o(calendarConfirm),
        g: common_vendor.p({
          show: calendarShow.value,
          mode: "single",
          title: "请选择分析的日期",
          maxDate
        }),
        h: common_vendor.o(pickerConfirm),
        i: common_vendor.p({
          show: pickerShow.value,
          columns
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c28778dd"], ["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/pages/FactorAnalysis/factorAnalysis.vue"]]);
wx.createPage(MiniProgramPage);
