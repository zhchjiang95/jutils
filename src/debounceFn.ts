/**
 * 防抖函数，在连续的函数触发过程执行最后一次
 * @param fn 连续触发的函数
 * @param ms 执行等待的毫秒数，默认 200
 * @param opt { maxWait: 最大等待时间，超过立即执行一次 }
 * @returns A new, debounce, function.
 * @example
 * ```js
 *  document.addEventListener('mousemove', jutils.debounceFn(() => {
      console.log(333);
    }, 500, { maxWait: 2000 }))
 * ```
 */
const debounceFn = (
  fn: () => void,
  ms: number = 200,
  opt?: { maxWait?: number }
) => {
  let timer: NodeJS.Timeout;
  let t: number | undefined;
  return () => {
    if (t === undefined) {
      t = new Date().getTime();
    }
    if (opt?.maxWait) {
      if (t && new Date().getTime() - t > opt.maxWait) {
        fn();
        t = undefined;
      }
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
      t = undefined;
    }, ms);
  };
};

export default debounceFn;