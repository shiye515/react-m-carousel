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