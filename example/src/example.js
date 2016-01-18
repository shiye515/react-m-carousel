var React = require('react');
var ReactDOM = require('react-dom');
var ReactMCarousel = require('react-m-carousel');

var App = React.createClass({
	render () {
		return (
			<div>
                <ReactMCarousel lazy={true}>
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
