import './index.css'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactMCarousel from '../src/ReactMCarousel.js'
import indicator from '../src/indicator'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 4
    }
  }
  onChange =(e) => {
    e.preventDefault()
    this.setState({
      count: e.target.count.value
    })
  }
  onSwiping = percent => {
    // console.log(`onSwiping ${percent}`)
  }
  onAnimationEnd = active => {
    // console.log(`onAnimationEnd ${active}`)
  }
  render () {
    var { count } = this.state
    var slide = []
    for (let i = 0; i < count; i++) {
      slide.push(<div key={i} className='ex-s'>{count}-{i + 1}</div>)
    }
    return (
      <div>
        <h3>children.length === 1</h3>
        <ReactMCarousel>
          <div className='ex-s'>only</div>
        </ReactMCarousel>
        <form onSubmit={this.onChange}>
          <div>children.length === </div>
          <input
            type='number'
            defaultValue={this.state.count}
            min='1'
            name='count'
            placeholder='请输入个数' />
          <div><button type='submit'>提交</button></div>
        </form>

        <h3>children.length === {count} && indicator</h3>
        <ReactMCarousel indicator={indicator}>
          {slide}
        </ReactMCarousel>

        <h3>children.length === {count} && loop === true</h3>
        <ReactMCarousel loop onSwiping={this.onSwiping}>
          {slide}
        </ReactMCarousel>

        <h3>children.length === {count} && auto === 2000</h3>
        <ReactMCarousel auto={2000}>
          {slide}
        </ReactMCarousel>

        <h3>children.length === {count} && loop === true && auto === 2000</h3>
        <ReactMCarousel loop auto={2000} onAnimationEnd={this.onAnimationEnd}>
          {slide}
        </ReactMCarousel>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
