import React from 'react'
import ReactMCarouselSlide from './ReactMCarouselSlide.js'
import prefix from 'react-prefixer'

function noop() {}

var ReactMCarousel = React.createClass({
    propTypes: {
        loop: React.PropTypes.bool,
        lazy: React.PropTypes.bool,
        auto: React.PropTypes.bool,
        interval: React.PropTypes.number,
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
            delta: 100,
            className: '',
            responsive: 40,
            activeIndex: 0,
            onSwiped: noop,
            onSwiping: noop,
            interval: 3000
        }
    },
    initialState() {
        return {
            x: null,
            y: null,
            swiping: false,
            start: 0,
            delta: 0,
            transitionDuration: 0
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
        });
        this.props.onSwiping(delta);
    },
    sliding(endSlideIndex, distanceMoved) {
        distanceMoved = typeof distanceMoved === 'number' ? distanceMoved : 0;
        var self = this;
        var len = this.props.children.length;
        if (!this.props.loop && (endSlideIndex < 0 || endSlideIndex >= len)) {
            endSlideIndex = this.state.activeIndex;
        }
        var distanceLeft = (endSlideIndex === this.state.activeIndex) ? distanceMoved : (this.state.slideWidth - distanceMoved);
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
    transitionEnd(el, callback, timeout) {
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
            })
        }
        el.addEventListener('transitionend', endCallback, capture);
        el.addEventListener('webkitTransitionEnd', endCallback, capture);
        el.addEventListener('oTransitionEnd', endCallback, capture);
        el.addEventListener('MSTransitionEnd', endCallback, capture);
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
        })

        if (cancelPageSwipe) {
            e.preventDefault();
            e.stopPropagation();
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

        this.sliding(activeIndex, pos.absX)
    },
    touchCancel(e) {
        console.log(e)
    },
    getIndicators() {
        if (!this.props.indicators) {
            return null;
        }
        return (
            <div className="indicators">
                {this.props.children.map((v, i) => {
                    return <div onClick={this.sliding.bind(this, i)} className={'dot ' + (this.state.activeIndex == i ? 'active' : '')} key={i}>{i}</div>
                })}
            </div>
        )
    },
    shouldActive(i) {
        return this.state.activeIndex - 1 <= i && i <= this.state.activeIndex + 1
    },
    render() {
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
        }
        var len = this.props.children.length;
        if (!len || len <= 1) {
            trackStyle.transform = 'translate(0,0,0)';
            return (
                <div className={'m-carousel ' + this.props.className} style={style} ref="carousel">
                    <div style={prefix(trackStyle)} ref="carouselTrack">
                        <ReactMCarouselSlide width={this.state.slideWidth}>{this.props.children}</ReactMCarouselSlide>
                    </div>
                </div>
            );
        }
        return (
            <div className={'m-carousel ' + this.props.className} style={style} onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd} onTouchCancel={this.touchCancel} ref="carousel">
                <div style={prefix(trackStyle)} ref="carouselTrack">
                    {loop ? <ReactMCarouselSlide lazy={this.props.lazy} actived={this.shouldActive(-1)} width={this.state.slideWidth}>{this.props.children[len-1]}</ReactMCarouselSlide> : null}
                    {this.props.children.map((v, i)=>{
                        return <ReactMCarouselSlide key={i} lazy={this.props.lazy} actived={this.shouldActive(i)} width={this.state.slideWidth}>{v}</ReactMCarouselSlide>
                    })}
                    {loop ? <ReactMCarouselSlide lazy={this.props.lazy} actived={this.shouldActive(len)} width={this.state.slideWidth}>{this.props.children[0]}</ReactMCarouselSlide> : null}
                </div>
                {this.getIndicators()}
            </div>
        );
    },
    componentDidMount() {
        this.setState({
            slideWidth: this.refs.carousel.getBoundingClientRect().width
        });
        var self = this;
        if(this.props.auto){
            setInterval(function(){
                self.sliding(self.state.activeIndex + 1);
            }, this.props.interval);
        }
    },
    componentWillReceiveProps(nextProps) {
        if (this.props.activeIndex !== nextProps.activeIndex) {
            this.sliding(nextProps.activeIndex)
        }
    }
});

export default ReactMCarousel;
