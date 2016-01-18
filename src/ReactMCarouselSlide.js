import React from 'react'

var ReactMCarouselSlide = React.createClass({
    propTypes: {
        width: React.PropTypes.number,
        actived: React.PropTypes.bool,
        lazy: React.PropTypes.bool,
        children: React.PropTypes.element
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
            height: '100%'
        }
        if (this.props.width) {
            style.width = this.props.width;
        }
        return (<div className="m-carousel-slide" style={style}>{(this.props.lazy && !this.state.actived) ? null : this.props.children}</div>);
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
