"use strict";
const common_vendor = require("../common/vendor.js");
const http_auth = require("./auth.js");
const http_env = require("./env.js");
function service(options) {
  options.url = `${http_env.env.baseUrl}${options.url}`;
  if (http_auth.getToken()) {
    options.header = {
      "content-type": "application/json",
      /*
      'Authorization': `${getToken()}`
      每次用户访问需要登录权限的接口时，
      前端会将这个 token 添加到 HTTP 请求头中，
      后端会验证这个 token 的有效性，如果有效则返回请求的数据，
      否则返回错误信息
      */
      "Authorization": `${http_auth.getToken()}`
      // 这里是token(可自行修改)
    };
  }
  return new Promise((resolved, rejected) => {
    options.complete = (res) => {
      if (res.statusCode !== 200) {
        common_vendor.index.showToast({
          icon: "none",
          duration: 3e3,
          title: `${res.data.msg}`
        });
        if (res.data.code === 403) {
          http_auth.removeToken();
          common_vendor.index.reLaunch({
            url: "/pages/login/login"
          });
        }
        rejected(res);
      } else {
        resolved(res.data.data);
      }
    };
    options.complete = (err) => {
      common_vendor.index.showToast({
        icon: "none",
        duration: 3e3,
        title: "服务器错误,请稍后再试"
      });
      rejected(err);
    };
    common_vendor.index.request(options);
  });
}
exports.service = service;
