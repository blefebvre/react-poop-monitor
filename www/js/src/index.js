// Routing
var Router = ReactRouter;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

// Backend
var firebaseURI = "https://<your Firebase app id here>.firebaseio.com";

var App = React.createClass({
	render: function() {
		return (
			<div>
				<header>
					Poop Monitor
				</header>

				{/* this is the important part */}
				<RouteHandler/>
			</div>
		);
	}
});


var Dashboard = React.createClass({
	render: function() {
		return (
			<div>
				<EventSelector/>
				<EventHistory/>
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
				label: "Fifteen minutes ago",
				minutesInThePast: "15"
			}
		];

		var keyIndex = 0;
		var timeOptionNodes = timeOptions.map(function(timeOption) {
			keyIndex++;
			return (
				<div className="timeOption" key={keyIndex} >
					<input type="radio" name="timeSelector" defaultChecked={keyIndex === 1} onChange={this.timeSelectionChanged} value={timeOption.minutesInThePast} /> 
					<label htmlFor={timeOption.minutesInThePast}>{timeOption.label}</label>
				</div>
			);
		}, this)

		return (
			<div className="timeSelector">
				{timeOptionNodes}
			</div>
		);
	}
});

var DiaperEvent = React.createClass({
	getInitialState: function() {
		return {
			// Set `time` to the current time
			date: new Date()
		};
	},
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
				Diaper event!!!
				<form className="eventForm" onSubmit={this.handleSubmit}>
					<TimeSelector onUpdate={this.onDateUpdate}/>
					<input type="text" ref="details" placeholder="Details..." />
				</form>
			</div>
		);
	}
});

var FoodEvent = React.createClass({
	render: function() {
		return (
			<div>
				Food! 
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
React.initializeTouchEvents(true)

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
	React.render(<Handler/>, document.getElementById('app'));
});