"use strict";
const common_vendor = require("../common/vendor.js");
const http_httpRequest = require("../http/httpRequest.js");
async function ApiGetAquariumIdList(username) {
  const { data: res } = await http_httpRequest.service({
    url: `/wx/aquarium/aquariumIdList/${username}`,
    method: "GET"
  });
  return res.data.userAquariumList;
}
async function ApiGetAquariumMess(id) {
  const { data: res } = await http_httpRequest.service({
    url: `/wx/aquarium/aquariumMess/${id}`,
    method: "GET"
  });
  return res.data.aquariumMess;
}
async function ApiGetAllFish(id) {
  const { data: res } = await http_httpRequest.service({
    url: `/wx/aquarium/getAllFish/${id}`,
    method: "GET"
  });
  return res.data.fishList;
}
async function ApiDeleteFish(aquariumId, fishId) {
  const { data: res } = await http_httpRequest.service({
    url: `/wx/aquarium/deleteFish/${aquariumId}/${fishId}`,
    method: "GET"
  });
  if (res.code == 0) {
    common_vendor.index.showToast({
      icon: "success",
      duration: 3e3,
      title: "删除成功"
    });
  } else {
    common_vendor.index.showToast({
      icon: "error",
      duration: 3e3,
      title: "删除失败"
    });
  }
}
exports.ApiDeleteFish = ApiDeleteFish;
exports.ApiGetAllFish = ApiGetAllFish;
exports.ApiGetAquariumIdList = ApiGetAquariumIdList;
exports.ApiGetAquariumMess = ApiGetAquariumMess;
