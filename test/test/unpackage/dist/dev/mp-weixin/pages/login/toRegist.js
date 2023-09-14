"use strict";
const common_vendor = require("../../common/vendor.js");
const http_httpRequest = require("../../http/httpRequest.js");
const reg = {
  toRegist: async (info) => {
    console.log("hi");
    await http_httpRequest.service({
      url: "/wx/ucenter/register",
      method: "POST",
      data: info
    }).then((res) => {
      if (res.data.code !== 0) {
        common_vendor.index.showToast({
          icon: "error",
          duration: 3e3,
          title: `${res.data.message}`
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      }
    });
  },
  // 登录按钮点击事件
  // 页面中获取用户信息的方法
  getUserInfo: () => {
    if (!common_vendor.wx$1.getStorageSync("userInfo")) {
      common_vendor.wx$1.authorize({
        scope: "scope.userInfo",
        success() {
          common_vendor.wx$1.getUserProfile({
            desc: "用于完善会员资料",
            success: (res) => {
              const userInfo = res.userInfo;
              console.log(userInfo);
            },
            fail: () => {
              console.log("获取用户信息失败");
            }
          });
        },
        fail() {
          console.log("用户未授权");
        }
      });
    } else {
      common_vendor.wx$1.getUserProfile({
        desc: "用于完善会员资料",
        success: (res) => {
          const userInfo = res.userInfo;
          console.log(userInfo);
        },
        fail: () => {
          console.log("获取用户信息失败");
        }
      });
    }
  }
};
exports.reg = reg;
