import {
  createSymbol,
  normalizeSymbolOffset,
  normalizeSymbolSize
} from "./chunk-HZWDB7D3.js";
import {
  Group_default,
  enterEmphasis,
  getECData,
  getLabelStatesModels,
  initProps,
  leaveEmphasis,
  removeElement,
  retrieveRawValue,
  saveOldStyle,
  setLabelStyle,
  toggleHoverEmphasis,
  traverseElements,
  updateProps
} from "./chunk-PFGJLZCD.js";
import {
  Image_default,
  __extends,
  extend,
  isArray,
  isObject
} from "./chunk-QHW63D3G.js";

// C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/node_modules/echarts/lib/chart/helper/labelHelper.js
function getDefaultLabel(data, dataIndex) {
  var labelDims = data.mapDimensionsAll("defaultedLabel");
  var len = labelDims.length;
  if (len === 1) {
    var rawVal = retrieveRawValue(data, dataIndex, labelDims[0]);
    return rawVal != null ? rawVal + "" : null;
  } else if (len) {
    var vals = [];
    for (var i = 0; i < labelDims.length; i++) {
      vals.push(retrieveRawValue(data, dataIndex, labelDims[i]));
    }
    return vals.join(" ");
  }
}
function getDefaultInterpolatedLabel(data, interpolatedValue) {
  var labelDims = data.mapDimensionsAll("defaultedLabel");
  if (!isArray(interpolatedValue)) {
    return interpolatedValue + "";
  }
  var vals = [];
  for (var i = 0; i < labelDims.length; i++) {
    var dimIndex = data.getDimensionIndex(labelDims[i]);
    if (dimIndex >= 0) {
      vals.push(interpolatedValue[dimIndex]);
    }
  }
  return vals.join(" ");
}

