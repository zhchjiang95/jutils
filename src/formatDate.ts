/**
 * 格式化当前或自定义时间日期，自定义年月日分隔符和时分秒显示
 * @param opts sep: 年月日分隔符; millisecond: 自定义时间（毫秒）或Date(); showHours: 是否显示时分秒。默认：false
 * @returns string
 * @example
 * ```js
 * formatTime({sep: '-', millisecond: Date.now() + 20, showHours: true}) // 2020-08-24 15:06:32
 * ```
 */
const formatDate = (opts?: {
  sep?: string;
  millisecond?: string | number;
  showHours?: boolean;
}) => {
  const separator = opts?.sep || "-";
  const hasHours = opts?.showHours || false;
  let dateTimer = opts?.millisecond
    ? new Date(Number(opts.millisecond))
    : new Date();
  let Y: number | string = dateTimer.getFullYear();
  let M: number | string = dateTimer.getMonth() + 1;
  let D: number | string = dateTimer.getDate();
  let h: number | string = dateTimer.getHours();
  let m: number | string = dateTimer.getMinutes();
  let s: number | string = dateTimer.getSeconds();
  M = M >= 10 ? M : "0" + M;
  D = D >= 10 ? D : "0" + D;
  h = h >= 10 ? h : "0" + h;
  m = m >= 10 ? m : "0" + m;
  s = s >= 10 ? s : "0" + s;

  return hasHours
    ? `${Y + separator + M + separator + D} ${h}:${m}:${s}`
    : `${Y + separator + M + separator + D}`;
};

export default formatDate;
