"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_login_toRegist = require("./toRegist.js");
const pages_login_toLogin = require("./toLogin.js");
require("../../http/httpRequest.js");
require("../../http/auth.js");
require("../../http/env.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const psw = common_vendor.ref("");
    const userName = common_vendor.ref("");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(userName),
        b: common_vendor.o(($event) => common_vendor.isRef(userName) ? userName.value = $event.detail.value : null),
        c: common_vendor.unref(psw),
        d: common_vendor.o(($event) => common_vendor.isRef(psw) ? psw.value = $event.detail.value : null),
        e: common_vendor.o(($event) => common_vendor.unref(pages_login_toLogin.reg).toLogin(common_vendor.unref(userName).value, common_vendor.unref(psw).value)),
        f: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(pages_login_toRegist.reg).toRegist && common_vendor.unref(pages_login_toRegist.reg).toRegist(...args)
        )
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/MyNecessaryFile/fishApplets/FishTank_Applets/test/test/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
