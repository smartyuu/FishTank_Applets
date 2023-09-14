import {
  createFloat32Array,
  getStackedDimension,
  isDimensionStacked
} from "./chunk-QIVV2LDS.js";
import {
  createRenderPlanner
} from "./chunk-HZWDB7D3.js";
import {
  ONE_DAY,
  ONE_HOUR,
  ONE_MINUTE,
  ONE_SECOND,
  ONE_YEAR,
  addCommas,
  dateGetterName,
  dateSetterName,
  enableClassManagement,
  format,
  fullLeveledFormatter,
  fullYearGetterName,
  fullYearSetterName,
  getDefaultFormatPrecisionOfInterval,
  getPrecision,
  getPrimaryTimeUnit,
  getUnitValue,
  hoursGetterName,
  hoursSetterName,
  isPrimaryTimeUnit,
  leveledFormat,
  millisecondsGetterName,
  millisecondsSetterName,
  minutesGetterName,
  minutesSetterName,
  monthGetterName,
  monthSetterName,
  nice,
  parseDate,
  parsePercent as parsePercent2,
  quantity,
  quantityExponent,
  round,
  secondsGetterName,
  secondsSetterName,
  timeUnits,
  warn
} from "./chunk-PFGJLZCD.js";
import {
  BoundingRect_default,
  __extends,
  assert,
  createHashMap,
  defaults,
  each,
  eqNaN,
  filter,
  isArray,
  isFunction,
  isNumber,
  isObject,
  isString,
  keys,
  map,
  parsePercent
} from "./chunk-QHW63D3G.js";

