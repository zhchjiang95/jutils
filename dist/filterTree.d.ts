type FilterTreeParams<T> = {
    childrenField?: string;
    callback?: (arg: T) => void;
};
/**
 * 搜索过滤树。按树层级返回过滤后树数据
 * @param data 树数据，须 children 字段，可使用 childrenField 替换
 * @param searchField 需要搜索的字段
 * @param searchValue 搜索的字符串
 * @param param3 { childrenField: 子级数组不是children，可替换 children 字段，callback：回调函数，过滤的数据用来再做些什么？ }
 * @returns 过滤后树数据
 * @example
 * ```js
 * const data = [{a: 1, b: 2, children: [{a: 13, b: 14}]}];
 * // 搜索a字段，值包含3的项
 * const result = filterTree(data, 'a', '3');
 * ```
 */
export declare const filterTree: <T>(data: T[], searchField: string, searchValue: string, rest: FilterTreeParams<T>) => T[];
export default filterTree;