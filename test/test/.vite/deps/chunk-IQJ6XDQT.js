import {
  createSeriesData_default
} from "./chunk-HHC5UO4T.js";
import {
  SymbolDraw_default,
  Symbol_default,
  getDefaultInterpolatedLabel,
  getDefaultLabel,
  isCoordinateSystemType
} from "./chunk-VTQYKTMY.js";
import {
  createFloat32Array,
  isDimensionStacked
} from "./chunk-QIVV2LDS.js";
import {
  Chart_default,
  createRenderPlanner,
  createSymbol
} from "./chunk-HZWDB7D3.js";
import {
  Group_default,
  LinearGradient_default,
  SPECIAL_STATES,
  Sector_default,
  Series_default,
  convertToColorString,
  getECData,
  getLabelStatesModels,
  initProps,
  interpolateRawValues,
  labelInner,
  queryDataIndex,
  round,
  setLabelStyle,
  setStatesFlag,
  setStatesStylesFromModel,
  toggleHoverEmphasis,
  updateProps
} from "./chunk-PFGJLZCD.js";
import {
  PathProxy_default,
  Path_default,
  Rect_default,
  Text_default,
  __extends,
  cubicAt,
  cubicRootAt,
  defaults,
  each,
  isFunction,
  isNumber,
  isString,
  lerp2 as lerp,
  map
} from "./chunk-QHW63D3G.js";

// C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/node_modules/echarts/lib/chart/line/LineSeries.js
var LineSeriesModel = (
  /** @class */
  function(_super) {
    __extends(LineSeriesModel2, _super);
    function LineSeriesModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = LineSeriesModel2.type;
      _this.hasSymbolVisual = true;
      return _this;
    }
    LineSeriesModel2.prototype.getInitialData = function(option) {
      if (true) {
        var coordSys = option.coordinateSystem;
        if (coordSys !== "polar" && coordSys !== "cartesian2d") {
          throw new Error("Line not support coordinateSystem besides cartesian and polar");
        }
      }
      return createSeriesData_default(null, this, {
        useEncodeDefaulter: true
      });
    };
    LineSeriesModel2.prototype.getLegendIcon = function(opt) {
      var group = new Group_default();
      var line = createSymbol("line", 0, opt.itemHeight / 2, opt.itemWidth, 0, opt.lineStyle.stroke, false);
      group.add(line);
      line.setStyle(opt.lineStyle);
      var visualType = this.getData().getVisual("symbol");
      var visualRotate = this.getData().getVisual("symbolRotate");
      var symbolType = visualType === "none" ? "circle" : visualType;
      var size = opt.itemHeight * 0.8;
      var symbol = createSymbol(symbolType, (opt.itemWidth - size) / 2, (opt.itemHeight - size) / 2, size, size, opt.itemStyle.fill);
      group.add(symbol);
      symbol.setStyle(opt.itemStyle);
      var symbolRotate = opt.iconRotate === "inherit" ? visualRotate : opt.iconRotate || 0;
      symbol.rotation = symbolRotate * Math.PI / 180;
      symbol.setOrigin([opt.itemWidth / 2, opt.itemHeight / 2]);
      if (symbolType.indexOf("empty") > -1) {
        symbol.style.stroke = symbol.style.fill;
        symbol.style.fill = "#fff";
        symbol.style.lineWidth = 2;
      }
      return group;
    };
    LineSeriesModel2.type = "series.line";
    LineSeriesModel2.dependencies = ["grid", "polar"];
    LineSeriesModel2.defaultOption = {
      // zlevel: 0,
      z: 3,
      coordinateSystem: "cartesian2d",
      legendHoverLink: true,
      clip: true,
      label: {
        position: "top"
      },
      // itemStyle: {
      // },
      endLabel: {
        show: false,
        valueAnimation: true,
        distance: 8
      },
      lineStyle: {
        width: 2,
        type: "solid"
      },
      emphasis: {
        scale: true
      },
      // areaStyle: {
      // origin of areaStyle. Valid values:
      // `'auto'/null/undefined`: from axisLine to data
      // `'start'`: from min to data
      // `'end'`: from data to max
      // origin: 'auto'
      // },
      // false, 'start', 'end', 'middle'
      step: false,
      // Disabled if step is true
      smooth: false,
      smoothMonotone: null,
      symbol: "emptyCircle",
      symbolSize: 4,
      symbolRotate: null,
      showSymbol: true,
      // `false`: follow the label interval strategy.
      // `true`: show all symbols.
      // `'auto'`: If possible, show all symbols, otherwise
      //           follow the label interval strategy.
      showAllSymbol: "auto",
      // Whether to connect break point.
      connectNulls: false,
      // Sampling for large data. Can be: 'average', 'max', 'min', 'sum', 'lttb'.
      sampling: "none",
      animationEasing: "linear",
      // Disable progressive
      progressive: 0,
      hoverLayerThreshold: Infinity,
      universalTransition: {
        divideShape: "clone"
      },
      triggerLineEvent: false
    };
    return LineSeriesModel2;
  }(Series_default)
);
var LineSeries_default = LineSeriesModel;

// C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/node_modules/echarts/lib/chart/line/helper.js
function prepareDataCoordInfo(coordSys, data, valueOrigin) {
  var baseAxis = coordSys.getBaseAxis();
  var valueAxis = coordSys.getOtherAxis(baseAxis);
  var valueStart = getValueStart(valueAxis, valueOrigin);
  var baseAxisDim = baseAxis.dim;
  var valueAxisDim = valueAxis.dim;
  var valueDim = data.mapDimension(valueAxisDim);
  var baseDim = data.mapDimension(baseAxisDim);
  var baseDataOffset = valueAxisDim === "x" || valueAxisDim === "radius" ? 1 : 0;
  var dims = map(coordSys.dimensions, function(coordDim) {
    return data.mapDimension(coordDim);
  });
  var stacked = false;
  var stackResultDim = data.getCalculationInfo("stackResultDimension");
  if (isDimensionStacked(
    data,
    dims[0]
    /* , dims[1] */
  )) {
    stacked = true;
    dims[0] = stackResultDim;
  }
  if (isDimensionStacked(
    data,
    dims[1]
    /* , dims[0] */
  )) {
    stacked = true;
    dims[1] = stackResultDim;
  }
  return {
    dataDimsForPoint: dims,
    valueStart,
    valueAxisDim,
    baseAxisDim,
    stacked: !!stacked,
    valueDim,
    baseDim,
    baseDataOffset,
    stackedOverDimension: data.getCalculationInfo("stackedOverDimension")
  };
}
function getValueStart(valueAxis, valueOrigin) {
  var valueStart = 0;
  var extent = valueAxis.scale.getExtent();
  if (valueOrigin === "start") {
    valueStart = extent[0];
  } else if (valueOrigin === "end") {
    valueStart = extent[1];
  } else if (isNumber(valueOrigin) && !isNaN(valueOrigin)) {
    valueStart = valueOrigin;
  } else {
    if (extent[0] > 0) {
      valueStart = extent[0];
    } else if (extent[1] < 0) {
      valueStart = extent[1];
    }
  }
  return valueStart;
}
function getStackedOnPoint(dataCoordInfo, coordSys, data, idx) {
  var value = NaN;
  if (dataCoordInfo.stacked) {
    value = data.get(data.getCalculationInfo("stackedOverDimension"), idx);
  }
  if (isNaN(value)) {
    value = dataCoordInfo.valueStart;
  }
  var baseDataOffset = dataCoordInfo.baseDataOffset;
  var stackedData = [];
  stackedData[baseDataOffset] = data.get(dataCoordInfo.baseDim, idx);
  stackedData[1 - baseDataOffset] = value;
  return coordSys.dataToPoint(stackedData);
}

