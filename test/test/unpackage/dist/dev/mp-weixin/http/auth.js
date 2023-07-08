"use strict";
const common_vendor = require("../common/vendor.js");
const TokenKey = "token";
function getToken() {
  return common_vendor.index.getStorageSync(TokenKey);
}
function removeToken() {
  return common_vendor.index.removeStorageSync(TokenKey);
}
exports.getToken = getToken;
exports.removeToken = removeToken;
