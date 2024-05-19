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
    const doctorList = common_vendor.ref([
      {
        src: "/static/doctor1.png",
        name: "姓名：谭青宋",
        seniority: "资历：华中农业大学水产学院副教授，硕士生导师",
        skill: "擅长领域：传染性鱼病",
        time: "工作时间：09:00:00-17:00:00"
      },
      {
        src: "/static/doctor2.png",
        name: "姓名：陈家长",
        seniority: "资历：南京农业大学硕士生导师",
        skill: "擅长领域：病毒性鱼病",
        time: "工作时间：08:00:00-16:00:00"
      },
      {
        src: "/static/doctor3.png",
        name: "姓名：相建海",
        seniority: "资历：中国海洋大学、南京大学等兼职教授",
        skill: "擅长领域：传染性鱼病",
        time: "工作时间：10:00:00-18:00:00"
      }
    ]);
    const customStyle = common_vendor.reactive({
      float: "right",
      width: "70px",
      height: "30px",
      marginRight: "10px"
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(doctorList.value, (item, index, i0) => {
          return {
            a: "f5924a2b-0-" + i0,
            b: common_vendor.p({
              ["show-loading"]: true,
              src: item.src,
              width: "100px",
              height: "120px"
            }),
            c: common_vendor.t(item.name),
            d: common_vendor.t(item.seniority),
            e: common_vendor.t(item.skill),
            f: common_vendor.t(item.time),
            g: "f5924a2b-1-" + i0,
            h: index
          };
        }),
        b: common_vendor.p({
          type: "primary",
          customStyle
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f5924a2b"], ["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/pages/expertSystem/SelfDiagnosis/SelfDiagnosis.vue"]]);
wx.createPage(MiniProgramPage);