// C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/node_modules/echarts/lib/layout/barGrid.js
var STACK_PREFIX = "__ec_stack_";
function getSeriesStackId(seriesModel) {
  return seriesModel.get("stack") || STACK_PREFIX + seriesModel.seriesIndex;
}
function getAxisKey(axis) {
  return axis.dim + axis.index;
}
function getLayoutOnAxis(opt) {
  var params = [];
  var baseAxis = opt.axis;
  var axisKey = "axis0";
  if (baseAxis.type !== "category") {
    return;
  }
  var bandWidth = baseAxis.getBandWidth();
  for (var i = 0; i < opt.count || 0; i++) {
    params.push(defaults({
      bandWidth,
      axisKey,
      stackId: STACK_PREFIX + i
    }, opt));
  }
  var widthAndOffsets = doCalBarWidthAndOffset(params);
  var result = [];
  for (var i = 0; i < opt.count; i++) {
    var item = widthAndOffsets[axisKey][STACK_PREFIX + i];
    item.offsetCenter = item.offset + item.width / 2;
    result.push(item);
  }
  return result;
}
function prepareLayoutBarSeries(seriesType, ecModel) {
  var seriesModels = [];
  ecModel.eachSeriesByType(seriesType, function(seriesModel) {
    if (isOnCartesian(seriesModel)) {
      seriesModels.push(seriesModel);
    }
  });
  return seriesModels;
}
function getValueAxesMinGaps(barSeries) {
  var axisValues = {};
  each(barSeries, function(seriesModel) {
    var cartesian = seriesModel.coordinateSystem;
    var baseAxis = cartesian.getBaseAxis();
    if (baseAxis.type !== "time" && baseAxis.type !== "value") {
      return;
    }
    var data = seriesModel.getData();
    var key2 = baseAxis.dim + "_" + baseAxis.index;
    var dimIdx = data.getDimensionIndex(data.mapDimension(baseAxis.dim));
    var store = data.getStore();
    for (var i = 0, cnt = store.count(); i < cnt; ++i) {
      var value = store.get(dimIdx, i);
      if (!axisValues[key2]) {
        axisValues[key2] = [value];
      } else {
        axisValues[key2].push(value);
      }
    }
  });
  var axisMinGaps = {};
  for (var key in axisValues) {
    if (axisValues.hasOwnProperty(key)) {
      var valuesInAxis = axisValues[key];
      if (valuesInAxis) {
        valuesInAxis.sort(function(a, b) {
          return a - b;
        });
        var min = null;
        for (var j = 1; j < valuesInAxis.length; ++j) {
          var delta = valuesInAxis[j] - valuesInAxis[j - 1];
          if (delta > 0) {
            min = min === null ? delta : Math.min(min, delta);
          }
        }
        axisMinGaps[key] = min;
      }
    }
  }
  return axisMinGaps;
}
function makeColumnLayout(barSeries) {
  var axisMinGaps = getValueAxesMinGaps(barSeries);
  var seriesInfoList = [];
  each(barSeries, function(seriesModel) {
    var cartesian = seriesModel.coordinateSystem;
    var baseAxis = cartesian.getBaseAxis();
    var axisExtent = baseAxis.getExtent();
    var bandWidth;
    if (baseAxis.type === "category") {
      bandWidth = baseAxis.getBandWidth();
    } else if (baseAxis.type === "value" || baseAxis.type === "time") {
      var key = baseAxis.dim + "_" + baseAxis.index;
      var minGap = axisMinGaps[key];
      var extentSpan = Math.abs(axisExtent[1] - axisExtent[0]);
      var scale2 = baseAxis.scale.getExtent();
      var scaleSpan = Math.abs(scale2[1] - scale2[0]);
      bandWidth = minGap ? extentSpan / scaleSpan * minGap : extentSpan;
    } else {
      var data = seriesModel.getData();
      bandWidth = Math.abs(axisExtent[1] - axisExtent[0]) / data.count();
    }
    var barWidth = parsePercent2(seriesModel.get("barWidth"), bandWidth);
    var barMaxWidth = parsePercent2(seriesModel.get("barMaxWidth"), bandWidth);
    var barMinWidth = parsePercent2(
      // barMinWidth by default is 0.5 / 1 in cartesian. Because in value axis,
      // the auto-calculated bar width might be less than 0.5 / 1.
      seriesModel.get("barMinWidth") || (isInLargeMode(seriesModel) ? 0.5 : 1),
      bandWidth
    );
    var barGap = seriesModel.get("barGap");
    var barCategoryGap = seriesModel.get("barCategoryGap");
    seriesInfoList.push({
      bandWidth,
      barWidth,
      barMaxWidth,
      barMinWidth,
      barGap,
      barCategoryGap,
      axisKey: getAxisKey(baseAxis),
      stackId: getSeriesStackId(seriesModel)
    });
  });
  return doCalBarWidthAndOffset(seriesInfoList);
}
function doCalBarWidthAndOffset(seriesInfoList) {
  var columnsMap = {};
  each(seriesInfoList, function(seriesInfo, idx) {
    var axisKey = seriesInfo.axisKey;
    var bandWidth = seriesInfo.bandWidth;
    var columnsOnAxis = columnsMap[axisKey] || {
      bandWidth,
      remainedWidth: bandWidth,
      autoWidthCount: 0,
      categoryGap: null,
      gap: "20%",
      stacks: {}
    };
    var stacks = columnsOnAxis.stacks;
    columnsMap[axisKey] = columnsOnAxis;
    var stackId = seriesInfo.stackId;
    if (!stacks[stackId]) {
      columnsOnAxis.autoWidthCount++;
    }
    stacks[stackId] = stacks[stackId] || {
      width: 0,
      maxWidth: 0
    };
    var barWidth = seriesInfo.barWidth;
    if (barWidth && !stacks[stackId].width) {
      stacks[stackId].width = barWidth;
      barWidth = Math.min(columnsOnAxis.remainedWidth, barWidth);
      columnsOnAxis.remainedWidth -= barWidth;
    }
    var barMaxWidth = seriesInfo.barMaxWidth;
    barMaxWidth && (stacks[stackId].maxWidth = barMaxWidth);
    var barMinWidth = seriesInfo.barMinWidth;
    barMinWidth && (stacks[stackId].minWidth = barMinWidth);
    var barGap = seriesInfo.barGap;
    barGap != null && (columnsOnAxis.gap = barGap);
    var barCategoryGap = seriesInfo.barCategoryGap;
    barCategoryGap != null && (columnsOnAxis.categoryGap = barCategoryGap);
  });
  var result = {};
  each(columnsMap, function(columnsOnAxis, coordSysName) {
    result[coordSysName] = {};
    var stacks = columnsOnAxis.stacks;
    var bandWidth = columnsOnAxis.bandWidth;
    var categoryGapPercent = columnsOnAxis.categoryGap;
    if (categoryGapPercent == null) {
      var columnCount = keys(stacks).length;
      categoryGapPercent = Math.max(35 - columnCount * 4, 15) + "%";
    }
    var categoryGap = parsePercent2(categoryGapPercent, bandWidth);
    var barGapPercent = parsePercent2(columnsOnAxis.gap, 1);
    var remainedWidth = columnsOnAxis.remainedWidth;
    var autoWidthCount = columnsOnAxis.autoWidthCount;
    var autoWidth = (remainedWidth - categoryGap) / (autoWidthCount + (autoWidthCount - 1) * barGapPercent);
    autoWidth = Math.max(autoWidth, 0);
    each(stacks, function(column) {
      var maxWidth = column.maxWidth;
      var minWidth = column.minWidth;
      if (!column.width) {
        var finalWidth = autoWidth;
        if (maxWidth && maxWidth < finalWidth) {
          finalWidth = Math.min(maxWidth, remainedWidth);
        }
        if (minWidth && minWidth > finalWidth) {
          finalWidth = minWidth;
        }
        if (finalWidth !== autoWidth) {
          column.width = finalWidth;
          remainedWidth -= finalWidth + barGapPercent * finalWidth;
          autoWidthCount--;
        }
      } else {
        var finalWidth = column.width;
        if (maxWidth) {
          finalWidth = Math.min(finalWidth, maxWidth);
        }
        if (minWidth) {
          finalWidth = Math.max(finalWidth, minWidth);
        }
        column.width = finalWidth;
        remainedWidth -= finalWidth + barGapPercent * finalWidth;
        autoWidthCount--;
      }
    });
    autoWidth = (remainedWidth - categoryGap) / (autoWidthCount + (autoWidthCount - 1) * barGapPercent);
    autoWidth = Math.max(autoWidth, 0);
    var widthSum = 0;
    var lastColumn;
    each(stacks, function(column, idx) {
      if (!column.width) {
        column.width = autoWidth;
      }
      lastColumn = column;
      widthSum += column.width * (1 + barGapPercent);
    });
    if (lastColumn) {
      widthSum -= lastColumn.width * barGapPercent;
    }
    var offset = -widthSum / 2;
    each(stacks, function(column, stackId) {
      result[coordSysName][stackId] = result[coordSysName][stackId] || {
        bandWidth,
        offset,
        width: column.width
      };
      offset += column.width * (1 + barGapPercent);
    });
  });
  return result;
}
function retrieveColumnLayout(barWidthAndOffset, axis, seriesModel) {
  if (barWidthAndOffset && axis) {
    var result = barWidthAndOffset[getAxisKey(axis)];
    if (result != null && seriesModel != null) {
      return result[getSeriesStackId(seriesModel)];
    }
    return result;
  }
}
function layout(seriesType, ecModel) {
  var seriesModels = prepareLayoutBarSeries(seriesType, ecModel);
  var barWidthAndOffset = makeColumnLayout(seriesModels);
  each(seriesModels, function(seriesModel) {
    var data = seriesModel.getData();
    var cartesian = seriesModel.coordinateSystem;
    var baseAxis = cartesian.getBaseAxis();
    var stackId = getSeriesStackId(seriesModel);
    var columnLayoutInfo = barWidthAndOffset[getAxisKey(baseAxis)][stackId];
    var columnOffset = columnLayoutInfo.offset;
    var columnWidth = columnLayoutInfo.width;
    data.setLayout({
      bandWidth: columnLayoutInfo.bandWidth,
      offset: columnOffset,
      size: columnWidth
    });
  });
}
function createProgressiveLayout(seriesType) {
  return {
    seriesType,
    plan: createRenderPlanner(),
    reset: function(seriesModel) {
      if (!isOnCartesian(seriesModel)) {
        return;
      }
      var data = seriesModel.getData();
      var cartesian = seriesModel.coordinateSystem;
      var baseAxis = cartesian.getBaseAxis();
      var valueAxis = cartesian.getOtherAxis(baseAxis);
      var valueDimIdx = data.getDimensionIndex(data.mapDimension(valueAxis.dim));
      var baseDimIdx = data.getDimensionIndex(data.mapDimension(baseAxis.dim));
      var drawBackground = seriesModel.get("showBackground", true);
      var valueDim = data.mapDimension(valueAxis.dim);
      var stackResultDim = data.getCalculationInfo("stackResultDimension");
      var stacked = isDimensionStacked(data, valueDim) && !!data.getCalculationInfo("stackedOnSeries");
      var isValueAxisH = valueAxis.isHorizontal();
      var valueAxisStart = getValueAxisStart(baseAxis, valueAxis);
      var isLarge = isInLargeMode(seriesModel);
      var barMinHeight = seriesModel.get("barMinHeight") || 0;
      var stackedDimIdx = stackResultDim && data.getDimensionIndex(stackResultDim);
      var columnWidth = data.getLayout("size");
      var columnOffset = data.getLayout("offset");
      return {
        progress: function(params, data2) {
          var count = params.count;
          var largePoints = isLarge && createFloat32Array(count * 3);
          var largeBackgroundPoints = isLarge && drawBackground && createFloat32Array(count * 3);
          var largeDataIndices = isLarge && createFloat32Array(count);
          var coordLayout = cartesian.master.getRect();
          var bgSize = isValueAxisH ? coordLayout.width : coordLayout.height;
          var dataIndex;
          var store = data2.getStore();
          var idxOffset = 0;
          while ((dataIndex = params.next()) != null) {
            var value = store.get(stacked ? stackedDimIdx : valueDimIdx, dataIndex);
            var baseValue = store.get(baseDimIdx, dataIndex);
            var baseCoord = valueAxisStart;
            var startValue = void 0;
            if (stacked) {
              startValue = +value - store.get(valueDimIdx, dataIndex);
            }
            var x = void 0;
            var y = void 0;
            var width = void 0;
            var height = void 0;
            if (isValueAxisH) {
              var coord = cartesian.dataToPoint([value, baseValue]);
              if (stacked) {
                var startCoord = cartesian.dataToPoint([startValue, baseValue]);
                baseCoord = startCoord[0];
              }
              x = baseCoord;
              y = coord[1] + columnOffset;
              width = coord[0] - baseCoord;
              height = columnWidth;
              if (Math.abs(width) < barMinHeight) {
                width = (width < 0 ? -1 : 1) * barMinHeight;
              }
            } else {
              var coord = cartesian.dataToPoint([baseValue, value]);
              if (stacked) {
                var startCoord = cartesian.dataToPoint([baseValue, startValue]);
                baseCoord = startCoord[1];
              }
              x = coord[0] + columnOffset;
              y = baseCoord;
              width = columnWidth;
              height = coord[1] - baseCoord;
              if (Math.abs(height) < barMinHeight) {
                height = (height <= 0 ? -1 : 1) * barMinHeight;
              }
            }
            if (!isLarge) {
              data2.setItemLayout(dataIndex, {
                x,
                y,
                width,
                height
              });
            } else {
              largePoints[idxOffset] = x;
              largePoints[idxOffset + 1] = y;
              largePoints[idxOffset + 2] = isValueAxisH ? width : height;
              if (largeBackgroundPoints) {
                largeBackgroundPoints[idxOffset] = isValueAxisH ? coordLayout.x : x;
                largeBackgroundPoints[idxOffset + 1] = isValueAxisH ? y : coordLayout.y;
                largeBackgroundPoints[idxOffset + 2] = bgSize;
              }
              largeDataIndices[dataIndex] = dataIndex;
            }
            idxOffset += 3;
          }
          if (isLarge) {
            data2.setLayout({
              largePoints,
              largeDataIndices,
              largeBackgroundPoints,
              valueAxisHorizontal: isValueAxisH
            });
          }
        }
      };
    }
  };
}
function isOnCartesian(seriesModel) {
  return seriesModel.coordinateSystem && seriesModel.coordinateSystem.type === "cartesian2d";
}
function isInLargeMode(seriesModel) {
  return seriesModel.pipelineContext && seriesModel.pipelineContext.large;
}
function getValueAxisStart(baseAxis, valueAxis) {
  return valueAxis.toGlobalCoord(valueAxis.dataToCoord(valueAxis.type === "log" ? 1 : 0));
}

