# react-m-carousel
---

React Carousel Component for mobile


[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/react-m-carousel.svg?style=flat-square
[npm-url]: http://npmjs.org/package/react-m-carousel
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/react-m-carousel.svg?style=flat-square
[download-url]: https://npmjs.org/package/react-m-carousel

## 2.0 change log

更小的体积，更少的依赖，更高的性能，更方便的扩展

1. 更新react版本16.4
2. 更新编译工具webpack到4.11
3. 重构了所有代码，提升了性能，减小了体积（8.5KiB -> 5.0KiB）
1. 去掉了除react之外的依赖

### 下面是最新的编译信息
- Hash: 06bcfa1e2772b05a9184
- Version: webpack 4.11.0
- Time: 1264ms
- Built at: 2018-06-08 13:19:12

| Asset             | Size  | Chunks |           | Chunk Names |
| ----------------- | ----- | ------ | --------- | ----------- |
| ReactMCarousel.js | 5 KiB | 0      | [emitted] | main        |

## Development

```
npm install
npm run dev
```

## Live Example

online example: http://shiye515.github.io/react-m-carousel/


## install

[![react-m-carousel](https://nodei.co/npm/react-m-carousel.png)](https://npmjs.org/package/react-m-carousel)


## Usage

`npm i -save react-m-carousel`

```js
import React from 'react'
import ReactDOM from 'react-dom'
import ReactMCarousel from 'react-m-carousel'

ReactDOM.render(<ReactMCarousel><div>1</div><div>1</div></ReactMCarousel>, container);
```
详细用法可以看examples文件夹里的demo

### 关于 indicator
不再默认提供，可以自己随意定制，通过props传入即可。自己的实现可以参考`src/indicator.js`

## API

### props

| Property       | Type                                      | Default | Description                                     |
| -------------- | ----------------------------------------- | ------- | ----------------------------------------------- |
| className      | String                                    | ''      | css class                                       |
| responsive     | Number                                    | 40      | 响应式高度，表示宽度的百分比值置                |
| loop           | Boolean                                   | false   | 循环播放                                        |
| auto           | Number                                    | 0       | 大于0的值会设置自动播放，值为自动播放的interval |
| onSwiping      | Boolean, Function(Float percent)          | false   | 触摸时的回调，percent为移动的距离与宽度的比值   |
| onAnimationEnd | Boolean, Function(Int activeIndex)        | false   | 动画结束的回调，activeIndex是当前的序号         |
| delta          | Number                                    | 50      | 移动超过参数值才会播放下一张                    |
| active         | Number                                    | 0       | 加载时默认展示的序号                            |
| indicator      | Function(childrenLength,active):ReactNode | false   | 渲染indicator                                   |
| flickThreshold | Number                                    | 0.6     | 快速滑动的最低速度                              |

## License

react-m-carousel is released under the MIT license.
