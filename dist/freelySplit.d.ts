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
declare const freelySplit: (str: string, seps: string[], opt?: {
    retain: boolean;
}) => string[];
export default freelySplit;
