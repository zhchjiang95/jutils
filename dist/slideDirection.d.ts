interface CallBack {
    (dir: {
        startX?: number;
        startY?: number;
        endX?: number;
        endY?: number;
    }, real: {
        realX?: number;
        realY?: number;
    }): void;
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
declare const slideDirection: (selector: string | HTMLDivElement, cb: CallBack, realXY?: boolean, realStartEndXY?: boolean) => void;
export default slideDirection;
