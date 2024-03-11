"use strict";
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-calendar-header",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin],
  props: {
    // 标题
    title: {
      type: String,
      default: ""
    },
    // 副标题
    subtitle: {
      type: String,
      default: ""
    },
    // 是否显示标题
    showTitle: {
      type: Boolean,
      default: true
    },
    // 是否显示副标题
    showSubtitle: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  methods: {
    name() {
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.showTitle
  }, $props.showTitle ? {
    b: common_vendor.t($props.title)
  } : {}, {
    c: $props.showSubtitle
  }, $props.showSubtitle ? {
    d: common_vendor.t($props.subtitle)
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7f0f7602"], ["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/uni_modules/uview-plus/components/u-calendar/header.vue"]]);
wx.createComponent(Component);
