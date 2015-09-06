// Routing
var Router = ReactRouter;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;

// Animated transitions
var TransitionGroup = React.addons.CSSTransitionGroup;

// Intl
var IntlMixin = ReactIntl.IntlMixin;
var FormattedRelative = ReactIntl.FormattedRelative;

var App = React.createClass({
	mixins: [Navigation],

  contextTypes: {
    router: React.PropTypes.func
  },
	render: function() {
		var path = this.context.router.getCurrentPath();
		var segment = path.split('/')[1] || 'root';
		return (
			/* <TransitionGroup transitionName={segment === 'root' ? 'slideRightToLeft' : 'slideLeftToRight'}> */
			<TransitionGroup transitionName="slideRightToLeft">
				<RouteHandler key={segment} />
			</TransitionGroup>
		);
	}
});

var Header = React.createClass({
	// Navigation mixin required to use ReactRouter's `goBack(..)`
	mixins: [Navigation],
	render: function() {
		return (
			<div className="bar bar-header bar-stable">
				{this.props.hideBackButton ? null : 
						<button onClick={this.goBack} className="button icon-left ion-chevron-left button-clear">Back</button>}
				<h1 className="title">{this.props.title}</h1>
			</div>
		);
	}
});


var Dashboard = React.createClass({
	render: function() {
		return (
			<div>
				<Header title="Poop Monitor" hideBackButton={true} />

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
			<Link to={this.props.linkTo} className="button">{this.props.name}</Link>
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
		var eventTypeNodes = eventTypes.map(function(eventType, keyIndex) {
			return (
				<EventTypeLink name={eventType.name} 
						linkTo={eventType.linkTo} 
						imageSrc={eventType.imageSrc}
						key={keyIndex} />
			);
		});
		return (
			<div className="button-bar bar-light padding">
				{eventTypeNodes}
			</div>
		);
	}
});

// Renders the list of events, in order of most recent to oldest
var EventHistory = React.createClass({
	getInitialState: function() {
		return {events: []};
	},
	componentWillMount: function() {
		var eventItems = [];
		this.dataProvider = new PMDataProvider();
		this.dataProvider.getEvents(function(event) {
			// `unshift` used instead of `push` to place the newest items at the 
			// top, timeline style
			eventItems.unshift(event);
			this.setState({
			  events: eventItems
			});
		}.bind(this));
	},
	componentWillUnmount: function() {
		this.dataProvider.close();
	},
	render: function() {
		return (
			<EventList events={this.state.events}/>
		);
	}
});

var EventList = React.createClass({
	render: function() {
		var eventNodes = this.props.events.map(function (event, keyIndex) {
			var eventComponent;
			if (event.type === "Diaper") {
				return (<DiaperEvent event={event} key={keyIndex} />);
			}
			else {
				return (<Event event={event} key={keyIndex} />);
			}
		});
		return (
			<div className="list card">
				{eventNodes}
			</div>
		);
	}
	
});

/*
 * Event rendering components 
 */
var Event = React.createClass({
	render: function() {
		var event = this.props.event;
		var imageSrc = "img/" + event.type + ".png";
		var eventDate = new Date(event.date);

		return (
			<EventItem imageSrc={imageSrc} type={event.type} 
					date={eventDate} notes={event.notes} />
		);
	}
});

var DiaperEvent = React.createClass({
	render: function() {
		var event = this.props.event;
		var diaperImageSrc = "img/diaper_" + (event.pee ? "pee" : "") + 
				(event.pee && event.poo ? "_" : "") + (event.poo ? "poo" : "") + 
				".png";
		var eventDate = new Date(event.date);

		return (
			<EventItem imageSrc={diaperImageSrc} type={event.type} 
					date={eventDate} notes={event.notes} />
		);
	}
});

var EventItem = React.createClass({
	mixins: [IntlMixin],
	render: function() {
		return (
			<div className="item item-avatar">
				<img src={this.props.imageSrc} alt={this.props.type + " image"} />
				<h2>{this.props.type}</h2>
				<p><FormattedRelative value={this.props.date} /></p>
				{this.props.notes ? <blockquote>{this.props.notes}</blockquote> : null}
			</div>
		);
	}
});


/*
 * Event creation components
 */
var AddDiaperEvent = React.createClass({
	// Navigation mixin required to use ReactRouter's `transitionTo(..)`
	mixins: [Navigation],
	diaperEventAdded: function() {
		// Return to root
		this.transitionTo('/');
	},
	render: function() {
		return (
			<div>
				<Header title="Diaper Event"/>
				<div className="content has-header">
					<DiaperEventForm successCallback={this.diaperEventAdded} />
				</div>
			</div>
		);
	}
});

var AddFoodEvent = React.createClass({
	mixins: [Navigation],
	eventAdded: function() {
		this.transitionTo('/');
	},
	render: function() {
		return (
			<div>
				<Header title="Food Event"/>
				<div className="content has-header">
					<GenericEventForm eventType="Food" successCallback={this.eventAdded} />
				</div>
			</div>
		);
	}
});

var AddSleepEvent = React.createClass({
	mixins: [Navigation],
	eventAdded: function() {
		this.transitionTo('/');
	},
	render: function() {
		return (
			<div>
				<Header title="Sleep Event"/>
				<div className="content has-header">
					<GenericEventForm eventType="Sleep" successCallback={this.eventAdded} />
				</div>
			</div>
		);
	}
});

var AddWakeEvent = React.createClass({
	mixins: [Navigation],
	eventAdded: function() {
		this.transitionTo('/');
	},
	render: function() {
		return (
			<div>
				<Header title="Wake Event"/>
				<div className="content has-header">
					<GenericEventForm eventType="Wake" successCallback={this.eventAdded} />
				</div>
			</div>
		);
	}
});

// Enable touch events
React.initializeTouchEvents(true);

// Define the app's routes
var routes = (
	<Route name="app" path="/" handler={App}>
		<Route name="diaperEvent" handler={AddDiaperEvent}/>
		<Route name="foodEvent" handler={AddFoodEvent}/>
		<Route name="sleepEvent" handler={AddSleepEvent}/>
		<Route name="wakeEvent" handler={AddWakeEvent}/>
		<DefaultRoute handler={Dashboard}/>
	</Route>
);

//Router.run(routes, Router.HistoryLocation, function (Handler) {
Router.run(routes, function (Handler) {
	React.render(<Handler/>, document.getElementById("app"));
});