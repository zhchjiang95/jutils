# jutils

## 📄 文档

> 详细使用请在使用中关注 JSDoc。

🍭 [在线 Docs](https://zhchjiang95.github.io/)

## 📦 Install

```bash
npm i @zhchjiang95/jutils
```

## 🔗 CDN

```vue
<script src="https://unpkg.com/@zhchjiang95/jutils"></script>
```

## 🦄 Usage

```ts
// module
import { boxAnchor } from '@zhchjiang95/jutils';
boxAnchor({source: 'div#source-box', target: '#target-box'}, (res) => {});

// CDN
jutils.boxAnchor({source: 'div#source-box', target: '#target-box'}, (res) => {});
```

## ⛄️ Features

|  功能   | 描述  |
|  ----  | ----  |
| 滑动方向（slideDirection） &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  | 判断在屏幕上滑动的方向，允许在任意盒子中滑动，移动过程中实时返回当前X/Y坐标，接收回调函数，返回起始位置和结束位置的X/Y坐标值对象，支持 PC 和移动端。 |
| 日期格式化（formatDate） | 格式化当前或自定义时间日期，自定义年月日分隔符和时分秒显示。 |
| 格式化查询参数（formatUrlSearch） | 格式化URL查询参数，返回所有参数的对象集合，传入参数获取指定的某个参数值。 |
| 页面锚点（pageAnchor） | 指定页面滑动到某个位置，自定义滑动速度，自定义滑动方向。须整个页面可滑动。 |
| 盒子锚点（boxAnchor） | 盒子锚点，在任意可滑动盒子中跳转；监听事件元素需指定 data-jt-id 值为目标元素唯一标识 id。 |
| 无限滚动（infiniteScroll） | 滚动至底部时，加载更多数据，或执行一些自定义的事件。可清除绑定事件。 |
| 自适应缩放（adaptiveScaling） | 自适应等比缩放。适用大屏可视化自动适配屏幕。 |
| 匹配字符串（matchString） | 字符串中匹配字符，匹配出的字符可用于高亮显示等。 |
| 过滤树数据（filterTree） | 搜索过滤树。按树层级返回过滤后树数据。 |
| 节流函数（throttleFn） | 在连续的函数触发过程中限制执行次数。 |
| 防抖函数（debounceFn） | 在连续的函数触发过程执行最后一次，支持最大等待时间。 |
| canvasPath2D事件（canvasPathEvent） | 给Canvas Path2D路径绑定事件。 |
| 创建 Canvas 元素（createCanvas） | 快速创建 Canvas 元素。 |
| 转换为驼峰（transHump） | 字符串转换为大/小驼峰。 |
| 分割字符串（freelySplit） | 自由分割字符串。 |