// C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/node_modules/echarts/lib/chart/line/lineAnimationDiff.js
function diffData(oldData, newData) {
  var diffResult = [];
  newData.diff(oldData).add(function(idx) {
    diffResult.push({
      cmd: "+",
      idx
    });
  }).update(function(newIdx, oldIdx) {
    diffResult.push({
      cmd: "=",
      idx: oldIdx,
      idx1: newIdx
    });
  }).remove(function(idx) {
    diffResult.push({
      cmd: "-",
      idx
    });
  }).execute();
  return diffResult;
}
function lineAnimationDiff(oldData, newData, oldStackedOnPoints, newStackedOnPoints, oldCoordSys, newCoordSys, oldValueOrigin, newValueOrigin) {
  var diff = diffData(oldData, newData);
  var currPoints = [];
  var nextPoints = [];
  var currStackedPoints = [];
  var nextStackedPoints = [];
  var status = [];
  var sortedIndices = [];
  var rawIndices = [];
  var newDataOldCoordInfo = prepareDataCoordInfo(oldCoordSys, newData, oldValueOrigin);
  var oldPoints = oldData.getLayout("points") || [];
  var newPoints = newData.getLayout("points") || [];
  for (var i = 0; i < diff.length; i++) {
    var diffItem = diff[i];
    var pointAdded = true;
    var oldIdx2 = void 0;
    var newIdx2 = void 0;
    switch (diffItem.cmd) {
      case "=":
        oldIdx2 = diffItem.idx * 2;
        newIdx2 = diffItem.idx1 * 2;
        var currentX = oldPoints[oldIdx2];
        var currentY = oldPoints[oldIdx2 + 1];
        var nextX = newPoints[newIdx2];
        var nextY = newPoints[newIdx2 + 1];
        if (isNaN(currentX) || isNaN(currentY)) {
          currentX = nextX;
          currentY = nextY;
        }
        currPoints.push(currentX, currentY);
        nextPoints.push(nextX, nextY);
        currStackedPoints.push(oldStackedOnPoints[oldIdx2], oldStackedOnPoints[oldIdx2 + 1]);
        nextStackedPoints.push(newStackedOnPoints[newIdx2], newStackedOnPoints[newIdx2 + 1]);
        rawIndices.push(newData.getRawIndex(diffItem.idx1));
        break;
      case "+":
        var newIdx = diffItem.idx;
        var newDataDimsForPoint = newDataOldCoordInfo.dataDimsForPoint;
        var oldPt = oldCoordSys.dataToPoint([newData.get(newDataDimsForPoint[0], newIdx), newData.get(newDataDimsForPoint[1], newIdx)]);
        newIdx2 = newIdx * 2;
        currPoints.push(oldPt[0], oldPt[1]);
        nextPoints.push(newPoints[newIdx2], newPoints[newIdx2 + 1]);
        var stackedOnPoint = getStackedOnPoint(newDataOldCoordInfo, oldCoordSys, newData, newIdx);
        currStackedPoints.push(stackedOnPoint[0], stackedOnPoint[1]);
        nextStackedPoints.push(newStackedOnPoints[newIdx2], newStackedOnPoints[newIdx2 + 1]);
        rawIndices.push(newData.getRawIndex(newIdx));
        break;
      case "-":
        pointAdded = false;
    }
    if (pointAdded) {
      status.push(diffItem);
      sortedIndices.push(sortedIndices.length);
    }
  }
  sortedIndices.sort(function(a, b) {
    return rawIndices[a] - rawIndices[b];
  });
  var len = currPoints.length;
  var sortedCurrPoints = createFloat32Array(len);
  var sortedNextPoints = createFloat32Array(len);
  var sortedCurrStackedPoints = createFloat32Array(len);
  var sortedNextStackedPoints = createFloat32Array(len);
  var sortedStatus = [];
  for (var i = 0; i < sortedIndices.length; i++) {
    var idx = sortedIndices[i];
    var i2 = i * 2;
    var idx2 = idx * 2;
    sortedCurrPoints[i2] = currPoints[idx2];
    sortedCurrPoints[i2 + 1] = currPoints[idx2 + 1];
    sortedNextPoints[i2] = nextPoints[idx2];
    sortedNextPoints[i2 + 1] = nextPoints[idx2 + 1];
    sortedCurrStackedPoints[i2] = currStackedPoints[idx2];
    sortedCurrStackedPoints[i2 + 1] = currStackedPoints[idx2 + 1];
    sortedNextStackedPoints[i2] = nextStackedPoints[idx2];
    sortedNextStackedPoints[i2 + 1] = nextStackedPoints[idx2 + 1];
    sortedStatus[i] = status[idx];
  }
  return {
    current: sortedCurrPoints,
    next: sortedNextPoints,
    stackedOnCurrent: sortedCurrStackedPoints,
    stackedOnNext: sortedNextStackedPoints,
    status: sortedStatus
  };
}

