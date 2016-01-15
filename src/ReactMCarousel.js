var React = require('react');

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
        flickThreshold: React.PropTypes.number,
        delta: React.PropTypes.number
    },
    getDefaultProps() {
        return {
            direction: 'horizontal',
            flickThreshold: 0.6,
            delta: 10
        }
    },
    getInitialState() {
        return {
            x: null,
            y: null,
            swiping: false,
            start: 0
        }
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
        console.log(delta);
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

        this.props.onSwiped && this.props.onSwiped(
            e,
            pos.deltaX,
            pos.deltaY,
            isFlick
        );

        this.setState(this.getInitialState())
    },
    render() {
        var style = {
            backgroundColor: '#eee',
            width: '100%',
            height: '200px'
        };

        return (
            <div {...this.props} style={style} onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd}>
                <h1>react-m-carousel</h1>
                <div>x:{this.state.x}</div>
                <div>y:{this.state.y}</div>
                <div>swiping:{this.state.swiping}</div>
            </div>
        );
    }
});

export default ReactMCarousel;
