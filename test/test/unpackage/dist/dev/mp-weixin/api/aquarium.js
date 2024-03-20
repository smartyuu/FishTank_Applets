"use strict";
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
exports.ApiGetAllFish = ApiGetAllFish;
exports.ApiGetAquariumIdList = ApiGetAquariumIdList;
exports.ApiGetAquariumMess = ApiGetAquariumMess;
