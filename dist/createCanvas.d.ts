type CTXAttr = "font" | "fillStyle" | "strokeStyle" | "lineWidth";
/**
 * 快速创建 Canvas 元素
 * @param canvas Canvas元素，不传自动创建
 * @param opts 配置对象。 width?: 画布宽，默认：200; height?: 画布高，默认：100; dpr?: 画布宽高与样式宽高比值，默认：2; attrs?: 其他属性。"font" | "fillStyle" | "strokeStyle" | "lineWidth"等属性
 * @returns HTMLCanvasElement
 * ```js
 * const canvas = createCanvas(null, { width: 200, height: 200 });
 * ```
 */
declare const createCanvas: (canvas?: HTMLCanvasElement | null, opts?: {
    width?: number;
    height?: number;
    dpr?: number;
    attrs?: Partial<Record<CTXAttr, string | number>>;
}) => HTMLCanvasElement;
export default createCanvas;
