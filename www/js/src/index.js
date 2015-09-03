// Routing
var Router = ReactRouter;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

// Backend
var firebaseURI = "https://ReactFireTodoApp.firebaseio.com";

var App = React.createClass({
	render: function() {
		return (
			<RouteHandler/>
		);
	}
});

var Header = React.createClass({
	render: function() {
		return (
			<div className="bar bar-header bar-stable">
				<h1 className="title">{this.props.title}</h1>
			</div>
		);
	}
});


var Dashboard = React.createClass({
	render: function() {
		return (
			<div>
				<Header title="Poop Monitor"/>

				<div className="content has-header">
					<EventSelector/>
					<EventHistory/>
				</div>
			</div>
		);
	}
});

var EventSelector = React.createClass({
	render: function() {
		return (
			<div>
				<div className="half">
					<Link to="diaperEvent">Diaper</Link>
				</div>
				<div className="half">
					<Link to="foodEvent">Food</Link>
				</div>
				<div className="half">
					<Link to="sleepEvent">Sleep</Link>
				</div>
				<div className="half">
					<Link to="wakeEvent">Wake</Link>
				</div>
			</div>
		);
	}
});

var EventHistory = React.createClass({
	getInitialState: function() {
		return {events: []};
	},
	componentWillMount: function() {
		this.firebaseRef = new Firebase(firebaseURI + "/events/");
		this.firebaseRef.on("child_added", function(dataSnapshot) {
			this.items.push(dataSnapshot.val());
			this.setState({
			  events: this.items
			});
		}.bind(this));
	},
	render: function() {
		return (
			<EventList events={this.state.events}/>
		);
	}
});

var Event = React.createClass({
	render: function() {
		return (
			<div className="event">
				<h2 className="eventType">{this.props.type}</h2>
				<h3 className="eventTime">{this.props.time}</h3>
				<div className="eventDetails">
					{this.props.children}
				</div>
			</div>
		);
	}
});

var EventList = React.createClass({
	render: function() {
		var eventNodes = this.props.events.map(function (event) {
			return (
				<Event time={event.time} type={event.type}>
					{event.details}
				</Event>
			);
		});
		return (
			<div className="eventList">
				{eventNodes}
			</div>
		);
	}
	
});

var TimeSelector = React.createClass({
	timeSelectionChanged: function(e) {
		var eventDate = new Date();
		var minutesInThePast = e.currentTarget.value;
		eventDate.setMinutes(eventDate.getMinutes() - minutesInThePast);

		this.props.onUpdate(eventDate);
	},
	componentDidMount: function() {
		// Set current date initially
		this.props.onUpdate(new Date());
	},
	render: function() {
		var timeOptions = [
			{ 
				label: "Just now",
				minutesInThePast: "0"
			},
			{ 
				label: "Five minutes ago",
				minutesInThePast: "5"
			},
			{ 
				label: "Ten minutes ago",
				minutesInThePast: "10"
			},
			{ 
				label: "Twenty minutes ago",
				minutesInThePast: "20"
			}
		];

		var timeOptionNodes = timeOptions.map(function(timeOption, keyIndex) {
			return (
				<label htmlFor={"timeOption"+keyIndex} className="item item-radio" key={keyIndex}>
					<input type="radio" name="timeOption" id={"timeOption"+keyIndex} defaultChecked={keyIndex === 0} onChange={this.timeSelectionChanged} value={timeOption.minutesInThePast} /> 
					<div className="item-content">{timeOption.label}</div>
					<i className="radio-icon ion-checkmark"></i>
				</label>
			);
		}, this)

		return (
			<div className="timeSelector list">
				{timeOptionNodes}
			</div>
		);
	}
});

var DiaperEvent = React.createClass({
	onDateUpdate: function(date) {
		this.setState({
			date: date
		});
	},
	handleSubmit: function() {

	},
	render: function() {
		return (
			<div>
				<Header title="Diaper Event"/>

				<div className="content has-header">
					<form className="eventForm" onSubmit={this.handleSubmit}>
						<h4>When?</h4>
						<TimeSelector onUpdate={this.onDateUpdate}/>

						<h4>What?</h4>
						<ul className="list">
							<li className="item item-checkbox">
								<label className="checkbox">
									<input type="checkbox" ref="pee" />
								</label>
								Pee
							</li>
							<li className="item item-checkbox">
								<label className="checkbox">
									<input type="checkbox" ref="poo" />
								</label>
								Poo
							</li>
						</ul>

						<h4>Notes</h4>
						<textarea ref="notes" placeholder="Details..." />

						<button className="button button-positive" type="submit">Save</button>
					</form>
				</div>
			</div>
		);
	}
});

var FoodEvent = React.createClass({
	render: function() {
		return (
			<div>
				Food! 
				{/*
					- when?
					- left boob, right, or both?
					- spitup?
					- solids?
				*/}
			</div>
		);
	}
});

var SleepEvent = React.createClass({
	render: function() {
		return (
			<div>
				Sleep!
			</div>
		);
	}
});

var WakeEvent = React.createClass({
	render: function() {
		return (
			<div>
				Wake!
			</div>
		);
	}
});

// Enable touch events
React.initializeTouchEvents(true);

// Define the app's routes
var routes = (
	<Route name="app" path="/" handler={App}>
		<Route name="diaperEvent" handler={DiaperEvent}/>
		<Route name="foodEvent" handler={FoodEvent}/>
		<Route name="sleepEvent" handler={SleepEvent}/>
		<Route name="wakeEvent" handler={WakeEvent}/>
		<DefaultRoute handler={Dashboard}/>
	</Route>
);

//Router.run(routes, Router.HistoryLocation, function (Handler) {
Router.run(routes, function (Handler) {
	React.render(<Handler/>, document.getElementById("app"));
});