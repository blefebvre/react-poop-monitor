var DiaperEventLink = React.createClass({
	render: function() {
		return (
			<a href="#">
				Diaper
			</a>
		);
	}
});

var EatEventLink = React.createClass({
	render: function() {
		return (
			<a href="#">
				Eat
			</a>
		);
	}
});

var SleepEventLink = React.createClass({
	render: function() {
		return (
			<a href="#">
				Sleep
			</a>
		);
	}
});

var WakeEventLink = React.createClass({
	render: function() {
		return (
			<a href="#">
				Wake
			</a>
		);
	}
});

var BabyEvents = React.createClass({
	render: function() {
		return (
			<div>
				<DiaperEventLink />
				<EatEventLink />
				<SleepEventLink />
				<WakeEventLink />
			</div>
		);
	}
});

React.render(
  <BabyEvents/>,
  document.getElementById('app')
);