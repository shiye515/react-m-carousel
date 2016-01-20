(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ReactMCarousel = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var el = document.createElement("div"),
    camelRe = /-([a-z]|[0-9])/ig,
    support,
    camel;

exports["default"] = function (prop, value) {
    // If no value is supplied, use "inherit"
    value = arguments.length === 2 ? value : "inherit";

    // Try the native standard method first
    if ("CSS" in window && "supports" in window.CSS) {
        return window.CSS.supports(prop, value);
    }

    // Check Opera's native method
    if ("supportsCSS" in window) {
        return window.supportsCSS(prop, value);
    }

    // Convert to camel-case for DOM interactions
    camel = prop.replace(camelRe, function (all, letter) {
        return (letter + "").toUpperCase();
    });

    // Check if the property is supported
    support = camel in el.style;

    // Assign the property and value to invoke
    // the CSS interpreter
    el.style.cssText = prop + ":" + value;

    // Ensure both the property and value are
    // supported and return
    return support && el.style[camel] !== "";
};

module.exports = exports["default"];
},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = ["columnCount", "columnGap", "columnRule", "columnRuleColor", "columnRuleWidth", "columns", "flex", "flexBasis", "flexGrow", "flexShrink", "order", "perspective", "perspectiveOrigin", "perspectiveOriginX", "perspectiveOriginY", "scrollSnapCoordinate", "scrollSnapDirection", "textDecoration", "textDecorationColor", "transform", "transformOrigin", "transformOriginX", "transformOriginY", "transformOriginZ", "transformStyle"];
module.exports = exports["default"];
},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _prefix = require("./prefix");

var _prefix2 = _interopRequireDefault(_prefix);

var _properties = require("./properties");

var _properties2 = _interopRequireDefault(_properties);

var _animatableValues = require("./animatableValues");

var _animatableValues2 = _interopRequireDefault(_animatableValues);

var _CssSupportsPolyfill = require("./CssSupportsPolyfill");

var _CssSupportsPolyfill2 = _interopRequireDefault(_CssSupportsPolyfill);

function camelToKebab(str) {
    return str.replace(/\W+/g, "-").replace(/([a-z\d])([A-Z])/g, "$1-$2").toLowerCase();
}

function applyPrefixes(obj) {
    if (typeof obj === "object" && !!obj) {
        Object.keys(obj).forEach(function (key) {
            var realKey = key;

            if (typeof obj[key] === "object" && !!obj[key]) {
                obj[key] = applyPrefixes(obj[key]);
            } else if (_properties2["default"].indexOf(key) !== -1 && !(0, _CssSupportsPolyfill2["default"])(camelToKebab(key))) {
                var value = obj[key];

                realKey = _prefix2["default"].js + key.charAt(0).toUpperCase() + key.slice(1);

                delete obj[key];
                obj[realKey] = value;
            }

            if (realKey === "display" && obj[realKey] === "flex" && !(0, _CssSupportsPolyfill2["default"])("display", "flex")) {
                obj[realKey] = _prefix2["default"] === "ms" ? "-ms-flexbox" : _prefix2["default"].css + "flex";
            }

            if (key === "transition") {
                _animatableValues2["default"].forEach(function (animatableValue) {
                    var kebabValue = camelToKebab(animatableValue);

                    if (!(0, _CssSupportsPolyfill2["default"])(kebabValue)) {
                        var re = new RegExp(kebabValue, "g");

                        obj[realKey] = obj[realKey].replace(re, _prefix2["default"].css + kebabValue);
                    }
                });
            }
        });
    }

    return obj;
}

exports["default"] = applyPrefixes;
module.exports = exports["default"];
},{"./CssSupportsPolyfill":1,"./animatableValues":2,"./prefix":4,"./properties":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var styles = window.getComputedStyle(document.documentElement, ""),
    prefix = Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/)[1] || styles.OLink === "" && ["", "o"],
    ret = {
    css: "-" + prefix + "-",
    js: prefix
};

if (ret.js !== "ms") {
    ret.js = ret.js.charAt(0).toUpperCase() + ret.js.slice(1);
}

exports["default"] = ret;
module.exports = exports["default"];
},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = ["alignContent", "alignItems", "alignSelf", "animation", "animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction", "appearance", "aspectRatio", "backfaceVisibility", "backgroundClip", "borderImage", "borderImageSlice", "boxShadow", "columnCount", "columnFill", "columnGap", "columnRule", "columnRuleColor", "columnRuleStyle", "columnRuleWidth", "columnSpan", "columnWidth", "columns", "flex", "flexBasis", "flexDirection", "flexFlow", "flexGrow", "flexShrink", "flexWrap", "fontFeatureSettings", "fontKearning", "fontVariantLigatures", "justifyContent", "grid", "gridArea", "gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridColumn", "gridColumnEnd", "gridColumnStart", "gridRow", "gridRowEnd", "gridRowStart", "gridTemplate", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows", "hyphens", "lineBreak", "perspective", "perspectiveOrigin", "perspectiveOriginX", "perspectiveOriginY", "rubyPosition", "scrollSnapCoordinate", "scrollSnapDestination", "scrollSnapPoints", "scrollSnapPointsX", "scrollSnapPointsY", "scrollSnapType", "tabSize", "textDecoration", "textDecorationColor", "textDecorationLine", "textDecorationStyle", "textOrientation", "textSizeAdjust", "transform", "transition", "transformOrigin", "transformOriginX", "transformOriginY", "transformOriginZ", "transformStyle", "transitionProperty", "transitionDuration", "transitionTimingFunction", "transitionDelay", "userModify", "userSelect"];
module.exports = exports["default"];
},{}],6:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _ReactMCarouselSlideJs = require('./ReactMCarouselSlide.js');

