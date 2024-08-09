/**
 * 字符串中匹配字符，匹配出的字符可用于高亮显示等
 * @param string 字符串
 * @param matchString 需要匹配的字符
 * @returns 返回对象包含两个参数，及匹配的结果数组，结果中匹配到的使用undefined占位，自行循环渲染使用matchString值替换undefined即可
 * @example
 * ```js
 * const res = jutils.matchString('1234422243', '2')
 * ```
 */
declare const matchString: (string: string, matchString: string) => {
    string: string;
    matchString: string;
    result: (string | undefined)[];
};
export default matchString;
