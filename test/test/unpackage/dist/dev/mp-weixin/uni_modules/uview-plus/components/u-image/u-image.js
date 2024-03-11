"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uviewPlus_components_uImage_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
require("../../libs/config/props.js");
require("../../libs/config/config.js");
require("../../libs/config/props/actionSheet.js");
require("../../libs/config/props/album.js");
require("../../libs/config/props/alert.js");
require("../../libs/config/props/avatar.js");
require("../../libs/config/props/avatarGroup.js");
require("../../libs/config/props/backtop.js");
require("../../libs/config/props/badge.js");
require("../../libs/config/props/button.js");
require("../../libs/config/props/calendar.js");
require("../../libs/config/props/carKeyboard.js");
require("../../libs/config/props/cell.js");
require("../../libs/config/props/cellGroup.js");
require("../../libs/config/props/checkbox.js");
require("../../libs/config/props/checkboxGroup.js");
require("../../libs/config/props/circleProgress.js");
require("../../libs/config/props/code.js");
require("../../libs/config/props/codeInput.js");
require("../../libs/config/props/col.js");
require("../../libs/config/props/collapse.js");
require("../../libs/config/props/collapseItem.js");
require("../../libs/config/props/columnNotice.js");
require("../../libs/config/props/countDown.js");
require("../../libs/config/props/countTo.js");
require("../../libs/config/props/datetimePicker.js");
require("../../libs/config/props/divider.js");
require("../../libs/config/props/empty.js");
require("../../libs/config/props/form.js");
require("../../libs/config/props/formItem.js");
require("../../libs/config/props/gap.js");
require("../../libs/config/props/grid.js");
require("../../libs/config/props/gridItem.js");
require("../../libs/config/props/icon.js");
require("../../libs/config/props/image.js");
require("../../libs/config/props/indexAnchor.js");
require("../../libs/config/props/indexList.js");
require("../../libs/config/props/input.js");
require("../../libs/config/props/keyboard.js");
require("../../libs/config/props/line.js");
require("../../libs/config/props/lineProgress.js");
require("../../libs/config/props/link.js");
require("../../libs/config/props/list.js");
require("../../libs/config/props/listItem.js");
require("../../libs/config/props/loadingIcon.js");
require("../../libs/config/props/loadingPage.js");
require("../../libs/config/props/loadmore.js");
require("../../libs/config/props/modal.js");
require("../../libs/config/props/navbar.js");
require("../../libs/config/color.js");
require("../../libs/config/props/noNetwork.js");
require("../../libs/config/props/noticeBar.js");
require("../../libs/config/props/notify.js");
require("../../libs/config/props/numberBox.js");
require("../../libs/config/props/numberKeyboard.js");
require("../../libs/config/props/overlay.js");
require("../../libs/config/props/parse.js");
require("../../libs/config/props/picker.js");
require("../../libs/config/props/popup.js");
require("../../libs/config/props/radio.js");
require("../../libs/config/props/radioGroup.js");
require("../../libs/config/props/rate.js");
require("../../libs/config/props/readMore.js");
require("../../libs/config/props/row.js");
require("../../libs/config/props/rowNotice.js");
require("../../libs/config/props/scrollList.js");
require("../../libs/config/props/search.js");
require("../../libs/config/props/section.js");
require("../../libs/config/props/skeleton.js");
require("../../libs/config/props/slider.js");
require("../../libs/config/props/statusBar.js");
require("../../libs/config/props/steps.js");
require("../../libs/config/props/stepsItem.js");
require("../../libs/config/props/sticky.js");
require("../../libs/config/props/subsection.js");
require("../../libs/config/props/swipeAction.js");
require("../../libs/config/props/swipeActionItem.js");
require("../../libs/config/props/swiper.js");
require("../../libs/config/props/swipterIndicator.js");
require("../../libs/config/props/switch.js");
require("../../libs/config/props/tabbar.js");
require("../../libs/config/props/tabbarItem.js");
require("../../libs/config/props/tabs.js");
require("../../libs/config/props/tag.js");
require("../../libs/config/props/text.js");
require("../../libs/config/props/textarea.js");
require("../../libs/config/props/toast.js");
require("../../libs/config/props/toolbar.js");
require("../../libs/config/props/tooltip.js");
require("../../libs/config/props/transition.js");
require("../../libs/config/props/upload.js");
const _sfc_main = {
  name: "u-image",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uImage_props.props],
  data() {
    return {
      // 图片是否加载错误，如果是，则显示错误占位图
      isError: false,
      // 初始化组件时，默认为加载中状态
      loading: true,
      // 不透明度，为了实现淡入淡出的效果
      opacity: 1,
      // 过渡时间，因为props的值无法修改，故需要一个中间值
      durationTime: this.duration,
      // 图片加载完成时，去掉背景颜色，因为如果是png图片，就会显示灰色的背景
      backgroundStyle: {},
      // 用于fade模式的控制组件显示与否
      show: false
    };
  },
  watch: {
    src: {
      immediate: true,
      handler(n) {
        if (!n) {
          this.isError = true;
        } else {
          this.isError = false;
          this.loading = true;
        }
      }
    }
  },
  computed: {
    wrapStyle() {
      let style = {};
      style.width = this.$u.addUnit(this.width);
      style.height = this.$u.addUnit(this.height);
      style.borderRadius = this.shape == "circle" ? "10000px" : common_vendor.index.$u.addUnit(this.radius);
      style.overflow = this.radius > 0 ? "hidden" : "visible";
      return common_vendor.index.$u.deepMerge(style, common_vendor.index.$u.addStyle(this.customStyle));
    }
  },
  mounted() {
    this.show = true;
  },
  emits: ["click", "error", "load"],
  methods: {
    // 点击图片
    onClick() {
      this.$emit("click");
    },
    // 图片加载失败
    onErrorHandler(err) {
      this.loading = false;
      this.isError = true;
      this.$emit("error", err);
    },
    // 图片加载完成，标记loading结束
    onLoadHandler(event) {
      this.loading = false;
      this.isError = false;
      this.$emit("load", event);
      this.removeBgColor();
    },
    // 移除图片的背景色
    removeBgColor() {
      this.backgroundStyle = {
        backgroundColor: "transparent"
      };
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_transition2 = common_vendor.resolveComponent("u-transition");
  (_easycom_u_icon2 + _easycom_u_transition2)();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
const _easycom_u_transition = () => "../u-transition/u-transition.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_transition)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.isError
  }, !$data.isError ? {
    b: _ctx.src,
    c: _ctx.mode,
    d: common_vendor.o((...args) => $options.onErrorHandler && $options.onErrorHandler(...args)),
    e: common_vendor.o((...args) => $options.onLoadHandler && $options.onLoadHandler(...args)),
    f: _ctx.showMenuByLongpress,
    g: _ctx.lazyLoad,
    h: _ctx.shape == "circle" ? "10000px" : _ctx.$u.addUnit(_ctx.radius),
    i: _ctx.$u.addUnit(_ctx.width),
    j: _ctx.$u.addUnit(_ctx.height)
  } : {}, {
    k: _ctx.showLoading && $data.loading
  }, _ctx.showLoading && $data.loading ? {
    l: common_vendor.p({
      name: _ctx.loadingIcon,
      width: _ctx.width,
      height: _ctx.height
    }),
    m: _ctx.shape == "circle" ? "50%" : _ctx.$u.addUnit(_ctx.radius),
    n: this.bgColor,
    o: _ctx.$u.addUnit(_ctx.width),
    p: _ctx.$u.addUnit(_ctx.height)
  } : {}, {
    q: _ctx.showError && $data.isError && !$data.loading
  }, _ctx.showError && $data.isError && !$data.loading ? {
    r: common_vendor.p({
      name: _ctx.errorIcon,
      width: _ctx.width,
      height: _ctx.height
    }),
    s: _ctx.shape == "circle" ? "50%" : _ctx.$u.addUnit(_ctx.radius),
    t: _ctx.$u.addUnit(_ctx.width),
    v: _ctx.$u.addUnit(_ctx.height)
  } : {}, {
    w: common_vendor.o((...args) => $options.onClick && $options.onClick(...args)),
    x: common_vendor.s($options.wrapStyle),
    y: common_vendor.s($data.backgroundStyle),
    z: common_vendor.p({
      mode: "fade",
      show: $data.show,
      duration: _ctx.fade ? 1e3 : 0
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-abebd402"], ["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/uni_modules/uview-plus/components/u-image/u-image.vue"]]);
wx.createComponent(Component);
