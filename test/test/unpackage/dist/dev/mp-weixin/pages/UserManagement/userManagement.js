"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  const _easycom_uni_th2 = common_vendor.resolveComponent("uni-th");
  const _easycom_uni_tr2 = common_vendor.resolveComponent("uni-tr");
  const _easycom_uni_td2 = common_vendor.resolveComponent("uni-td");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_uni_table2 = common_vendor.resolveComponent("uni-table");
  const _easycom_u_action_sheet2 = common_vendor.resolveComponent("u-action-sheet");
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_form2 = common_vendor.resolveComponent("u-form");
  const _easycom_u_modal2 = common_vendor.resolveComponent("u-modal");
  (_easycom_u_image2 + _easycom_uni_th2 + _easycom_uni_tr2 + _easycom_uni_td2 + _easycom_u_icon2 + _easycom_uni_table2 + _easycom_u_action_sheet2 + _easycom_u_input2 + _easycom_u_form_item2 + _easycom_u_form2 + _easycom_u_modal2)();
}
const _easycom_u_image = () => "../../uni_modules/uview-plus/components/u-image/u-image.js";
const _easycom_uni_th = () => "../../uni_modules/uni-table/components/uni-th/uni-th.js";
const _easycom_uni_tr = () => "../../uni_modules/uni-table/components/uni-tr/uni-tr.js";
const _easycom_uni_td = () => "../../uni_modules/uni-table/components/uni-td/uni-td.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_uni_table = () => "../../uni_modules/uni-table/components/uni-table/uni-table.js";
const _easycom_u_action_sheet = () => "../../uni_modules/uview-plus/components/u-action-sheet/u-action-sheet.js";
const _easycom_u_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../uni_modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_u_form = () => "../../uni_modules/uview-plus/components/u-form/u-form.js";
const _easycom_u_modal = () => "../../uni_modules/uview-plus/components/u-modal/u-modal.js";
if (!Math) {
  (_easycom_u_image + _easycom_uni_th + _easycom_uni_tr + _easycom_uni_td + _easycom_u_icon + _easycom_uni_table + _easycom_u_action_sheet + _easycom_u_input + _easycom_u_form_item + _easycom_u_form + _easycom_u_modal)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "userManagement",
  setup(__props) {
    const userList = common_vendor.ref([
      {
        userName: "123456",
        name: "小陈",
        power: "管理员",
        time: "2022-03-25"
      },
      {
        userName: "188137",
        name: "小王",
        power: "普通用户",
        time: "2022-03-25"
      },
      {
        userName: "123456",
        name: "小李",
        power: "普通用户",
        time: "2022-03-25"
      },
      {
        userName: "123456",
        name: "小林",
        power: "普通用户",
        time: "2022-03-25"
      }
    ]);
    const userInfo = common_vendor.ref({ userName: "123456", name: "小陈", power: "管理员" });
    const list = common_vendor.ref([
      {
        name: "删除用户"
      },
      {
        name: "修改用户"
      }
    ]);
    const show = common_vendor.ref(false);
    const fixShow = common_vendor.ref(false);
    const setUserList = (index) => {
      show.value = true;
      userInfo.value = userList.value[index];
    };
    const close = () => {
      show.value = false;
    };
    const selectClick = ({ name }) => {
      if (name == "修改用户") {
        fixShow.value = true;
      } else {
        common_vendor.index.showToast({
          title: "操作成功"
        });
      }
    };
    const fixConfirm = () => {
      common_vendor.index.showToast({
        title: "操作成功"
      });
      fixShow.value = false;
    };
    const fixCancel = () => {
      fixShow.value = false;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          src: "/static/userManagement.png",
          mode: "aspectFit",
          width: "100%",
          height: "300"
        }),
        b: common_vendor.p({
          align: "left",
          width: "40"
        }),
        c: common_vendor.p({
          align: "left",
          width: "40"
        }),
        d: common_vendor.p({
          align: "left",
          width: "40"
        }),
        e: common_vendor.p({
          align: "left",
          width: "80"
        }),
        f: common_vendor.p({
          align: "left",
          width: "40"
        }),
        g: common_vendor.f(userList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.userName),
            b: "ab0da073-9-" + i0 + "," + ("ab0da073-8-" + i0),
            c: common_vendor.t(item.name),
            d: "ab0da073-10-" + i0 + "," + ("ab0da073-8-" + i0),
            e: common_vendor.t(item.power),
            f: "ab0da073-11-" + i0 + "," + ("ab0da073-8-" + i0),
            g: common_vendor.t(item.time),
            h: "ab0da073-12-" + i0 + "," + ("ab0da073-8-" + i0),
            i: common_vendor.o(($event) => setUserList(index), index),
            j: "ab0da073-14-" + i0 + "," + ("ab0da073-13-" + i0),
            k: "ab0da073-13-" + i0 + "," + ("ab0da073-8-" + i0),
            l: index,
            m: "ab0da073-8-" + i0 + ",ab0da073-1"
          };
        }),
        h: common_vendor.p({
          name: "setting",
          size: "20"
        }),
        i: common_vendor.p({
          stripe: true,
          emptyText: "暂无更多数据"
        }),
        j: common_vendor.o(close),
        k: common_vendor.o(selectClick),
        l: common_vendor.p({
          title: "请选择操作",
          actions: list.value,
          show: show.value,
          cancelText: "取消",
          closeOnClickOverlay: true
        }),
        m: common_vendor.o(($event) => userInfo.value.userName = $event),
        n: common_vendor.p({
          modelValue: userInfo.value.userName
        }),
        o: common_vendor.p({
          label: "用户名",
          prop: "userInfo.userName"
        }),
        p: common_vendor.o(($event) => userInfo.value.name = $event),
        q: common_vendor.p({
          modelValue: userInfo.value.name
        }),
        r: common_vendor.p({
          label: "姓名",
          prop: "userInfo.name"
        }),
        s: common_vendor.o(($event) => userInfo.value.power = $event),
        t: common_vendor.p({
          modelValue: userInfo.value.power
        }),
        v: common_vendor.p({
          label: "权限",
          prop: "userInfo.power"
        }),
        w: common_vendor.o(fixConfirm),
        x: common_vendor.o(fixCancel),
        y: common_vendor.p({
          show: fixShow.value,
          title: "修改用户信息",
          showCancelButton: true
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ab0da073"], ["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/pages/UserManagement/userManagement.vue"]]);
wx.createPage(MiniProgramPage);
