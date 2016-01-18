import React from 'react'
import ReactMCarouselSlide from './ReactMCarouselSlide.js'

var ReactMCarousel = React.createClass({
    propTypes: {
        loop: React.PropTypes.bool,
        lazy: React.PropTypes.bool,
        direction: React.PropTypes.oneOf(['vertical', 'horizontal']),
        indicators: React.PropTypes.bool,
        onSwiped: React.PropTypes.func,
        onSwiping: React.PropTypes.func,
        children: React.PropTypes.oneOfType([
            React.PropTypes.element.isRequired,
            React.PropTypes.array.isRequired
        ]),
        responsive: React.PropTypes.number,
        flickThreshold: React.PropTypes.number,
        activeIndex: React.PropTypes.number,
        delta: React.PropTypes.number
    },
    getDefaultProps() {
        return {
            direction: 'horizontal',
            flickThreshold: 0.6,
            delta: 10,
            className: '',
            responsive: 40,
            activeIndex: 0
        }
    },
    initialState() {
        return {
            x: null,
            y: null,
            swiping: false,
            start: 0,
            delta: 0
        }
    },
    getInitialState() {
        var state = this.initialState();
        state.activeIndex = this.props.activeIndex;
        state.slideWidth = 0;
        return state
    },
    calculatePos(e) {
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
        }
    },
    move(delta) {
        this.setState({
            delta: delta
        })
    },
    touchStart: function (e) {
        if (e.touches.length > 1) {
            return
        }
        this.setState({
            start: Date.now(),
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
            swiping: false
        })
    },
    touchMove: function (e) {
        if (!this.state.x || !this.state.y || e.touches.length > 1) {
            return
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
        })

        if (cancelPageSwipe) {
            e.preventDefault()
        }
    },
    touchEnd: function (e) {
        if (!this.state.swiping) {
            return;
        }
        var pos = this.calculatePos(e);

        var time = Date.now() - this.state.start;
        var velocity = Math.sqrt(pos.absX * pos.absX + pos.absY * pos.absY) / time;
        var isFlick = velocity > this.props.flickThreshold;

        var state = this.initialState();
        var len = this.props.children.length;
        if (isFlick || pos.absX > 10) {
            state.activeIndex = (this.state.activeIndex + pos.absX / pos.deltaX + len) % len
        }

        this.setState(state)
    },
    render() {
        var style = {
            position: 'relative',
            backgroundColor: '#eee',
            width: '100%',
            overflow: 'hidden'
        };
        var trackStyle = {
            position: 'absolute',
            height: '100%',
            whiteSpace: 'nowrap',
            transform: 'translate(' + (-this.state.slideWidth * (this.state.activeIndex + 1) - this.state.delta) + 'px, 0px) translateZ(0px)'
        }
        if (this.props.responsive !== 0) {
            style.height = 0;
            style.paddingBottom = this.props.responsive + '%';
        }
        var len = this.props.children.length;
        if (!len) {
            return (
                <div className={'m-carousel ' + this.props.className} style={style}>
                    <ReactMCarouselSlide>{this.props.children}</ReactMCarouselSlide>
                </div>
            );
        }
        return (
            <div className={'m-carousel ' + this.props.className} style={style} onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd} ref="carousel">
                <div style={trackStyle}>
                    <ReactMCarouselSlide lazy={this.props.lazy} actived={true} width={this.state.slideWidth}>{this.props.children[len-1]}</ReactMCarouselSlide>
                    {this.props.children.map((v, i)=>{
                        return <ReactMCarouselSlide key={i} lazy={this.props.lazy} actived={true} width={this.state.slideWidth}>{v}</ReactMCarouselSlide>
                    })}
                    <ReactMCarouselSlide lazy={this.props.lazy} actived={true} width={this.state.slideWidth}>{this.props.children[0]}</ReactMCarouselSlide>
                </div>
            </div>
        );
    },
    componentDidMount() {
        this.setState({
            slideWidth: this.refs.carousel.getBoundingClientRect().width
        });
    }
});

export default ReactMCarousel;
