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
const matchString = (string: string, matchString: string) => {
  let record = matchString;
  // 只处理全大/小写情况
  if (!string.includes(record)) {
    record = record.toUpperCase();
  }
  const arr = string.split(record);
  let len = arr.length - 1;
  let result: (string | undefined)[] = [];
  if (!arr.includes("")) {
    // 查询字符在字符串中，使用undefined占位
    arr.forEach((v, i) => {
      if (i === len) {
        result.push(v);
      } else {
        result.push(v, undefined);
      }
    });
  } else {
    // 查询字符在字符串首尾
    if (arr.every((v) => v === "")) {
      // 被完整匹配
      // 被全匹配
      result = arr.length === 2 ? [""] : arr.slice(1);
    } else {
      // 未被全匹配
      // 在首尾匹配，且之中也包含
      if (arr.length > 1) {
        // 查询字符在字符串中，使用undefined占位
        arr.forEach((v, i) => {
          if (v) {
            if (i === len) {
              result.push(v);
            } else {
              result.push(v, undefined);
            }
          } else {
            if (i !== len) {
              result.push(undefined);
            }
          }
        });
      } else {
        result = arr;
      }
    }
  }

  return {
    string,
    matchString,
    result,
  };
};

export default matchString;
