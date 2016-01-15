'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

var ReactMCarousel = React.createClass({
    displayName: 'ReactMCarousel',

    propTypes: {
        loop: React.PropTypes.bool,
        lazy: React.PropTypes.bool,
        direction: React.PropTypes.oneOf(['vertical', 'horizontal']),
        indicators: React.PropTypes.bool,
        onSwiped: React.PropTypes.func,
        onSwiping: React.PropTypes.func,
        children: React.PropTypes.oneOfType([React.PropTypes.element.isRequired, React.PropTypes.array.isRequired]),
        flickThreshold: React.PropTypes.number,
        delta: React.PropTypes.number
    },
    getDefaultProps: function getDefaultProps() {
        return {
            direction: 'horizontal',
            flickThreshold: 0.6,
            delta: 10
        };
    },
    getInitialState: function getInitialState() {
        return {
            x: null,
            y: null,
            swiping: false,
            start: 0
        };
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
        console.log(delta);
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
        var isHorizontal = this.props.direction === 'horizontal';

        var cancelPageSwipe = false;
        var pos = this.calculatePos(e);

        // if (pos.absX < this.props.delta && pos.absY < this.props.delta) {
        //     return
        // }

        // if (this.props.onSwiping) {
        //     this.props.onSwiping(e, pos.deltaX, pos.deltaY, pos.absX, pos.absY)
        // }

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

        this.props.onSwiped && this.props.onSwiped(e, pos.deltaX, pos.deltaY, isFlick);

        this.setState(this.getInitialState());
    },
    render: function render() {
        var style = {
            backgroundColor: '#eee',
            width: '100%',
            height: '200px'
        };

        return React.createElement(
            'div',
            _extends({}, this.props, { style: style, onTouchStart: this.touchStart, onTouchMove: this.touchMove, onTouchEnd: this.touchEnd }),
            React.createElement(
                'h1',
                null,
                'react-m-carousel'
            ),
            React.createElement(
                'div',
                null,
                'x:',
                this.state.x
            ),
            React.createElement(
                'div',
                null,
                'y:',
                this.state.y
            ),
            React.createElement(
                'div',
                null,
                'swiping:',
                this.state.swiping
            )
        );
    }
});

exports['default'] = ReactMCarousel;
module.exports = exports['default'];