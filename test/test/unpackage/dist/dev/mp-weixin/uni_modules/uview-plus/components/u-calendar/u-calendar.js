"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uviewPlus_components_uCalendar_props = require("./props.js");
const uni_modules_uviewPlus_libs_util_calendar = require("../../libs/util/calendar.js");
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
const uHeader = () => "./header.js";
const uMonth = () => "./month.js";
const _sfc_main = {
  name: "u-calendar",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uCalendar_props.props],
  components: {
    uHeader,
    uMonth
  },
  data() {
    return {
      // 需要显示的月份的数组
      months: [],
      // 在月份滚动区域中，当前视图中月份的index索引
      monthIndex: 0,
      // 月份滚动区域的高度
      listHeight: 0,
      // month组件中选择的日期数组
      selected: [],
      scrollIntoView: "",
      scrollTop: 0,
      // 过滤处理方法
      innerFormatter: (value) => value
    };
  },
  watch: {
    selectedChange: {
      immediate: true,
      handler(n) {
        this.setMonth();
      }
    },
    // 打开弹窗时，设置月份数据
    show: {
      immediate: true,
      handler(n) {
        this.setMonth();
      }
    }
  },
  computed: {
    // 由于maxDate和minDate可以为字符串(2021-10-10)，或者数值(时间戳)，但是dayjs如果接受字符串形式的时间戳会有问题，这里进行处理
    innerMaxDate() {
      return common_vendor.index.$u.test.number(this.maxDate) ? Number(this.maxDate) : this.maxDate;
    },
    innerMinDate() {
      return common_vendor.index.$u.test.number(this.minDate) ? Number(this.minDate) : this.minDate;
    },
    // 多个条件的变化，会引起选中日期的变化，这里统一管理监听
    selectedChange() {
      return [this.innerMinDate, this.innerMaxDate, this.defaultDate];
    },
    subtitle() {
      if (this.months.length) {
        return `${this.months[this.monthIndex].year}年${this.months[this.monthIndex].month}月`;
      } else {
        return "";
      }
    },
    buttonDisabled() {
      if (this.mode === "range") {
        if (this.selected.length <= 1) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.start = Date.now();
    this.init();
  },
  emits: ["confirm", "close"],
  methods: {
    // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
    setFormatter(e) {
      this.innerFormatter = e;
    },
    // month组件内部选择日期后，通过事件通知给父组件
    monthSelected(e) {
      this.selected = e;
      if (!this.showConfirm) {
        if (this.mode === "multiple" || this.mode === "single" || this.mode === "range" && this.selected.length >= 2) {
          this.$emit("confirm", this.selected);
        }
      }
    },
    init() {
      if (this.innerMaxDate && new Date(this.innerMaxDate).getTime() <= Date.now()) {
        return common_vendor.index.$u.error("maxDate不能小于当前时间");
      }
      this.listHeight = this.rowHeight * 5 + 30;
      this.setMonth();
    },
    close() {
      this.$emit("close");
    },
    // 点击确定按钮
    confirm() {
      if (!this.buttonDisabled) {
        this.$emit("confirm", this.selected);
      }
    },
    // 获得两个日期之间的月份数
    getMonths(minDate, maxDate) {
      const minYear = common_vendor.dayjs(minDate).year();
      const minMonth = common_vendor.dayjs(minDate).month() + 1;
      const maxYear = common_vendor.dayjs(maxDate).year();
      const maxMonth = common_vendor.dayjs(maxDate).month() + 1;
      return (maxYear - minYear) * 12 + (maxMonth - minMonth) + 1;
    },
    // 设置月份数据
    setMonth() {
      const minDate = this.innerMinDate || common_vendor.dayjs().valueOf();
      const maxDate = this.innerMaxDate || common_vendor.dayjs(minDate).add(this.monthNum - 1, "month").valueOf();
      const months = common_vendor.index.$u.range(
        1,
        this.monthNum,
        this.getMonths(minDate, maxDate)
      );
      this.months = [];
      for (let i = 0; i < months; i++) {
        this.months.push({
          date: new Array(
            common_vendor.dayjs(minDate).add(i, "month").daysInMonth()
          ).fill(1).map((item, index) => {
            let day = index + 1;
            const week = common_vendor.dayjs(minDate).add(i, "month").date(day).day();
            const date = common_vendor.dayjs(minDate).add(i, "month").date(day).format("YYYY-MM-DD");
            let bottomInfo = "";
            if (this.showLunar) {
              const lunar = uni_modules_uviewPlus_libs_util_calendar.Calendar.solar2lunar(
                common_vendor.dayjs(date).year(),
                common_vendor.dayjs(date).month() + 1,
                common_vendor.dayjs(date).date()
              );
              bottomInfo = lunar.IDayCn;
            }
            let config = {
              day,
              week,
              // 小于最小允许的日期，或者大于最大的日期，则设置为disabled状态
              disabled: common_vendor.dayjs(date).isBefore(
                common_vendor.dayjs(minDate).format("YYYY-MM-DD")
              ) || common_vendor.dayjs(date).isAfter(
                common_vendor.dayjs(maxDate).format("YYYY-MM-DD")
              ),
              // 返回一个日期对象，供外部的formatter获取当前日期的年月日等信息，进行加工处理
              date: new Date(date),
              bottomInfo,
              dot: false,
              month: common_vendor.dayjs(minDate).add(i, "month").month() + 1
            };
            const formatter = this.formatter || this.innerFormatter;
            return formatter(config);
          }),
          // 当前所属的月份
          month: common_vendor.dayjs(minDate).add(i, "month").month() + 1,
          // 当前年份
          year: common_vendor.dayjs(minDate).add(i, "month").year()
        });
      }
    },
    // 滚动到默认设置的月份
    scrollIntoDefaultMonth(selected) {
      const _index = this.months.findIndex(({
        year,
        month
      }) => {
        month = common_vendor.index.$u.padZero(month);
        return `${year}-${month}` === selected;
      });
      if (_index !== -1) {
        this.scrollTop = this.months[_index].top || 0;
      }
    },
    // scroll-view滚动监听
    onScroll(event) {
      const scrollTop = Math.max(0, event.detail.scrollTop);
      for (let i = 0; i < this.months.length; i++) {
        if (scrollTop >= (this.months[i].top || this.listHeight)) {
          this.monthIndex = i;
        }
      }
    },
    // 更新月份的top值
    updateMonthTop(topArr = []) {
      topArr.map((item, index) => {
        this.months[index].top = item;
      });
      if (!this.defaultDate) {
        const selected2 = common_vendor.dayjs().format("YYYY-MM");
        this.scrollIntoDefaultMonth(selected2);
        return;
      }
      let selected = common_vendor.dayjs().format("YYYY-MM");
      if (!common_vendor.index.$u.test.array(this.defaultDate)) {
        selected = common_vendor.dayjs(this.defaultDate).format("YYYY-MM");
      } else {
        selected = common_vendor.dayjs(this.defaultDate[0]).format("YYYY-MM");
      }
      this.scrollIntoDefaultMonth(selected);
    }
  }
};
if (!Array) {
  const _component_uHeader = common_vendor.resolveComponent("uHeader");
  const _component_uMonth = common_vendor.resolveComponent("uMonth");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_component_uHeader + _component_uMonth + _easycom_u_button2 + _easycom_u_popup2)();
}
const _easycom_u_button = () => "../u-button/u-button.js";
const _easycom_u_popup = () => "../u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_button + _easycom_u_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      title: _ctx.title,
      subtitle: $options.subtitle,
      showSubtitle: _ctx.showSubtitle,
      showTitle: _ctx.showTitle
    }),
    b: common_vendor.sr("month", "c9867878-2,c9867878-0"),
    c: common_vendor.o($options.monthSelected),
    d: common_vendor.o($options.updateMonthTop),
    e: common_vendor.p({
      color: _ctx.color,
      rowHeight: _ctx.rowHeight,
      showMark: _ctx.showMark,
      months: $data.months,
      mode: _ctx.mode,
      maxCount: _ctx.maxCount,
      startText: _ctx.startText,
      endText: _ctx.endText,
      defaultDate: _ctx.defaultDate,
      minDate: $options.innerMinDate,
      maxDate: $options.innerMaxDate,
      maxMonth: _ctx.monthNum,
      readonly: _ctx.readonly,
      maxRange: _ctx.maxRange,
      rangePrompt: _ctx.rangePrompt,
      showRangePrompt: _ctx.showRangePrompt,
      allowSameDay: _ctx.allowSameDay
    }),
    f: _ctx.$u.addUnit($data.listHeight),
    g: common_vendor.o((...args) => $options.onScroll && $options.onScroll(...args)),
    h: $data.scrollTop,
    i: $data.scrollIntoView,
    j: _ctx.showConfirm
  }, _ctx.showConfirm ? {
    k: common_vendor.o($options.confirm),
    l: common_vendor.p({
      shape: "circle",
      text: $options.buttonDisabled ? _ctx.confirmDisabledText : _ctx.confirmText,
      color: _ctx.color,
      disabled: $options.buttonDisabled
    })
  } : {}, {
    m: common_vendor.o($options.close),
    n: common_vendor.p({
      show: _ctx.show,
      mode: "bottom",
      closeable: true,
      round: _ctx.round,
      closeOnClickOverlay: _ctx.closeOnClickOverlay
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c9867878"], ["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/uni_modules/uview-plus/components/u-calendar/u-calendar.vue"]]);
wx.createComponent(Component);
