import throttleFn from "./throttleFn";

type EventType = "mousemove" | "mouseleave" | "mouseover" | "click";
interface RecordData {
  index?: number;
  path?: Path2D;
  e: {
    clientX?: number;
    clientY?: number;
  };
}

/**
 * canvasPath2D事件，给Canvas Path2D路径绑定事件
 * @param canvas canvas 元素
 * @param paths Path2D 数组
 * @param eventType 事件类型（"mousemove" | "mouseleave" | "mouseover" | "click"），若为数组 index,path的赋值只发生在数组的第一位事件中，其它事件仅改变样式
 * @param cb 回调函数，参数为 { index: 当前paths中的下标；path: 当前path；e: {clientX；clientY}}
 * @param opts { ms：节流时延，默认80毫秒；devicePixelRatio：如果自定义了画布大小与样式大小比，则传入 }
 * @returns stop 清除监听的函数
 * @example
 * ```js
 * const canvas = document.querySelector('canvas');
 * const path1 = new Path2D();
 * const path2 = new Path2D();
 * const stop = canvasPathEvent(canvas, [path1, path2], ['mouseover', 'mousemove'], (res) => {});
 * ```
 */

const canvasPathEvent = (
  canvas: HTMLCanvasElement,
  paths: Path2D[],
  eventType: EventType | EventType[],
  cb: (e: RecordData) => void,
  opt?: {
    ms?: number;
    devicePixelRatio?: number
  }
) => {
  const current: RecordData = {
    index: undefined,
    path: undefined,
    e: {},
  };
  const isArrEvent = Array.isArray(eventType);
  const ms = opt?.ms || 80;
  
  const cleanups: (() => void)[] = [];

  const ctx = canvas.getContext("2d");
  if (ctx) {
    const onSetValue = (cursor: string, i?: number, p?: Path2D) => {
      current.index = i;
      current.path = p;
      canvas.style.cursor = cursor;
    };

    const onPathEvent = throttleFn((ev: MouseEvent) => {
      const { offsetX, offsetY, clientX, clientY, type } = ev;
      const dpr = opt?.devicePixelRatio || canvas.width / canvas.clientWidth;
      const i = paths.findIndex((p) => {
        return ctx.isPointInPath(p, offsetX * dpr, offsetY * dpr);
      });
      current.e.clientX = clientX;
      current.e.clientY = clientY;
      if (i !== -1) {
        if (isArrEvent) {
          if (eventType[0] === type) {
            onSetValue("pointer", i, paths[i]);
          } else {
            canvas.style.cursor = "pointer";
          }
        } else {
          onSetValue("pointer", i, paths[i]);
        }
      } else {
        onSetValue("default");
      }
      cb(current);
    }, ms);

    (isArrEvent ? eventType : [eventType]).forEach((type) => {
      canvas.addEventListener(type, onPathEvent);
      cleanups.push(() => {
        canvas.removeEventListener(type, onPathEvent);
      });
    });
  }

  const stop = () => {
    cleanups.forEach((cleanup) => {
      cleanup();
    });
  };
  return stop;
};

export default canvasPathEvent;