// C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/node_modules/echarts/lib/chart/line/poly.js
var mathMin = Math.min;
var mathMax = Math.max;
function isPointNull(x, y) {
  return isNaN(x) || isNaN(y);
}
function drawSegment(ctx, points, start, segLen, allLen, dir, smooth, smoothMonotone, connectNulls) {
  var prevX;
  var prevY;
  var cpx0;
  var cpy0;
  var cpx1;
  var cpy1;
  var idx = start;
  var k = 0;
  for (; k < segLen; k++) {
    var x = points[idx * 2];
    var y = points[idx * 2 + 1];
    if (idx >= allLen || idx < 0) {
      break;
    }
    if (isPointNull(x, y)) {
      if (connectNulls) {
        idx += dir;
        continue;
      }
      break;
    }
    if (idx === start) {
      ctx[dir > 0 ? "moveTo" : "lineTo"](x, y);
      cpx0 = x;
      cpy0 = y;
    } else {
      var dx = x - prevX;
      var dy = y - prevY;
      if (dx * dx + dy * dy < 0.5) {
        idx += dir;
        continue;
      }
      if (smooth > 0) {
        var nextIdx = idx + dir;
        var nextX = points[nextIdx * 2];
        var nextY = points[nextIdx * 2 + 1];
        while (nextX === x && nextY === y && k < segLen) {
          k++;
          nextIdx += dir;
          idx += dir;
          nextX = points[nextIdx * 2];
          nextY = points[nextIdx * 2 + 1];
          x = points[idx * 2];
          y = points[idx * 2 + 1];
          dx = x - prevX;
          dy = y - prevY;
        }
        var tmpK = k + 1;
        if (connectNulls) {
          while (isPointNull(nextX, nextY) && tmpK < segLen) {
            tmpK++;
            nextIdx += dir;
            nextX = points[nextIdx * 2];
            nextY = points[nextIdx * 2 + 1];
          }
        }
        var ratioNextSeg = 0.5;
        var vx = 0;
        var vy = 0;
        var nextCpx0 = void 0;
        var nextCpy0 = void 0;
        if (tmpK >= segLen || isPointNull(nextX, nextY)) {
          cpx1 = x;
          cpy1 = y;
        } else {
          vx = nextX - prevX;
          vy = nextY - prevY;
          var dx0 = x - prevX;
          var dx1 = nextX - x;
          var dy0 = y - prevY;
          var dy1 = nextY - y;
          var lenPrevSeg = void 0;
          var lenNextSeg = void 0;
          if (smoothMonotone === "x") {
            lenPrevSeg = Math.abs(dx0);
            lenNextSeg = Math.abs(dx1);
            var dir_1 = vx > 0 ? 1 : -1;
            cpx1 = x - dir_1 * lenPrevSeg * smooth;
            cpy1 = y;
            nextCpx0 = x + dir_1 * lenNextSeg * smooth;
            nextCpy0 = y;
          } else if (smoothMonotone === "y") {
            lenPrevSeg = Math.abs(dy0);
            lenNextSeg = Math.abs(dy1);
            var dir_2 = vy > 0 ? 1 : -1;
            cpx1 = x;
            cpy1 = y - dir_2 * lenPrevSeg * smooth;
            nextCpx0 = x;
            nextCpy0 = y + dir_2 * lenNextSeg * smooth;
          } else {
            lenPrevSeg = Math.sqrt(dx0 * dx0 + dy0 * dy0);
            lenNextSeg = Math.sqrt(dx1 * dx1 + dy1 * dy1);
            ratioNextSeg = lenNextSeg / (lenNextSeg + lenPrevSeg);
            cpx1 = x - vx * smooth * (1 - ratioNextSeg);
            cpy1 = y - vy * smooth * (1 - ratioNextSeg);
            nextCpx0 = x + vx * smooth * ratioNextSeg;
            nextCpy0 = y + vy * smooth * ratioNextSeg;
            nextCpx0 = mathMin(nextCpx0, mathMax(nextX, x));
            nextCpy0 = mathMin(nextCpy0, mathMax(nextY, y));
            nextCpx0 = mathMax(nextCpx0, mathMin(nextX, x));
            nextCpy0 = mathMax(nextCpy0, mathMin(nextY, y));
            vx = nextCpx0 - x;
            vy = nextCpy0 - y;
            cpx1 = x - vx * lenPrevSeg / lenNextSeg;
            cpy1 = y - vy * lenPrevSeg / lenNextSeg;
            cpx1 = mathMin(cpx1, mathMax(prevX, x));
            cpy1 = mathMin(cpy1, mathMax(prevY, y));
            cpx1 = mathMax(cpx1, mathMin(prevX, x));
            cpy1 = mathMax(cpy1, mathMin(prevY, y));
            vx = x - cpx1;
            vy = y - cpy1;
            nextCpx0 = x + vx * lenNextSeg / lenPrevSeg;
            nextCpy0 = y + vy * lenNextSeg / lenPrevSeg;
          }
        }
        ctx.bezierCurveTo(cpx0, cpy0, cpx1, cpy1, x, y);
        cpx0 = nextCpx0;
        cpy0 = nextCpy0;
      } else {
        ctx.lineTo(x, y);
      }
    }
    prevX = x;
    prevY = y;
    idx += dir;
  }
  return k;
}
var ECPolylineShape = (
  /** @class */
  function() {
    function ECPolylineShape2() {
      this.smooth = 0;
      this.smoothConstraint = true;
    }
    return ECPolylineShape2;
  }()
);
var ECPolyline = (
  /** @class */
  function(_super) {
    __extends(ECPolyline2, _super);
    function ECPolyline2(opts) {
      var _this = _super.call(this, opts) || this;
      _this.type = "ec-polyline";
      return _this;
    }
    ECPolyline2.prototype.getDefaultStyle = function() {
      return {
        stroke: "#000",
        fill: null
      };
    };
    ECPolyline2.prototype.getDefaultShape = function() {
      return new ECPolylineShape();
    };
    ECPolyline2.prototype.buildPath = function(ctx, shape) {
      var points = shape.points;
      var i = 0;
      var len = points.length / 2;
      if (shape.connectNulls) {
        for (; len > 0; len--) {
          if (!isPointNull(points[len * 2 - 2], points[len * 2 - 1])) {
            break;
          }
        }
        for (; i < len; i++) {
          if (!isPointNull(points[i * 2], points[i * 2 + 1])) {
            break;
          }
        }
      }
      while (i < len) {
        i += drawSegment(ctx, points, i, len, len, 1, shape.smooth, shape.smoothMonotone, shape.connectNulls) + 1;
      }
    };
    ECPolyline2.prototype.getPointOn = function(xOrY, dim) {
      if (!this.path) {
        this.createPathProxy();
        this.buildPath(this.path, this.shape);
      }
      var path = this.path;
      var data = path.data;
      var CMD = PathProxy_default.CMD;
      var x0;
      var y0;
      var isDimX = dim === "x";
      var roots = [];
      for (var i = 0; i < data.length; ) {
        var cmd = data[i++];
        var x = void 0;
        var y = void 0;
        var x2 = void 0;
        var y2 = void 0;
        var x3 = void 0;
        var y3 = void 0;
        var t = void 0;
        switch (cmd) {
          case CMD.M:
            x0 = data[i++];
            y0 = data[i++];
            break;
          case CMD.L:
            x = data[i++];
            y = data[i++];
            t = isDimX ? (xOrY - x0) / (x - x0) : (xOrY - y0) / (y - y0);
            if (t <= 1 && t >= 0) {
              var val = isDimX ? (y - y0) * t + y0 : (x - x0) * t + x0;
              return isDimX ? [xOrY, val] : [val, xOrY];
            }
            x0 = x;
            y0 = y;
            break;
          case CMD.C:
            x = data[i++];
            y = data[i++];
            x2 = data[i++];
            y2 = data[i++];
            x3 = data[i++];
            y3 = data[i++];
            var nRoot = isDimX ? cubicRootAt(x0, x, x2, x3, xOrY, roots) : cubicRootAt(y0, y, y2, y3, xOrY, roots);
            if (nRoot > 0) {
              for (var i_1 = 0; i_1 < nRoot; i_1++) {
                var t_1 = roots[i_1];
                if (t_1 <= 1 && t_1 >= 0) {
                  var val = isDimX ? cubicAt(y0, y, y2, y3, t_1) : cubicAt(x0, x, x2, x3, t_1);
                  return isDimX ? [xOrY, val] : [val, xOrY];
                }
              }
            }
            x0 = x3;
            y0 = y3;
            break;
        }
      }
    };
    return ECPolyline2;
  }(Path_default)
);
var ECPolygonShape = (
  /** @class */
  function(_super) {
    __extends(ECPolygonShape2, _super);
    function ECPolygonShape2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    return ECPolygonShape2;
  }(ECPolylineShape)
);
var ECPolygon = (
  /** @class */
  function(_super) {
    __extends(ECPolygon2, _super);
    function ECPolygon2(opts) {
      var _this = _super.call(this, opts) || this;
      _this.type = "ec-polygon";
      return _this;
    }
    ECPolygon2.prototype.getDefaultShape = function() {
      return new ECPolygonShape();
    };
    ECPolygon2.prototype.buildPath = function(ctx, shape) {
      var points = shape.points;
      var stackedOnPoints = shape.stackedOnPoints;
      var i = 0;
      var len = points.length / 2;
      var smoothMonotone = shape.smoothMonotone;
      if (shape.connectNulls) {
        for (; len > 0; len--) {
          if (!isPointNull(points[len * 2 - 2], points[len * 2 - 1])) {
            break;
          }
        }
        for (; i < len; i++) {
          if (!isPointNull(points[i * 2], points[i * 2 + 1])) {
            break;
          }
        }
      }
      while (i < len) {
        var k = drawSegment(ctx, points, i, len, len, 1, shape.smooth, smoothMonotone, shape.connectNulls);
        drawSegment(ctx, stackedOnPoints, i + k - 1, k, len, -1, shape.stackedOnSmooth, smoothMonotone, shape.connectNulls);
        i += k + 1;
        ctx.closePath();
      }
    };
    return ECPolygon2;
  }(Path_default)
);

// C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/node_modules/echarts/lib/chart/helper/createClipPathFromCoordSys.js
function createGridClipPath(cartesian, hasAnimation, seriesModel, done, during) {
  var rect = cartesian.getArea();
  var x = rect.x;
  var y = rect.y;
  var width = rect.width;
  var height = rect.height;
  var lineWidth = seriesModel.get(["lineStyle", "width"]) || 2;
  x -= lineWidth / 2;
  y -= lineWidth / 2;
  width += lineWidth;
  height += lineWidth;
  x = Math.floor(x);
  width = Math.round(width);
  var clipPath = new Rect_default({
    shape: {
      x,
      y,
      width,
      height
    }
  });
  if (hasAnimation) {
    var baseAxis = cartesian.getBaseAxis();
    var isHorizontal = baseAxis.isHorizontal();
    var isAxisInversed = baseAxis.inverse;
    if (isHorizontal) {
      if (isAxisInversed) {
        clipPath.shape.x += width;
      }
      clipPath.shape.width = 0;
    } else {
      if (!isAxisInversed) {
        clipPath.shape.y += height;
      }
      clipPath.shape.height = 0;
    }
    var duringCb = isFunction(during) ? function(percent) {
      during(percent, clipPath);
    } : null;
    initProps(clipPath, {
      shape: {
        width,
        height,
        x,
        y
      }
    }, seriesModel, null, done, duringCb);
  }
  return clipPath;
}
function createPolarClipPath(polar, hasAnimation, seriesModel) {
  var sectorArea = polar.getArea();
  var r0 = round(sectorArea.r0, 1);
  var r = round(sectorArea.r, 1);
  var clipPath = new Sector_default({
    shape: {
      cx: round(polar.cx, 1),
      cy: round(polar.cy, 1),
      r0,
      r,
      startAngle: sectorArea.startAngle,
      endAngle: sectorArea.endAngle,
      clockwise: sectorArea.clockwise
    }
  });
  if (hasAnimation) {
    var isRadial = polar.getBaseAxis().dim === "angle";
    if (isRadial) {
      clipPath.shape.endAngle = sectorArea.startAngle;
    } else {
      clipPath.shape.r = r0;
    }
    initProps(clipPath, {
      shape: {
        endAngle: sectorArea.endAngle,
        r
      }
    }, seriesModel);
  }
  return clipPath;
}
function createClipPath(coordSys, hasAnimation, seriesModel, done, during) {
  if (!coordSys) {
    return null;
  } else if (coordSys.type === "polar") {
    return createPolarClipPath(coordSys, hasAnimation, seriesModel);
  } else if (coordSys.type === "cartesian2d") {
    return createGridClipPath(coordSys, hasAnimation, seriesModel, done, during);
  }
  return null;
}

