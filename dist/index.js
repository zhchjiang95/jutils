(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.utilibs = {}));
})(this, (function (exports) { 'use strict';

  /**
   * 格式化当前或自定义时间日期，自定义年月日分隔符和时分秒显示
   * @param opts sep: 年月日分隔符; millisecond: 自定义时间（毫秒）或Date(); showHours: 是否显示时分秒。默认：false
   * @returns string
   * @example
   * ```js
   * formatTime({sep: '-', millisecond: Date.now() + 20, showHours: true}) // 2020-08-24 15:06:32
   * ```
   */
  var formatDate = function (opts) {
      var separator = (opts === null || opts === void 0 ? void 0 : opts.sep) || "-";
      var hasHours = (opts === null || opts === void 0 ? void 0 : opts.showHours) || false;
      var dateTimer = (opts === null || opts === void 0 ? void 0 : opts.millisecond)
          ? new Date(Number(opts.millisecond))
          : new Date();
      var Y = dateTimer.getFullYear();
      var M = dateTimer.getMonth() + 1;
      var D = dateTimer.getDate();
      var h = dateTimer.getHours();
      var m = dateTimer.getMinutes();
      var s = dateTimer.getSeconds();
      M = M >= 10 ? M : "0" + M;
      D = D >= 10 ? D : "0" + D;
      h = h >= 10 ? h : "0" + h;
      m = m >= 10 ? m : "0" + m;
      s = s >= 10 ? s : "0" + s;
      return hasHours
          ? "".concat(Y + separator + M + separator + D, " ").concat(h, ":").concat(m, ":").concat(s)
          : "".concat(Y + separator + M + separator + D);
  };

  /**
   * 判断在屏幕上滑动的方向，允许在任意盒子中滑动，移动过程中实时返回当前X/Y坐标，接收回调函数，返回起始位置和结束位置的X/Y坐标值对象，支持 PC 和移动端。
   * @param selector 指定在某个元素上滑动，传入其标签名或 class 或 id，请确保使用唯一标识
   * @param cb 回调函数，第一个参数为滑动结束时包含起始位置和结束位置的X/Y坐标值对象
   * @param realXY 滑动/移动过程是否实时返回当前X/Y坐标，开启后回调函数中支持第二个参数接收实时坐标对象，默认：false
   * @param realStartEndXY 实时返回当前X/Y坐标后，同时是否实时返回起始位置和结束位置的X/Y坐标值对象，默认：false，返回空对象
   * @example
   * ```js
   * slideDirection('#box', (dir, real) => console.log(dir), true, false) // {startX: 54, startY: 82, endX: 54, endY: 82}
   * ```
   */
  var slideDirection = function (selector, cb, realXY, realStartEndXY) {
      if (realXY === void 0) { realXY = false; }
      if (realStartEndXY === void 0) { realStartEndXY = false; }
      var startX = 0, startY = 0, endX = 0, endY = 0, realX = 0, realY = 0, el = typeof selector === "string"
          ? document.querySelector("".concat(selector))
          : selector;
      if (el === null) {
          throw new Error("".concat(selector, "\u65E0\u6CD5\u67E5\u627E\u5230\u5143\u7D20"));
      }
      if (el.ontouchstart === null) {
          el.ontouchstart = function (e) {
              endX = endY = realX = realY = 0;
              startX = e.changedTouches[0].clientX;
              startY = e.changedTouches[0].clientY;
          };
          realXY &&
              (el.ontouchmove = function (e) {
                  realX = e.changedTouches[0].clientX;
                  realY = e.changedTouches[0].clientY;
                  cb(realStartEndXY
                      ? {
                          startX: startX,
                          startY: startY,
                          endX: endX,
                          endY: endY,
                      }
                      : {}, {
                      realX: realX,
                      realY: realY,
                  });
              });
          el.ontouchend = function (e) {
              endX = e.changedTouches[0].clientX;
              endY = e.changedTouches[0].clientY;
              cb({
                  startX: startX,
                  startY: startY,
                  endX: endX,
                  endY: endY,
              }, {
                  realX: realX,
                  realY: realY,
              });
          };
      }
      else {
          el.onmousedown = function (e) {
              endX = endY = realX = realY = 0;
              startX = e.clientX;
              startY = e.clientY;
              realXY &&
                  (el.onmousemove = function (e) {
                      realX = e.clientX;
                      realY = e.clientY;
                      cb(realStartEndXY
                          ? {
                              startX: startX,
                              startY: startY,
                              endX: endX,
                              endY: endY,
                          }
                          : {}, {
                          realX: realX,
                          realY: realY,
                      });
                  });
          };
          document.onmouseup = function (e) {
              if (el.onmousemove === null)
                  return;
              endX = e.clientX;
              endY = e.clientY;
              el.onmousemove = null;
              cb({
                  startX: startX,
                  startY: startY,
                  endX: endX,
                  endY: endY,
              }, {
                  realX: realX,
                  realY: realY,
              });
          };
      }
  };

  /**
   * 盒子锚点，在任意可滑动盒子中跳转；监听事件元素需指定 data-jt-id 值为目标元素唯一标识 id
   * @param options
   * 1、source：监听点击事件元素（或其父级）选择器，请确保唯一(①选择器带元素名（如：button#search）则监听其内部最深层的元素（理论情况，既实际点击到的元素），该元素须添加 data-jt-id 属性，属性值为目标容器内目标对象的 id（该目标对象须指定 data-jt-type 的值为 'jt'，以配合 callback 工作）。②选择器不带元素名（如：#search）则只监听此元素点击事件，data-jt-id 属性须绑定在此元素上。)；
   * 2、target：目标可滚动容器的选择器，请确保唯一，容器内的目标对象 id 值为对应的 data-jt-id 值（该目标对象须指定 data-jt-type 的值为 'jt'，以配合 callback 工作）；
   * 3、diff：滑动到与父元素的顶部距离差，默认值：4；
   * 4、speed：滑动速度，默认值：20。
   * @param callback 指定回调函数后，函数将在滚动过程定点执行，函数参数默认返回一个对象，包含此时在可视屏幕内指定 data-jt-id 属性的元素和该元素的 data-jt-id 属性值（须目标容器中目标对象指定 data-jt-type 的值为 'jt'）。
   * @example
   * ```js
   * <div id="source-box"><a data-jt-id="h1">锚点到h1</a></div>
   * <div id="target-box"><h4 id="h1" data-jt-type="jt">我的id是h1</h4></div>
   * boxAnchor({source: 'div#source-box', target: '#target-box'}, (res) => {})
   * ```
   */
  var boxAnchor = function (options, callback) {
      var source = document.querySelector(options.source), box = document.querySelector(options.target), boxChildren = Array.from((box === null || box === void 0 ? void 0 : box.children) || []).filter(function (v) { return v.dataset.jtType === "jt"; }), V, arr = null;
      source.onclick = function (e) {
          var id = "#" +
              (/^[.|#]/.test(options.source)
                  ? this.dataset.jtId
                  : e.target.dataset.jtId);
          var target = document.querySelector(id);
          if (!target)
              return;
          var diff = options.diff ? options.diff : 0;
          var speed = options.speed ? options.speed : 10;
          var targetHeight = parseFloat(getComputedStyle(target).height);
          var flag = box.scrollTop >= target.offsetTop - targetHeight - diff;
          (function jMove() {
              if (flag) {
                  if (box.scrollTop > target.offsetTop - targetHeight - diff &&
                      box.scrollTop !== 0) {
                      box.scrollTo(0, box.scrollTop - speed);
                      requestAnimationFrame(jMove);
                  }
              }
              else {
                  if (target.offsetTop - targetHeight - diff - box.scrollTop > speed &&
                      box.scrollTop + box.offsetHeight < box.scrollHeight - speed) {
                      box.scrollTo(0, box.scrollTop + speed);
                      requestAnimationFrame(jMove);
                  }
              }
          })();
          return false;
      };
      typeof callback === "function" &&
          box.addEventListener("scroll", function () {
              boxChildren.map(function (v) {
                  if (v !== V) {
                      V = v;
                      v.distance = Math.abs(v.offsetTop - box.scrollTop);
                  }
              });
              var tmp = boxChildren.sort(function (p, n) { return p.distance - n.distance; });
              if (!arr || arr[0].id !== tmp[0].id) {
                  arr = tmp.slice();
                  callback({
                      el: tmp[0],
                      jtId: tmp[0].id,
                  });
              }
          });
  };

  /**
   * 指定页面滑动到某个位置，自定义滑动速度/滑动方向。须整个页面可滑动
   * @param opts anchor：滑动到的目标位置；speed：滑动速度；down：向下滑动？向下（true）/向上（false），默认：true
   * @example
   * ```js
   * pageAnchor(100, 10, true)
   * ```
   */
  var pageAnchor = function (opts) {
      var anchor = (opts === null || opts === void 0 ? void 0 : opts.anchor) || 0, speed = (opts === null || opts === void 0 ? void 0 : opts.speed) || 10, down = (opts === null || opts === void 0 ? void 0 : opts.down) === undefined ? true : Boolean(opts.down);
      (function foo() {
          if (down) {
              if (scrollY < anchor) {
                  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop, clientHeight = document.documentElement.clientHeight || document.body.clientHeight, scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                  if (scrollHeight > clientHeight &&
                      scrollTop + clientHeight < scrollHeight) {
                      scrollTo(0, scrollY + speed);
                      requestAnimationFrame(foo);
                  }
              }
          }
          else {
              if (scrollY > anchor) {
                  scrollTo(0, scrollY - speed);
                  requestAnimationFrame(foo);
              }
          }
      })();
  };

  /**
   * 滚动至底部时，加载更多数据，或执行一些自定义的事件。返回函数清除绑定
   * @param opts ①el：需要无限滚动元素的选择器，请确保唯一；②delay：节流时延，单位为ms，默认值100；③distance：触发加载的距离阈值，单位为px，默认值10。
   * @param callback 到达距离阈值时触发的事件
   * @returns unbind 返回一个可清除绑定滚动事件的函数。
   * @example
   * ```js
   * infiniteScroll({el: '.big-box', delay: 100, distance: 10 }, () => { console.log('hello') }))
   * ```
   */
  var infiniteScroll = function (opts, callback) {
      var box = document.querySelector(opts.el);
      var delay = opts.delay || 100, distance = opts.distance || 10, flag = true;
      var unbind = function () {
          box.onscroll = null;
      };
      box.onscroll = function () {
          if (flag) {
              var boxHeight = parseFloat(getComputedStyle(box).height), boxScrollHeight = box.scrollHeight, boxScrollTop = box.scrollTop;
              flag = false;
              setTimeout(function () {
                  flag = true;
              }, delay);
              if (boxScrollHeight - boxScrollTop - boxHeight < distance) {
                  callback();
              }
          }
      };
      return unbind;
  };

  /**
   * 自适应等比缩放。适用大屏可视化自动适配屏幕
   * @param targetEl 需要去适应的（父级）盒子, 将元素等比例缩放撑满盒子（进入全屏状态的元素应该是父级盒子）。
   * @param sourceEl 需要被缩放的元素，它会自适应父级盒子。
   * @param designSize 设计稿尺寸，如：1920x1080，则传入[1920,1080]。
   * @example
   * ```js
   * adaptiveScaling(HTMLElement, HTMLElement, [1920, 1080])
   * ```
   */
  var adaptiveScaling = function (targetEl, sourceEl, designSize) {
      var designW = designSize[0]; designSize[1];
      var targetWidth = targetEl.clientWidth;
      // const targetHeight = targetEl.clientHeight;
      // 盒子尺寸比
      // const realRatio = targetWidth / targetHeight;
      // 设计稿比例
      // const designRatio = designW / designH;
      // 缩放率
      var scaleRate = targetWidth / designW;
      // 如果是竖屏，按高缩放
      // if (realRatio.toFixed(1) > designRatio.toFixed(1)) {
      //   scaleRate = targetHeight / designH;
      // }
      sourceEl.style.transformOrigin = "left top";
      sourceEl.style.transform = "scale(".concat(scaleRate, ")");
      // sourceEl.style.width = `${targetWidth / scaleRate}px`;
  };

  exports.adaptiveScaling = adaptiveScaling;
  exports.boxAnchor = boxAnchor;
  exports.formatDate = formatDate;
  exports.infiniteScroll = infiniteScroll;
  exports.pageAnchor = pageAnchor;
  exports.slideDirection = slideDirection;

}));
//# sourceMappingURL=index.js.map
