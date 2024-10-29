/**
 * 文字超出滚动显示
 * @param el 包含文字的标签元素，文字超出宽度会滚动显示
 * @param speed 滚动速度：0、1、2、3、4档，默认2
 * @param pause 表示滚到最后停顿多长时间，值越大停顿越久，默认15
 * @returns 清除函数
 * @example
 * ```js
 * <div id="test" style="width: 200px">包含文字的标签元素，文字超出宽度会滚动显示</div>
 * marquee(document.querySelector('#test'));
 * ```
 */
declare const marquee: (el: HTMLElement, speed?: number, pause?: number) => () => void;
export default marquee;