// C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/node_modules/echarts/lib/chart/line/LineView.js
function isPointsSame(points1, points2) {
  if (points1.length !== points2.length) {
    return;
  }
  for (var i = 0; i < points1.length; i++) {
    if (points1[i] !== points2[i]) {
      return;
    }
  }
  return true;
}
function bboxFromPoints(points) {
  var minX = Infinity;
  var minY = Infinity;
  var maxX = -Infinity;
  var maxY = -Infinity;
  for (var i = 0; i < points.length; ) {
    var x = points[i++];
    var y = points[i++];
    if (!isNaN(x)) {
      minX = Math.min(x, minX);
      maxX = Math.max(x, maxX);
    }
    if (!isNaN(y)) {
      minY = Math.min(y, minY);
      maxY = Math.max(y, maxY);
    }
  }
  return [[minX, minY], [maxX, maxY]];
}
function getBoundingDiff(points1, points2) {
  var _a = bboxFromPoints(points1), min1 = _a[0], max1 = _a[1];
  var _b = bboxFromPoints(points2), min2 = _b[0], max2 = _b[1];
  return Math.max(Math.abs(min1[0] - min2[0]), Math.abs(min1[1] - min2[1]), Math.abs(max1[0] - max2[0]), Math.abs(max1[1] - max2[1]));
}
function getSmooth(smooth) {
  return isNumber(smooth) ? smooth : smooth ? 0.5 : 0;
}
function getStackedOnPoints(coordSys, data, dataCoordInfo) {
  if (!dataCoordInfo.valueDim) {
    return [];
  }
  var len = data.count();
  var points = createFloat32Array(len * 2);
  for (var idx = 0; idx < len; idx++) {
    var pt = getStackedOnPoint(dataCoordInfo, coordSys, data, idx);
    points[idx * 2] = pt[0];
    points[idx * 2 + 1] = pt[1];
  }
  return points;
}
function turnPointsIntoStep(points, coordSys, stepTurnAt, connectNulls) {
  var baseAxis = coordSys.getBaseAxis();
  var baseIndex = baseAxis.dim === "x" || baseAxis.dim === "radius" ? 0 : 1;
  var stepPoints = [];
  var i = 0;
  var stepPt = [];
  var pt = [];
  var nextPt = [];
  var filteredPoints = [];
  if (connectNulls) {
    for (i = 0; i < points.length; i += 2) {
      if (!isNaN(points[i]) && !isNaN(points[i + 1])) {
        filteredPoints.push(points[i], points[i + 1]);
      }
    }
    points = filteredPoints;
  }
  for (i = 0; i < points.length - 2; i += 2) {
    nextPt[0] = points[i + 2];
    nextPt[1] = points[i + 3];
    pt[0] = points[i];
    pt[1] = points[i + 1];
    stepPoints.push(pt[0], pt[1]);
    switch (stepTurnAt) {
      case "end":
        stepPt[baseIndex] = nextPt[baseIndex];
        stepPt[1 - baseIndex] = pt[1 - baseIndex];
        stepPoints.push(stepPt[0], stepPt[1]);
        break;
      case "middle":
        var middle = (pt[baseIndex] + nextPt[baseIndex]) / 2;
        var stepPt2 = [];
        stepPt[baseIndex] = stepPt2[baseIndex] = middle;
        stepPt[1 - baseIndex] = pt[1 - baseIndex];
        stepPt2[1 - baseIndex] = nextPt[1 - baseIndex];
        stepPoints.push(stepPt[0], stepPt[1]);
        stepPoints.push(stepPt2[0], stepPt2[1]);
        break;
      default:
        stepPt[baseIndex] = pt[baseIndex];
        stepPt[1 - baseIndex] = nextPt[1 - baseIndex];
        stepPoints.push(stepPt[0], stepPt[1]);
    }
  }
  stepPoints.push(points[i++], points[i++]);
  return stepPoints;
}
function clipColorStops(colorStops, maxSize) {
  var newColorStops = [];
  var len = colorStops.length;
  var prevOutOfRangeColorStop;
  var prevInRangeColorStop;
  function lerpStop(stop0, stop1, clippedCoord) {
    var coord0 = stop0.coord;
    var p = (clippedCoord - coord0) / (stop1.coord - coord0);
    var color = lerp(p, [stop0.color, stop1.color]);
    return {
      coord: clippedCoord,
      color
    };
  }
  for (var i = 0; i < len; i++) {
    var stop_1 = colorStops[i];
    var coord = stop_1.coord;
    if (coord < 0) {
      prevOutOfRangeColorStop = stop_1;
    } else if (coord > maxSize) {
      if (prevInRangeColorStop) {
        newColorStops.push(lerpStop(prevInRangeColorStop, stop_1, maxSize));
      } else if (prevOutOfRangeColorStop) {
        newColorStops.push(lerpStop(prevOutOfRangeColorStop, stop_1, 0), lerpStop(prevOutOfRangeColorStop, stop_1, maxSize));
      }
      break;
    } else {
      if (prevOutOfRangeColorStop) {
        newColorStops.push(lerpStop(prevOutOfRangeColorStop, stop_1, 0));
        prevOutOfRangeColorStop = null;
      }
      newColorStops.push(stop_1);
      prevInRangeColorStop = stop_1;
    }
  }
  return newColorStops;
}
function getVisualGradient(data, coordSys, api) {
  var visualMetaList = data.getVisual("visualMeta");
  if (!visualMetaList || !visualMetaList.length || !data.count()) {
    return;
  }
  if (coordSys.type !== "cartesian2d") {
    if (true) {
      console.warn("Visual map on line style is only supported on cartesian2d.");
    }
    return;
  }
  var coordDim;
  var visualMeta;
  for (var i = visualMetaList.length - 1; i >= 0; i--) {
    var dimInfo = data.getDimensionInfo(visualMetaList[i].dimension);
    coordDim = dimInfo && dimInfo.coordDim;
    if (coordDim === "x" || coordDim === "y") {
      visualMeta = visualMetaList[i];
      break;
    }
  }
  if (!visualMeta) {
    if (true) {
      console.warn("Visual map on line style only support x or y dimension.");
    }
    return;
  }
  var axis = coordSys.getAxis(coordDim);
  var colorStops = map(visualMeta.stops, function(stop) {
    return {
      coord: axis.toGlobalCoord(axis.dataToCoord(stop.value)),
      color: stop.color
    };
  });
  var stopLen = colorStops.length;
  var outerColors = visualMeta.outerColors.slice();
  if (stopLen && colorStops[0].coord > colorStops[stopLen - 1].coord) {
    colorStops.reverse();
    outerColors.reverse();
  }
  var colorStopsInRange = clipColorStops(colorStops, coordDim === "x" ? api.getWidth() : api.getHeight());
  var inRangeStopLen = colorStopsInRange.length;
  if (!inRangeStopLen && stopLen) {
    return colorStops[0].coord < 0 ? outerColors[1] ? outerColors[1] : colorStops[stopLen - 1].color : outerColors[0] ? outerColors[0] : colorStops[0].color;
  }
  var tinyExtent = 10;
  var minCoord = colorStopsInRange[0].coord - tinyExtent;
  var maxCoord = colorStopsInRange[inRangeStopLen - 1].coord + tinyExtent;
  var coordSpan = maxCoord - minCoord;
  if (coordSpan < 1e-3) {
    return "transparent";
  }
  each(colorStopsInRange, function(stop) {
    stop.offset = (stop.coord - minCoord) / coordSpan;
  });
  colorStopsInRange.push({
    // NOTE: inRangeStopLen may still be 0 if stoplen is zero.
    offset: inRangeStopLen ? colorStopsInRange[inRangeStopLen - 1].offset : 0.5,
    color: outerColors[1] || "transparent"
  });
  colorStopsInRange.unshift({
    offset: inRangeStopLen ? colorStopsInRange[0].offset : 0.5,
    color: outerColors[0] || "transparent"
  });
  var gradient = new LinearGradient_default(0, 0, 0, 0, colorStopsInRange, true);
  gradient[coordDim] = minCoord;
  gradient[coordDim + "2"] = maxCoord;
  return gradient;
}
function getIsIgnoreFunc(seriesModel, data, coordSys) {
  var showAllSymbol = seriesModel.get("showAllSymbol");
  var isAuto = showAllSymbol === "auto";
  if (showAllSymbol && !isAuto) {
    return;
  }
  var categoryAxis = coordSys.getAxesByScale("ordinal")[0];
  if (!categoryAxis) {
    return;
  }
  if (isAuto && canShowAllSymbolForCategory(categoryAxis, data)) {
    return;
  }
  var categoryDataDim = data.mapDimension(categoryAxis.dim);
  var labelMap = {};
  each(categoryAxis.getViewLabels(), function(labelItem) {
    var ordinalNumber = categoryAxis.scale.getRawOrdinalNumber(labelItem.tickValue);
    labelMap[ordinalNumber] = 1;
  });
  return function(dataIndex) {
    return !labelMap.hasOwnProperty(data.get(categoryDataDim, dataIndex));
  };
}
function canShowAllSymbolForCategory(categoryAxis, data) {
  var axisExtent = categoryAxis.getExtent();
  var availSize = Math.abs(axisExtent[1] - axisExtent[0]) / categoryAxis.scale.count();
  isNaN(availSize) && (availSize = 0);
  var dataLen = data.count();
  var step = Math.max(1, Math.round(dataLen / 5));
  for (var dataIndex = 0; dataIndex < dataLen; dataIndex += step) {
    if (Symbol_default.getSymbolSize(
      data,
      dataIndex
      // Only for cartesian, where `isHorizontal` exists.
    )[categoryAxis.isHorizontal() ? 1 : 0] * 1.5 > availSize) {
      return false;
    }
  }
  return true;
}
function isPointNull2(x, y) {
  return isNaN(x) || isNaN(y);
}
function getLastIndexNotNull(points) {
  var len = points.length / 2;
  for (; len > 0; len--) {
    if (!isPointNull2(points[len * 2 - 2], points[len * 2 - 1])) {
      break;
    }
  }
  return len - 1;
}
function getPointAtIndex(points, idx) {
  return [points[idx * 2], points[idx * 2 + 1]];
}
function getIndexRange(points, xOrY, dim) {
  var len = points.length / 2;
  var dimIdx = dim === "x" ? 0 : 1;
  var a;
  var b;
  var prevIndex = 0;
  var nextIndex = -1;
  for (var i = 0; i < len; i++) {
    b = points[i * 2 + dimIdx];
    if (isNaN(b) || isNaN(points[i * 2 + 1 - dimIdx])) {
      continue;
    }
    if (i === 0) {
      a = b;
      continue;
    }
    if (a <= xOrY && b >= xOrY || a >= xOrY && b <= xOrY) {
      nextIndex = i;
      break;
    }
    prevIndex = i;
    a = b;
  }
  return {
    range: [prevIndex, nextIndex],
    t: (xOrY - a) / (b - a)
  };
}
function anyStateShowEndLabel(seriesModel) {
  if (seriesModel.get(["endLabel", "show"])) {
    return true;
  }
  for (var i = 0; i < SPECIAL_STATES.length; i++) {
    if (seriesModel.get([SPECIAL_STATES[i], "endLabel", "show"])) {
      return true;
    }
  }
  return false;
}
function createLineClipPath(lineView, coordSys, hasAnimation, seriesModel) {
  if (isCoordinateSystemType(coordSys, "cartesian2d")) {
    var endLabelModel_1 = seriesModel.getModel("endLabel");
    var valueAnimation_1 = endLabelModel_1.get("valueAnimation");
    var data_1 = seriesModel.getData();
    var labelAnimationRecord_1 = {
      lastFrameIndex: 0
    };
    var during = anyStateShowEndLabel(seriesModel) ? function(percent, clipRect) {
      lineView._endLabelOnDuring(percent, clipRect, data_1, labelAnimationRecord_1, valueAnimation_1, endLabelModel_1, coordSys);
    } : null;
    var isHorizontal = coordSys.getBaseAxis().isHorizontal();
    var clipPath = createGridClipPath(coordSys, hasAnimation, seriesModel, function() {
      var endLabel = lineView._endLabel;
      if (endLabel && hasAnimation) {
        if (labelAnimationRecord_1.originalX != null) {
          endLabel.attr({
            x: labelAnimationRecord_1.originalX,
            y: labelAnimationRecord_1.originalY
          });
        }
      }
    }, during);
    if (!seriesModel.get("clip", true)) {
      var rectShape = clipPath.shape;
      var expandSize = Math.max(rectShape.width, rectShape.height);
      if (isHorizontal) {
        rectShape.y -= expandSize;
        rectShape.height += expandSize * 2;
      } else {
        rectShape.x -= expandSize;
        rectShape.width += expandSize * 2;
      }
    }
    if (during) {
      during(1, clipPath);
    }
    return clipPath;
  } else {
    if (true) {
      if (seriesModel.get(["endLabel", "show"])) {
        console.warn("endLabel is not supported for lines in polar systems.");
      }
    }
    return createPolarClipPath(coordSys, hasAnimation, seriesModel);
  }
}
function getEndLabelStateSpecified(endLabelModel, coordSys) {
  var baseAxis = coordSys.getBaseAxis();
  var isHorizontal = baseAxis.isHorizontal();
  var isBaseInversed = baseAxis.inverse;
  var align = isHorizontal ? isBaseInversed ? "right" : "left" : "center";
  var verticalAlign = isHorizontal ? "middle" : isBaseInversed ? "top" : "bottom";
  return {
    normal: {
      align: endLabelModel.get("align") || align,
      verticalAlign: endLabelModel.get("verticalAlign") || verticalAlign
    }
  };
}
var LineView = (
  /** @class */
  function(_super) {
    __extends(LineView2, _super);
    function LineView2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    LineView2.prototype.init = function() {
      var lineGroup = new Group_default();
      var symbolDraw = new SymbolDraw_default();
      this.group.add(symbolDraw.group);
      this._symbolDraw = symbolDraw;
      this._lineGroup = lineGroup;
    };
    LineView2.prototype.render = function(seriesModel, ecModel, api) {
      var _this = this;
      var coordSys = seriesModel.coordinateSystem;
      var group = this.group;
      var data = seriesModel.getData();
      var lineStyleModel = seriesModel.getModel("lineStyle");
      var areaStyleModel = seriesModel.getModel("areaStyle");
      var points = data.getLayout("points") || [];
      var isCoordSysPolar = coordSys.type === "polar";
      var prevCoordSys = this._coordSys;
      var symbolDraw = this._symbolDraw;
      var polyline = this._polyline;
      var polygon = this._polygon;
      var lineGroup = this._lineGroup;
      var hasAnimation = !ecModel.ssr && seriesModel.isAnimationEnabled();
      var isAreaChart = !areaStyleModel.isEmpty();
      var valueOrigin = areaStyleModel.get("origin");
      var dataCoordInfo = prepareDataCoordInfo(coordSys, data, valueOrigin);
      var stackedOnPoints = isAreaChart && getStackedOnPoints(coordSys, data, dataCoordInfo);
      var showSymbol = seriesModel.get("showSymbol");
      var connectNulls = seriesModel.get("connectNulls");
      var isIgnoreFunc = showSymbol && !isCoordSysPolar && getIsIgnoreFunc(seriesModel, data, coordSys);
      var oldData = this._data;
      oldData && oldData.eachItemGraphicEl(function(el, idx) {
        if (el.__temp) {
          group.remove(el);
          oldData.setItemGraphicEl(idx, null);
        }
      });
      if (!showSymbol) {
        symbolDraw.remove();
      }
      group.add(lineGroup);
      var step = !isCoordSysPolar ? seriesModel.get("step") : false;
      var clipShapeForSymbol;
      if (coordSys && coordSys.getArea && seriesModel.get("clip", true)) {
        clipShapeForSymbol = coordSys.getArea();
        if (clipShapeForSymbol.width != null) {
          clipShapeForSymbol.x -= 0.1;
          clipShapeForSymbol.y -= 0.1;
          clipShapeForSymbol.width += 0.2;
          clipShapeForSymbol.height += 0.2;
        } else if (clipShapeForSymbol.r0) {
          clipShapeForSymbol.r0 -= 0.5;
          clipShapeForSymbol.r += 0.5;
        }
      }
      this._clipShapeForSymbol = clipShapeForSymbol;
      var visualColor = getVisualGradient(data, coordSys, api) || data.getVisual("style")[data.getVisual("drawType")];
      if (!(polyline && prevCoordSys.type === coordSys.type && step === this._step)) {
        showSymbol && symbolDraw.updateData(data, {
          isIgnore: isIgnoreFunc,
          clipShape: clipShapeForSymbol,
          disableAnimation: true,
          getSymbolPoint: function(idx) {
            return [points[idx * 2], points[idx * 2 + 1]];
          }
        });
        hasAnimation && this._initSymbolLabelAnimation(data, coordSys, clipShapeForSymbol);
        if (step) {
          points = turnPointsIntoStep(points, coordSys, step, connectNulls);
          if (stackedOnPoints) {
            stackedOnPoints = turnPointsIntoStep(stackedOnPoints, coordSys, step, connectNulls);
          }
        }
        polyline = this._newPolyline(points);
        if (isAreaChart) {
          polygon = this._newPolygon(points, stackedOnPoints);
        } else if (polygon) {
          lineGroup.remove(polygon);
          polygon = this._polygon = null;
        }
        if (!isCoordSysPolar) {
          this._initOrUpdateEndLabel(seriesModel, coordSys, convertToColorString(visualColor));
        }
        lineGroup.setClipPath(createLineClipPath(this, coordSys, true, seriesModel));
      } else {
        if (isAreaChart && !polygon) {
          polygon = this._newPolygon(points, stackedOnPoints);
        } else if (polygon && !isAreaChart) {
          lineGroup.remove(polygon);
          polygon = this._polygon = null;
        }
        if (!isCoordSysPolar) {
          this._initOrUpdateEndLabel(seriesModel, coordSys, convertToColorString(visualColor));
        }
        var oldClipPath = lineGroup.getClipPath();
        if (oldClipPath) {
          var newClipPath = createLineClipPath(this, coordSys, false, seriesModel);
          initProps(oldClipPath, {
            shape: newClipPath.shape
          }, seriesModel);
        } else {
          lineGroup.setClipPath(createLineClipPath(this, coordSys, true, seriesModel));
        }
        showSymbol && symbolDraw.updateData(data, {
          isIgnore: isIgnoreFunc,
          clipShape: clipShapeForSymbol,
          disableAnimation: true,
          getSymbolPoint: function(idx) {
            return [points[idx * 2], points[idx * 2 + 1]];
          }
        });
        if (!isPointsSame(this._stackedOnPoints, stackedOnPoints) || !isPointsSame(this._points, points)) {
          if (hasAnimation) {
            this._doUpdateAnimation(data, stackedOnPoints, coordSys, api, step, valueOrigin, connectNulls);
          } else {
            if (step) {
              points = turnPointsIntoStep(points, coordSys, step, connectNulls);
              if (stackedOnPoints) {
                stackedOnPoints = turnPointsIntoStep(stackedOnPoints, coordSys, step, connectNulls);
              }
            }
            polyline.setShape({
              points
            });
            polygon && polygon.setShape({
              points,
              stackedOnPoints
            });
          }
        }
      }
      var emphasisModel = seriesModel.getModel("emphasis");
      var focus = emphasisModel.get("focus");
      var blurScope = emphasisModel.get("blurScope");
      var emphasisDisabled = emphasisModel.get("disabled");
      polyline.useStyle(defaults(
        // Use color in lineStyle first
        lineStyleModel.getLineStyle(),
        {
          fill: "none",
          stroke: visualColor,
          lineJoin: "bevel"
        }
      ));
      setStatesStylesFromModel(polyline, seriesModel, "lineStyle");
      if (polyline.style.lineWidth > 0 && seriesModel.get(["emphasis", "lineStyle", "width"]) === "bolder") {
        var emphasisLineStyle = polyline.getState("emphasis").style;
        emphasisLineStyle.lineWidth = +polyline.style.lineWidth + 1;
      }
      getECData(polyline).seriesIndex = seriesModel.seriesIndex;
      toggleHoverEmphasis(polyline, focus, blurScope, emphasisDisabled);
      var smooth = getSmooth(seriesModel.get("smooth"));
      var smoothMonotone = seriesModel.get("smoothMonotone");
      polyline.setShape({
        smooth,
        smoothMonotone,
        connectNulls
      });
      if (polygon) {
        var stackedOnSeries = data.getCalculationInfo("stackedOnSeries");
        var stackedOnSmooth = 0;
        polygon.useStyle(defaults(areaStyleModel.getAreaStyle(), {
          fill: visualColor,
          opacity: 0.7,
          lineJoin: "bevel",
          decal: data.getVisual("style").decal
        }));
        if (stackedOnSeries) {
          stackedOnSmooth = getSmooth(stackedOnSeries.get("smooth"));
        }
        polygon.setShape({
          smooth,
          stackedOnSmooth,
          smoothMonotone,
          connectNulls
        });
        setStatesStylesFromModel(polygon, seriesModel, "areaStyle");
        getECData(polygon).seriesIndex = seriesModel.seriesIndex;
        toggleHoverEmphasis(polygon, focus, blurScope, emphasisDisabled);
      }
      var changePolyState = function(toState) {
        _this._changePolyState(toState);
      };
      data.eachItemGraphicEl(function(el) {
        el && (el.onHoverStateChange = changePolyState);
      });
      this._polyline.onHoverStateChange = changePolyState;
      this._data = data;
      this._coordSys = coordSys;
      this._stackedOnPoints = stackedOnPoints;
      this._points = points;
      this._step = step;
      this._valueOrigin = valueOrigin;
      if (seriesModel.get("triggerLineEvent")) {
        this.packEventData(seriesModel, polyline);
        polygon && this.packEventData(seriesModel, polygon);
      }
    };
    LineView2.prototype.packEventData = function(seriesModel, el) {
      getECData(el).eventData = {
        componentType: "series",
        componentSubType: "line",
        componentIndex: seriesModel.componentIndex,
        seriesIndex: seriesModel.seriesIndex,
        seriesName: seriesModel.name,
        seriesType: "line"
      };
    };
    LineView2.prototype.highlight = function(seriesModel, ecModel, api, payload) {
      var data = seriesModel.getData();
      var dataIndex = queryDataIndex(data, payload);
      this._changePolyState("emphasis");
      if (!(dataIndex instanceof Array) && dataIndex != null && dataIndex >= 0) {
        var points = data.getLayout("points");
        var symbol = data.getItemGraphicEl(dataIndex);
        if (!symbol) {
          var x = points[dataIndex * 2];
          var y = points[dataIndex * 2 + 1];
          if (isNaN(x) || isNaN(y)) {
            return;
          }
          if (this._clipShapeForSymbol && !this._clipShapeForSymbol.contain(x, y)) {
            return;
          }
          var zlevel = seriesModel.get("zlevel") || 0;
          var z = seriesModel.get("z") || 0;
          symbol = new Symbol_default(data, dataIndex);
          symbol.x = x;
          symbol.y = y;
          symbol.setZ(zlevel, z);
          var symbolLabel = symbol.getSymbolPath().getTextContent();
          if (symbolLabel) {
            symbolLabel.zlevel = zlevel;
            symbolLabel.z = z;
            symbolLabel.z2 = this._polyline.z2 + 1;
          }
          symbol.__temp = true;
          data.setItemGraphicEl(dataIndex, symbol);
          symbol.stopSymbolAnimation(true);
          this.group.add(symbol);
        }
        symbol.highlight();
      } else {
        Chart_default.prototype.highlight.call(this, seriesModel, ecModel, api, payload);
      }
    };
    LineView2.prototype.downplay = function(seriesModel, ecModel, api, payload) {
      var data = seriesModel.getData();
      var dataIndex = queryDataIndex(data, payload);
      this._changePolyState("normal");
      if (dataIndex != null && dataIndex >= 0) {
        var symbol = data.getItemGraphicEl(dataIndex);
        if (symbol) {
          if (symbol.__temp) {
            data.setItemGraphicEl(dataIndex, null);
            this.group.remove(symbol);
          } else {
            symbol.downplay();
          }
        }
      } else {
        Chart_default.prototype.downplay.call(this, seriesModel, ecModel, api, payload);
      }
    };
    LineView2.prototype._changePolyState = function(toState) {
      var polygon = this._polygon;
      setStatesFlag(this._polyline, toState);
      polygon && setStatesFlag(polygon, toState);
    };
    LineView2.prototype._newPolyline = function(points) {
      var polyline = this._polyline;
      if (polyline) {
        this._lineGroup.remove(polyline);
      }
      polyline = new ECPolyline({
        shape: {
          points
        },
        segmentIgnoreThreshold: 2,
        z2: 10
      });
      this._lineGroup.add(polyline);
      this._polyline = polyline;
      return polyline;
    };
    LineView2.prototype._newPolygon = function(points, stackedOnPoints) {
      var polygon = this._polygon;
      if (polygon) {
        this._lineGroup.remove(polygon);
      }
      polygon = new ECPolygon({
        shape: {
          points,
          stackedOnPoints
        },
        segmentIgnoreThreshold: 2
      });
      this._lineGroup.add(polygon);
      this._polygon = polygon;
      return polygon;
    };
    LineView2.prototype._initSymbolLabelAnimation = function(data, coordSys, clipShape) {
      var isHorizontalOrRadial;
      var isCoordSysPolar;
      var baseAxis = coordSys.getBaseAxis();
      var isAxisInverse = baseAxis.inverse;
      if (coordSys.type === "cartesian2d") {
        isHorizontalOrRadial = baseAxis.isHorizontal();
        isCoordSysPolar = false;
      } else if (coordSys.type === "polar") {
        isHorizontalOrRadial = baseAxis.dim === "angle";
        isCoordSysPolar = true;
      }
      var seriesModel = data.hostModel;
      var seriesDuration = seriesModel.get("animationDuration");
      if (isFunction(seriesDuration)) {
        seriesDuration = seriesDuration(null);
      }
      var seriesDelay = seriesModel.get("animationDelay") || 0;
      var seriesDelayValue = isFunction(seriesDelay) ? seriesDelay(null) : seriesDelay;
      data.eachItemGraphicEl(function(symbol, idx) {
        var el = symbol;
        if (el) {
          var point = [symbol.x, symbol.y];
          var start = void 0;
          var end = void 0;
          var current = void 0;
          if (clipShape) {
            if (isCoordSysPolar) {
              var polarClip = clipShape;
              var coord = coordSys.pointToCoord(point);
              if (isHorizontalOrRadial) {
                start = polarClip.startAngle;
                end = polarClip.endAngle;
                current = -coord[1] / 180 * Math.PI;
              } else {
                start = polarClip.r0;
                end = polarClip.r;
                current = coord[0];
              }
            } else {
              var gridClip = clipShape;
              if (isHorizontalOrRadial) {
                start = gridClip.x;
                end = gridClip.x + gridClip.width;
                current = symbol.x;
              } else {
                start = gridClip.y + gridClip.height;
                end = gridClip.y;
                current = symbol.y;
              }
            }
          }
          var ratio = end === start ? 0 : (current - start) / (end - start);
          if (isAxisInverse) {
            ratio = 1 - ratio;
          }
          var delay = isFunction(seriesDelay) ? seriesDelay(idx) : seriesDuration * ratio + seriesDelayValue;
          var symbolPath = el.getSymbolPath();
          var text = symbolPath.getTextContent();
          el.attr({
            scaleX: 0,
            scaleY: 0
          });
          el.animateTo({
            scaleX: 1,
            scaleY: 1
          }, {
            duration: 200,
            setToFinal: true,
            delay
          });
          if (text) {
            text.animateFrom({
              style: {
                opacity: 0
              }
            }, {
              duration: 300,
              delay
            });
          }
          symbolPath.disableLabelAnimation = true;
        }
      });
    };
    LineView2.prototype._initOrUpdateEndLabel = function(seriesModel, coordSys, inheritColor) {
      var endLabelModel = seriesModel.getModel("endLabel");
      if (anyStateShowEndLabel(seriesModel)) {
        var data_2 = seriesModel.getData();
        var polyline = this._polyline;
        var points = data_2.getLayout("points");
        if (!points) {
          polyline.removeTextContent();
          this._endLabel = null;
          return;
        }
        var endLabel = this._endLabel;
        if (!endLabel) {
          endLabel = this._endLabel = new Text_default({
            z2: 200
            // should be higher than item symbol
          });
          endLabel.ignoreClip = true;
          polyline.setTextContent(this._endLabel);
          polyline.disableLabelAnimation = true;
        }
        var dataIndex = getLastIndexNotNull(points);
        if (dataIndex >= 0) {
          setLabelStyle(polyline, getLabelStatesModels(seriesModel, "endLabel"), {
            inheritColor,
            labelFetcher: seriesModel,
            labelDataIndex: dataIndex,
            defaultText: function(dataIndex2, opt, interpolatedValue) {
              return interpolatedValue != null ? getDefaultInterpolatedLabel(data_2, interpolatedValue) : getDefaultLabel(data_2, dataIndex2);
            },
            enableTextSetter: true
          }, getEndLabelStateSpecified(endLabelModel, coordSys));
          polyline.textConfig.position = null;
        }
      } else if (this._endLabel) {
        this._polyline.removeTextContent();
        this._endLabel = null;
      }
    };
    LineView2.prototype._endLabelOnDuring = function(percent, clipRect, data, animationRecord, valueAnimation, endLabelModel, coordSys) {
      var endLabel = this._endLabel;
      var polyline = this._polyline;
      if (endLabel) {
        if (percent < 1 && animationRecord.originalX == null) {
          animationRecord.originalX = endLabel.x;
          animationRecord.originalY = endLabel.y;
        }
        var points = data.getLayout("points");
        var seriesModel = data.hostModel;
        var connectNulls = seriesModel.get("connectNulls");
        var precision = endLabelModel.get("precision");
        var distance = endLabelModel.get("distance") || 0;
        var baseAxis = coordSys.getBaseAxis();
        var isHorizontal = baseAxis.isHorizontal();
        var isBaseInversed = baseAxis.inverse;
        var clipShape = clipRect.shape;
        var xOrY = isBaseInversed ? isHorizontal ? clipShape.x : clipShape.y + clipShape.height : isHorizontal ? clipShape.x + clipShape.width : clipShape.y;
        var distanceX = (isHorizontal ? distance : 0) * (isBaseInversed ? -1 : 1);
        var distanceY = (isHorizontal ? 0 : -distance) * (isBaseInversed ? -1 : 1);
        var dim = isHorizontal ? "x" : "y";
        var dataIndexRange = getIndexRange(points, xOrY, dim);
        var indices = dataIndexRange.range;
        var diff = indices[1] - indices[0];
        var value = void 0;
        if (diff >= 1) {
          if (diff > 1 && !connectNulls) {
            var pt = getPointAtIndex(points, indices[0]);
            endLabel.attr({
              x: pt[0] + distanceX,
              y: pt[1] + distanceY
            });
            valueAnimation && (value = seriesModel.getRawValue(indices[0]));
          } else {
            var pt = polyline.getPointOn(xOrY, dim);
            pt && endLabel.attr({
              x: pt[0] + distanceX,
              y: pt[1] + distanceY
            });
            var startValue = seriesModel.getRawValue(indices[0]);
            var endValue = seriesModel.getRawValue(indices[1]);
            valueAnimation && (value = interpolateRawValues(data, precision, startValue, endValue, dataIndexRange.t));
          }
          animationRecord.lastFrameIndex = indices[0];
        } else {
          var idx = percent === 1 || animationRecord.lastFrameIndex > 0 ? indices[0] : 0;
          var pt = getPointAtIndex(points, idx);
          valueAnimation && (value = seriesModel.getRawValue(idx));
          endLabel.attr({
            x: pt[0] + distanceX,
            y: pt[1] + distanceY
          });
        }
        if (valueAnimation) {
          labelInner(endLabel).setLabelText(value);
        }
      }
    };
    LineView2.prototype._doUpdateAnimation = function(data, stackedOnPoints, coordSys, api, step, valueOrigin, connectNulls) {
      var polyline = this._polyline;
      var polygon = this._polygon;
      var seriesModel = data.hostModel;
      var diff = lineAnimationDiff(this._data, data, this._stackedOnPoints, stackedOnPoints, this._coordSys, coordSys, this._valueOrigin, valueOrigin);
      var current = diff.current;
      var stackedOnCurrent = diff.stackedOnCurrent;
      var next = diff.next;
      var stackedOnNext = diff.stackedOnNext;
      if (step) {
        current = turnPointsIntoStep(diff.current, coordSys, step, connectNulls);
        stackedOnCurrent = turnPointsIntoStep(diff.stackedOnCurrent, coordSys, step, connectNulls);
        next = turnPointsIntoStep(diff.next, coordSys, step, connectNulls);
        stackedOnNext = turnPointsIntoStep(diff.stackedOnNext, coordSys, step, connectNulls);
      }
      if (getBoundingDiff(current, next) > 3e3 || polygon && getBoundingDiff(stackedOnCurrent, stackedOnNext) > 3e3) {
        polyline.stopAnimation();
        polyline.setShape({
          points: next
        });
        if (polygon) {
          polygon.stopAnimation();
          polygon.setShape({
            points: next,
            stackedOnPoints: stackedOnNext
          });
        }
        return;
      }
      polyline.shape.__points = diff.current;
      polyline.shape.points = current;
      var target = {
        shape: {
          points: next
        }
      };
      if (diff.current !== current) {
        target.shape.__points = diff.next;
      }
      polyline.stopAnimation();
      updateProps(polyline, target, seriesModel);
      if (polygon) {
        polygon.setShape({
          // Reuse the points with polyline.
          points: current,
          stackedOnPoints: stackedOnCurrent
        });
        polygon.stopAnimation();
        updateProps(polygon, {
          shape: {
            stackedOnPoints: stackedOnNext
          }
        }, seriesModel);
        if (polyline.shape.points !== polygon.shape.points) {
          polygon.shape.points = polyline.shape.points;
        }
      }
      var updatedDataInfo = [];
      var diffStatus = diff.status;
      for (var i = 0; i < diffStatus.length; i++) {
        var cmd = diffStatus[i].cmd;
        if (cmd === "=") {
          var el = data.getItemGraphicEl(diffStatus[i].idx1);
          if (el) {
            updatedDataInfo.push({
              el,
              ptIdx: i
              // Index of points
            });
          }
        }
      }
      if (polyline.animators && polyline.animators.length) {
        polyline.animators[0].during(function() {
          polygon && polygon.dirtyShape();
          var points = polyline.shape.__points;
          for (var i2 = 0; i2 < updatedDataInfo.length; i2++) {
            var el2 = updatedDataInfo[i2].el;
            var offset = updatedDataInfo[i2].ptIdx * 2;
            el2.x = points[offset];
            el2.y = points[offset + 1];
            el2.markRedraw();
          }
        });
      }
    };
    LineView2.prototype.remove = function(ecModel) {
      var group = this.group;
      var oldData = this._data;
      this._lineGroup.removeAll();
      this._symbolDraw.remove(true);
      oldData && oldData.eachItemGraphicEl(function(el, idx) {
        if (el.__temp) {
          group.remove(el);
          oldData.setItemGraphicEl(idx, null);
        }
      });
      this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._endLabel = this._data = null;
    };
    LineView2.type = "line";
    return LineView2;
  }(Chart_default)
);
var LineView_default = LineView;

