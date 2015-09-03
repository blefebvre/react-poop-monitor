// Routing
var Router = ReactRouter;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;

// Backend
var firebaseURI = "https://react-poop-monitor.firebaseio.com";

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

var EventTypeLink = React.createClass({
	render: function() {
		return (
			<div className="half">
				<Link to={this.props.linkTo}>{this.props.name}</Link>
			</div>
		);
	}
});

var EventSelector = React.createClass({
	render: function() {
		var eventTypes = [
			{
				name: "Diaper",
				linkTo: "diaperEvent",
				imageSrc: "#"
			},
			{
				name: "Food",
				linkTo: "foodEvent",
				imageSrc: "#"
			},
			{
				name: "Sleep",
				linkTo: "sleepEvent",
				imageSrc: "#"
			},
			{
				name: "Wake",
				linkTo: "wakeEvent",
				imageSrc: "#"
			}
		];
		var eventTypeNodes = eventTypes.map(function(eventType) {
			return (
				<EventTypeLink name={eventType.name} 
						linkTo={eventType.linkTo} 
						imageSrc={eventType.imageSrc} />
			);
		});
		return (
			<div className="eventSelector">
				{eventTypeNodes}
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
		var eventItems = [];
		this.firebaseRef.on("child_added", function(dataSnapshot) {
			eventItems.push(dataSnapshot.val());
			this.setState({
			  events: eventItems
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
				<h3 className="eventTime">{this.props.date.toTimeString()}</h3>
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
			var eventDate = new Date(event.date);
			return (
				<Event date={eventDate} type={event.type}>
					{event.notes}
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


var DiaperEvent = React.createClass({
	mixins: [Navigation],
	onDateUpdate: function(date) {
		this.setState({
			date: date
		});
	},
	handleSubmit: function(e) {
		e.preventDefault();

		this.firebaseRef = new Firebase(firebaseURI + "/events/");

		var eventDetails = {
			date: this.state.date.getTime(),
			pee: React.findDOMNode(this.refs.pee).checked,
			poo: React.findDOMNode(this.refs.poo).checked,
			notes: React.findDOMNode(this.refs.notes).value
		}

		this.firebaseRef.push(eventDetails);
		
		this.transitionTo('/');
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