// C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/node_modules/echarts/lib/scale/Scale.js
var Scale = (
  /** @class */
  function() {
    function Scale2(setting) {
      this._setting = setting || {};
      this._extent = [Infinity, -Infinity];
    }
    Scale2.prototype.getSetting = function(name) {
      return this._setting[name];
    };
    Scale2.prototype.unionExtent = function(other) {
      var extent = this._extent;
      other[0] < extent[0] && (extent[0] = other[0]);
      other[1] > extent[1] && (extent[1] = other[1]);
    };
    Scale2.prototype.unionExtentFromData = function(data, dim) {
      this.unionExtent(data.getApproximateExtent(dim));
    };
    Scale2.prototype.getExtent = function() {
      return this._extent.slice();
    };
    Scale2.prototype.setExtent = function(start, end) {
      var thisExtent = this._extent;
      if (!isNaN(start)) {
        thisExtent[0] = start;
      }
      if (!isNaN(end)) {
        thisExtent[1] = end;
      }
    };
    Scale2.prototype.isInExtentRange = function(value) {
      return this._extent[0] <= value && this._extent[1] >= value;
    };
    Scale2.prototype.isBlank = function() {
      return this._isBlank;
    };
    Scale2.prototype.setBlank = function(isBlank) {
      this._isBlank = isBlank;
    };
    return Scale2;
  }()
);
enableClassManagement(Scale);
var Scale_default = Scale;

// C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/node_modules/echarts/lib/data/OrdinalMeta.js
var uidBase = 0;
var OrdinalMeta = (
  /** @class */
  function() {
    function OrdinalMeta2(opt) {
      this.categories = opt.categories || [];
      this._needCollect = opt.needCollect;
      this._deduplication = opt.deduplication;
      this.uid = ++uidBase;
    }
    OrdinalMeta2.createByAxisModel = function(axisModel) {
      var option = axisModel.option;
      var data = option.data;
      var categories = data && map(data, getName);
      return new OrdinalMeta2({
        categories,
        needCollect: !categories,
        // deduplication is default in axis.
        deduplication: option.dedplication !== false
      });
    };
    ;
    OrdinalMeta2.prototype.getOrdinal = function(category) {
      return this._getOrCreateMap().get(category);
    };
    OrdinalMeta2.prototype.parseAndCollect = function(category) {
      var index;
      var needCollect = this._needCollect;
      if (!isString(category) && !needCollect) {
        return category;
      }
      if (needCollect && !this._deduplication) {
        index = this.categories.length;
        this.categories[index] = category;
        return index;
      }
      var map2 = this._getOrCreateMap();
      index = map2.get(category);
      if (index == null) {
        if (needCollect) {
          index = this.categories.length;
          this.categories[index] = category;
          map2.set(category, index);
        } else {
          index = NaN;
        }
      }
      return index;
    };
    OrdinalMeta2.prototype._getOrCreateMap = function() {
      return this._map || (this._map = createHashMap(this.categories));
    };
    return OrdinalMeta2;
  }()
);
function getName(obj) {
  if (isObject(obj) && obj.value != null) {
    return obj.value;
  } else {
    return obj + "";
  }
}
var OrdinalMeta_default = OrdinalMeta;

// C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/node_modules/echarts/lib/scale/helper.js
function isValueNice(val) {
  var exp10 = Math.pow(10, quantityExponent(Math.abs(val)));
  var f = Math.abs(val / exp10);
  return f === 0 || f === 1 || f === 2 || f === 3 || f === 5;
}
function isIntervalOrLogScale(scale2) {
  return scale2.type === "interval" || scale2.type === "log";
}
function intervalScaleNiceTicks(extent, splitNumber, minInterval, maxInterval) {
  var result = {};
  var span = extent[1] - extent[0];
  var interval = result.interval = nice(span / splitNumber, true);
  if (minInterval != null && interval < minInterval) {
    interval = result.interval = minInterval;
  }
  if (maxInterval != null && interval > maxInterval) {
    interval = result.interval = maxInterval;
  }
  var precision = result.intervalPrecision = getIntervalPrecision(interval);
  var niceTickExtent = result.niceTickExtent = [round(Math.ceil(extent[0] / interval) * interval, precision), round(Math.floor(extent[1] / interval) * interval, precision)];
  fixExtent(niceTickExtent, extent);
  return result;
}
function increaseInterval(interval) {
  var exp10 = Math.pow(10, quantityExponent(interval));
  var f = interval / exp10;
  if (!f) {
    f = 1;
  } else if (f === 2) {
    f = 3;
  } else if (f === 3) {
    f = 5;
  } else {
    f *= 2;
  }
  return round(f * exp10);
}
function getIntervalPrecision(interval) {
  return getPrecision(interval) + 2;
}
function clamp(niceTickExtent, idx, extent) {
  niceTickExtent[idx] = Math.max(Math.min(niceTickExtent[idx], extent[1]), extent[0]);
}
function fixExtent(niceTickExtent, extent) {
  !isFinite(niceTickExtent[0]) && (niceTickExtent[0] = extent[0]);
  !isFinite(niceTickExtent[1]) && (niceTickExtent[1] = extent[1]);
  clamp(niceTickExtent, 0, extent);
  clamp(niceTickExtent, 1, extent);
  if (niceTickExtent[0] > niceTickExtent[1]) {
    niceTickExtent[0] = niceTickExtent[1];
  }
}
function contain(val, extent) {
  return val >= extent[0] && val <= extent[1];
}
function normalize(val, extent) {
  if (extent[1] === extent[0]) {
    return 0.5;
  }
  return (val - extent[0]) / (extent[1] - extent[0]);
}
function scale(val, extent) {
  return val * (extent[1] - extent[0]) + extent[0];
}

// C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/node_modules/echarts/lib/scale/Ordinal.js
var OrdinalScale = (
  /** @class */
  function(_super) {
    __extends(OrdinalScale2, _super);
    function OrdinalScale2(setting) {
      var _this = _super.call(this, setting) || this;
      _this.type = "ordinal";
      var ordinalMeta = _this.getSetting("ordinalMeta");
      if (!ordinalMeta) {
        ordinalMeta = new OrdinalMeta_default({});
      }
      if (isArray(ordinalMeta)) {
        ordinalMeta = new OrdinalMeta_default({
          categories: map(ordinalMeta, function(item) {
            return isObject(item) ? item.value : item;
          })
        });
      }
      _this._ordinalMeta = ordinalMeta;
      _this._extent = _this.getSetting("extent") || [0, ordinalMeta.categories.length - 1];
      return _this;
    }
    OrdinalScale2.prototype.parse = function(val) {
      if (val == null) {
        return NaN;
      }
      return isString(val) ? this._ordinalMeta.getOrdinal(val) : Math.round(val);
    };
    OrdinalScale2.prototype.contain = function(rank) {
      rank = this.parse(rank);
      return contain(rank, this._extent) && this._ordinalMeta.categories[rank] != null;
    };
    OrdinalScale2.prototype.normalize = function(val) {
      val = this._getTickNumber(this.parse(val));
      return normalize(val, this._extent);
    };
    OrdinalScale2.prototype.scale = function(val) {
      val = Math.round(scale(val, this._extent));
      return this.getRawOrdinalNumber(val);
    };
    OrdinalScale2.prototype.getTicks = function() {
      var ticks = [];
      var extent = this._extent;
      var rank = extent[0];
      while (rank <= extent[1]) {
        ticks.push({
          value: rank
        });
        rank++;
      }
      return ticks;
    };
    OrdinalScale2.prototype.getMinorTicks = function(splitNumber) {
      return;
    };
    OrdinalScale2.prototype.setSortInfo = function(info) {
      if (info == null) {
        this._ordinalNumbersByTick = this._ticksByOrdinalNumber = null;
        return;
      }
      var infoOrdinalNumbers = info.ordinalNumbers;
      var ordinalsByTick = this._ordinalNumbersByTick = [];
      var ticksByOrdinal = this._ticksByOrdinalNumber = [];
      var tickNum = 0;
      var allCategoryLen = this._ordinalMeta.categories.length;
      for (var len = Math.min(allCategoryLen, infoOrdinalNumbers.length); tickNum < len; ++tickNum) {
        var ordinalNumber = infoOrdinalNumbers[tickNum];
        ordinalsByTick[tickNum] = ordinalNumber;
        ticksByOrdinal[ordinalNumber] = tickNum;
      }
      var unusedOrdinal = 0;
      for (; tickNum < allCategoryLen; ++tickNum) {
        while (ticksByOrdinal[unusedOrdinal] != null) {
          unusedOrdinal++;
        }
        ;
        ordinalsByTick.push(unusedOrdinal);
        ticksByOrdinal[unusedOrdinal] = tickNum;
      }
    };
    OrdinalScale2.prototype._getTickNumber = function(ordinal) {
      var ticksByOrdinalNumber = this._ticksByOrdinalNumber;
      return ticksByOrdinalNumber && ordinal >= 0 && ordinal < ticksByOrdinalNumber.length ? ticksByOrdinalNumber[ordinal] : ordinal;
    };
    OrdinalScale2.prototype.getRawOrdinalNumber = function(tickNumber) {
      var ordinalNumbersByTick = this._ordinalNumbersByTick;
      return ordinalNumbersByTick && tickNumber >= 0 && tickNumber < ordinalNumbersByTick.length ? ordinalNumbersByTick[tickNumber] : tickNumber;
    };
    OrdinalScale2.prototype.getLabel = function(tick) {
      if (!this.isBlank()) {
        var ordinalNumber = this.getRawOrdinalNumber(tick.value);
        var cateogry = this._ordinalMeta.categories[ordinalNumber];
        return cateogry == null ? "" : cateogry + "";
      }
    };
    OrdinalScale2.prototype.count = function() {
      return this._extent[1] - this._extent[0] + 1;
    };
    OrdinalScale2.prototype.unionExtentFromData = function(data, dim) {
      this.unionExtent(data.getApproximateExtent(dim));
    };
    OrdinalScale2.prototype.isInExtentRange = function(value) {
      value = this._getTickNumber(value);
      return this._extent[0] <= value && this._extent[1] >= value;
    };
    OrdinalScale2.prototype.getOrdinalMeta = function() {
      return this._ordinalMeta;
    };
    OrdinalScale2.prototype.calcNiceTicks = function() {
    };
    OrdinalScale2.prototype.calcNiceExtent = function() {
    };
    OrdinalScale2.type = "ordinal";
    return OrdinalScale2;
  }(Scale_default)
);
Scale_default.registerClass(OrdinalScale);
var Ordinal_default = OrdinalScale;

