import React, { Component } from 'react'
import Slide from './Slide.js'
import Indicators from './Indicators.js'

import prefix from 'react-prefixer'
function noop () {}

function positionDiff (e, { startX, startY }) {
  var x = e.changedTouches[0].clientX
  var y = e.changedTouches[0].clientY

  var xd = startX - x
  var yd = startY - y

  var axd = Math.abs(xd)
  var ayd = Math.abs(yd)

  return {
    deltaX: xd,
    deltaY: yd,
    absX: axd,
    absY: ayd
  }
}

class ReactMCarousel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      delta: 0,
      transitionDuration: 0,
      slideWidth: 0,
      activeIndex: props.activeIndex || 0
    }
    const methods = [
      'touchStart',
      'touchMove',
      'touchEnd',
      'resetSlideWidth',
      'startAuto',
      'stopAuto',
      'slidTo'
    ]
    methods.forEach(v => {
      this[v] = this[v].bind(this)
    })
    this.touchCancel = this.touchEnd.bind(this)
  }
  touchStart (e) {
    if (e.touches.length > 1) {
      return
    }
    this.touch = true
    this.setState({
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      startTime: Date.now()
    })
    this.stopAuto()
  }
  touchMove (e) {
    if (!this.touch) {
      // 没有正确初始化
      return
    }
    const { startX, startY } = this.state
    const { deltaX, absX, absY } = positionDiff(e, { startX, startY })
    // console.log(deltaX, deltaY, absX, absY)
    // 水平位移大于垂直位移
    if (absX >= absY) {
      this.setState({
        delta: deltaX,
        transitionDuration: 0
      })
    }
  }
  touchEnd (e) {
    if (!this.touch) {
      // 没有正确初始化
      return
    }
    const { flickThreshold, delta, children, loop } = this.props
    let { startX, startY, startTime, activeIndex, slideWidth } = this.state
    const { deltaX, absX, absY } = positionDiff(e, { startX, startY })

    var time = Date.now() - startTime
    var velocity = Math.sqrt(absX * absX + absY * absY) / time
    var isFlick = velocity > flickThreshold

    if (isFlick || absX > delta) {
      activeIndex = activeIndex + absX / deltaX
    }
    const len = React.Children.count(children)
    if (!loop) {
      // 不是循环轮播，超出后保持原来的页码
      activeIndex = Math.min(activeIndex, len - 1)
      activeIndex = Math.max(activeIndex, 0)
    }
    const distanceLeft = slideWidth - absX
    this.slidTo(activeIndex, distanceLeft)
    this.startAuto()
  }
  shouldActive (i) {
    const { activeIndex } = this.state
    return activeIndex - 1 <= i && i <= activeIndex + 1
  }
  resetSlideWidth () {
    this.setState({
      slideWidth: this.carousel.getBoundingClientRect().width
    })
  }
  startAuto () {
    this.stopAuto()
    // console.log(new Date())
    // 自动轮播
    const { auto } = this.props
    if (auto) {
      this.autoTimer = setTimeout(() => {
        let { activeIndex } = this.state
        this.slidTo(activeIndex + 1)
        this.startAuto()
      }, auto)
    }
  }
  stopAuto () {
    clearTimeout(this.autoTimer)
  }
  slidTo (activeIndex, distanceLeft) {
    const { children, loop } = this.props
    let { slideWidth } = this.state
    const len = React.Children.count(children)
    if (loop) {
      activeIndex = Math.min(activeIndex, len)
      activeIndex = Math.max(activeIndex, -1)
    } else {
      activeIndex = (activeIndex + len) % len
    }
    distanceLeft = distanceLeft || slideWidth
    const transitionDuration = distanceLeft / 2
    this.setState({
      activeIndex,
      delta: 0,
      transitionDuration
    })
    this.touch = false
    if (loop) {
      // 循环轮播，页码修正
      setTimeout(() => {
        let fixedIndex = (activeIndex + len) % len
        if (fixedIndex !== activeIndex) {
          this.setState({
            activeIndex: fixedIndex,
            transitionDuration: 0
          })
        }
      }, transitionDuration)
    }
  }
  componentDidMount () {
    this.resetSlideWidth()
    window.addEventListener('resize', this.resetSlideWidth, true)
    this.startAuto()
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.resetSlideWidth, true)
  }
  render () {
    var { children, loop, responsive, className, lazy, indicators } = this.props
    var { slideWidth, activeIndex, delta, transitionDuration } = this.state
    // console.log('render', activeIndex)
    var style = {
      position: 'relative',
      width: '100%',
      overflow: 'hidden'
    }
    if (responsive !== 0) {
      style.height = 0
      style.paddingBottom = responsive + '%'
    }

    var trackStyle = {
      position: 'absolute',
      height: '100%',
      whiteSpace: 'nowrap',
      transform: 'translate(' + (-slideWidth * (activeIndex + (loop ? 1 : 0)) - delta) + 'px, 0px) translateZ(0px)',
      transitionDuration: transitionDuration + 'ms'
    }
    if (React.Children.count(children) <= 1) {
      // 只有一个轮播，特殊处理，不绑定事件，纯展示
      return (
        <div
          className={'m-carousel ' + className}
          style={style}
          ref={dom => { this.carousel = dom }}
        >
          <div style={prefix(trackStyle)}>
            <Slide width={slideWidth}>
              {children}
            </Slide>
          </div>
        </div>
      )
    }
    let slides
    if (loop) {
      const len = children.length
      slides = [React.cloneElement(children[len - 1]), ...children, React.cloneElement(children[0])]
    } else {
      slides = children
    }
    return (
      <div
        className={'m-carousel ' + className}
        style={style}
        ref={dom => { this.carousel = dom }}
        onTouchStart={this.touchStart}
        onTouchMove={this.touchMove}
        onTouchEnd={this.touchEnd}
        onTouchCancel={this.touchCancel}
      >
        <div style={prefix(trackStyle)}>
          {slides.map((v, i) => (
            <Slide
              key={i}
              lazy={lazy}
              actived={this.shouldActive(i)}
              width={slideWidth}
            >
              {v}
            </Slide>
          ))}
        </div>
        {indicators ? (
          <Indicators
            children={children}
            activeIndex={activeIndex}
            onClick={this.slidTo}
          />
        ) : null}
      </div>
    )
  }
}

ReactMCarousel.defaultProps = {
  flickThreshold: 0.6,
  delta: 100,
  className: '',
  responsive: 40,
  activeIndex: 0,
  onSwiped: noop,
  onSwiping: noop,
  auto: 0,
  loop: false,
  indicators: false
}

export default ReactMCarousel
