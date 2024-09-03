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
declare const transHump: (str: string, dividers: string, big?: boolean) => string;
export default transHump;
