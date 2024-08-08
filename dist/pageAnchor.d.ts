/**
 * 指定页面滑动到某个位置，自定义滑动速度/滑动方向。须整个页面可滑动
 * @param opts anchor：滑动到的目标位置；speed：滑动速度；down：向下滑动？向下（true）/向上（false），默认：true
 * @example
 * ```js
 * pageAnchor(100, 10, true)
 * ```
 */
declare const pageAnchor: (opts?: {
    anchor?: number;
    speed?: number;
    down?: boolean;
}) => void;
export default pageAnchor;
