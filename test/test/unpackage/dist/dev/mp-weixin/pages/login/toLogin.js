"use strict";
const http_httpRequest = require("../../http/httpRequest.js");
const reg = {
  toLogin: (userName, psw) => {
    console.log("hi");
    const data = http_httpRequest.service({
      url: "/wx/ucenter/login",
      method: "POST",
      data: { userName, psw }
    });
    console.log(data.then((res) => {
      console.log(res);
    }));
  }
};
exports.reg = reg;
