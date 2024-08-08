interface CallBack {
  (
    dir: {
      startX?: number;
      startY?: number;
      endX?: number;
      endY?: number;
    },
    real: {
      realX?: number;
      realY?: number;
    }
  ): void;
}
/**
 * 判断在屏幕上滑动的方向，允许在任意盒子中滑动，移动过程中实时返回当前X/Y坐标，接收回调函数，返回起始位置和结束位置的X/Y坐标值对象，支持 PC 和移动端。
 * @param selector 指定在某个元素上滑动，传入其标签名或 class 或 id，请确保使用唯一标识
 * @param cb 回调函数，第一个参数为滑动结束时包含起始位置和结束位置的X/Y坐标值对象
 * @param realXY 滑动/移动过程是否实时返回当前X/Y坐标，开启后回调函数中支持第二个参数接收实时坐标对象，默认：false
 * @param realStartEndXY 实时返回当前X/Y坐标后，同时是否实时返回起始位置和结束位置的X/Y坐标值对象，默认：false，返回空对象
 * @example
 * ```js
 * slideDirection('#box', (dir, real) => console.log(dir), true, false) // {startX: 54, startY: 82, endX: 54, endY: 82}
 * ```
 */
const slideDirection = (
  selector: string | HTMLDivElement,
  cb: CallBack,
  realXY = false,
  realStartEndXY = false
) => {
  let startX = 0,
    startY = 0,
    endX = 0,
    endY = 0,
    realX = 0,
    realY = 0,
    el =
      typeof selector === "string"
        ? (document.querySelector(`${selector}`) as HTMLElement)
        : selector;
  if (el === null) {
    throw new Error(`${selector}无法查找到元素`);
  }
  if (el.ontouchstart === null) {
    el.ontouchstart = function (e) {
      endX = endY = realX = realY = 0;
      startX = e.changedTouches[0].clientX;
      startY = e.changedTouches[0].clientY;
    };
    realXY &&
      (el.ontouchmove = function (e) {
        realX = e.changedTouches[0].clientX;
        realY = e.changedTouches[0].clientY;
        cb(
          realStartEndXY
            ? {
                startX,
                startY,
                endX,
                endY,
              }
            : {},
          {
            realX,
            realY,
          }
        );
      });
    el.ontouchend = function (e) {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;
      cb(
        {
          startX,
          startY,
          endX,
          endY,
        },
        {
          realX,
          realY,
        }
      );
    };
  } else {
    el.onmousedown = function (e) {
      endX = endY = realX = realY = 0;
      startX = e.clientX;
      startY = e.clientY;
      realXY &&
        (el.onmousemove = function (e) {
          realX = e.clientX;
          realY = e.clientY;
          cb(
            realStartEndXY
              ? {
                  startX,
                  startY,
                  endX,
                  endY,
                }
              : {},
            {
              realX,
              realY,
            }
          );
        });
    };
    document.onmouseup = function (e) {
      if (el.onmousemove === null) return;
      endX = e.clientX;
      endY = e.clientY;
      el.onmousemove = null;
      cb(
        {
          startX,
          startY,
          endX,
          endY,
        },
        {
          realX,
          realY,
        }
      );
    };
  }
};

export default slideDirection;