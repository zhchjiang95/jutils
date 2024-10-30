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
const marquee = (el: HTMLElement, speed: number = 2, pause: number = 15) => {
  let recordX = -1;
  let wait = 0;
  let timer: NodeJS.Timeout;
  const speedList = [
    [1, 180],
    [1, 100],
    [1, 40],
    [1, 20],
    [1, 10],
  ];
  el.classList.add("jutilsmarquee");
  const styleel = document.querySelector("#jutilsmarquee");
  if(styleel === null){
    const style = document.createElement("style");
    style.id = "jutilsmarquee";
    style.innerText =
      ".jutilsmarquee{white-space: nowrap;overflow: auto;}.jutilsmarquee::-webkit-scrollbar{display: none;}";
    document.head.append(style);
  }
  const w = el.scrollWidth - parseFloat(getComputedStyle(el).width);
  timer = setInterval(() => {
    if (recordX >= w) {
      wait++;
      if (wait > pause) {
        el.scrollLeft = 0;
        recordX = el.scrollLeft;
        wait = 0;
      }
    } else {
      el.scrollBy(speedList[speed][0], 0);
      recordX = el.scrollLeft;
    }
  }, speedList[speed][1]);

  return () => {
    clearInterval(timer);
  };
};

export default marquee;