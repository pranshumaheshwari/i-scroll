var app = {}, windowId, mainWindowId;

app.version = function () {return chrome.runtime.getManifest().version};
app.homepage = function () {return chrome.runtime.getManifest().homepage_url};
app.button = {"clicked": function (callback) {chrome.browserAction.onClicked.addListener(callback)}}
if (chrome.runtime.setUninstallURL) chrome.runtime.setUninstallURL(app.homepage() + "?v=" + app.version() + "&type=uninstall", function () {});

app.storage = (function () {
  window.setTimeout(function () {
    chrome.storage.local.get(null, function (o) {
      app.storage.GLOBAL = o;
      var script = document.createElement("script");
      script.src = "../common.js";
      document.body.appendChild(script);
    });
  }, 300);
  /*  */
  return {
    "GLOBAL": {},
    "read": function (id) {return app.storage.GLOBAL[id]},
    "changed": function (callback) {chrome.storage.onChanged.addListener(callback)},
    "write": function (id, data) {
      var tmp = {};
      tmp[id] = data;
      app.storage.GLOBAL[id] = data;
      chrome.storage.local.set(tmp, function () {});
    }
  }
})();

app.tab = {
  "query": function (o, callback) {chrome.tabs.query(o, callback)},
  "open": function (url) {
    var o_1 = {"url": url, "active": true};
    var o_2 = {"url": url, "active": true, "windowId": mainWindowId};
    var tmp = mainWindowId !== undefined ? o_2 : o_1;
    chrome.tabs.create(tmp);
  }
};

// app.UI = (function () {
//   var r = {};
//   chrome.windows.onRemoved.addListener(function (e) {if (e === windowId) {windowId = null}});
//   chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     if (request.path === 'ui-to-background') {
//       for (var id in r) {
//         if (r[id] && (typeof r[id] === "function")) {
//           if (request.method === id) r[id](request.data);
//         }
//       }
//     }
//   });
//   /*  */
//   return {
//     "close": function () {chrome.windows.remove(windowId)},
//     "receive": function (id, callback) {r[id] = callback},
//     "send": function (id, data) {
//       chrome.tabs.query({}, function (tabs) {
//         tabs.forEach(function (tab) {
//           chrome.tabs.sendMessage(tab.id, {"path": 'background-to-ui', "method": id, "data": data}, function () {});
//         });
//       });
//     },
//     "create": function () {
//       chrome.windows.getCurrent(function (win) {
//         mainWindowId = win.id;
//         var width = config.UI.size.width;
//         var height = config.UI.size.height;
//         var url = chrome.runtime.getURL("data/panel/panel.html");
//         var top = win.top + Math.round((win.height - height) / 2);
//         var left = win.left + Math.round((win.width - width) / 2);
//         chrome.windows.create({'url': url, 'type': 'popup', 'width': width, 'height': height, 'top': top, 'left': left}, function (w) {windowId = w.id});
//       });
//     }
//   }
// })();

// chrome.runtime.onConnect.addListener(function (port) {
//   if (port.name === "PANEL") {
//     if (port.sender.url.indexOf("/data/panel/panel.html") !== -1) {
//       /*  */
//     }
//   }
//   /*  */
//   port.onDisconnect.addListener(function (e) {
//     if (e && e.name === "PANEL") {
//       if (e.sender.url.indexOf("/data/panel/panel.html") !== -1) {
//         if (config.AI.video) {
//           config.AI.video.srcObject.getVideoTracks()[0].stop();
//         }
//       }
//     }
//   });
// });

app.content_script = (function () {
  var _tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    for (var id in _tmp) {
      if (_tmp[id] && (typeof _tmp[id] === "function")) {
        if (request.path === 'page-to-background') {
          if (request.method === id) {
            var d = request.data || {};
            if (sender.tab) d["tabId"] = sender.tab.id;
            _tmp[id](d);
          }
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {_tmp[id] = callback},
    "send": function (id, data, tabId) {
      chrome.tabs.query({}, function (tabs) {
        tabs.forEach(function (tab) {
          if (tabId && tab.id === tabId) {
            var d = data || {};
            d["tabId"] = tab.id;
            chrome.tabs.sendMessage(tab.id, {"path": 'background-to-page', "method": id, "data": d}, function () {});
          }
        });
      });
    }
  }
})();
