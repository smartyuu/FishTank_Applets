import {
  __commonJS
} from "./chunk-FAW2VN4A.js";

// C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/node_modules/weixin-js-sdk/index.js
var require_weixin_js_sdk = __commonJS({
  "C:/Users/Yiweiyihang/OneDrive/桌面/FishTank_Applets/test/test/node_modules/weixin-js-sdk/index.js"(exports, module) {
    !function(e, n) {
      module.exports = n(e);
    }(window, function(o, e) {
      if (!o.jWeixin) {
        var n, c = {
          config: "preVerifyJSAPI",
          onMenuShareTimeline: "menu:share:timeline",
          onMenuShareAppMessage: "menu:share:appmessage",
          onMenuShareQQ: "menu:share:qq",
          onMenuShareWeibo: "menu:share:weiboApp",
          onMenuShareQZone: "menu:share:QZone",
          previewImage: "imagePreview",
          getLocation: "geoLocation",
          openProductSpecificView: "openProductViewWithPid",
          addCard: "batchAddCard",
          openCard: "batchViewCard",
          chooseWXPay: "getBrandWCPayRequest",
          openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
          startSearchBeacons: "startMonitoringBeacons",
          stopSearchBeacons: "stopMonitoringBeacons",
          onSearchBeacons: "onBeaconsInRange",
          consumeAndShareCard: "consumedShareCard",
          openAddress: "editAddress"
        }, a = function() {
          var e2 = {};
          for (var n2 in c)
            e2[c[n2]] = n2;
          return e2;
        }(), i = o.document, t = i.title, r = navigator.userAgent.toLowerCase(), s = navigator.platform.toLowerCase(), d = !(!s.match("mac") && !s.match("win")), u = -1 != r.indexOf("wxdebugger"), l = -1 != r.indexOf("micromessenger"), p = -1 != r.indexOf("android"), f = -1 != r.indexOf("iphone") || -1 != r.indexOf("ipad"), m = (n = r.match(/micromessenger\/(\d+\.\d+\.\d+)/) || r.match(/micromessenger\/(\d+\.\d+)/)) ? n[1] : "", g = {
          initStartTime: L(),
          initEndTime: 0,
          preVerifyStartTime: 0,
          preVerifyEndTime: 0
        }, h = {
          version: 1,
          appId: "",
          initTime: 0,
          preVerifyTime: 0,
          networkType: "",
          isPreVerifyOk: 1,
          systemType: f ? 1 : p ? 2 : -1,
          clientVersion: m,
          url: encodeURIComponent(location.href)
        }, v = {}, S = { _completes: [] }, y = { state: 0, data: {} };
        O(function() {
          g.initEndTime = L();
        });
        var I = false, _ = [], w = {
          config: function(e2) {
            B("config", v = e2);
            var t2 = false !== v.check;
            O(function() {
              if (t2)
                M(
                  c.config,
                  {
                    verifyJsApiList: C(v.jsApiList),
                    verifyOpenTagList: C(v.openTagList)
                  },
                  function() {
                    S._complete = function(e4) {
                      g.preVerifyEndTime = L(), y.state = 1, y.data = e4;
                    }, S.success = function(e4) {
                      h.isPreVerifyOk = 0;
                    }, S.fail = function(e4) {
                      S._fail ? S._fail(e4) : y.state = -1;
                    };
                    var t3 = S._completes;
                    return t3.push(function() {
                      !function() {
                        if (!(d || u || v.debug || m < "6.0.2" || h.systemType < 0)) {
                          var i3 = new Image();
                          h.appId = v.appId, h.initTime = g.initEndTime - g.initStartTime, h.preVerifyTime = g.preVerifyEndTime - g.preVerifyStartTime, w.getNetworkType({
                            isInnerInvoke: true,
                            success: function(e4) {
                              h.networkType = e4.networkType;
                              var n3 = "https://open.weixin.qq.com/sdk/report?v=" + h.version + "&o=" + h.isPreVerifyOk + "&s=" + h.systemType + "&c=" + h.clientVersion + "&a=" + h.appId + "&n=" + h.networkType + "&i=" + h.initTime + "&p=" + h.preVerifyTime + "&u=" + h.url;
                              i3.src = n3;
                            }
                          });
                        }
                      }();
                    }), S.complete = function(e4) {
                      for (var n3 = 0, i3 = t3.length; n3 < i3; ++n3)
                        t3[n3]();
                      S._completes = [];
                    }, S;
                  }()
                ), g.preVerifyStartTime = L();
              else {
                y.state = 1;
                for (var e3 = S._completes, n2 = 0, i2 = e3.length; n2 < i2; ++n2)
                  e3[n2]();
                S._completes = [];
              }
            }), w.invoke || (w.invoke = function(e3, n2, i2) {
              o.WeixinJSBridge && WeixinJSBridge.invoke(e3, x(n2), i2);
            }, w.on = function(e3, n2) {
              o.WeixinJSBridge && WeixinJSBridge.on(e3, n2);
            });
          },
          ready: function(e2) {
            0 != y.state ? e2() : (S._completes.push(e2), !l && v.debug && e2());
          },
          error: function(e2) {
            m < "6.0.2" || (-1 == y.state ? e2(y.data) : S._fail = e2);
          },
          checkJsApi: function(e2) {
            M(
              "checkJsApi",
              { jsApiList: C(e2.jsApiList) },
              (e2._complete = function(e3) {
                if (p) {
                  var n2 = e3.checkResult;
                  n2 && (e3.checkResult = JSON.parse(n2));
                }
                e3 = function(e4) {
                  var n3 = e4.checkResult;
                  for (var i2 in n3) {
                    var t2 = a[i2];
                    t2 && (n3[t2] = n3[i2], delete n3[i2]);
                  }
                  return e4;
                }(e3);
              }, e2)
            );
          },
          onMenuShareTimeline: function(e2) {
            P(
              c.onMenuShareTimeline,
              {
                complete: function() {
                  M(
                    "shareTimeline",
                    {
                      title: e2.title || t,
                      desc: e2.title || t,
                      img_url: e2.imgUrl || "",
                      link: e2.link || location.href,
                      type: e2.type || "link",
                      data_url: e2.dataUrl || ""
                    },
                    e2
                  );
                }
              },
              e2
            );
          },
          onMenuShareAppMessage: function(n2) {
            P(
              c.onMenuShareAppMessage,
              {
                complete: function(e2) {
                  "favorite" === e2.scene ? M("sendAppMessage", {
                    title: n2.title || t,
                    desc: n2.desc || "",
                    link: n2.link || location.href,
                    img_url: n2.imgUrl || "",
                    type: n2.type || "link",
                    data_url: n2.dataUrl || ""
                  }) : M(
                    "sendAppMessage",
                    {
                      title: n2.title || t,
                      desc: n2.desc || "",
                      link: n2.link || location.href,
                      img_url: n2.imgUrl || "",
                      type: n2.type || "link",
                      data_url: n2.dataUrl || ""
                    },
                    n2
                  );
                }
              },
              n2
            );
          },
          onMenuShareQQ: function(e2) {
            P(
              c.onMenuShareQQ,
              {
                complete: function() {
                  M(
                    "shareQQ",
                    {
                      title: e2.title || t,
                      desc: e2.desc || "",
                      img_url: e2.imgUrl || "",
                      link: e2.link || location.href
                    },
                    e2
                  );
                }
              },
              e2
            );
          },
          onMenuShareWeibo: function(e2) {
            P(
              c.onMenuShareWeibo,
              {
                complete: function() {
                  M(
                    "shareWeiboApp",
                    {
                      title: e2.title || t,
                      desc: e2.desc || "",
                      img_url: e2.imgUrl || "",
                      link: e2.link || location.href
                    },
                    e2
                  );
                }
              },
              e2
            );
          },
          onMenuShareQZone: function(e2) {
            P(
              c.onMenuShareQZone,
              {
                complete: function() {
                  M(
                    "shareQZone",
                    {
                      title: e2.title || t,
                      desc: e2.desc || "",
                      img_url: e2.imgUrl || "",
                      link: e2.link || location.href
                    },
                    e2
                  );
                }
              },
              e2
            );
          },
          updateTimelineShareData: function(e2) {
            M(
              "updateTimelineShareData",
              { title: e2.title, link: e2.link, imgUrl: e2.imgUrl },
              e2
            );
          },
          updateAppMessageShareData: function(e2) {
            M(
              "updateAppMessageShareData",
              { title: e2.title, desc: e2.desc, link: e2.link, imgUrl: e2.imgUrl },
              e2
            );
          },
          startRecord: function(e2) {
            M("startRecord", {}, e2);
          },
          stopRecord: function(e2) {
            M("stopRecord", {}, e2);
          },
          onVoiceRecordEnd: function(e2) {
            P("onVoiceRecordEnd", e2);
          },
          playVoice: function(e2) {
            M("playVoice", { localId: e2.localId }, e2);
          },
          pauseVoice: function(e2) {
            M("pauseVoice", { localId: e2.localId }, e2);
          },
          stopVoice: function(e2) {
            M("stopVoice", { localId: e2.localId }, e2);
          },
          onVoicePlayEnd: function(e2) {
            P("onVoicePlayEnd", e2);
          },
          uploadVoice: function(e2) {
            M(
              "uploadVoice",
              {
                localId: e2.localId,
                isShowProgressTips: 0 == e2.isShowProgressTips ? 0 : 1
              },
              e2
            );
          },
          downloadVoice: function(e2) {
            M(
              "downloadVoice",
              {
                serverId: e2.serverId,
                isShowProgressTips: 0 == e2.isShowProgressTips ? 0 : 1
              },
              e2
            );
          },
          translateVoice: function(e2) {
            M(
              "translateVoice",
              {
                localId: e2.localId,
                isShowProgressTips: 0 == e2.isShowProgressTips ? 0 : 1
              },
              e2
            );
          },
          chooseImage: function(e2) {
            M(
              "chooseImage",
              {
                scene: "1|2",
                count: e2.count || 9,
                sizeType: e2.sizeType || ["original", "compressed"],
                sourceType: e2.sourceType || ["album", "camera"]
              },
              (e2._complete = function(e3) {
                if (p) {
                  var n2 = e3.localIds;
                  try {
                    n2 && (e3.localIds = JSON.parse(n2));
                  } catch (e4) {
                  }
                }
              }, e2)
            );
          },
          getLocation: function(e2) {
          },
          previewImage: function(e2) {
            M(c.previewImage, { current: e2.current, urls: e2.urls }, e2);
          },
          uploadImage: function(e2) {
            M(
              "uploadImage",
              {
                localId: e2.localId,
                isShowProgressTips: 0 == e2.isShowProgressTips ? 0 : 1
              },
              e2
            );
          },
          downloadImage: function(e2) {
            M(
              "downloadImage",
              {
                serverId: e2.serverId,
                isShowProgressTips: 0 == e2.isShowProgressTips ? 0 : 1
              },
              e2
            );
          },
          getLocalImgData: function(e2) {
            false === I ? (I = true, M(
              "getLocalImgData",
              { localId: e2.localId },
              (e2._complete = function(e3) {
                if (I = false, 0 < _.length) {
                  var n2 = _.shift();
                  wx.getLocalImgData(n2);
                }
              }, e2)
            )) : _.push(e2);
          },
          getNetworkType: function(e2) {
            M(
              "getNetworkType",
              {},
              (e2._complete = function(e3) {
                e3 = function(e4) {
                  var n2 = e4.errMsg;
                  e4.errMsg = "getNetworkType:ok";
                  var i2 = e4.subtype;
                  if (delete e4.subtype, i2)
                    e4.networkType = i2;
                  else {
                    var t2 = n2.indexOf(":"), o2 = n2.substring(t2 + 1);
                    switch (o2) {
                      case "wifi":
                      case "edge":
                      case "wwan":
                        e4.networkType = o2;
                        break;
                      default:
                        e4.errMsg = "getNetworkType:fail";
                    }
                  }
                  return e4;
                }(e3);
              }, e2)
            );
          },
          openLocation: function(e2) {
            M(
              "openLocation",
              {
                latitude: e2.latitude,
                longitude: e2.longitude,
                name: e2.name || "",
                address: e2.address || "",
                scale: e2.scale || 28,
                infoUrl: e2.infoUrl || ""
              },
              e2
            );
          },
          getLocation: function(e2) {
            M(
              c.getLocation,
              { type: (e2 = e2 || {}).type || "wgs84" },
              (e2._complete = function(e3) {
                delete e3.type;
              }, e2)
            );
          },
          hideOptionMenu: function(e2) {
            M("hideOptionMenu", {}, e2);
          },
          showOptionMenu: function(e2) {
            M("showOptionMenu", {}, e2);
          },
          closeWindow: function(e2) {
            M("closeWindow", {}, e2 = e2 || {});
          },
          hideMenuItems: function(e2) {
            M("hideMenuItems", { menuList: e2.menuList }, e2);
          },
          showMenuItems: function(e2) {
            M("showMenuItems", { menuList: e2.menuList }, e2);
          },
          hideAllNonBaseMenuItem: function(e2) {
            M("hideAllNonBaseMenuItem", {}, e2);
          },
          showAllNonBaseMenuItem: function(e2) {
            M("showAllNonBaseMenuItem", {}, e2);
          },
          scanQRCode: function(e2) {
            M(
              "scanQRCode",
              {
                needResult: (e2 = e2 || {}).needResult || 0,
                scanType: e2.scanType || ["qrCode", "barCode"]
              },
              (e2._complete = function(e3) {
                if (f) {
                  var n2 = e3.resultStr;
                  if (n2) {
                    var i2 = JSON.parse(n2);
                    e3.resultStr = i2 && i2.scan_code && i2.scan_code.scan_result;
                  }
                }
              }, e2)
            );
          },
          openAddress: function(e2) {
            M(
              c.openAddress,
              {},
              (e2._complete = function(e3) {
                e3 = function(e4) {
                  return e4.postalCode = e4.addressPostalCode, delete e4.addressPostalCode, e4.provinceName = e4.proviceFirstStageName, delete e4.proviceFirstStageName, e4.cityName = e4.addressCitySecondStageName, delete e4.addressCitySecondStageName, e4.countryName = e4.addressCountiesThirdStageName, delete e4.addressCountiesThirdStageName, e4.detailInfo = e4.addressDetailInfo, delete e4.addressDetailInfo, e4;
                }(e3);
              }, e2)
            );
          },
          openProductSpecificView: function(e2) {
            M(
              c.openProductSpecificView,
              {
                pid: e2.productId,
                view_type: e2.viewType || 0,
                ext_info: e2.extInfo
              },
              e2
            );
          },
          addCard: function(e2) {
            for (var n2 = e2.cardList, i2 = [], t2 = 0, o2 = n2.length; t2 < o2; ++t2) {
              var r2 = n2[t2], a2 = { card_id: r2.cardId, card_ext: r2.cardExt };
              i2.push(a2);
            }
            M(
              c.addCard,
              { card_list: i2 },
              (e2._complete = function(e3) {
                var n3 = e3.card_list;
                if (n3) {
                  for (var i3 = 0, t3 = (n3 = JSON.parse(n3)).length; i3 < t3; ++i3) {
                    var o3 = n3[i3];
                    o3.cardId = o3.card_id, o3.cardExt = o3.card_ext, o3.isSuccess = !!o3.is_succ, delete o3.card_id, delete o3.card_ext, delete o3.is_succ;
                  }
                  e3.cardList = n3, delete e3.card_list;
                }
              }, e2)
            );
          },
          chooseCard: function(e2) {
            M(
              "chooseCard",
              {
                app_id: v.appId,
                location_id: e2.shopId || "",
                sign_type: e2.signType || "SHA1",
                card_id: e2.cardId || "",
                card_type: e2.cardType || "",
                card_sign: e2.cardSign,
                time_stamp: e2.timestamp + "",
                nonce_str: e2.nonceStr
              },
              (e2._complete = function(e3) {
                e3.cardList = e3.choose_card_info, delete e3.choose_card_info;
              }, e2)
            );
          },
          openCard: function(e2) {
            for (var n2 = e2.cardList, i2 = [], t2 = 0, o2 = n2.length; t2 < o2; ++t2) {
              var r2 = n2[t2], a2 = { card_id: r2.cardId, code: r2.code };
              i2.push(a2);
            }
            M(c.openCard, { card_list: i2 }, e2);
          },
          consumeAndShareCard: function(e2) {
            M(
              c.consumeAndShareCard,
              { consumedCardId: e2.cardId, consumedCode: e2.code },
              e2
            );
          },
          chooseWXPay: function(e2) {
            M(c.chooseWXPay, V(e2), e2);
          },
          openEnterpriseRedPacket: function(e2) {
            M(c.openEnterpriseRedPacket, V(e2), e2);
          },
          startSearchBeacons: function(e2) {
            M(c.startSearchBeacons, { ticket: e2.ticket }, e2);
          },
          stopSearchBeacons: function(e2) {
            M(c.stopSearchBeacons, {}, e2);
          },
          onSearchBeacons: function(e2) {
            P(c.onSearchBeacons, e2);
          },
          openEnterpriseChat: function(e2) {
            M(
              "openEnterpriseChat",
              { useridlist: e2.userIds, chatname: e2.groupName },
              e2
            );
          },
          launchMiniProgram: function(e2) {
            M(
              "launchMiniProgram",
              {
                targetAppId: e2.targetAppId,
                path: function(e3) {
                  if ("string" == typeof e3 && 0 < e3.length) {
                    var n2 = e3.split("?")[0], i2 = e3.split("?")[1];
                    return n2 += ".html", void 0 !== i2 ? n2 + "?" + i2 : n2;
                  }
                }(e2.path),
                envVersion: e2.envVersion
              },
              e2
            );
          },
          openBusinessView: function(e2) {
            M(
              "openBusinessView",
              {
                businessType: e2.businessType,
                queryString: e2.queryString || "",
                envVersion: e2.envVersion
              },
              (e2._complete = function(n2) {
                if (p) {
                  var e3 = n2.extraData;
                  if (e3)
                    try {
                      n2.extraData = JSON.parse(e3);
                    } catch (e4) {
                      n2.extraData = {};
                    }
                }
              }, e2)
            );
          },
          miniProgram: {
            navigateBack: function(e2) {
              e2 = e2 || {}, O(function() {
                M(
                  "invokeMiniProgramAPI",
                  { name: "navigateBack", arg: { delta: e2.delta || 1 } },
                  e2
                );
              });
            },
            navigateTo: function(e2) {
              O(function() {
                M(
                  "invokeMiniProgramAPI",
                  { name: "navigateTo", arg: { url: e2.url } },
                  e2
                );
              });
            },
            redirectTo: function(e2) {
              O(function() {
                M(
                  "invokeMiniProgramAPI",
                  { name: "redirectTo", arg: { url: e2.url } },
                  e2
                );
              });
            },
            switchTab: function(e2) {
              O(function() {
                M(
                  "invokeMiniProgramAPI",
                  { name: "switchTab", arg: { url: e2.url } },
                  e2
                );
              });
            },
            reLaunch: function(e2) {
              O(function() {
                M(
                  "invokeMiniProgramAPI",
                  { name: "reLaunch", arg: { url: e2.url } },
                  e2
                );
              });
            },
            postMessage: function(e2) {
              O(function() {
                M(
                  "invokeMiniProgramAPI",
                  { name: "postMessage", arg: e2.data || {} },
                  e2
                );
              });
            },
            getEnv: function(e2) {
              O(function() {
                e2({ miniprogram: "miniprogram" === o.__wxjs_environment });
              });
            }
          }
        }, T = 1, k = {};
        return i.addEventListener(
          "error",
          function(e2) {
            if (!p) {
              var n2 = e2.target, i2 = n2.tagName, t2 = n2.src;
              if ("IMG" == i2 || "VIDEO" == i2 || "AUDIO" == i2 || "SOURCE" == i2) {
                if (-1 != t2.indexOf("wxlocalresource://")) {
                  e2.preventDefault(), e2.stopPropagation();
                  var o2 = n2["wx-id"];
                  if (o2 || (o2 = T++, n2["wx-id"] = o2), k[o2])
                    return;
                  k[o2] = true, wx.ready(function() {
                    wx.getLocalImgData({
                      localId: t2,
                      success: function(e3) {
                        n2.src = e3.localData;
                      }
                    });
                  });
                }
              }
            }
          },
          true
        ), i.addEventListener(
          "load",
          function(e2) {
            if (!p) {
              var n2 = e2.target, i2 = n2.tagName;
              n2.src;
              if ("IMG" == i2 || "VIDEO" == i2 || "AUDIO" == i2 || "SOURCE" == i2) {
                var t2 = n2["wx-id"];
                t2 && (k[t2] = false);
              }
            }
          },
          true
        ), e && (o.wx = o.jWeixin = w), w;
      }
      function M(n2, e2, i2) {
        o.WeixinJSBridge ? WeixinJSBridge.invoke(n2, x(e2), function(e3) {
          A(n2, e3, i2);
        }) : B(n2, i2);
      }
      function P(n2, i2, t2) {
        o.WeixinJSBridge ? WeixinJSBridge.on(n2, function(e2) {
          t2 && t2.trigger && t2.trigger(e2), A(n2, e2, i2);
        }) : B(n2, t2 || i2);
      }
      function x(e2) {
        return (e2 = e2 || {}).appId = v.appId, e2.verifyAppId = v.appId, e2.verifySignType = "sha1", e2.verifyTimestamp = v.timestamp + "", e2.verifyNonceStr = v.nonceStr, e2.verifySignature = v.signature, e2;
      }
      function V(e2) {
        return {
          timeStamp: e2.timestamp + "",
          nonceStr: e2.nonceStr,
          package: e2.package,
          paySign: e2.paySign,
          signType: e2.signType || "SHA1"
        };
      }
      function A(e2, n2, i2) {
        "openEnterpriseChat" != e2 && "openBusinessView" !== e2 || (n2.errCode = n2.err_code), delete n2.err_code, delete n2.err_desc, delete n2.err_detail;
        var t2 = n2.errMsg;
        t2 || (t2 = n2.err_msg, delete n2.err_msg, t2 = function(e3, n3) {
          var i3 = e3, t3 = a[i3];
          t3 && (i3 = t3);
          var o3 = "ok";
          if (n3) {
            var r2 = n3.indexOf(":");
            "confirm" == (o3 = n3.substring(r2 + 1)) && (o3 = "ok"), "failed" == o3 && (o3 = "fail"), -1 != o3.indexOf("failed_") && (o3 = o3.substring(7)), -1 != o3.indexOf("fail_") && (o3 = o3.substring(5)), "access denied" != (o3 = (o3 = o3.replace(/_/g, " ")).toLowerCase()) && "no permission to execute" != o3 || (o3 = "permission denied"), "config" == i3 && "function not exist" == o3 && (o3 = "ok"), "" == o3 && (o3 = "fail");
          }
          return n3 = i3 + ":" + o3;
        }(e2, t2), n2.errMsg = t2), (i2 = i2 || {})._complete && (i2._complete(n2), delete i2._complete), t2 = n2.errMsg || "", v.debug && !i2.isInnerInvoke && alert(JSON.stringify(n2));
        var o2 = t2.indexOf(":");
        switch (t2.substring(o2 + 1)) {
          case "ok":
            i2.success && i2.success(n2);
            break;
          case "cancel":
            i2.cancel && i2.cancel(n2);
            break;
          default:
            i2.fail && i2.fail(n2);
        }
        i2.complete && i2.complete(n2);
      }
      function C(e2) {
        if (e2) {
          for (var n2 = 0, i2 = e2.length; n2 < i2; ++n2) {
            var t2 = e2[n2], o2 = c[t2];
            o2 && (e2[n2] = o2);
          }
          return e2;
        }
      }
      function B(e2, n2) {
        if (!(!v.debug || n2 && n2.isInnerInvoke)) {
          var i2 = a[e2];
          i2 && (e2 = i2), n2 && n2._complete && delete n2._complete, console.log('"' + e2 + '",', n2 || "");
        }
      }
      function L() {
        return (/* @__PURE__ */ new Date()).getTime();
      }
      function O(e2) {
        l && (o.WeixinJSBridge ? e2() : i.addEventListener && i.addEventListener("WeixinJSBridgeReady", e2, false));
      }
    });
  }
});
export default require_weixin_js_sdk();
//# sourceMappingURL=weixin-js-sdk.js.map