// C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/node_modules/echarts/lib/scale/Interval.js
var roundNumber = round;
var IntervalScale = (
  /** @class */
  function(_super) {
    __extends(IntervalScale2, _super);
    function IntervalScale2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = "interval";
      _this._interval = 0;
      _this._intervalPrecision = 2;
      return _this;
    }
    IntervalScale2.prototype.parse = function(val) {
      return val;
    };
    IntervalScale2.prototype.contain = function(val) {
      return contain(val, this._extent);
    };
    IntervalScale2.prototype.normalize = function(val) {
      return normalize(val, this._extent);
    };
    IntervalScale2.prototype.scale = function(val) {
      return scale(val, this._extent);
    };
    IntervalScale2.prototype.setExtent = function(start, end) {
      var thisExtent = this._extent;
      if (!isNaN(start)) {
        thisExtent[0] = parseFloat(start);
      }
      if (!isNaN(end)) {
        thisExtent[1] = parseFloat(end);
      }
    };
    IntervalScale2.prototype.unionExtent = function(other) {
      var extent = this._extent;
      other[0] < extent[0] && (extent[0] = other[0]);
      other[1] > extent[1] && (extent[1] = other[1]);
      this.setExtent(extent[0], extent[1]);
    };
    IntervalScale2.prototype.getInterval = function() {
      return this._interval;
    };
    IntervalScale2.prototype.setInterval = function(interval) {
      this._interval = interval;
      this._niceExtent = this._extent.slice();
      this._intervalPrecision = getIntervalPrecision(interval);
    };
    IntervalScale2.prototype.getTicks = function(expandToNicedExtent) {
      var interval = this._interval;
      var extent = this._extent;
      var niceTickExtent = this._niceExtent;
      var intervalPrecision = this._intervalPrecision;
      var ticks = [];
      if (!interval) {
        return ticks;
      }
      var safeLimit = 1e4;
      if (extent[0] < niceTickExtent[0]) {
        if (expandToNicedExtent) {
          ticks.push({
            value: roundNumber(niceTickExtent[0] - interval, intervalPrecision)
          });
        } else {
          ticks.push({
            value: extent[0]
          });
        }
      }
      var tick = niceTickExtent[0];
      while (tick <= niceTickExtent[1]) {
        ticks.push({
          value: tick
        });
        tick = roundNumber(tick + interval, intervalPrecision);
        if (tick === ticks[ticks.length - 1].value) {
          break;
        }
        if (ticks.length > safeLimit) {
          return [];
        }
      }
      var lastNiceTick = ticks.length ? ticks[ticks.length - 1].value : niceTickExtent[1];
      if (extent[1] > lastNiceTick) {
        if (expandToNicedExtent) {
          ticks.push({
            value: roundNumber(lastNiceTick + interval, intervalPrecision)
          });
        } else {
          ticks.push({
            value: extent[1]
          });
        }
      }
      return ticks;
    };
    IntervalScale2.prototype.getMinorTicks = function(splitNumber) {
      var ticks = this.getTicks(true);
      var minorTicks = [];
      var extent = this.getExtent();
      for (var i = 1; i < ticks.length; i++) {
        var nextTick = ticks[i];
        var prevTick = ticks[i - 1];
        var count = 0;
        var minorTicksGroup = [];
        var interval = nextTick.value - prevTick.value;
        var minorInterval = interval / splitNumber;
        while (count < splitNumber - 1) {
          var minorTick = roundNumber(prevTick.value + (count + 1) * minorInterval);
          if (minorTick > extent[0] && minorTick < extent[1]) {
            minorTicksGroup.push(minorTick);
          }
          count++;
        }
        minorTicks.push(minorTicksGroup);
      }
      return minorTicks;
    };
    IntervalScale2.prototype.getLabel = function(data, opt) {
      if (data == null) {
        return "";
      }
      var precision = opt && opt.precision;
      if (precision == null) {
        precision = getPrecision(data.value) || 0;
      } else if (precision === "auto") {
        precision = this._intervalPrecision;
      }
      var dataNum = roundNumber(data.value, precision, true);
      return addCommas(dataNum);
    };
    IntervalScale2.prototype.calcNiceTicks = function(splitNumber, minInterval, maxInterval) {
      splitNumber = splitNumber || 5;
      var extent = this._extent;
      var span = extent[1] - extent[0];
      if (!isFinite(span)) {
        return;
      }
      if (span < 0) {
        span = -span;
        extent.reverse();
      }
      var result = intervalScaleNiceTicks(extent, splitNumber, minInterval, maxInterval);
      this._intervalPrecision = result.intervalPrecision;
      this._interval = result.interval;
      this._niceExtent = result.niceTickExtent;
    };
    IntervalScale2.prototype.calcNiceExtent = function(opt) {
      var extent = this._extent;
      if (extent[0] === extent[1]) {
        if (extent[0] !== 0) {
          var expandSize = Math.abs(extent[0]);
          if (!opt.fixMax) {
            extent[1] += expandSize / 2;
            extent[0] -= expandSize / 2;
          } else {
            extent[0] -= expandSize / 2;
          }
        } else {
          extent[1] = 1;
        }
      }
      var span = extent[1] - extent[0];
      if (!isFinite(span)) {
        extent[0] = 0;
        extent[1] = 1;
      }
      this.calcNiceTicks(opt.splitNumber, opt.minInterval, opt.maxInterval);
      var interval = this._interval;
      if (!opt.fixMin) {
        extent[0] = roundNumber(Math.floor(extent[0] / interval) * interval);
      }
      if (!opt.fixMax) {
        extent[1] = roundNumber(Math.ceil(extent[1] / interval) * interval);
      }
    };
    IntervalScale2.prototype.setNiceExtent = function(min, max) {
      this._niceExtent = [min, max];
    };
    IntervalScale2.type = "interval";
    return IntervalScale2;
  }(Scale_default)
);
Scale_default.registerClass(IntervalScale);
var Interval_default = IntervalScale;

