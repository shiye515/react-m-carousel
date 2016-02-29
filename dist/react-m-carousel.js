(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ReactMCarousel = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
        auto: _react2['default'].PropTypes.bool,
        interval: _react2['default'].PropTypes.number,
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
            onSwiping: noop,
            interval: 3000
        };
    },
    initialState: function initialState() {
        return {
            x: null,
            y: null,
            swiping: false,
            start: 0,
            delta: 0,
            transitionDuration: 0,
            auto: this.props.auto && this.props.children.length > 1
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
    sliding: function sliding(endSlideIndex, distanceMoved) {
        distanceMoved = typeof distanceMoved === 'number' ? distanceMoved : 0;
        var self = this;
        var len = this.props.children.length;
        if (!this.props.loop && (endSlideIndex < 0 || endSlideIndex >= len)) {
            endSlideIndex = this.state.activeIndex;
        }
        var distanceLeft = endSlideIndex === this.state.activeIndex ? distanceMoved : this.state.slideWidth - distanceMoved;
        var transitionDuration = distanceLeft / 2;
        var realIndex = (endSlideIndex + len) % len;
        var state = this.initialState();
        state.activeIndex = endSlideIndex;
        state.transitionDuration = transitionDuration;
        state.frozen = true;

        this.transitionEnd(this.refs.carouselTrack, function (e) {
            this.setState({
                activeIndex: realIndex,
                transitionDuration: 0
            });
            this.props.onSwiped(realIndex);
        }, transitionDuration);

        this.setState(state);
    },
    transitionEnd: function transitionEnd(el, callback, timeout) {
        var self = this;
        var capture = false;
        var timer = setTimeout(function () {
            callback.call(self);
            self.setState({
                frozen: false
            });
            el.removeEventListener('transitionend', endCallback, capture);
            el.removeEventListener('webkitTransitionEnd', endCallback, capture);
            el.removeEventListener('oTransitionEnd', endCallback, capture);
            el.removeEventListener('MSTransitionEnd', endCallback, capture);
        }, timeout);

        function endCallback(e) {
            clearTimeout(timer);
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
        this.clearInterval();
    },
    touchMove: function touchMove(e) {
        if (!this.state.x || !this.state.y || e.touches.length > 1) {
            return;
        }
        if (this.state.frozen) {
            e.preventDefault();
            e.stopPropagation();
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
            e.stopPropagation();
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
        var isHorizontal = this.props.direction === 'horizontal';

        if (isHorizontal && pos.absX > pos.absY) {
            if (isFlick || pos.absX > this.props.delta) {
                activeIndex = activeIndex + pos.absX / pos.deltaX;
            }
        } else if (!isHorizontal && pos.absX < pos.absY) {
            if (isFlick || pos.absY > this.props.delta) {
                activeIndex = activeIndex + pos.absY / pos.deltaY;
            }
        }

        this.sliding(activeIndex, pos.absX);
        this.setInterval();
    },
    touchCancel: function touchCancel(e) {
        this.setInterval();
    },
    getIndicators: function getIndicators() {
        var _this = this;

        if (!this.props.indicators) {
            return null;
        }
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

        var loop = !!this.props.loop;
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
            transform: 'translate(' + (-this.state.slideWidth * (this.state.activeIndex + (loop ? 1 : 0)) - this.state.delta) + 'px, 0px) translateZ(0px)',
            transitionDuration: this.state.transitionDuration + 'ms'
        };
        var len = this.props.children.length;
        if (!len || len <= 1) {
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
            { className: 'm-carousel ' + this.props.className, style: style, onTouchStart: this.touchStart, onTouchMove: this.touchMove, onTouchEnd: this.touchEnd, onTouchCancel: this.touchCancel, ref: 'carousel' },
            _react2['default'].createElement(
                'div',
                { style: (0, _reactPrefixer2['default'])(trackStyle), ref: 'carouselTrack' },
                loop ? _react2['default'].createElement(
                    _ReactMCarouselSlideJs2['default'],
                    { lazy: this.props.lazy, actived: this.shouldActive(-1), width: this.state.slideWidth },
                    this.props.children[len - 1]
                ) : null,
                this.props.children.map(function (v, i) {
                    return _react2['default'].createElement(
                        _ReactMCarouselSlideJs2['default'],
                        { key: i, lazy: _this2.props.lazy, actived: _this2.shouldActive(i), width: _this2.state.slideWidth },
                        v
                    );
                }),
                loop ? _react2['default'].createElement(
                    _ReactMCarouselSlideJs2['default'],
                    { lazy: this.props.lazy, actived: this.shouldActive(len), width: this.state.slideWidth },
                    this.props.children[0]
                ) : null
            ),
            this.getIndicators()
        );
    },
    setInterval: (function (_setInterval) {
        function setInterval() {
            return _setInterval.apply(this, arguments);
        }

        setInterval.toString = function () {
            return _setInterval.toString();
        };

        return setInterval;
    })(function () {
        var self = this;
        if (this.state.auto) {
            this.intervalTimer = setInterval(function () {
                self.sliding(self.state.activeIndex + 1);
            }, this.props.interval);
        }
    }),
    clearInterval: (function (_clearInterval) {
        function clearInterval() {
            return _clearInterval.apply(this, arguments);
        }

        clearInterval.toString = function () {
            return _clearInterval.toString();
        };

        return clearInterval;
    })(function () {
        if (this.intervalTimer) {
            clearInterval(this.intervalTimer);
        }
    }),
    componentDidMount: function componentDidMount() {
        this.setState({
            slideWidth: this.refs.carousel.getBoundingClientRect().width
        });
        this.setInterval();
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (this.props.activeIndex !== nextProps.activeIndex) {
            this.sliding(nextProps.activeIndex);
        }
    },
    componentWillUnmount: function componentWillUnmount() {
        this.clearInterval();
    }
});

exports['default'] = ReactMCarousel;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ReactMCarouselSlide.js":2,"react-prefixer":undefined}],2:[function(require,module,exports){
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
        children: _react2['default'].PropTypes.any
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
            height: '100%',
            width: this.props.width
        };
        if (this.props.width) {
            return _react2['default'].createElement(
                'div',
                { className: 'm-carousel-slide', style: style },
                this.props.lazy && !this.state.actived ? '加载中...' : this.props.children
            );
        } else {
            return null;
        }
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
},{}]},{},[1])(1)
});