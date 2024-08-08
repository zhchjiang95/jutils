/**
 * 指定页面滑动到某个位置，自定义滑动速度/滑动方向。须整个页面可滑动
 * @param opts anchor：滑动到的目标位置；speed：滑动速度；down：向下滑动？向下（true）/向上（false），默认：true
 * @example
 * ```js
 * pageAnchor(100, 10, true)
 * ```
 */
const pageAnchor = (opts?: {
  anchor?: number;
  speed?: number;
  down?: boolean;
}) => {
  var anchor = opts?.anchor || 0,
    speed = opts?.speed || 10,
    down = opts?.down === undefined ? true : Boolean(opts.down);
  (function foo() {
    if (down) {
      if (scrollY < anchor) {
        var scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop,
          clientHeight =
            document.documentElement.clientHeight || document.body.clientHeight,
          scrollHeight =
            document.documentElement.scrollHeight || document.body.scrollHeight;
        if (
          scrollHeight > clientHeight &&
          scrollTop + clientHeight < scrollHeight
        ) {
          scrollTo(0, scrollY + speed);
          requestAnimationFrame(foo);
        }
      }
    } else {
      if (scrollY > anchor) {
        scrollTo(0, scrollY - speed);
        requestAnimationFrame(foo);
      }
    }
  })();
};

export default pageAnchor;