// C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/node_modules/echarts/lib/layout/points.js
function pointsLayout(seriesType, forceStoreInTypedArray) {
  return {
    seriesType,
    plan: createRenderPlanner(),
    reset: function(seriesModel) {
      var data = seriesModel.getData();
      var coordSys = seriesModel.coordinateSystem;
      var pipelineContext = seriesModel.pipelineContext;
      var useTypedArray = forceStoreInTypedArray || pipelineContext.large;
      if (!coordSys) {
        return;
      }
      var dims = map(coordSys.dimensions, function(dim) {
        return data.mapDimension(dim);
      }).slice(0, 2);
      var dimLen = dims.length;
      var stackResultDim = data.getCalculationInfo("stackResultDimension");
      if (isDimensionStacked(data, dims[0])) {
        dims[0] = stackResultDim;
      }
      if (isDimensionStacked(data, dims[1])) {
        dims[1] = stackResultDim;
      }
      var store = data.getStore();
      var dimIdx0 = data.getDimensionIndex(dims[0]);
      var dimIdx1 = data.getDimensionIndex(dims[1]);
      return dimLen && {
        progress: function(params, data2) {
          var segCount = params.end - params.start;
          var points = useTypedArray && createFloat32Array(segCount * dimLen);
          var tmpIn = [];
          var tmpOut = [];
          for (var i = params.start, offset = 0; i < params.end; i++) {
            var point = void 0;
            if (dimLen === 1) {
              var x = store.get(dimIdx0, i);
              point = coordSys.dataToPoint(x, null, tmpOut);
            } else {
              tmpIn[0] = store.get(dimIdx0, i);
              tmpIn[1] = store.get(dimIdx1, i);
              point = coordSys.dataToPoint(tmpIn, null, tmpOut);
            }
            if (useTypedArray) {
              points[offset++] = point[0];
              points[offset++] = point[1];
            } else {
              data2.setItemLayout(i, point.slice());
            }
          }
          useTypedArray && data2.setLayout("points", points);
        }
      };
    }
  };
}

