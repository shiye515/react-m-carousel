var React = require('react');
var ReactDOM = require('react-dom');
var ReactMCarousel = require('react-m-carousel');

var App = React.createClass({
    getInitialState(){
        return {
            index:0
        }
    },
    handleClick(){
        this.setState({
            index:3
        })
    },
    onSwiping(delta){
        // console.log(delta)
    },
    onSwiped(index){
        console.info(index)
    },
	render() {
		return (
			<div>
                <button onClick={this.handleClick}>定位到第二个</button>
                <ReactMCarousel lazy={true} activeIndex={this.state.index} onSwiping={this.onSwiping} onSwiped={this.onSwiped}>
                    <div className="ex-s">1</div>
                    <div className="ex-s">2</div>
                    <div className="ex-s">3</div>
                    <div className="ex-s">4</div>
                </ReactMCarousel>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
