/**
 * 转换为驼峰
 * @param str 需要转换为驼峰的字符串
 * @param dividers 分隔符
 * @param big 大驼峰？默认 false
 * @returns string
 * @example
 * ```js
 * const s = "ab-cd-ef";
 * transHump(s, '-');  // abCdEf
 * ```
 */
const transHump = (str: string, dividers: string, big?: boolean) => {
  function replace(s: string) {
    return s.replace(/^.{1}/, (v) => v.toUpperCase());
  }

  return str.split(dividers).reduce((p, n, i) => {
    return p + (i === 0 ? (big ? replace(n) : n) : replace(n));
  }, "");
};

export default transHump;
