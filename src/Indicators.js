import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Indicators extends Component {
  slidTo (activeIndex) {
    let { onClick } = this.props
    onClick(activeIndex)
  }
  render () {
    let { children, activeIndex } = this.props
    return (
      <div className='indicators'>
        {children.map((v, i) => {
          return (
            <div
              onClick={this.slidTo.bind(this, i)}
              className={'dot ' + (activeIndex === i ? 'active' : '')}
              key={i}
            >
              {i}
            </div>)
        })}
      </div>
    )
  }
}
Indicators.propTypes = {
  children: PropTypes.any,
  activeIndex: PropTypes.number,
  onClick: PropTypes.func
}
export default Indicators
