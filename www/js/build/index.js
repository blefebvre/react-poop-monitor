"use strict";

var DiaperEventLink = React.createClass({
	displayName: "DiaperEventLink",

	render: function render() {
		return React.createElement(
			"a",
			{ href: "#" },
			"Diaper"
		);
	}
});

var EatEventLink = React.createClass({
	displayName: "EatEventLink",

	render: function render() {
		return React.createElement(
			"a",
			{ href: "#" },
			"Eat"
		);
	}
});

var SleepEventLink = React.createClass({
	displayName: "SleepEventLink",

	render: function render() {
		return React.createElement(
			"a",
			{ href: "#" },
			"Sleep"
		);
	}
});

var WakeEventLink = React.createClass({
	displayName: "WakeEventLink",

	render: function render() {
		return React.createElement(
			"a",
			{ href: "#" },
			"Wake"
		);
	}
});

var BabyEvents = React.createClass({
	displayName: "BabyEvents",

	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(DiaperEventLink, null),
			React.createElement(EatEventLink, null),
			React.createElement(SleepEventLink, null),
			React.createElement(WakeEventLink, null)
		);
	}
});

React.render(React.createElement(BabyEvents, null), document.getElementById('app'));