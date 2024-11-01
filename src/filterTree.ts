type FilterTreeParams<T> = {
  childrenField?: string;
  strict?: boolean;
  callback?: (arg: T) => void;
};

/**
 * 搜索过滤树。按树层级返回过滤后树数据
 * @param data 树数据，须 children 字段，可使用 childrenField 替换
 * @param searchField 需要搜索的字段
 * @param searchValue 搜索的字符串
 * @param rest 配置对象 { childrenField: 子级数组不是children，可替换 children 字段；strict：严格模式，搜索比较使用绝对等于；callback：回调函数，过滤的数据用来再做些什么？ }
 * @returns 过滤后树数据
 * @example
 * ```js
 * const data = [{a: 1, b: 2, children: [{a: 13, b: 14}]}];
 * // 搜索a字段，值包含3的项
 * const result = filterTree(data, 'a', '3');
 * ```
 */
export const filterTree = <T>(
  data: T[],
  searchField: string,
  searchValue: string,
  rest?: FilterTreeParams<T>
): T[] => {
  const { childrenField, strict, callback } = rest || {};
  const children = childrenField || "children";
  const searchTree = (d: any[]) => {
    d.forEach((v) => {
      const value = v[searchField]?.toString();
      const f = strict
        ? value?.toUpperCase() === searchValue?.toUpperCase()
        : value?.toUpperCase().includes(searchValue?.toUpperCase());
      v.search = f;
      if (v[children]) {
        searchTree(v[children]);
      }
    });
  };
  const filterTree = (data: any[]) => {
    return data.filter((v) => {
      if (v[children]) {
        v[children] = filterTree(v[children]);
      }
      const pass = v.search || v[children]?.length > 0;
      delete v.search;
      if (pass) callback?.(v);
      return pass;
    });
  };
  searchTree(data);
  return filterTree(data);
};

export default filterTree;
