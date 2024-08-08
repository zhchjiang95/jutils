/**
 * 自适应等比缩放。适用大屏可视化自动适配屏幕
 * @param targetEl 需要去适应的（父级）盒子, 将元素等比例缩放撑满盒子（进入全屏状态的元素应该是父级盒子）。
 * @param sourceEl 需要被缩放的元素，它会自适应父级盒子。
 * @param designSize 设计稿尺寸，如：1920x1080，则传入[1920,1080]。
 * @example
 * ```js
 * adaptiveScaling(HTMLElement, HTMLElement, [1920, 1080])
 * ```
 */
const adaptiveScaling = (
  targetEl: HTMLElement,
  sourceEl: HTMLElement,
  designSize: number[]
) => {
  const [designW, designH] = designSize;
  const targetWidth = targetEl.clientWidth;
  // const targetHeight = targetEl.clientHeight;
  // 盒子尺寸比
  // const realRatio = targetWidth / targetHeight;
  // 设计稿比例
  // const designRatio = designW / designH;
  // 缩放率
  let scaleRate = targetWidth / designW;
  // 如果是竖屏，按高缩放
  // if (realRatio.toFixed(1) > designRatio.toFixed(1)) {
  //   scaleRate = targetHeight / designH;
  // }
  sourceEl.style.transformOrigin = "left top";
  sourceEl.style.transform = `scale(${scaleRate})`;
  // sourceEl.style.width = `${targetWidth / scaleRate}px`;
};

export default adaptiveScaling;
