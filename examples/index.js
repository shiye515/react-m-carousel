import './index.less'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactMCarousel from '../src/ReactMCarousel.js'

var App = React.createClass({
    getInitialState() {
        return {
            count: 4
        }
    },
    onChange(e) {
        e.preventDefault();
        this.setState({
            count: e.target.count.value
        })
    },
    render() {
        var { count } = this.state;
        var slide = [];
        for (let i = 0; i < count; i++) {
            slide.push(<div key={i} className="ex-s">{i}</div>);
        }
        return (
            <div>
                <form onSubmit={this.onChange}>
                    <input
                        type="number"
                        defaultValue={this.state.count}
                        min="1"
                        name="count"
                        placeholder="请输入个数" />

                    <button type="submit">提交</button>
                </form>

                <ReactMCarousel loop indicators auto={2000}>
                    {slide}
                </ReactMCarousel>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('__react-content'));