// C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/node_modules/echarts/lib/scale/Time.js
var bisect = function(a, x, lo, hi) {
  while (lo < hi) {
    var mid = lo + hi >>> 1;
    if (a[mid][1] < x) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  return lo;
};
var TimeScale = (
  /** @class */
  function(_super) {
    __extends(TimeScale2, _super);
    function TimeScale2(settings) {
      var _this = _super.call(this, settings) || this;
      _this.type = "time";
      return _this;
    }
    TimeScale2.prototype.getLabel = function(tick) {
      var useUTC = this.getSetting("useUTC");
      return format(tick.value, fullLeveledFormatter[getDefaultFormatPrecisionOfInterval(getPrimaryTimeUnit(this._minLevelUnit))] || fullLeveledFormatter.second, useUTC, this.getSetting("locale"));
    };
    TimeScale2.prototype.getFormattedLabel = function(tick, idx, labelFormatter) {
      var isUTC = this.getSetting("useUTC");
      var lang = this.getSetting("locale");
      return leveledFormat(tick, idx, labelFormatter, lang, isUTC);
    };
    TimeScale2.prototype.getTicks = function() {
      var interval = this._interval;
      var extent = this._extent;
      var ticks = [];
      if (!interval) {
        return ticks;
      }
      ticks.push({
        value: extent[0],
        level: 0
      });
      var useUTC = this.getSetting("useUTC");
      var innerTicks = getIntervalTicks(this._minLevelUnit, this._approxInterval, useUTC, extent);
      ticks = ticks.concat(innerTicks);
      ticks.push({
        value: extent[1],
        level: 0
      });
      return ticks;
    };
    TimeScale2.prototype.calcNiceExtent = function(opt) {
      var extent = this._extent;
      if (extent[0] === extent[1]) {
        extent[0] -= ONE_DAY;
        extent[1] += ONE_DAY;
      }
      if (extent[1] === -Infinity && extent[0] === Infinity) {
        var d = /* @__PURE__ */ new Date();
        extent[1] = +new Date(d.getFullYear(), d.getMonth(), d.getDate());
        extent[0] = extent[1] - ONE_DAY;
      }
      this.calcNiceTicks(opt.splitNumber, opt.minInterval, opt.maxInterval);
    };
    TimeScale2.prototype.calcNiceTicks = function(approxTickNum, minInterval, maxInterval) {
      approxTickNum = approxTickNum || 10;
      var extent = this._extent;
      var span = extent[1] - extent[0];
      this._approxInterval = span / approxTickNum;
      if (minInterval != null && this._approxInterval < minInterval) {
        this._approxInterval = minInterval;
      }
      if (maxInterval != null && this._approxInterval > maxInterval) {
        this._approxInterval = maxInterval;
      }
      var scaleIntervalsLen = scaleIntervals.length;
      var idx = Math.min(bisect(scaleIntervals, this._approxInterval, 0, scaleIntervalsLen), scaleIntervalsLen - 1);
      this._interval = scaleIntervals[idx][1];
      this._minLevelUnit = scaleIntervals[Math.max(idx - 1, 0)][0];
    };
    TimeScale2.prototype.parse = function(val) {
      return isNumber(val) ? val : +parseDate(val);
    };
    TimeScale2.prototype.contain = function(val) {
      return contain(this.parse(val), this._extent);
    };
    TimeScale2.prototype.normalize = function(val) {
      return normalize(this.parse(val), this._extent);
    };
    TimeScale2.prototype.scale = function(val) {
      return scale(val, this._extent);
    };
    TimeScale2.type = "time";
    return TimeScale2;
  }(Interval_default)
);
var scaleIntervals = [
  // Format                           interval
  ["second", ONE_SECOND],
  ["minute", ONE_MINUTE],
  ["hour", ONE_HOUR],
  ["quarter-day", ONE_HOUR * 6],
  ["half-day", ONE_HOUR * 12],
  ["day", ONE_DAY * 1.2],
  ["half-week", ONE_DAY * 3.5],
  ["week", ONE_DAY * 7],
  ["month", ONE_DAY * 31],
  ["quarter", ONE_DAY * 95],
  ["half-year", ONE_YEAR / 2],
  ["year", ONE_YEAR]
  // 1Y
];
function isUnitValueSame(unit, valueA, valueB, isUTC) {
  var dateA = parseDate(valueA);
  var dateB = parseDate(valueB);
  var isSame = function(unit2) {
    return getUnitValue(dateA, unit2, isUTC) === getUnitValue(dateB, unit2, isUTC);
  };
  var isSameYear = function() {
    return isSame("year");
  };
  var isSameMonth = function() {
    return isSameYear() && isSame("month");
  };
  var isSameDay = function() {
    return isSameMonth() && isSame("day");
  };
  var isSameHour = function() {
    return isSameDay() && isSame("hour");
  };
  var isSameMinute = function() {
    return isSameHour() && isSame("minute");
  };
  var isSameSecond = function() {
    return isSameMinute() && isSame("second");
  };
  var isSameMilliSecond = function() {
    return isSameSecond() && isSame("millisecond");
  };
  switch (unit) {
    case "year":
      return isSameYear();
    case "month":
      return isSameMonth();
    case "day":
      return isSameDay();
    case "hour":
      return isSameHour();
    case "minute":
      return isSameMinute();
    case "second":
      return isSameSecond();
    case "millisecond":
      return isSameMilliSecond();
  }
}
function getDateInterval(approxInterval, daysInMonth) {
  approxInterval /= ONE_DAY;
  return approxInterval > 16 ? 16 : approxInterval > 7.5 ? 7 : approxInterval > 3.5 ? 4 : approxInterval > 1.5 ? 2 : 1;
}
function getMonthInterval(approxInterval) {
  var APPROX_ONE_MONTH = 30 * ONE_DAY;
  approxInterval /= APPROX_ONE_MONTH;
  return approxInterval > 6 ? 6 : approxInterval > 3 ? 3 : approxInterval > 2 ? 2 : 1;
}
function getHourInterval(approxInterval) {
  approxInterval /= ONE_HOUR;
  return approxInterval > 12 ? 12 : approxInterval > 6 ? 6 : approxInterval > 3.5 ? 4 : approxInterval > 2 ? 2 : 1;
}
function getMinutesAndSecondsInterval(approxInterval, isMinutes) {
  approxInterval /= isMinutes ? ONE_MINUTE : ONE_SECOND;
  return approxInterval > 30 ? 30 : approxInterval > 20 ? 20 : approxInterval > 15 ? 15 : approxInterval > 10 ? 10 : approxInterval > 5 ? 5 : approxInterval > 2 ? 2 : 1;
}
function getMillisecondsInterval(approxInterval) {
  return nice(approxInterval, true);
}
function getFirstTimestampOfUnit(date, unitName, isUTC) {
  var outDate = new Date(date);
  switch (getPrimaryTimeUnit(unitName)) {
    case "year":
    case "month":
      outDate[monthSetterName(isUTC)](0);
    case "day":
      outDate[dateSetterName(isUTC)](1);
    case "hour":
      outDate[hoursSetterName(isUTC)](0);
    case "minute":
      outDate[minutesSetterName(isUTC)](0);
    case "second":
      outDate[secondsSetterName(isUTC)](0);
      outDate[millisecondsSetterName(isUTC)](0);
  }
  return outDate.getTime();
}
function getIntervalTicks(bottomUnitName, approxInterval, isUTC, extent) {
  var safeLimit = 1e4;
  var unitNames = timeUnits;
  var iter = 0;
  function addTicksInSpan(interval, minTimestamp, maxTimestamp, getMethodName, setMethodName, isDate, out) {
    var date = new Date(minTimestamp);
    var dateTime = minTimestamp;
    var d = date[getMethodName]();
    while (dateTime < maxTimestamp && dateTime <= extent[1]) {
      out.push({
        value: dateTime
      });
      d += interval;
      date[setMethodName](d);
      dateTime = date.getTime();
    }
    out.push({
      value: dateTime,
      notAdd: true
    });
  }
  function addLevelTicks(unitName, lastLevelTicks, levelTicks2) {
    var newAddedTicks = [];
    var isFirstLevel = !lastLevelTicks.length;
    if (isUnitValueSame(getPrimaryTimeUnit(unitName), extent[0], extent[1], isUTC)) {
      return;
    }
    if (isFirstLevel) {
      lastLevelTicks = [{
        // TODO Optimize. Not include so may ticks.
        value: getFirstTimestampOfUnit(new Date(extent[0]), unitName, isUTC)
      }, {
        value: extent[1]
      }];
    }
    for (var i2 = 0; i2 < lastLevelTicks.length - 1; i2++) {
      var startTick = lastLevelTicks[i2].value;
      var endTick = lastLevelTicks[i2 + 1].value;
      if (startTick === endTick) {
        continue;
      }
      var interval = void 0;
      var getterName = void 0;
      var setterName = void 0;
      var isDate = false;
      switch (unitName) {
        case "year":
          interval = Math.max(1, Math.round(approxInterval / ONE_DAY / 365));
          getterName = fullYearGetterName(isUTC);
          setterName = fullYearSetterName(isUTC);
          break;
        case "half-year":
        case "quarter":
        case "month":
          interval = getMonthInterval(approxInterval);
          getterName = monthGetterName(isUTC);
          setterName = monthSetterName(isUTC);
          break;
        case "week":
        case "half-week":
        case "day":
          interval = getDateInterval(approxInterval, 31);
          getterName = dateGetterName(isUTC);
          setterName = dateSetterName(isUTC);
          isDate = true;
          break;
        case "half-day":
        case "quarter-day":
        case "hour":
          interval = getHourInterval(approxInterval);
          getterName = hoursGetterName(isUTC);
          setterName = hoursSetterName(isUTC);
          break;
        case "minute":
          interval = getMinutesAndSecondsInterval(approxInterval, true);
          getterName = minutesGetterName(isUTC);
          setterName = minutesSetterName(isUTC);
          break;
        case "second":
          interval = getMinutesAndSecondsInterval(approxInterval, false);
          getterName = secondsGetterName(isUTC);
          setterName = secondsSetterName(isUTC);
          break;
        case "millisecond":
          interval = getMillisecondsInterval(approxInterval);
          getterName = millisecondsGetterName(isUTC);
          setterName = millisecondsSetterName(isUTC);
          break;
      }
      addTicksInSpan(interval, startTick, endTick, getterName, setterName, isDate, newAddedTicks);
      if (unitName === "year" && levelTicks2.length > 1 && i2 === 0) {
        levelTicks2.unshift({
          value: levelTicks2[0].value - interval
        });
      }
    }
    for (var i2 = 0; i2 < newAddedTicks.length; i2++) {
      levelTicks2.push(newAddedTicks[i2]);
    }
    return newAddedTicks;
  }
  var levelsTicks = [];
  var currentLevelTicks = [];
  var tickCount = 0;
  var lastLevelTickCount = 0;
  for (var i = 0; i < unitNames.length && iter++ < safeLimit; ++i) {
    var primaryTimeUnit = getPrimaryTimeUnit(unitNames[i]);
    if (!isPrimaryTimeUnit(unitNames[i])) {
      continue;
    }
    addLevelTicks(unitNames[i], levelsTicks[levelsTicks.length - 1] || [], currentLevelTicks);
    var nextPrimaryTimeUnit = unitNames[i + 1] ? getPrimaryTimeUnit(unitNames[i + 1]) : null;
    if (primaryTimeUnit !== nextPrimaryTimeUnit) {
      if (currentLevelTicks.length) {
        lastLevelTickCount = tickCount;
        currentLevelTicks.sort(function(a, b) {
          return a.value - b.value;
        });
        var levelTicksRemoveDuplicated = [];
        for (var i_1 = 0; i_1 < currentLevelTicks.length; ++i_1) {
          var tickValue = currentLevelTicks[i_1].value;
          if (i_1 === 0 || currentLevelTicks[i_1 - 1].value !== tickValue) {
            levelTicksRemoveDuplicated.push(currentLevelTicks[i_1]);
            if (tickValue >= extent[0] && tickValue <= extent[1]) {
              tickCount++;
            }
          }
        }
        var targetTickNum = (extent[1] - extent[0]) / approxInterval;
        if (tickCount > targetTickNum * 1.5 && lastLevelTickCount > targetTickNum / 1.5) {
          break;
        }
        levelsTicks.push(levelTicksRemoveDuplicated);
        if (tickCount > targetTickNum || bottomUnitName === unitNames[i]) {
          break;
        }
      }
      currentLevelTicks = [];
    }
  }
  if (true) {
    if (iter >= safeLimit) {
      warn("Exceed safe limit.");
    }
  }
  var levelsTicksInExtent = filter(map(levelsTicks, function(levelTicks2) {
    return filter(levelTicks2, function(tick) {
      return tick.value >= extent[0] && tick.value <= extent[1] && !tick.notAdd;
    });
  }), function(levelTicks2) {
    return levelTicks2.length > 0;
  });
  var ticks = [];
  var maxLevel = levelsTicksInExtent.length - 1;
  for (var i = 0; i < levelsTicksInExtent.length; ++i) {
    var levelTicks = levelsTicksInExtent[i];
    for (var k = 0; k < levelTicks.length; ++k) {
      ticks.push({
        value: levelTicks[k].value,
        level: maxLevel - i
      });
    }
  }
  ticks.sort(function(a, b) {
    return a.value - b.value;
  });
  var result = [];
  for (var i = 0; i < ticks.length; ++i) {
    if (i === 0 || ticks[i].value !== ticks[i - 1].value) {
      result.push(ticks[i]);
    }
  }
  return result;
}
Scale_default.registerClass(TimeScale);
var Time_default = TimeScale;

// C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/node_modules/echarts/lib/scale/Log.js
var scaleProto = Scale_default.prototype;
var intervalScaleProto = Interval_default.prototype;
var roundingErrorFix = round;
var mathFloor = Math.floor;
var mathCeil = Math.ceil;
var mathPow = Math.pow;
var mathLog = Math.log;
var LogScale = (
  /** @class */
  function(_super) {
    __extends(LogScale2, _super);
    function LogScale2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = "log";
      _this.base = 10;
      _this._originalScale = new Interval_default();
      _this._interval = 0;
      return _this;
    }
    LogScale2.prototype.getTicks = function(expandToNicedExtent) {
      var originalScale = this._originalScale;
      var extent = this._extent;
      var originalExtent = originalScale.getExtent();
      var ticks = intervalScaleProto.getTicks.call(this, expandToNicedExtent);
      return map(ticks, function(tick) {
        var val = tick.value;
        var powVal = round(mathPow(this.base, val));
        powVal = val === extent[0] && this._fixMin ? fixRoundingError(powVal, originalExtent[0]) : powVal;
        powVal = val === extent[1] && this._fixMax ? fixRoundingError(powVal, originalExtent[1]) : powVal;
        return {
          value: powVal
        };
      }, this);
    };
    LogScale2.prototype.setExtent = function(start, end) {
      var base = mathLog(this.base);
      start = mathLog(Math.max(0, start)) / base;
      end = mathLog(Math.max(0, end)) / base;
      intervalScaleProto.setExtent.call(this, start, end);
    };
    LogScale2.prototype.getExtent = function() {
      var base = this.base;
      var extent = scaleProto.getExtent.call(this);
      extent[0] = mathPow(base, extent[0]);
      extent[1] = mathPow(base, extent[1]);
      var originalScale = this._originalScale;
      var originalExtent = originalScale.getExtent();
      this._fixMin && (extent[0] = fixRoundingError(extent[0], originalExtent[0]));
      this._fixMax && (extent[1] = fixRoundingError(extent[1], originalExtent[1]));
      return extent;
    };
    LogScale2.prototype.unionExtent = function(extent) {
      this._originalScale.unionExtent(extent);
      var base = this.base;
      extent[0] = mathLog(extent[0]) / mathLog(base);
      extent[1] = mathLog(extent[1]) / mathLog(base);
      scaleProto.unionExtent.call(this, extent);
    };
    LogScale2.prototype.unionExtentFromData = function(data, dim) {
      this.unionExtent(data.getApproximateExtent(dim));
    };
    LogScale2.prototype.calcNiceTicks = function(approxTickNum) {
      approxTickNum = approxTickNum || 10;
      var extent = this._extent;
      var span = extent[1] - extent[0];
      if (span === Infinity || span <= 0) {
        return;
      }
      var interval = quantity(span);
      var err = approxTickNum / span * interval;
      if (err <= 0.5) {
        interval *= 10;
      }
      while (!isNaN(interval) && Math.abs(interval) < 1 && Math.abs(interval) > 0) {
        interval *= 10;
      }
      var niceExtent = [round(mathCeil(extent[0] / interval) * interval), round(mathFloor(extent[1] / interval) * interval)];
      this._interval = interval;
      this._niceExtent = niceExtent;
    };
    LogScale2.prototype.calcNiceExtent = function(opt) {
      intervalScaleProto.calcNiceExtent.call(this, opt);
      this._fixMin = opt.fixMin;
      this._fixMax = opt.fixMax;
    };
    LogScale2.prototype.parse = function(val) {
      return val;
    };
    LogScale2.prototype.contain = function(val) {
      val = mathLog(val) / mathLog(this.base);
      return contain(val, this._extent);
    };
    LogScale2.prototype.normalize = function(val) {
      val = mathLog(val) / mathLog(this.base);
      return normalize(val, this._extent);
    };
    LogScale2.prototype.scale = function(val) {
      val = scale(val, this._extent);
      return mathPow(this.base, val);
    };
    LogScale2.type = "log";
    return LogScale2;
  }(Scale_default)
);
var proto = LogScale.prototype;
proto.getMinorTicks = intervalScaleProto.getMinorTicks;
proto.getLabel = intervalScaleProto.getLabel;
function fixRoundingError(val, originalVal) {
  return roundingErrorFix(val, getPrecision(originalVal));
}
Scale_default.registerClass(LogScale);
var Log_default = LogScale;

