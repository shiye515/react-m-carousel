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
                <ReactMCarousel loop={true} indicators={true} auto={true}>
                    <div className="ex-s">11</div>
                    <div className="ex-s">12</div>
                    <div className="ex-s">13</div>
                    <div className="ex-s">14</div>
                </ReactMCarousel>
                <br/>
                <br/>
                <br/>
                <br/>
                <ReactMCarousel className="outer" lazy={true} indicators={true} activeIndex={this.state.index} responsive={0}>
                    <ReactMCarousel lazy={true} activeIndex={0} indicators={true}>
                        <div className="ex-s">11</div>
                        <div className="ex-s">12</div>
                        <div className="ex-s">13</div>
                        <div className="ex-s">14</div>
                    </ReactMCarousel>
                    <ReactMCarousel lazy={true} activeIndex={0}>
                        <div className="ex-s">21</div>
                        <div className="ex-s">22</div>
                        <div className="ex-s">23</div>
                        <div className="ex-s">24</div>
                    </ReactMCarousel>
                    <ReactMCarousel lazy={true} activeIndex={0}>
                        <div className="ex-s">31</div>
                        <div className="ex-s">32</div>
                        <div className="ex-s">33</div>
                        <div className="ex-s">34</div>
                    </ReactMCarousel>
                </ReactMCarousel>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