// C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/node_modules/echarts/lib/chart/helper/Symbol.js
var Symbol = (
  /** @class */
  function(_super) {
    __extends(Symbol2, _super);
    function Symbol2(data, idx, seriesScope, opts) {
      var _this = _super.call(this) || this;
      _this.updateData(data, idx, seriesScope, opts);
      return _this;
    }
    Symbol2.prototype._createSymbol = function(symbolType, data, idx, symbolSize, keepAspect) {
      this.removeAll();
      var symbolPath = createSymbol(symbolType, -1, -1, 2, 2, null, keepAspect);
      symbolPath.attr({
        z2: 100,
        culling: true,
        scaleX: symbolSize[0] / 2,
        scaleY: symbolSize[1] / 2
      });
      symbolPath.drift = driftSymbol;
      this._symbolType = symbolType;
      this.add(symbolPath);
    };
    Symbol2.prototype.stopSymbolAnimation = function(toLastFrame) {
      this.childAt(0).stopAnimation(null, toLastFrame);
    };
    Symbol2.prototype.getSymbolType = function() {
      return this._symbolType;
    };
    Symbol2.prototype.getSymbolPath = function() {
      return this.childAt(0);
    };
    Symbol2.prototype.highlight = function() {
      enterEmphasis(this.childAt(0));
    };
    Symbol2.prototype.downplay = function() {
      leaveEmphasis(this.childAt(0));
    };
    Symbol2.prototype.setZ = function(zlevel, z) {
      var symbolPath = this.childAt(0);
      symbolPath.zlevel = zlevel;
      symbolPath.z = z;
    };
    Symbol2.prototype.setDraggable = function(draggable, hasCursorOption) {
      var symbolPath = this.childAt(0);
      symbolPath.draggable = draggable;
      symbolPath.cursor = !hasCursorOption && draggable ? "move" : symbolPath.cursor;
    };
    Symbol2.prototype.updateData = function(data, idx, seriesScope, opts) {
      this.silent = false;
      var symbolType = data.getItemVisual(idx, "symbol") || "circle";
      var seriesModel = data.hostModel;
      var symbolSize = Symbol2.getSymbolSize(data, idx);
      var isInit = symbolType !== this._symbolType;
      var disableAnimation = opts && opts.disableAnimation;
      if (isInit) {
        var keepAspect = data.getItemVisual(idx, "symbolKeepAspect");
        this._createSymbol(symbolType, data, idx, symbolSize, keepAspect);
      } else {
        var symbolPath = this.childAt(0);
        symbolPath.silent = false;
        var target = {
          scaleX: symbolSize[0] / 2,
          scaleY: symbolSize[1] / 2
        };
        disableAnimation ? symbolPath.attr(target) : updateProps(symbolPath, target, seriesModel, idx);
        saveOldStyle(symbolPath);
      }
      this._updateCommon(data, idx, symbolSize, seriesScope, opts);
      if (isInit) {
        var symbolPath = this.childAt(0);
        if (!disableAnimation) {
          var target = {
            scaleX: this._sizeX,
            scaleY: this._sizeY,
            style: {
              // Always fadeIn. Because it has fadeOut animation when symbol is removed..
              opacity: symbolPath.style.opacity
            }
          };
          symbolPath.scaleX = symbolPath.scaleY = 0;
          symbolPath.style.opacity = 0;
          initProps(symbolPath, target, seriesModel, idx);
        }
      }
      if (disableAnimation) {
        this.childAt(0).stopAnimation("leave");
      }
    };
    Symbol2.prototype._updateCommon = function(data, idx, symbolSize, seriesScope, opts) {
      var symbolPath = this.childAt(0);
      var seriesModel = data.hostModel;
      var emphasisItemStyle;
      var blurItemStyle;
      var selectItemStyle;
      var focus;
      var blurScope;
      var emphasisDisabled;
      var labelStatesModels;
      var hoverScale;
      var cursorStyle;
      if (seriesScope) {
        emphasisItemStyle = seriesScope.emphasisItemStyle;
        blurItemStyle = seriesScope.blurItemStyle;
        selectItemStyle = seriesScope.selectItemStyle;
        focus = seriesScope.focus;
        blurScope = seriesScope.blurScope;
        labelStatesModels = seriesScope.labelStatesModels;
        hoverScale = seriesScope.hoverScale;
        cursorStyle = seriesScope.cursorStyle;
        emphasisDisabled = seriesScope.emphasisDisabled;
      }
      if (!seriesScope || data.hasItemOption) {
        var itemModel = seriesScope && seriesScope.itemModel ? seriesScope.itemModel : data.getItemModel(idx);
        var emphasisModel = itemModel.getModel("emphasis");
        emphasisItemStyle = emphasisModel.getModel("itemStyle").getItemStyle();
        selectItemStyle = itemModel.getModel(["select", "itemStyle"]).getItemStyle();
        blurItemStyle = itemModel.getModel(["blur", "itemStyle"]).getItemStyle();
        focus = emphasisModel.get("focus");
        blurScope = emphasisModel.get("blurScope");
        emphasisDisabled = emphasisModel.get("disabled");
        labelStatesModels = getLabelStatesModels(itemModel);
        hoverScale = emphasisModel.getShallow("scale");
        cursorStyle = itemModel.getShallow("cursor");
      }
      var symbolRotate = data.getItemVisual(idx, "symbolRotate");
      symbolPath.attr("rotation", (symbolRotate || 0) * Math.PI / 180 || 0);
      var symbolOffset = normalizeSymbolOffset(data.getItemVisual(idx, "symbolOffset"), symbolSize);
      if (symbolOffset) {
        symbolPath.x = symbolOffset[0];
        symbolPath.y = symbolOffset[1];
      }
      cursorStyle && symbolPath.attr("cursor", cursorStyle);
      var symbolStyle = data.getItemVisual(idx, "style");
      var visualColor = symbolStyle.fill;
      if (symbolPath instanceof Image_default) {
        var pathStyle = symbolPath.style;
        symbolPath.useStyle(extend({
          // TODO other properties like x, y ?
          image: pathStyle.image,
          x: pathStyle.x,
          y: pathStyle.y,
          width: pathStyle.width,
          height: pathStyle.height
        }, symbolStyle));
      } else {
        if (symbolPath.__isEmptyBrush) {
          symbolPath.useStyle(extend({}, symbolStyle));
        } else {
          symbolPath.useStyle(symbolStyle);
        }
        symbolPath.style.decal = null;
        symbolPath.setColor(visualColor, opts && opts.symbolInnerColor);
        symbolPath.style.strokeNoScale = true;
      }
      var liftZ = data.getItemVisual(idx, "liftZ");
      var z2Origin = this._z2;
      if (liftZ != null) {
        if (z2Origin == null) {
          this._z2 = symbolPath.z2;
          symbolPath.z2 += liftZ;
        }
      } else if (z2Origin != null) {
        symbolPath.z2 = z2Origin;
        this._z2 = null;
      }
      var useNameLabel = opts && opts.useNameLabel;
      setLabelStyle(symbolPath, labelStatesModels, {
        labelFetcher: seriesModel,
        labelDataIndex: idx,
        defaultText: getLabelDefaultText,
        inheritColor: visualColor,
        defaultOpacity: symbolStyle.opacity
      });
      function getLabelDefaultText(idx2) {
        return useNameLabel ? data.getName(idx2) : getDefaultLabel(data, idx2);
      }
      this._sizeX = symbolSize[0] / 2;
      this._sizeY = symbolSize[1] / 2;
      var emphasisState = symbolPath.ensureState("emphasis");
      emphasisState.style = emphasisItemStyle;
      symbolPath.ensureState("select").style = selectItemStyle;
      symbolPath.ensureState("blur").style = blurItemStyle;
      var scaleRatio = hoverScale == null || hoverScale === true ? Math.max(1.1, 3 / this._sizeY) : isFinite(hoverScale) && hoverScale > 0 ? +hoverScale : 1;
      emphasisState.scaleX = this._sizeX * scaleRatio;
      emphasisState.scaleY = this._sizeY * scaleRatio;
      this.setSymbolScale(1);
      toggleHoverEmphasis(this, focus, blurScope, emphasisDisabled);
    };
    Symbol2.prototype.setSymbolScale = function(scale) {
      this.scaleX = this.scaleY = scale;
    };
    Symbol2.prototype.fadeOut = function(cb, seriesModel, opt) {
      var symbolPath = this.childAt(0);
      var dataIndex = getECData(this).dataIndex;
      var animationOpt = opt && opt.animation;
      this.silent = symbolPath.silent = true;
      if (opt && opt.fadeLabel) {
        var textContent = symbolPath.getTextContent();
        if (textContent) {
          removeElement(textContent, {
            style: {
              opacity: 0
            }
          }, seriesModel, {
            dataIndex,
            removeOpt: animationOpt,
            cb: function() {
              symbolPath.removeTextContent();
            }
          });
        }
      } else {
        symbolPath.removeTextContent();
      }
      removeElement(symbolPath, {
        style: {
          opacity: 0
        },
        scaleX: 0,
        scaleY: 0
      }, seriesModel, {
        dataIndex,
        cb,
        removeOpt: animationOpt
      });
    };
    Symbol2.getSymbolSize = function(data, idx) {
      return normalizeSymbolSize(data.getItemVisual(idx, "symbolSize"));
    };
    return Symbol2;
  }(Group_default)
);
function driftSymbol(dx, dy) {
  this.parent.drift(dx, dy);
}
var Symbol_default = Symbol;