// C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/node_modules/echarts/lib/coord/scaleRawExtentInfo.js
var ScaleRawExtentInfo = (
  /** @class */
  function() {
    function ScaleRawExtentInfo2(scale2, model, originalExtent) {
      this._prepareParams(scale2, model, originalExtent);
    }
    ScaleRawExtentInfo2.prototype._prepareParams = function(scale2, model, dataExtent) {
      if (dataExtent[1] < dataExtent[0]) {
        dataExtent = [NaN, NaN];
      }
      this._dataMin = dataExtent[0];
      this._dataMax = dataExtent[1];
      var isOrdinal = this._isOrdinal = scale2.type === "ordinal";
      this._needCrossZero = scale2.type === "interval" && model.getNeedCrossZero && model.getNeedCrossZero();
      var modelMinRaw = this._modelMinRaw = model.get("min", true);
      if (isFunction(modelMinRaw)) {
        this._modelMinNum = parseAxisModelMinMax(scale2, modelMinRaw({
          min: dataExtent[0],
          max: dataExtent[1]
        }));
      } else if (modelMinRaw !== "dataMin") {
        this._modelMinNum = parseAxisModelMinMax(scale2, modelMinRaw);
      }
      var modelMaxRaw = this._modelMaxRaw = model.get("max", true);
      if (isFunction(modelMaxRaw)) {
        this._modelMaxNum = parseAxisModelMinMax(scale2, modelMaxRaw({
          min: dataExtent[0],
          max: dataExtent[1]
        }));
      } else if (modelMaxRaw !== "dataMax") {
        this._modelMaxNum = parseAxisModelMinMax(scale2, modelMaxRaw);
      }
      if (isOrdinal) {
        this._axisDataLen = model.getCategories().length;
      } else {
        var boundaryGap = model.get("boundaryGap");
        var boundaryGapArr = isArray(boundaryGap) ? boundaryGap : [boundaryGap || 0, boundaryGap || 0];
        if (typeof boundaryGapArr[0] === "boolean" || typeof boundaryGapArr[1] === "boolean") {
          if (true) {
            console.warn('Boolean type for boundaryGap is only allowed for ordinal axis. Please use string in percentage instead, e.g., "20%". Currently, boundaryGap is set to be 0.');
          }
          this._boundaryGapInner = [0, 0];
        } else {
          this._boundaryGapInner = [parsePercent(boundaryGapArr[0], 1), parsePercent(boundaryGapArr[1], 1)];
        }
      }
    };
    ScaleRawExtentInfo2.prototype.calculate = function() {
      var isOrdinal = this._isOrdinal;
      var dataMin = this._dataMin;
      var dataMax = this._dataMax;
      var axisDataLen = this._axisDataLen;
      var boundaryGapInner = this._boundaryGapInner;
      var span = !isOrdinal ? dataMax - dataMin || Math.abs(dataMin) : null;
      var min = this._modelMinRaw === "dataMin" ? dataMin : this._modelMinNum;
      var max = this._modelMaxRaw === "dataMax" ? dataMax : this._modelMaxNum;
      var minFixed = min != null;
      var maxFixed = max != null;
      if (min == null) {
        min = isOrdinal ? axisDataLen ? 0 : NaN : dataMin - boundaryGapInner[0] * span;
      }
      if (max == null) {
        max = isOrdinal ? axisDataLen ? axisDataLen - 1 : NaN : dataMax + boundaryGapInner[1] * span;
      }
      (min == null || !isFinite(min)) && (min = NaN);
      (max == null || !isFinite(max)) && (max = NaN);
      var isBlank = eqNaN(min) || eqNaN(max) || isOrdinal && !axisDataLen;
      if (this._needCrossZero) {
        if (min > 0 && max > 0 && !minFixed) {
          min = 0;
        }
        if (min < 0 && max < 0 && !maxFixed) {
          max = 0;
        }
      }
      var determinedMin = this._determinedMin;
      var determinedMax = this._determinedMax;
      if (determinedMin != null) {
        min = determinedMin;
        minFixed = true;
      }
      if (determinedMax != null) {
        max = determinedMax;
        maxFixed = true;
      }
      return {
        min,
        max,
        minFixed,
        maxFixed,
        isBlank
      };
    };
    ScaleRawExtentInfo2.prototype.modifyDataMinMax = function(minMaxName, val) {
      if (true) {
        assert(!this.frozen);
      }
      this[DATA_MIN_MAX_ATTR[minMaxName]] = val;
    };
    ScaleRawExtentInfo2.prototype.setDeterminedMinMax = function(minMaxName, val) {
      var attr = DETERMINED_MIN_MAX_ATTR[minMaxName];
      if (true) {
        assert(!this.frozen && this[attr] == null);
      }
      this[attr] = val;
    };
    ScaleRawExtentInfo2.prototype.freeze = function() {
      this.frozen = true;
    };
    return ScaleRawExtentInfo2;
  }()
);
var DETERMINED_MIN_MAX_ATTR = {
  min: "_determinedMin",
  max: "_determinedMax"
};
var DATA_MIN_MAX_ATTR = {
  min: "_dataMin",
  max: "_dataMax"
};
function ensureScaleRawExtentInfo(scale2, model, originalExtent) {
  var rawExtentInfo = scale2.rawExtentInfo;
  if (rawExtentInfo) {
    return rawExtentInfo;
  }
  rawExtentInfo = new ScaleRawExtentInfo(scale2, model, originalExtent);
  scale2.rawExtentInfo = rawExtentInfo;
  return rawExtentInfo;
}
function parseAxisModelMinMax(scale2, minMax) {
  return minMax == null ? null : eqNaN(minMax) ? NaN : scale2.parse(minMax);
}

