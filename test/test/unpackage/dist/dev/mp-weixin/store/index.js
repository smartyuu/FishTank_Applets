"use strict";
const common_vendor = require("../common/vendor.js");
const useMyStore = common_vendor.defineStore("myStore", {
  state: () => ({
    count: 0,
    collapse: false,
    token: "",
    username: "",
    password: "",
    aquarium: "",
    avater: ""
  }),
  actions: {
    test() {
      console.log("123456");
    },
    setCount(count) {
      this.count = count;
    },
    setCollapse(collapse) {
      this.collapse = collapse;
    },
    setToken(token) {
      this.token = token;
    },
    setUsername(username) {
      this.username = username;
    },
    setPassword(password) {
      this.password = password;
    },
    setAquarium(aquarium) {
      this.aquarium = aquarium;
    },
    setAvater(avater) {
      this.avater = avater;
    },
    saveAllData() {
      console.log("所有数据已存储到本地存储中");
    }
  },
  getters: {
    getCount() {
      return this.count;
    },
    getCollapse() {
      return this.collapse;
    },
    getToken() {
      return this.token;
    },
    getUsername() {
      return this.username;
    },
    getPassword() {
      return this.password;
    },
    getAquarium() {
      return this.aquarium;
    },
    getAvater() {
      return this.avater;
    }
  }
});
exports.useMyStore = useMyStore;
