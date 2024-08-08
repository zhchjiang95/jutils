/**
 * 格式化当前或自定义时间日期，自定义年月日分隔符和时分秒显示
 * @param opts sep: 年月日分隔符; millisecond: 自定义时间（毫秒）或Date(); showHours: 是否显示时分秒。默认：false
 * @returns string
 * @example
 * ```js
 * formatTime({sep: '-', millisecond: Date.now() + 20, showHours: true}) // 2020-08-24 15:06:32
 * ```
 */
declare const formatDate: (opts?: {
    sep?: string;
    millisecond?: string | number;
    showHours?: boolean;
}) => string;
export default formatDate;