// C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/node_modules/echarts/lib/processor/dataSample.js
var samplers = {
  average: function(frame) {
    var sum = 0;
    var count = 0;
    for (var i = 0; i < frame.length; i++) {
      if (!isNaN(frame[i])) {
        sum += frame[i];
        count++;
      }
    }
    return count === 0 ? NaN : sum / count;
  },
  sum: function(frame) {
    var sum = 0;
    for (var i = 0; i < frame.length; i++) {
      sum += frame[i] || 0;
    }
    return sum;
  },
  max: function(frame) {
    var max = -Infinity;
    for (var i = 0; i < frame.length; i++) {
      frame[i] > max && (max = frame[i]);
    }
    return isFinite(max) ? max : NaN;
  },
  min: function(frame) {
    var min = Infinity;
    for (var i = 0; i < frame.length; i++) {
      frame[i] < min && (min = frame[i]);
    }
    return isFinite(min) ? min : NaN;
  },
  // TODO
  // Median
  nearest: function(frame) {
    return frame[0];
  }
};
var indexSampler = function(frame) {
  return Math.round(frame.length / 2);
};
function dataSample(seriesType) {
  return {
    seriesType,
    // FIXME:TS never used, so comment it
    // modifyOutputEnd: true,
    reset: function(seriesModel, ecModel, api) {
      var data = seriesModel.getData();
      var sampling = seriesModel.get("sampling");
      var coordSys = seriesModel.coordinateSystem;
      var count = data.count();
      if (count > 10 && coordSys.type === "cartesian2d" && sampling) {
        var baseAxis = coordSys.getBaseAxis();
        var valueAxis = coordSys.getOtherAxis(baseAxis);
        var extent = baseAxis.getExtent();
        var dpr = api.getDevicePixelRatio();
        var size = Math.abs(extent[1] - extent[0]) * (dpr || 1);
        var rate = Math.round(count / size);
        if (isFinite(rate) && rate > 1) {
          if (sampling === "lttb") {
            seriesModel.setData(data.lttbDownSample(data.mapDimension(valueAxis.dim), 1 / rate));
          }
          var sampler = void 0;
          if (isString(sampling)) {
            sampler = samplers[sampling];
          } else if (isFunction(sampling)) {
            sampler = sampling;
          }
          if (sampler) {
            seriesModel.setData(data.downSample(data.mapDimension(valueAxis.dim), 1 / rate, sampler, indexSampler));
          }
        }
      }
    }
  };
}

// C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/node_modules/echarts/lib/chart/line/install.js
function install(registers) {
  registers.registerChartView(LineView_default);
  registers.registerSeriesModel(LineSeries_default);
  registers.registerLayout(pointsLayout("line", true));
  registers.registerVisual({
    seriesType: "line",
    reset: function(seriesModel) {
      var data = seriesModel.getData();
      var lineStyle = seriesModel.getModel("lineStyle").getLineStyle();
      if (lineStyle && !lineStyle.stroke) {
        lineStyle.stroke = data.getVisual("style").fill;
      }
      data.setVisual("legendLineStyle", lineStyle);
    }
  });
  registers.registerProcessor(registers.PRIORITY.PROCESSOR.STATISTIC, dataSample("line"));
}

export {
  ECPolygon,
  createClipPath,
  pointsLayout,
  dataSample,
  install
};
//# sourceMappingURL=chunk-IQJ6XDQT.js.map
