type ReturnType = Record<string, string> | string;
/**
 * 格式化URL查询参数
 * @param key 返回某个参数值，不传返回所有参数的集合
 * @returns object | string
 */
declare const formatUrlSearch: (key?: string) => ReturnType;
export default formatUrlSearch;
