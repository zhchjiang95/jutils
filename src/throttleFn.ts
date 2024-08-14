/**
 * 节流函数，在连续的函数触发过程限制执行次数
 * @param fn 在毫秒（ms）后要执行的函数
 * @param ms 延迟毫秒数，默认 200
 * @param trailing 节流过程中最后一次自动执行，默认为 false
 * @returns A new, throttled, function.
 * @example
 * ```js
 *  document.addEventListener('mousemove', jutils.throttleFn(() => {
      console.log(333);
    }, 1000, true))
 * ```
 */
const throttleFn = (
  fn: () => void,
  ms: number = 200,
  trailing: boolean = false
): (() => void) => {
  let flag = true;
  return () => {
    if (flag) {
      flag = false;
      setTimeout(() => {
        flag = true;
        if (trailing) {
          setTimeout(() => {
            if (flag) {
              fn();
            }
          }, 10);
        }
      }, ms);
      fn();
    }
  };
};

export default throttleFn;
