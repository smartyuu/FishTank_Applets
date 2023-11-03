"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uviewPlus_components_uGridItem_props = require("./props.js");
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
  name: "u-grid-item",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uGridItem_props.props],
  data() {
    return {
      parentData: {
        col: 3,
        // 父组件划分的宫格数
        border: true
        // 是否显示边框，根据父组件决定
      },
      classes: []
      // 类名集合，用于判断是否显示右边和下边框
    };
  },
  mounted() {
    this.init();
  },
  emits: ["click"],
  //  微信小程序中 options 选项
  options: {
    virtualHost: true
    //将自定义节点设置成虚拟的，更加接近Vue组件的表现。我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等
  },
  computed: {
    // vue下放到computed中，否则会因为延时造成闪烁
    width() {
      return 100 / Number(this.parentData.col) + "%";
    },
    itemStyle() {
      const style = {
        background: this.bgColor,
        width: this.width
      };
      return common_vendor.index.$u.deepMerge(style, common_vendor.index.$u.addStyle(this.customStyle));
    }
  },
  methods: {
    init() {
      common_vendor.index.$on("$uGridItem", () => {
        this.gridItemClasses();
      });
      this.updateParentData();
      common_vendor.index.$emit("$uGridItem");
      this.gridItemClasses();
    },
    // 获取父组件的参数
    updateParentData() {
      this.getParentData("u-grid");
    },
    clickHandler() {
      var _a;
      let name = this.name;
      const children = (_a = this.parent) == null ? void 0 : _a.children;
      if (children && this.name === null) {
        name = children.findIndex((child) => child === this);
      }
      this.parent && this.parent.childClick(name);
      this.$emit("click", name);
    },
    async getItemWidth() {
      let width = 0;
      if (this.parent) {
        const parentWidth = await this.getParentWidth();
        width = parentWidth / Number(this.parentData.col) + "px";
      }
      this.width = width;
    },
    // 获取父元素的尺寸
    getParentWidth() {
    },
    gridItemClasses() {
      if (this.parentData.border) {
        let classes = [];
        this.parent.children.map((child, index) => {
          if (this === child) {
            const len = this.parent.children.length;
            if ((index + 1) % this.parentData.col !== 0 && index + 1 !== len) {
              classes.push("u-border-right");
            }
            const lessNum = len % this.parentData.col === 0 ? this.parentData.col : len % this.parentData.col;
            if (index < len - lessNum) {
              classes.push("u-border-bottom");
            }
          }
        });
        this.classes = classes;
      }
    }
  },
  beforeDestroy() {
    common_vendor.index.$off("$uGridItem");
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.clickHandler && $options.clickHandler(...args)),
    b: common_vendor.n($data.classes),
    c: common_vendor.s($options.itemStyle)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0a78094b"], ["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/uni_modules/uview-plus/components/u-grid-item/u-grid-item.vue"]]);
wx.createComponent(Component);
