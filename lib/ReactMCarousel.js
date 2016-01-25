'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

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
    },
    touchCancel: function touchCancel(e) {
        console.log(e);
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
    componentDidMount: function componentDidMount() {
        this.setState({
            slideWidth: this.refs.carousel.getBoundingClientRect().width
        });
        var self = this;
        if (this.props.auto) {
            setInterval(function () {
                self.sliding(self.state.activeIndex + 1);
            }, this.props.interval);
        }
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (this.props.activeIndex !== nextProps.activeIndex) {
            this.sliding(nextProps.activeIndex);
        }
    }
});

exports['default'] = ReactMCarousel;
module.exports = exports['default'];