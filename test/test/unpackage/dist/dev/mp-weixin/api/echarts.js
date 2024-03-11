"use strict";
const http_httpRequest = require("../http/httpRequest.js");
async function ApiGetNightingale() {
  return await http_httpRequest.service({
    url: "/web/index/fishProportion/1000011",
    method: "GET"
  }).then((res) => {
    return res.data.data.resList;
  });
}
async function ApiGetPie() {
  return await http_httpRequest.service({
    url: "/web/index/fishProgress/1000011",
    method: "GET"
  }).then((res) => {
    return res.data.data;
  });
}
exports.ApiGetNightingale = ApiGetNightingale;
exports.ApiGetPie = ApiGetPie;
