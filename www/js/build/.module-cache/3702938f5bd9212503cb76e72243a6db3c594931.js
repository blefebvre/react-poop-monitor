'use strict';

var Timer = React.createClass({
	displayName: 'Timer',

	// Called before render. object returned is assigned to `state`
	getInitialState: function getInitialState() {
		return { time: 0 };
	},
	// componentDidMount called when component has finished rendering
	componentDidMount: function componentDidMount() {
		// local component var
		this.timer = setInterval(this.tick, 1000);
	},
	tick: function tick() {
		this.setState({ time: this.state.time + 1 });
	},
	render: function render() {
		return React.createElement(
			'div',
			null,
			'Current time: ',
			this.state.time
		);
	}
});

React.render(React.createElement(Foo, null), document.getElementById('example'));