type ReturnType = Record<string, string> | string;
/**
 * 格式化URL查询参数
 * @param key 返回某个参数值，不传返回所有参数的集合
 * @returns object | string
 */
const formatUrlSearch = (key?: string): ReturnType => {
  const p = {};
  const part = location.href.split("?")[1];
  part
    ?.split("#")[0]
    .split("&")
    .forEach((v) => {
      p[v.split("=")[0]] = v.split("=").slice(1).join("=");
    });
  return key && key in p ? p[key] : p;
};

export default formatUrlSearch;