var _ReactMCarouselSlideJs2 = _interopRequireDefault(_ReactMCarouselSlideJs);

var _reactPrefixer = require('react-prefixer');

var _reactPrefixer2 = _interopRequireDefault(_reactPrefixer);

function noop() {}

var ReactMCarousel = _react2['default'].createClass({
    displayName: 'ReactMCarousel',

    propTypes: {
        loop: _react2['default'].PropTypes.bool,
        lazy: _react2['default'].PropTypes.bool,
        direction: _react2['default'].PropTypes.oneOf(['vertical', 'horizontal']),
        indicators: _react2['default'].PropTypes.bool,
        onSwiped: _react2['default'].PropTypes.func,
        onSwiping: _react2['default'].PropTypes.func,
        children: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.element.isRequired, _react2['default'].PropTypes.array.isRequired]),
        responsive: _react2['default'].PropTypes.number,
        flickThreshold: _react2['default'].PropTypes.number,
        activeIndex: _react2['default'].PropTypes.number,
        delta: _react2['default'].PropTypes.number
    },
    getDefaultProps: function getDefaultProps() {
        return {
            direction: 'horizontal',
            flickThreshold: 0.6,
            delta: 100,
            className: '',
            responsive: 40,
            activeIndex: 0,
            onSwiped: noop,
            onSwiping: noop
        };
    },
    initialState: function initialState() {
        return {
            x: null,
            y: null,
            swiping: false,
            start: 0,
            delta: 0,
            transitionDuration: 0
        };
    },
    getInitialState: function getInitialState() {
        var state = this.initialState();
        state.activeIndex = this.props.activeIndex;
        state.slideWidth = 0;
        return state;
    },
    calculatePos: function calculatePos(e) {
        var x = e.changedTouches[0].clientX;
        var y = e.changedTouches[0].clientY;

        var xd = this.state.x - x;
        var yd = this.state.y - y;

        var axd = Math.abs(xd);
        var ayd = Math.abs(yd);

        return {
            deltaX: xd,
            deltaY: yd,
            absX: axd,
            absY: ayd
        };
    },
    move: function move(delta) {
        this.setState({
            delta: delta
        });
        this.props.onSwiping(delta);
    },
    sliding: function sliding(endSlideIndex) {
        var self = this;
        var len = this.props.children.length;
        var realIndex = (endSlideIndex + len) % len;
        var state = this.initialState();
        state.activeIndex = endSlideIndex;
        state.transitionDuration = 400;
        state.frozen = true;

        this.transitionEnd(this.refs.carouselTrack, function (e) {
            this.setState({
                activeIndex: realIndex,
                transitionDuration: 0
            });
            this.props.onSwiped(realIndex);
        });

        this.setState(state);
    },
    transitionEnd: function transitionEnd(el, callback) {
        var self = this;
        var capture = false;

        function endCallback(e) {
            callback.call(self, e);
            el.removeEventListener(e.type, endCallback, capture);
            self.setState({
                frozen: false
            });
        }
        el.addEventListener('transitionend', endCallback, capture);
        el.addEventListener('webkitTransitionEnd', endCallback, capture);
        el.addEventListener('oTransitionEnd', endCallback, capture);
        el.addEventListener('MSTransitionEnd', endCallback, capture);
    },
    touchStart: function touchStart(e) {
        if (e.touches.length > 1) {
            return;
        }
        this.setState({
            start: Date.now(),
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
            swiping: false
        });
    },
    touchMove: function touchMove(e) {
        if (!this.state.x || !this.state.y || e.touches.length > 1 || this.state.frozen) {
            return;
        }
        var isHorizontal = this.props.direction === 'horizontal';

        var cancelPageSwipe = false;
        var pos = this.calculatePos(e);

        if (isHorizontal && pos.absX > pos.absY) {
            cancelPageSwipe = true;
            this.move(pos.deltaX);
        } else if (!isHorizontal && pos.absX < pos.absY) {
            cancelPageSwipe = true;
            this.move(pos.deltaY);
        }

        this.setState({
            swiping: true
        });

        if (cancelPageSwipe) {
            e.preventDefault();
        }
    },
    touchEnd: function touchEnd(e) {
        if (!this.state.swiping) {
            return;
        }
        var pos = this.calculatePos(e);

        var time = Date.now() - this.state.start;
        var velocity = Math.sqrt(pos.absX * pos.absX + pos.absY * pos.absY) / time;
        var isFlick = velocity > this.props.flickThreshold;

        var activeIndex = this.state.activeIndex;
        var len = this.props.children.length;
        if (isFlick || pos.absX > this.props.delta) {
            activeIndex = activeIndex + pos.absX / pos.deltaX;
        }

        this.sliding(activeIndex);
    },
    getIndicators: function getIndicators() {
        var _this = this;

        return _react2['default'].createElement(
            'div',
            { className: 'indicators' },
            this.props.children.map(function (v, i) {
                return _react2['default'].createElement(
                    'div',
                    { onClick: _this.sliding.bind(_this, i), className: 'dot ' + (_this.state.activeIndex == i ? 'active' : ''), key: i },
                    i
                );
            })
        );
    },
    shouldActive: function shouldActive(i) {
        return this.state.activeIndex - 1 <= i && i <= this.state.activeIndex + 1;
    },
    render: function render() {
        var _this2 = this;

        var style = {
            position: 'relative',
            width: '100%',
            overflow: 'hidden'
        };
        if (this.props.responsive !== 0) {
            style.height = 0;
            style.paddingBottom = this.props.responsive + '%';
        }

        var trackStyle = {
            position: 'absolute',
            height: '100%',
            whiteSpace: 'nowrap',
            transform: 'translate(' + (-this.state.slideWidth * (this.state.activeIndex + 1) - this.state.delta) + 'px, 0px) translateZ(0px)',
            transitionDuration: this.state.transitionDuration + 'ms'
        };
        var len = this.props.children.length;
        if (!len) {
            trackStyle.transform = 'translate(0,0,0)';
            return _react2['default'].createElement(
                'div',
                { className: 'm-carousel ' + this.props.className, style: style, ref: 'carousel' },
                _react2['default'].createElement(
                    'div',
                    { style: (0, _reactPrefixer2['default'])(trackStyle), ref: 'carouselTrack' },
                    _react2['default'].createElement(
                        _ReactMCarouselSlideJs2['default'],
                        { width: this.state.slideWidth },
                        this.props.children
                    )
                )
            );
        }
        return _react2['default'].createElement(
            'div',
            { className: 'm-carousel ' + this.props.className, style: style, onTouchStart: this.touchStart, onTouchMove: this.touchMove, onTouchEnd: this.touchEnd, ref: 'carousel' },
            _react2['default'].createElement(
                'div',
                { style: (0, _reactPrefixer2['default'])(trackStyle), ref: 'carouselTrack' },
                _react2['default'].createElement(
                    _ReactMCarouselSlideJs2['default'],
                    { lazy: this.props.lazy, actived: this.shouldActive(-1), width: this.state.slideWidth },
                    this.props.children[len - 1]
                ),
                this.props.children.map(function (v, i) {
                    return _react2['default'].createElement(
                        _ReactMCarouselSlideJs2['default'],
                        { key: i, lazy: _this2.props.lazy, actived: _this2.shouldActive(i), width: _this2.state.slideWidth },
                        v
                    );
                }),
                _react2['default'].createElement(
                    _ReactMCarouselSlideJs2['default'],
                    { lazy: this.props.lazy, actived: this.shouldActive(len), width: this.state.slideWidth },
                    this.props.children[0]
                )
            ),
            this.getIndicators()
        );
    },
    componentDidMount: function componentDidMount() {
        this.setState({
            slideWidth: this.refs.carousel.getBoundingClientRect().width
        });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (this.props.activeIndex !== nextProps.activeIndex) {
            this.sliding(nextProps.activeIndex);
        }
    }
});

exports['default'] = ReactMCarousel;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ReactMCarouselSlide.js":7,"react-prefixer":3}],7:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var ReactMCarouselSlide = _react2['default'].createClass({
    displayName: 'ReactMCarouselSlide',

    propTypes: {
        width: _react2['default'].PropTypes.number,
        actived: _react2['default'].PropTypes.bool,
        lazy: _react2['default'].PropTypes.bool,
        children: _react2['default'].PropTypes.element
    },
    getDefaultProps: function getDefaultProps() {
        return {
            actived: false,
            lazy: false
        };
    },
    getInitialState: function getInitialState() {
        return {
            actived: this.props.actived
        };
    },
    render: function render() {
        var style = {
            display: 'inline-block',
            height: '100%'
        };
        if (this.props.width) {
            style.width = this.props.width;
        }
        return _react2['default'].createElement(
            'div',
            { className: 'm-carousel-slide', style: style },
            this.props.lazy && !this.state.actived ? '加载中...' : this.props.children
        );
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.actived) {
            this.setState({
                actived: true
            });
        }
    }
});

exports['default'] = ReactMCarouselSlide;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[6])(6)
});