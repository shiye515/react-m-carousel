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


## Development

```
npm install
npm start
```

## Example

http://localhost:8080/


online example: http://shiye515.github.io/react-m-carousel/


## install


[![react-m-carousel](https://nodei.co/npm/react-m-carousel.png)](https://npmjs.org/package/react-m-carousel)


## Usage

```js
import React from 'react'
import ReactDOM from 'react-dom'
import ReactMCarousel from 'react-m-carousel'

ReactDOM.render(<ReactMCarousel><div>1</div><div>1</div></ReactMCarousel>, container);
```

## API

### props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>className</td>
          <td>String</td>
          <td></td>
          <td>additional css class of root dom node</td>
        </tr>
        <tr>
          <td>loop</td>
          <td>bool</td>
          <td>false</td>
          <td>是否循环播放</td>
        </tr>
        <tr>
          <td>auto</td>
          <td>Number</td>
          <td>0</td>
          <td>是否自动播放，0不自动播放，其他值则自动播放，值为其自动播放的interval</td>
        </tr>
        <tr>
          <td>lazy</td>
          <td>bool</td>
          <td>false</td>
          <td>是否懒加载</td>
        </tr>
        <tr>
          <td>indicators</td>
          <td>bool</td>
          <td>false</td>
          <td>是否添加屏点，不带任何样式，样式可参考demo写</td>
        </tr>
        <tr>
          <td>onSwiped</td>
          <td>func</td>
          <td>noop</td>
          <td>轮播完成后回调</td>
        </tr>
        <tr>
          <td>onSwiping</td>
          <td>func</td>
          <td>noop</td>
          <td>手指滑动时的回调</td>
        </tr>
        <tr>
          <td>responsive</td>
          <td>Number</td>
          <td>40</td>
          <td>是否开启响应式高度，若为0则不开启，其他正整数表示 高度是宽度的百分之多少</td>
        </tr>
        <tr>
          <td>flickThreshold</td>
          <td>Number</td>
          <td>0.6</td>
          <td>轻弹的最小速度</td>
        </tr>
        <tr>
          <td>delta</td>
          <td>Number</td>
          <td>100</td>
          <td>滚动时触发滚动到下一张的最小值</td>
        </tr>
    </tbody>
</table>


## Test Case

```
npm test
npm run chrome-test
```

## Coverage

```
npm run coverage
```

open coverage/ dir

## License

react-m-carousel is released under the MIT license.

Built
Built at: 2018-06-06 16:29:44
            Asset      Size  Chunks             Chunk Names
ReactMCarousel.js  18.1 KiB       0  [emitted]  main
