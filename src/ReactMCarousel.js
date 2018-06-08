import React, { Component } from 'react'

const defaultStyle = {
  position: 'relative',
  width: '100%',
  overflow: 'hidden'
}

function styledWrap (style) {
  return child => (
    <div className='m-carousel-item' style={style}>
      {child}
    </div>
  )
}

class ReactMCarousel extends Component {
  constructor (props) {
    super(props)
    this.rootRef = React.createRef()
    this.state = {
      width: 0,
      active: props.active,
      delta: 0,
      transitionDuration: 0,
      // 触摸相关
      startX: 0,
      startY: 0,
      startTime: Date.now()
    }
  }
  /**
   * 播放动画
   * @param {Int} nextActive 下一个需要展示的页面序号，超出范围的会自动修正
   */
  animate = nextActive => {
    const { children, loop, auto, onAnimationEnd } = this.props
    const { width, active, delta } = this.state

    const count = React.Children.count(children)
    const max = count - 1
    const min = 0
    if (loop) {
      if (nextActive > max + 1) {
        nextActive = max + 1
      } else if (nextActive < min - 1) {
        nextActive = min - 1
      }
    } else {
      if (nextActive > max) {
        nextActive = auto ? min : max
      } else if (nextActive < min) {
        nextActive = auto ? max : min
      }
    }
    const transitionDuration = Math.abs(width * (active - nextActive) + delta) >> 1
    let nextState = {
      active: nextActive,
      delta: 0,
      transitionDuration
    }
    this.setState(nextState, this.prepareNextAction)
    if (typeof onAnimationEnd === 'function') {
      onAnimationEnd((nextActive + count) % count)
    }
  }
  prepareNextAction = e => {
    const { children, auto } = this.props
    const { transitionDuration, active } = this.state
    const max = React.Children.count(children) - 1
    const min = 0
    let nextActive = active
    if (active > max) {
      nextActive = min
    } else if (active < min) {
      nextActive = max
    }
    // 动画结束后修正active的值，针对 loop===true 的情况
    if (nextActive !== active) {
      setTimeout(() => {
        this.setState({
          transitionDuration: 0,
          active: nextActive
        })
      }, transitionDuration)
    }
    // 自动播放
    if (auto && max > 0) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.animate(nextActive + 1)
      }, auto)
    }
  }
  touchStart = e => {
    // 清楚动画计时器
    clearTimeout(this.timer)
    // 初始化状态
    this.direction = undefined
    this.setState({
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      startTime: Date.now(),
      transitionDuration: 0
    })
  }
  touchMove = e => {
    const { onSwiping } = this.props
    const { width, startX, startY } = this.state
    var x = e.changedTouches[0].clientX
    var y = e.changedTouches[0].clientY
    // 先锁定方向
    if (!this.direction) {
      this.direction = (Math.abs(startX - x) >= Math.abs(startY - y)) ? 'horizontal' : 'vertical'
    }
    if (this.direction === 'horizontal') {
      this.setState({
        delta: startX - x
      })
      if (typeof onSwiping === 'function') {
        onSwiping((startX - x) / width)
      }
    }
  }
  touchEnd = e => {
    const { active, delta } = this.state
    const absDelta = Math.abs(delta)
    let nextActive = active
    if (absDelta > this.props.delta) {
      nextActive = active + (delta >= 0 ? 1 : -1)
    }
    this.animate(nextActive)
  }
  componentDidMount () {
    this.setState({
      width: this.rootRef.current.getBoundingClientRect().width
    }, this.prepareNextAction)
  }
  render () {
    const { children, responsive, className, style, loop, indicator } = this.props
    var { width, active, delta, transitionDuration } = this.state

    let itemStyle = {
      position: 'relative',
      display: 'inline-block',
      height: '100%',
      width
    }

    const count = React.Children.count(children)
    let prefix = null
    let addon = null
    let loopOffset = 0
    if (count > 1 && loop) {
      loopOffset = 1
      prefix = styledWrap(itemStyle)(children[count - 1])
      addon = styledWrap(itemStyle)(children[0])
    }

    let mergedStyle = { ...defaultStyle, ...style }
    if (responsive !== 0) {
      mergedStyle.height = 0
      mergedStyle.paddingBottom = responsive + '%'
    }
    let trackStyle = {
      position: 'absolute',
      height: '100%',
      minWidth: '100%',
      whiteSpace: 'nowrap',
      MsTransform: 'translate(' + (-width * (active + loopOffset) - delta) + 'px, 0px) translateZ(0px)',
      WebkitTransform: 'translate(' + (-width * (active + loopOffset) - delta) + 'px, 0px) translateZ(0px)',
      transform: 'translate(' + (-width * (active + loopOffset) - delta) + 'px, 0px) translateZ(0px)',
      MsTransitionDuration: transitionDuration + 'ms',
      WebkitTransitionDuration: transitionDuration + 'ms',
      transitionDuration: transitionDuration + 'ms'
    }
    return (
      <div
        className={'m-carousel ' + className}
        onTouchStart={this.touchStart}
        onTouchMove={this.touchMove}
        onTouchEnd={this.touchEnd}
        onTouchCancel={this.touchEnd}
        style={mergedStyle}
        ref={this.rootRef}>
        <div className='m-carousel-track' style={trackStyle}>
          {prefix}
          {React.Children.map(children, styledWrap(itemStyle))}
          {addon}
        </div>
        {indicator(count, active, this.animate)}
      </div>
    )
  }
}

ReactMCarousel.defaultProps = {
  flickThreshold: 0.6,
  delta: 50,
  className: '',
  responsive: 40,
  active: 0,
  onAnimationEnd: false,
  onSwiping: false,
  auto: 0,
  loop: false,
  indicator: (length, active, animateTo) => null
}

export default ReactMCarousel
