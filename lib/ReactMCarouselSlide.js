'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

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