// C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/node_modules/echarts/lib/chart/helper/SymbolDraw.js
function symbolNeedsDraw(data, point, idx, opt) {
  return point && !isNaN(point[0]) && !isNaN(point[1]) && !(opt.isIgnore && opt.isIgnore(idx)) && !(opt.clipShape && !opt.clipShape.contain(point[0], point[1])) && data.getItemVisual(idx, "symbol") !== "none";
}
function normalizeUpdateOpt(opt) {
  if (opt != null && !isObject(opt)) {
    opt = {
      isIgnore: opt
    };
  }
  return opt || {};
}
function makeSeriesScope(data) {
  var seriesModel = data.hostModel;
  var emphasisModel = seriesModel.getModel("emphasis");
  return {
    emphasisItemStyle: emphasisModel.getModel("itemStyle").getItemStyle(),
    blurItemStyle: seriesModel.getModel(["blur", "itemStyle"]).getItemStyle(),
    selectItemStyle: seriesModel.getModel(["select", "itemStyle"]).getItemStyle(),
    focus: emphasisModel.get("focus"),
    blurScope: emphasisModel.get("blurScope"),
    emphasisDisabled: emphasisModel.get("disabled"),
    hoverScale: emphasisModel.get("scale"),
    labelStatesModels: getLabelStatesModels(seriesModel),
    cursorStyle: seriesModel.get("cursor")
  };
}
var SymbolDraw = (
  /** @class */
  function() {
    function SymbolDraw2(SymbolCtor) {
      this.group = new Group_default();
      this._SymbolCtor = SymbolCtor || Symbol_default;
    }
    SymbolDraw2.prototype.updateData = function(data, opt) {
      this._progressiveEls = null;
      opt = normalizeUpdateOpt(opt);
      var group = this.group;
      var seriesModel = data.hostModel;
      var oldData = this._data;
      var SymbolCtor = this._SymbolCtor;
      var disableAnimation = opt.disableAnimation;
      var seriesScope = makeSeriesScope(data);
      var symbolUpdateOpt = {
        disableAnimation
      };
      var getSymbolPoint = opt.getSymbolPoint || function(idx) {
        return data.getItemLayout(idx);
      };
      if (!oldData) {
        group.removeAll();
      }
      data.diff(oldData).add(function(newIdx) {
        var point = getSymbolPoint(newIdx);
        if (symbolNeedsDraw(data, point, newIdx, opt)) {
          var symbolEl = new SymbolCtor(data, newIdx, seriesScope, symbolUpdateOpt);
          symbolEl.setPosition(point);
          data.setItemGraphicEl(newIdx, symbolEl);
          group.add(symbolEl);
        }
      }).update(function(newIdx, oldIdx) {
        var symbolEl = oldData.getItemGraphicEl(oldIdx);
        var point = getSymbolPoint(newIdx);
        if (!symbolNeedsDraw(data, point, newIdx, opt)) {
          group.remove(symbolEl);
          return;
        }
        var newSymbolType = data.getItemVisual(newIdx, "symbol") || "circle";
        var oldSymbolType = symbolEl && symbolEl.getSymbolType && symbolEl.getSymbolType();
        if (!symbolEl || oldSymbolType && oldSymbolType !== newSymbolType) {
          group.remove(symbolEl);
          symbolEl = new SymbolCtor(data, newIdx, seriesScope, symbolUpdateOpt);
          symbolEl.setPosition(point);
        } else {
          symbolEl.updateData(data, newIdx, seriesScope, symbolUpdateOpt);
          var target = {
            x: point[0],
            y: point[1]
          };
          disableAnimation ? symbolEl.attr(target) : updateProps(symbolEl, target, seriesModel);
        }
        group.add(symbolEl);
        data.setItemGraphicEl(newIdx, symbolEl);
      }).remove(function(oldIdx) {
        var el = oldData.getItemGraphicEl(oldIdx);
        el && el.fadeOut(function() {
          group.remove(el);
        }, seriesModel);
      }).execute();
      this._getSymbolPoint = getSymbolPoint;
      this._data = data;
    };
    ;
    SymbolDraw2.prototype.updateLayout = function() {
      var _this = this;
      var data = this._data;
      if (data) {
        data.eachItemGraphicEl(function(el, idx) {
          var point = _this._getSymbolPoint(idx);
          el.setPosition(point);
          el.markRedraw();
        });
      }
    };
    ;
    SymbolDraw2.prototype.incrementalPrepareUpdate = function(data) {
      this._seriesScope = makeSeriesScope(data);
      this._data = null;
      this.group.removeAll();
    };
    ;
    SymbolDraw2.prototype.incrementalUpdate = function(taskParams, data, opt) {
      this._progressiveEls = [];
      opt = normalizeUpdateOpt(opt);
      function updateIncrementalAndHover(el2) {
        if (!el2.isGroup) {
          el2.incremental = true;
          el2.ensureState("emphasis").hoverLayer = true;
        }
      }
      for (var idx = taskParams.start; idx < taskParams.end; idx++) {
        var point = data.getItemLayout(idx);
        if (symbolNeedsDraw(data, point, idx, opt)) {
          var el = new this._SymbolCtor(data, idx, this._seriesScope);
          el.traverse(updateIncrementalAndHover);
          el.setPosition(point);
          this.group.add(el);
          data.setItemGraphicEl(idx, el);
          this._progressiveEls.push(el);
        }
      }
    };
    ;
    SymbolDraw2.prototype.eachRendered = function(cb) {
      traverseElements(this._progressiveEls || this.group, cb);
    };
    SymbolDraw2.prototype.remove = function(enableAnimation) {
      var group = this.group;
      var data = this._data;
      if (data && enableAnimation) {
        data.eachItemGraphicEl(function(el) {
          el.fadeOut(function() {
            group.remove(el);
          }, data.hostModel);
        });
      } else {
        group.removeAll();
      }
    };
    ;
    return SymbolDraw2;
  }()
);
var SymbolDraw_default = SymbolDraw;

// C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/node_modules/echarts/lib/coord/CoordinateSystem.js
function isCoordinateSystemType(coordSys, type) {
  return coordSys.type === type;
}

export {
  getDefaultLabel,
  getDefaultInterpolatedLabel,
  Symbol_default,
  SymbolDraw_default,
  isCoordinateSystemType
};
//# sourceMappingURL=chunk-VTQYKTMY.js.map
