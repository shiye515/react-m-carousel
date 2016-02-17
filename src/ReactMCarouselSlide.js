import React from 'react'

var ReactMCarouselSlide = React.createClass({
    propTypes: {
        width: React.PropTypes.number,
        actived: React.PropTypes.bool,
        lazy: React.PropTypes.bool,
        children: React.PropTypes.any
    },
    getDefaultProps() {
        return {
            actived: false,
            lazy: false
        }
    },
    getInitialState() {
        return {
            actived: this.props.actived
        }
    },
    render() {
        var style = {
            display: 'inline-block',
            height: '100%',
            width: this.props.width
        }
        if (this.props.width) {
            return (<div className="m-carousel-slide" style={style}>{(this.props.lazy && !this.state.actived) ? '加载中...' : this.props.children}</div>);
        }else{
            return null
        }
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.actived) {
            this.setState({
                actived: true
            })
        }
    }
});

export default ReactMCarouselSlide;
