"use strict";
const common_vendor = require("../../common/vendor.js");
const http_httpRequest = require("../../http/httpRequest.js");
const store_index = require("../../store/index.js");
const api_aquarium = require("../../api/aquarium.js");
const store = store_index.useMyStore();
const aquariumIdList = common_vendor.ref([]);
const getAquariumIdList = (username) => {
  api_aquarium.ApiGetAquariumIdList(username).then((res) => {
    aquariumIdList.value = res;
  });
};
const reg = {
  toLogin: async (info) => {
    await http_httpRequest.service({
      url: "/wx/ucenter/login",
      method: "POST",
      data: info
    }).then((response) => {
      if (response.data.code == 0) {
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
        store.setUsername(info.username);
        getAquariumIdList(info.username);
        store.setAquarium(aquariumIdList);
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
