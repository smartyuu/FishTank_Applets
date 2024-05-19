"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  _easycom_u_image2();
}
const _easycom_u_image = () => "../../../uni_modules/uview-plus/components/u-image/u-image.js";
if (!Math) {
  _easycom_u_image();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "Encyclopaedia",
  setup(__props) {
    const fishList = common_vendor.ref([
      {
        src: "/static/fish1.png",
        name: "马鲛鱼",
        introduce: "马鲛鱼，体形狭长，头及体背部蓝黑色。一般体长为25～50厘米、体重..."
      },
      {
        src: "/static/fish2.png",
        name: "罗非鱼",
        introduce: "罗非鱼——原产非洲，属热带性鱼类，罗非鱼属包括亚种共有100多种..."
      },
      {
        src: "/static/fish3.png",
        name: "黄鳝",
        introduce: "黄鳝：又名鳝鱼。体细长呈蛇形，体长约20-70厘米，最长可达1米..."
      },
      {
        src: "/static/fish4.png",
        name: "鲫鱼",
        introduce: "鲫是鲤科、鲫属鱼类，体长46.9-255毫米。体长椭圆形，侧扁..."
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          src: "/static/encyclopaedia.png",
          mode: "aspectFit",
          width: "100%",
          height: "300"
        }),
        b: common_vendor.f(fishList.value, (item, index, i0) => {
          return {
            a: "9e93152e-1-" + i0,
            b: common_vendor.p({
              ["show-loading"]: true,
              src: item.src,
              width: "120px",
              height: "100px"
            }),
            c: common_vendor.t(item.name),
            d: common_vendor.t(item.introduce),
            e: index
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9e93152e"], ["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/pages/expertSystem/Encyclopaedia/Encyclopaedia.vue"]]);
wx.createPage(MiniProgramPage);
