"use strict";
const common_vendor = require("../../common/vendor.js");
const http_httpRequest = require("../../http/httpRequest.js");
const reg = {
  toLogin: async (info) => {
    console.log("hi");
    await http_httpRequest.service({
      url: "/wx/ucenter/login",
      method: "POST",
      data: info
    }).then((response) => {
      console.log(response);
      if (response.data.code == 0) {
        common_vendor.index.navigateTo({
          url: "/pages/index/index"
        });
      } else {
        common_vendor.index.showToast({
          icon: "error",
          duration: 3e3,
          title: "账号或密码错误"
        });
      }
    });
  }
};
exports.reg = reg;
