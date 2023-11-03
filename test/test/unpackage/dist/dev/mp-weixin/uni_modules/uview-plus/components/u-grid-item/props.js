"use strict";
const uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = {
  props: {
    // 宫格的name
    name: {
      type: [String, Number, null],
      default: uni_modules_uviewPlus_libs_config_props.defprops.gridItem.name
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: uni_modules_uviewPlus_libs_config_props.defprops.gridItem.bgColor
    }
  }
};
exports.props = props;