// C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/node_modules/echarts/lib/coord/axisHelper.js
function getScaleExtent(scale2, model) {
  var scaleType = scale2.type;
  var rawExtentResult = ensureScaleRawExtentInfo(scale2, model, scale2.getExtent()).calculate();
  scale2.setBlank(rawExtentResult.isBlank);
  var min = rawExtentResult.min;
  var max = rawExtentResult.max;
  var ecModel = model.ecModel;
  if (ecModel && scaleType === "time") {
    var barSeriesModels = prepareLayoutBarSeries("bar", ecModel);
    var isBaseAxisAndHasBarSeries_1 = false;
    each(barSeriesModels, function(seriesModel) {
      isBaseAxisAndHasBarSeries_1 = isBaseAxisAndHasBarSeries_1 || seriesModel.getBaseAxis() === model.axis;
    });
    if (isBaseAxisAndHasBarSeries_1) {
      var barWidthAndOffset = makeColumnLayout(barSeriesModels);
      var adjustedScale = adjustScaleForOverflow(min, max, model, barWidthAndOffset);
      min = adjustedScale.min;
      max = adjustedScale.max;
    }
  }
  return {
    extent: [min, max],
    // "fix" means "fixed", the value should not be
    // changed in the subsequent steps.
    fixMin: rawExtentResult.minFixed,
    fixMax: rawExtentResult.maxFixed
  };
}
function adjustScaleForOverflow(min, max, model, barWidthAndOffset) {
  var axisExtent = model.axis.getExtent();
  var axisLength = axisExtent[1] - axisExtent[0];
  var barsOnCurrentAxis = retrieveColumnLayout(barWidthAndOffset, model.axis);
  if (barsOnCurrentAxis === void 0) {
    return {
      min,
      max
    };
  }
  var minOverflow = Infinity;
  each(barsOnCurrentAxis, function(item) {
    minOverflow = Math.min(item.offset, minOverflow);
  });
  var maxOverflow = -Infinity;
  each(barsOnCurrentAxis, function(item) {
    maxOverflow = Math.max(item.offset + item.width, maxOverflow);
  });
  minOverflow = Math.abs(minOverflow);
  maxOverflow = Math.abs(maxOverflow);
  var totalOverFlow = minOverflow + maxOverflow;
  var oldRange = max - min;
  var oldRangePercentOfNew = 1 - (minOverflow + maxOverflow) / axisLength;
  var overflowBuffer = oldRange / oldRangePercentOfNew - oldRange;
  max += overflowBuffer * (maxOverflow / totalOverFlow);
  min -= overflowBuffer * (minOverflow / totalOverFlow);
  return {
    min,
    max
  };
}
function niceScaleExtent(scale2, inModel) {
  var model = inModel;
  var extentInfo = getScaleExtent(scale2, model);
  var extent = extentInfo.extent;
  var splitNumber = model.get("splitNumber");
  if (scale2 instanceof Log_default) {
    scale2.base = model.get("logBase");
  }
  var scaleType = scale2.type;
  var interval = model.get("interval");
  var isIntervalOrTime = scaleType === "interval" || scaleType === "time";
  scale2.setExtent(extent[0], extent[1]);
  scale2.calcNiceExtent({
    splitNumber,
    fixMin: extentInfo.fixMin,
    fixMax: extentInfo.fixMax,
    minInterval: isIntervalOrTime ? model.get("minInterval") : null,
    maxInterval: isIntervalOrTime ? model.get("maxInterval") : null
  });
  if (interval != null) {
    scale2.setInterval && scale2.setInterval(interval);
  }
}
function createScaleByModel(model, axisType) {
  axisType = axisType || model.get("type");
  if (axisType) {
    switch (axisType) {
      case "category":
        return new Ordinal_default({
          ordinalMeta: model.getOrdinalMeta ? model.getOrdinalMeta() : model.getCategories(),
          extent: [Infinity, -Infinity]
        });
      case "time":
        return new Time_default({
          locale: model.ecModel.getLocaleModel(),
          useUTC: model.ecModel.get("useUTC")
        });
      default:
        return new (Scale_default.getClass(axisType) || Interval_default)();
    }
  }
}
function ifAxisCrossZero(axis) {
  var dataExtent = axis.scale.getExtent();
  var min = dataExtent[0];
  var max = dataExtent[1];
  return !(min > 0 && max > 0 || min < 0 && max < 0);
}
function makeLabelFormatter(axis) {
  var labelFormatter = axis.getLabelModel().get("formatter");
  var categoryTickStart = axis.type === "category" ? axis.scale.getExtent()[0] : null;
  if (axis.scale.type === "time") {
    return function(tpl) {
      return function(tick, idx) {
        return axis.scale.getFormattedLabel(tick, idx, tpl);
      };
    }(labelFormatter);
  } else if (isString(labelFormatter)) {
    return function(tpl) {
      return function(tick) {
        var label = axis.scale.getLabel(tick);
        var text = tpl.replace("{value}", label != null ? label : "");
        return text;
      };
    }(labelFormatter);
  } else if (isFunction(labelFormatter)) {
    return function(cb) {
      return function(tick, idx) {
        if (categoryTickStart != null) {
          idx = tick.value - categoryTickStart;
        }
        return cb(getAxisRawValue(axis, tick), idx, tick.level != null ? {
          level: tick.level
        } : null);
      };
    }(labelFormatter);
  } else {
    return function(tick) {
      return axis.scale.getLabel(tick);
    };
  }
}
function getAxisRawValue(axis, tick) {
  return axis.type === "category" ? axis.scale.getLabel(tick) : tick.value;
}
function estimateLabelUnionRect(axis) {
  var axisModel = axis.model;
  var scale2 = axis.scale;
  if (!axisModel.get(["axisLabel", "show"]) || scale2.isBlank()) {
    return;
  }
  var realNumberScaleTicks;
  var tickCount;
  var categoryScaleExtent = scale2.getExtent();
  if (scale2 instanceof Ordinal_default) {
    tickCount = scale2.count();
  } else {
    realNumberScaleTicks = scale2.getTicks();
    tickCount = realNumberScaleTicks.length;
  }
  var axisLabelModel = axis.getLabelModel();
  var labelFormatter = makeLabelFormatter(axis);
  var rect;
  var step = 1;
  if (tickCount > 40) {
    step = Math.ceil(tickCount / 40);
  }
  for (var i = 0; i < tickCount; i += step) {
    var tick = realNumberScaleTicks ? realNumberScaleTicks[i] : {
      value: categoryScaleExtent[0] + i
    };
    var label = labelFormatter(tick, i);
    var unrotatedSingleRect = axisLabelModel.getTextRect(label);
    var singleRect = rotateTextRect(unrotatedSingleRect, axisLabelModel.get("rotate") || 0);
    rect ? rect.union(singleRect) : rect = singleRect;
  }
  return rect;
}
function rotateTextRect(textRect, rotate) {
  var rotateRadians = rotate * Math.PI / 180;
  var beforeWidth = textRect.width;
  var beforeHeight = textRect.height;
  var afterWidth = beforeWidth * Math.abs(Math.cos(rotateRadians)) + Math.abs(beforeHeight * Math.sin(rotateRadians));
  var afterHeight = beforeWidth * Math.abs(Math.sin(rotateRadians)) + Math.abs(beforeHeight * Math.cos(rotateRadians));
  var rotatedRect = new BoundingRect_default(textRect.x, textRect.y, afterWidth, afterHeight);
  return rotatedRect;
}
function getOptionCategoryInterval(model) {
  var interval = model.get("interval");
  return interval == null ? "auto" : interval;
}
function shouldShowAllLabels(axis) {
  return axis.type === "category" && getOptionCategoryInterval(axis.getLabelModel()) === 0;
}
function getDataDimensionsOnAxis(data, axisDim) {
  var dataDimMap = {};
  each(data.mapDimensionsAll(axisDim), function(dataDim) {
    dataDimMap[getStackedDimension(data, dataDim)] = true;
  });
  return keys(dataDimMap);
}
function unionAxisExtentFromData(dataExtent, data, axisDim) {
  if (data) {
    each(getDataDimensionsOnAxis(data, axisDim), function(dim) {
      var seriesExtent = data.getApproximateExtent(dim);
      seriesExtent[0] < dataExtent[0] && (dataExtent[0] = seriesExtent[0]);
      seriesExtent[1] > dataExtent[1] && (dataExtent[1] = seriesExtent[1]);
    });
  }
}

export {
  OrdinalMeta_default,
  isValueNice,
  isIntervalOrLogScale,
  increaseInterval,
  Ordinal_default,
  Interval_default,
  getLayoutOnAxis,
  layout,
  createProgressiveLayout,
  Time_default,
  ensureScaleRawExtentInfo,
  getScaleExtent,
  niceScaleExtent,
  createScaleByModel,
  ifAxisCrossZero,
  makeLabelFormatter,
  getAxisRawValue,
  estimateLabelUnionRect,
  getOptionCategoryInterval,
  shouldShowAllLabels,
  getDataDimensionsOnAxis,
  unionAxisExtentFromData
};
//# sourceMappingURL=chunk-7A2PS5GB.js.map
