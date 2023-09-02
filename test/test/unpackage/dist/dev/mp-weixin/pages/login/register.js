"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_login_toRegist = require("./toRegist.js");
require("../../http/httpRequest.js");
require("../../http/auth.js");
require("../../http/env.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "register",
  setup(__props) {
    const info = common_vendor.reactive$1({
      password: "",
      phone: "",
      username: "",
      realName: ""
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(info).username,
        b: common_vendor.o(($event) => common_vendor.unref(info).username = $event.detail.value),
        c: common_vendor.unref(info).password,
        d: common_vendor.o(($event) => common_vendor.unref(info).password = $event.detail.value),
        e: common_vendor.unref(info).phone,
        f: common_vendor.o(($event) => common_vendor.unref(info).phone = $event.detail.value),
        g: common_vendor.unref(info).realName,
        h: common_vendor.o(($event) => common_vendor.unref(info).realName = $event.detail.value),
        i: common_vendor.o(($event) => common_vendor.unref(pages_login_toRegist.reg).toRegist(common_vendor.unref(info))),
        j: common_vendor.o(($event) => common_vendor.unref(pages_login_toRegist.reg).getUserInfo())
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/MyNecessaryFile/fishApplets/FishTank_Applets/test/test/pages/login/register.vue"]]);
wx.createPage(MiniProgramPage);
