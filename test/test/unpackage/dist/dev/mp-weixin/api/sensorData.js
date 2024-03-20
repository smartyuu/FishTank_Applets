"use strict";
const common_vendor = require("../common/vendor.js");
const http_httpRequest = require("../http/httpRequest.js");
const store_index = require("../store/index.js");
const store = store_index.useMyStore();
const getTem = async (time) => {
  try {
    const { data: res } = await http_httpRequest.service({
      url: `/wx/sensor-data/getTem/${store.aquarium}/${time}`,
      // url: `/wx/sensor-data/getTem/1000011/1651017600000`,
      method: "GET"
    });
    if (res.code === 0) {
      const temList = res.data.temList;
      return temList;
    } else {
      common_vendor.index.showToast({
        title: "获取数据失败",
        icon: "error"
      });
      return res.message;
    }
  } catch ({ data }) {
    common_vendor.index.showToast({
      title: "获取数据失败",
      icon: "error"
    });
    console.log(data.message);
    return data.message;
  }
};
const getph = async (time) => {
  try {
    const { data: res } = await http_httpRequest.service({
      url: `/wx/sensor-data/getph/${store.aquarium}/${time}`,
      // url: `/wx/sensor-data/getph/1000011/1651017600000`,
      method: "GET"
    });
    if (res.code === 0) {
      const phList = res.data.phList;
      return phList;
    } else {
      common_vendor.index.showToast({
        title: "获取数据失败",
        icon: "error"
      });
      return res.message;
    }
  } catch ({ data }) {
    common_vendor.index.showToast({
      title: "获取数据失败",
      icon: "error"
    });
    console.log(data.message);
    return data.message;
  }
};
const getHunZhuo = async (time) => {
  try {
    const { data: res } = await http_httpRequest.service({
      url: `/wx/sensor-data/getHunZhuo/${store.aquarium}/${time}`,
      // url: `/wx/sensor-data/getHunZhuo/1000011/1651017600000`,
      method: "GET"
    });
    if (res.code === 0) {
      const hunZhuoList = res.data.hunZhuoList;
      return hunZhuoList;
    } else {
      common_vendor.index.showToast({
        title: "获取数据失败",
        icon: "error"
      });
      return res.message;
    }
  } catch ({ data }) {
    common_vendor.index.showToast({
      title: "获取数据失败",
      icon: "error"
    });
    console.log(data.message);
    return data.message;
  }
};
const getDianDao = async (time) => {
  try {
    const { data: res } = await http_httpRequest.service({
      url: `/wx/sensor-data/getDianDao/${store.aquarium}/${time}`,
      // url: `/wx/sensor-data/getDianDao/1000011/1651017600000`,
      method: "GET"
    });
    if (res.code === 0) {
      const dianDaoList = res.data.dianDaoList;
      return dianDaoList;
    } else {
      common_vendor.index.showToast({
        title: "获取数据失败",
        icon: "error"
      });
      return res.message;
    }
  } catch ({ data }) {
    common_vendor.index.showToast({
      title: "获取数据失败",
      icon: "error"
    });
    console.log(data.message);
    return data.message;
  }
};
exports.getDianDao = getDianDao;
exports.getHunZhuo = getHunZhuo;
exports.getTem = getTem;
exports.getph = getph;
