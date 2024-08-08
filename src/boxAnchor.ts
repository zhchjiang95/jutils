/**
 * 盒子锚点，在任意可滑动盒子中跳转；监听事件元素需指定 data-jt-id 值为目标元素唯一标识 id
 * @param options
 * 1、source：监听点击事件元素（或其父级）选择器，请确保唯一(①选择器带元素名（如：button#search）则监听其内部最深层的元素（理论情况，既实际点击到的元素），该元素须添加 data-jt-id 属性，属性值为目标容器内目标对象的 id（该目标对象须指定 data-jt-type 的值为 'jt'，以配合 callback 工作）。②选择器不带元素名（如：#search）则只监听此元素点击事件，data-jt-id 属性须绑定在此元素上。)；
 * 2、target：目标可滚动容器的选择器，请确保唯一，容器内的目标对象 id 值为对应的 data-jt-id 值（该目标对象须指定 data-jt-type 的值为 'jt'，以配合 callback 工作）；
 * 3、diff：滑动到与父元素的顶部距离差，默认值：4；
 * 4、speed：滑动速度，默认值：20。
 * @param callback 指定回调函数后，函数将在滚动过程定点执行，函数参数默认返回一个对象，包含此时在可视屏幕内指定 data-jt-id 属性的元素和该元素的 data-jt-id 属性值（须目标容器中目标对象指定 data-jt-type 的值为 'jt'）。
 * @example
 * ```js
 * <div id="source-box"><a data-jt-id="h1">锚点到h1</a></div>
 * <div id="target-box"><h4 id="h1" data-jt-type="jt">我的id是h1</h4></div>
 * boxAnchor({source: 'div#source-box', target: '#target-box'}, (res) => {})
 * ```
 */
const boxAnchor = (
  options: { source: string; target: string; diff?: number; speed?: number },
  callback: (res: { el: HTMLElement; jtId: string }) => void
) => {
  var source = document.querySelector(options.source) as HTMLElement,
    box = document.querySelector(options.target) as HTMLElement,
    boxChildren = Array.from(box?.children || []).filter(
      (v: any) => v.dataset.jtType === "jt"
    ),
    V: HTMLElement,
    arr: Element[] | null = null;
  source.onclick = function (e) {
    var id =
      "#" +
      (/^[.|#]/.test(options.source)
        ? (this as HTMLElement).dataset.jtId
        : (e.target as HTMLElement).dataset.jtId);
    var target = document.querySelector(id) as HTMLElement;
    if (!target) return;
    var diff = options.diff ? options.diff : 0;
    var speed = options.speed ? options.speed : 10;
    var targetHeight = parseFloat(getComputedStyle(target).height);
    var flag = box.scrollTop >= target.offsetTop - targetHeight - diff;
    (function jMove() {
      if (flag) {
        if (
          box.scrollTop > target.offsetTop - targetHeight - diff &&
          box.scrollTop !== 0
        ) {
          box.scrollTo(0, box.scrollTop - speed);
          requestAnimationFrame(jMove);
        }
      } else {
        if (
          target.offsetTop - targetHeight - diff - box.scrollTop > speed &&
          box.scrollTop + box.offsetHeight < box.scrollHeight - speed
        ) {
          box.scrollTo(0, box.scrollTop + speed);
          requestAnimationFrame(jMove);
        }
      }
    })();
    return false;
  };
  typeof callback === "function" &&
    box.addEventListener("scroll", function () {
      boxChildren.map((v: any) => {
        if (v !== V) {
          V = v;
          v.distance = Math.abs(v.offsetTop - box.scrollTop);
        }
      });
      const tmp = boxChildren.sort((p: any, n: any) => p.distance - n.distance);
      if (!arr || arr[0].id !== tmp[0].id) {
        arr = tmp.slice();
        callback({
          el: tmp[0] as HTMLElement,
          jtId: tmp[0].id,
        });
      }
    });
};

export default boxAnchor;
