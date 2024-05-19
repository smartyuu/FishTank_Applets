"use strict";
const uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = {
  props: {
    // input的label提示语
    label: {
      type: String,
      default: uni_modules_uviewPlus_libs_config_props.defprops.formItem.label
    },
    // 绑定的值
    prop: {
      type: String,
      default: uni_modules_uviewPlus_libs_config_props.defprops.formItem.prop
    },
    // 是否显示表单域的下划线边框
    borderBottom: {
      type: [String, Boolean],
      default: uni_modules_uviewPlus_libs_config_props.defprops.formItem.borderBottom
    },
    // label的宽度，单位px
    labelWidth: {
      type: [String, Number],
      default: uni_modules_uviewPlus_libs_config_props.defprops.formItem.labelWidth
    },
    // 右侧图标
    rightIcon: {
      type: String,
      default: uni_modules_uviewPlus_libs_config_props.defprops.formItem.rightIcon
    },
    // 左侧图标
    leftIcon: {
      type: String,
      default: uni_modules_uviewPlus_libs_config_props.defprops.formItem.leftIcon
    },
    // 是否显示左边的必填星号，只作显示用，具体校验必填的逻辑，请在rules中配置
    required: {
      type: Boolean,
      default: uni_modules_uviewPlus_libs_config_props.defprops.formItem.required
    },
    leftIconStyle: {
      type: [String, Object],
      default: uni_modules_uviewPlus_libs_config_props.defprops.formItem.leftIconStyle
    }
  }
};
exports.props = props;
