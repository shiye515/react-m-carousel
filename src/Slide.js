import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ReactMCarouselSlide extends Component {
  constructor (props) {
    super(props)
    this.state = {
      actived: this.props.actived
    }
  }
  render () {
    const { width, lazy } = this.props
    const { actived } = this.state
    var style = {
      display: 'inline-block',
      height: '100%',
      width
    }
    if (!width) {
      return null
    }
    return (
      <div className='m-carousel-slide' style={style}>
        {(lazy && !actived) ? '加载中...' : this.props.children}
      </div>
    )
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.actived) {
      this.setState({
        actived: true
      })
    }
  }
}
ReactMCarouselSlide.propTypes = {
  width: PropTypes.number,
  actived: PropTypes.bool,
  lazy: PropTypes.bool,
  children: PropTypes.any
}
export default ReactMCarouselSlide
