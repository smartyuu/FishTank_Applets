"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_login_toRegist = require("./toRegist.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(pages_login_toRegist.reg).toRegist && common_vendor.unref(pages_login_toRegist.reg).toRegist(...args)
        )
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/MyNecessaryFile/fishApplets/FishTank_Applets/test/test/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
