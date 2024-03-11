"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_login_toLogin = require("./toLogin.js");
require("../../http/httpRequest.js");
require("../../http/auth.js");
require("../../http/env.js");
require("../../store/index.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const info = common_vendor.reactive({
      username: "",
      password: ""
    });
    const turnToRegister = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/register"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(info).username,
        b: common_vendor.o(($event) => common_vendor.unref(info).username = $event.detail.value),
        c: common_vendor.unref(info).password,
        d: common_vendor.o(($event) => common_vendor.unref(info).password = $event.detail.value),
        e: common_vendor.o(($event) => common_vendor.unref(pages_login_toLogin.reg).toLogin(common_vendor.unref(info))),
        f: common_vendor.o(($event) => turnToRegister())
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
