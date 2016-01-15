var React = require('react');
var ReactDOM = require('react-dom');
var ReactMCarousel = require('react-m-carousel');

var App = React.createClass({
	render () {
		return (
			<div>
				<ReactMCarousel />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
