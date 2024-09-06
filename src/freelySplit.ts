/**
 * 自由分割字符串
 * @param str 字符串
 * @param seps 分割字符串的模式数组（仅支持通过string.split分割中的单个项组成的数组）
 * @param opt 配置 1、retain：是否保留模式数组中的项，默认true
 * @returns string[]
 * @example
 * ```js
 * const s = 'E88°5′2.40″';
 * jutils.freelySplit(s, ["E", "°", "′", "″"]); // ['E', '88', '°', '5', '′', '2.40', '″']
 * jutils.freelySplit(s, ["E", "°", "′", "″"], { retain: false }); // ['88', '5', '2.40']
 * ```
 */
const freelySplit = (
  str: string,
  seps: string[],
  opt?: { retain: boolean }
) => {
  const { retain = true } = opt || {};
  const res: string[] = [];
  let temp = "";
  str.split("").forEach((v, i, arr) => {
    if (seps.includes(v)) {
      const items =
        temp === "" ? (retain ? [v] : []) : retain ? [temp, v] : [temp];
      res.push(...items);
      temp = "";
    } else {
      temp += v;
      if (i === arr.length - 1) {
        res.push(temp);
      }
    }
  });
  return res;
};

export default freelySplit;
