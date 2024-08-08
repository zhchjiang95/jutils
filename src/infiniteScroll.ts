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
const infiniteScroll = (
  opts: { el: string; delay?: number; distance?: number },
  callback: () => void
) => {
  var box = document.querySelector(opts.el) as HTMLElement;
  var delay = opts.delay || 100,
    distance = opts.distance || 10,
    timer: NodeJS.Timeout,
    flag = true;
  var unbind = () => {
    box.onscroll = null;
  };
  box.onscroll = function () {
    if (flag) {
      var boxHeight = parseFloat(getComputedStyle(box).height),
        boxScrollHeight = box.scrollHeight,
        boxScrollTop = box.scrollTop;
      flag = false;
      timer = setTimeout(function () {
        flag = true;
      }, delay);
      if (boxScrollHeight - boxScrollTop - boxHeight < distance) {
        callback();
      }
    }
  };
  return unbind;
};

export default infiniteScroll;
