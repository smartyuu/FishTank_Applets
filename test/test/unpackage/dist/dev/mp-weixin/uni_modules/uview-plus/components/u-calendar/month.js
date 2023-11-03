"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
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
  name: "u-calendar-month",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin],
  props: {
    // 是否显示月份背景色
    showMark: {
      type: Boolean,
      default: true
    },
    // 主题色，对底部按钮和选中日期有效
    color: {
      type: String,
      default: "#3c9cff"
    },
    // 月份数据
    months: {
      type: Array,
      default: () => []
    },
    // 日期选择类型
    mode: {
      type: String,
      default: "single"
    },
    // 日期行高
    rowHeight: {
      type: [String, Number],
      default: 58
    },
    // mode=multiple时，最多可选多少个日期
    maxCount: {
      type: [String, Number],
      default: Infinity
    },
    // mode=range时，第一个日期底部的提示文字
    startText: {
      type: String,
      default: "开始"
    },
    // mode=range时，最后一个日期底部的提示文字
    endText: {
      type: String,
      default: "结束"
    },
    // 默认选中的日期，mode为multiple或range是必须为数组格式
    defaultDate: {
      type: [Array, String, Date],
      default: null
    },
    // 最小的可选日期
    minDate: {
      type: [String, Number],
      default: 0
    },
    // 最大可选日期
    maxDate: {
      type: [String, Number],
      default: 0
    },
    // 如果没有设置maxDate，则往后推多少个月
    maxMonth: {
      type: [String, Number],
      default: 2
    },
    // 是否为只读状态，只读状态下禁止选择日期
    readonly: {
      type: Boolean,
      default: uni_modules_uviewPlus_libs_config_props.defprops.calendar.readonly
    },
    // 日期区间最多可选天数，默认无限制，mode = range时有效
    maxRange: {
      type: [Number, String],
      default: Infinity
    },
    // 范围选择超过最多可选天数时的提示文案，mode = range时有效
    rangePrompt: {
      type: String,
      default: ""
    },
    // 范围选择超过最多可选天数时，是否展示提示文案，mode = range时有效
    showRangePrompt: {
      type: Boolean,
      default: true
    },
    // 是否允许日期范围的起止时间为同一天，mode = range时有效
    allowSameDay: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 每个日期的宽度
      width: 0,
      // 当前选中的日期item
      item: {},
      selected: []
    };
  },
  watch: {
    selectedChange: {
      immediate: true,
      handler(n) {
        this.setDefaultDate();
      }
    }
  },
  computed: {
    // 多个条件的变化，会引起选中日期的变化，这里统一管理监听
    selectedChange() {
      return [this.minDate, this.maxDate, this.defaultDate];
    },
    dayStyle(index1, index2, item) {
      return (index12, index22, item2) => {
        const style = {};
        let week = item2.week;
        const dayWidth = Number(parseFloat(this.width / 7).toFixed(3).slice(0, -1));
        style.height = common_vendor.index.$u.addUnit(this.rowHeight);
        if (index22 === 0) {
          week = (week === 0 ? 7 : week) - 1;
          style.marginLeft = common_vendor.index.$u.addUnit(week * dayWidth);
        }
        if (this.mode === "range") {
          style.paddingLeft = 0;
          style.paddingRight = 0;
          style.paddingBottom = 0;
          style.paddingTop = 0;
        }
        return style;
      };
    },
    daySelectStyle() {
      return (index1, index2, item) => {
        let date = common_vendor.dayjs(item.date).format("YYYY-MM-DD"), style = {};
        if (this.selected.some((item2) => this.dateSame(item2, date))) {
          style.backgroundColor = this.color;
        }
        if (this.mode === "single") {
          if (date === this.selected[0]) {
            style.borderTopLeftRadius = "3px";
            style.borderBottomLeftRadius = "3px";
            style.borderTopRightRadius = "3px";
            style.borderBottomRightRadius = "3px";
          }
        } else if (this.mode === "range") {
          if (this.selected.length >= 2) {
            const len = this.selected.length - 1;
            if (this.dateSame(date, this.selected[0])) {
              style.borderTopLeftRadius = "3px";
              style.borderBottomLeftRadius = "3px";
            }
            if (this.dateSame(date, this.selected[len])) {
              style.borderTopRightRadius = "3px";
              style.borderBottomRightRadius = "3px";
            }
            if (common_vendor.dayjs(date).isAfter(common_vendor.dayjs(this.selected[0])) && common_vendor.dayjs(date).isBefore(common_vendor.dayjs(this.selected[len]))) {
              style.backgroundColor = common_vendor.index.$u.colorGradient(this.color, "#ffffff", 100)[90];
              style.opacity = 0.7;
            }
          } else if (this.selected.length === 1) {
            style.borderTopLeftRadius = "3px";
            style.borderBottomLeftRadius = "3px";
          }
        } else {
          if (this.selected.some((item2) => this.dateSame(item2, date))) {
            style.borderTopLeftRadius = "3px";
            style.borderBottomLeftRadius = "3px";
            style.borderTopRightRadius = "3px";
            style.borderBottomRightRadius = "3px";
          }
        }
        return style;
      };
    },
    // 某个日期是否被选中
    textStyle() {
      return (item) => {
        const date = common_vendor.dayjs(item.date).format("YYYY-MM-DD"), style = {};
        if (this.selected.some((item2) => this.dateSame(item2, date))) {
          style.color = "#ffffff";
        }
        if (this.mode === "range") {
          const len = this.selected.length - 1;
          if (common_vendor.dayjs(date).isAfter(common_vendor.dayjs(this.selected[0])) && common_vendor.dayjs(date).isBefore(common_vendor.dayjs(this.selected[len]))) {
            style.color = this.color;
          }
        }
        return style;
      };
    },
    // 获取底部的提示文字
    getBottomInfo() {
      return (index1, index2, item) => {
        const date = common_vendor.dayjs(item.date).format("YYYY-MM-DD");
        const bottomInfo = item.bottomInfo;
        if (this.mode === "range" && this.selected.length > 0) {
          if (this.selected.length === 1) {
            if (this.dateSame(date, this.selected[0]))
              return this.startText;
            else
              return bottomInfo;
          } else {
            const len = this.selected.length - 1;
            if (this.dateSame(date, this.selected[0]) && this.dateSame(date, this.selected[1]) && len === 1) {
              return `${this.startText}/${this.endText}`;
            } else if (this.dateSame(date, this.selected[0])) {
              return this.startText;
            } else if (this.dateSame(date, this.selected[len])) {
              return this.endText;
            } else {
              return bottomInfo;
            }
          }
        } else {
          return bottomInfo;
        }
      };
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$emit("monthSelected", this.selected);
      this.$nextTick(() => {
        common_vendor.index.$u.sleep(10).then(() => {
          this.getWrapperWidth();
          this.getMonthRect();
        });
      });
    },
    // 判断两个日期是否相等
    dateSame(date1, date2) {
      return common_vendor.dayjs(date1).isSame(common_vendor.dayjs(date2));
    },
    // 获取月份数据区域的宽度，因为nvue不支持百分比，所以无法通过css设置每个日期item的宽度
    getWrapperWidth() {
      this.$uGetRect(".u-calendar-month-wrapper").then((size) => {
        this.width = size.width;
      });
    },
    getMonthRect() {
      const promiseAllArr = this.months.map((item, index) => this.getMonthRectByPromise(
        `u-calendar-month-${index}`
      ));
      Promise.all(promiseAllArr).then(
        (sizes) => {
          let height = 1;
          const topArr = [];
          for (let i = 0; i < this.months.length; i++) {
            topArr[i] = height;
            height += sizes[i].height;
          }
          this.$emit("updateMonthTop", topArr);
        }
      );
    },
    // 获取每个月份区域的尺寸
    getMonthRectByPromise(el) {
      return new Promise((resolve) => {
        this.$uGetRect(`.${el}`).then((size) => {
          resolve(size);
        });
      });
    },
    // 点击某一个日期
    clickHandler(index1, index2, item) {
      if (this.readonly) {
        return;
      }
      this.item = item;
      const date = common_vendor.dayjs(item.date).format("YYYY-MM-DD");
      if (item.disabled)
        return;
      let selected = common_vendor.index.$u.deepClone(this.selected);
      if (this.mode === "single") {
        selected = [date];
      } else if (this.mode === "multiple") {
        if (selected.some((item2) => this.dateSame(item2, date))) {
          const itemIndex = selected.findIndex((item2) => item2 === date);
          selected.splice(itemIndex, 1);
        } else {
          if (selected.length < this.maxCount)
            selected.push(date);
        }
      } else {
        if (selected.length === 0 || selected.length >= 2) {
          selected = [date];
        } else if (selected.length === 1) {
          const existsDate = selected[0];
          if (common_vendor.dayjs(date).isBefore(existsDate)) {
            selected = [date];
          } else if (common_vendor.dayjs(date).isAfter(existsDate)) {
            if (common_vendor.dayjs(common_vendor.dayjs(date).subtract(this.maxRange, "day")).isAfter(common_vendor.dayjs(selected[0])) && this.showRangePrompt) {
              if (this.rangePrompt) {
                common_vendor.index.$u.toast(this.rangePrompt);
              } else {
                common_vendor.index.$u.toast(`选择天数不能超过 ${this.maxRange} 天`);
              }
              return;
            }
            selected.push(date);
            const startDate = selected[0];
            const endDate = selected[1];
            const arr = [];
            let i = 0;
            do {
              arr.push(common_vendor.dayjs(startDate).add(i, "day").format("YYYY-MM-DD"));
              i++;
            } while (common_vendor.dayjs(startDate).add(i, "day").isBefore(common_vendor.dayjs(endDate)));
            arr.push(endDate);
            selected = arr;
          } else {
            if (selected[0] === date && !this.allowSameDay)
              return;
            selected.push(date);
          }
        }
      }
      this.setSelected(selected);
    },
    // 设置默认日期
    setDefaultDate() {
      if (!this.defaultDate) {
        const selected = [common_vendor.dayjs().format("YYYY-MM-DD")];
        return this.setSelected(selected, false);
      }
      let defaultDate = [];
      const minDate = this.minDate || common_vendor.dayjs().format("YYYY-MM-DD");
      const maxDate = this.maxDate || common_vendor.dayjs(minDate).add(this.maxMonth - 1, "month").format("YYYY-MM-DD");
      if (this.mode === "single") {
        if (!common_vendor.index.$u.test.array(this.defaultDate)) {
          defaultDate = [common_vendor.dayjs(this.defaultDate).format("YYYY-MM-DD")];
        } else {
          defaultDate = [this.defaultDate[0]];
        }
      } else {
        if (!common_vendor.index.$u.test.array(this.defaultDate))
          return;
        defaultDate = this.defaultDate;
      }
      defaultDate = defaultDate.filter((item) => {
        return common_vendor.dayjs(item).isAfter(common_vendor.dayjs(minDate).subtract(1, "day")) && common_vendor.dayjs(item).isBefore(common_vendor.dayjs(
          maxDate
        ).add(1, "day"));
      });
      this.setSelected(defaultDate, false);
    },
    setSelected(selected, event = true) {
      this.selected = selected;
      event && this.$emit("monthSelected", this.selected);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.months, (item, index, i0) => {
      return common_vendor.e({
        a: index !== 0
      }, index !== 0 ? {
        b: common_vendor.t(item.year),
        c: common_vendor.t(item.month)
      } : {}, $props.showMark ? {
        d: common_vendor.t(item.month)
      } : {}, {
        e: common_vendor.f(item.date, (item1, index1, i1) => {
          return common_vendor.e({
            a: common_vendor.t(item1.day),
            b: common_vendor.n(item1.disabled && "u-calendar-month__days__day__select__info--disabled"),
            c: common_vendor.s($options.textStyle(item1)),
            d: $options.getBottomInfo(index, index1, item1)
          }, $options.getBottomInfo(index, index1, item1) ? {
            e: common_vendor.t($options.getBottomInfo(index, index1, item1)),
            f: common_vendor.n(item1.disabled && "u-calendar-month__days__day__select__buttom-info--disabled"),
            g: common_vendor.s($options.textStyle(item1))
          } : {}, {
            h: item1.dot
          }, item1.dot ? {} : {}, {
            i: common_vendor.s($options.daySelectStyle(index, index1, item1)),
            j: index1,
            k: common_vendor.s($options.dayStyle(index, index1, item1)),
            l: common_vendor.o(($event) => $options.clickHandler(index, index1, item1), index1),
            m: common_vendor.n(item1.selected && "u-calendar-month__days__day__select--selected")
          });
        }),
        f: index,
        g: common_vendor.n(`u-calendar-month-${index}`),
        h: `u-calendar-month-${index}`,
        i: `month-${index}`
      });
    }),
    b: $props.showMark
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3c847935"], ["__file", "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/uni_modules/uview-plus/components/u-calendar/month.vue"]]);
wx.createComponent(Component);
