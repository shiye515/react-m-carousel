# react-m-carousel

移动端专用的 react carousel component


## Demo & Examples

Live demo: [shiye515.github.io/react-m-carousel](http://shiye515.github.io/react-m-carousel/)

To build the examples locally, run:

```
git clone https://github.com/shiye515/react-m-carousel.git
cd react-m-carousel
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use react-m-carousel is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-m-carousel.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-m-carousel --save
```


## Usage

```
var ReactMCarousel = require('react-m-carousel');

<ReactMCarousel>
    <div className="ex-s">1</div>
    <div className="ex-s">2</div>
    <div className="ex-s">3</div>
    <div className="ex-s">4</div>
</ReactMCarousel>
```

### Props

#### loop: React.PropTypes.bool
是否循环轮播，暂不支持配置，默认循环

#### lazy: React.PropTypes.bool
是否懒加载

#### direction: React.PropTypes.oneOf(['vertical', 'horizontal'])
滑动方向，暂不支持配置

#### indicators: React.PropTypes.bool
是否添加屏点

#### onSwiped: React.PropTypes.func
轮播完成后回调

#### onSwiping: React.PropTypes.func
手指滑动时的回调

#### children: React.PropTypes.oneOfType([React.PropTypes.element.isRequired, React.PropTypes.array.isRequired])
子组件

#### responsive: React.PropTypes.number
是否开启响应式高度，若为0则不开启，其他正整数表示 高度是宽度的百分之多少

#### flickThreshold: React.PropTypes.number
轻弹的最小速度

#### activeIndex: React.PropTypes.number
默认显示的卡片

#### delta: React.PropTypes.number
滚动时触发滚动到下一张的最小值



## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).


Copyright (c) 2016 shiye515.

