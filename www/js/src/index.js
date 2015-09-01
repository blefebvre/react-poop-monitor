// Routing
var Router = ReactRouter;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

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

var DiaperEvent = React.createClass({
	render: function() {
		return (
			<div>
				Diaper event!!!
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

var routes = (
	<Route name="app" path="/" handler={App}>
		<Route name="diaperEvent" handler={DiaperEvent}/>
		<Route name="foodEvent" handler={FoodEvent}/>
		<Route name="sleepEvent" handler={SleepEvent}/>
		<Route name="wakeEvent" handler={WakeEvent}/>
		<DefaultRoute handler={EventSelector}/>
	</Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.getElementById('app'));
});