// Component to enable selecting from a set of predefined time values
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

/*
 * Event forms
 */
var GenericEventForm = React.createClass({
	onDateUpdate: function(date) {
		this.setState({
			date: date
		});
	},
	componentWillMount: function() {
		this.dataProvider = new PMDataProvider();
	},
	componentWillUnmount: function() {
		this.dataProvider.close();
	},
	handleSubmit: function(e) {
		e.preventDefault();

		var eventDetails = {
			type: this.props.eventType,
			date: this.state.date.getTime(),
			notes: React.findDOMNode(this.refs.notes).value
		}

		this.dataProvider.saveEvent(eventDetails, function complete(error) {
			if (error) { 
				return alert( "PMDataProvider error: [" + error + "]"); 
			}
			// Fire success callback
			this.props.successCallback();
		}.bind(this));
	},
	render: function() {
		return (
			<form className="eventForm" onSubmit={this.handleSubmit}>
				<h4>When?</h4>
				<TimeSelector onUpdate={this.onDateUpdate}/>

				<h4>Notes</h4>
				<textarea ref="notes" placeholder="Details..." />

				<button className="button button-positive" type="submit">Save {this.props.eventType} Event</button>
			</form>
		);
	}
});

var DiaperEventForm = React.createClass({
	onDateUpdate: function(date) {
		this.setState({
			date: date
		});
	},
	componentWillMount: function() {
		this.dataProvider = new PMDataProvider();
	},
	componentWillUnmount: function() {
		this.dataProvider.close();
	},
	handleSubmit: function(e) {
		e.preventDefault();

		var eventDetails = {
			type: "Diaper",
			pee: React.findDOMNode(this.refs.pee).checked,
			poo: React.findDOMNode(this.refs.poo).checked,
			date: this.state.date.getTime(),
			notes: React.findDOMNode(this.refs.notes).value
		}

		this.dataProvider.saveEvent(eventDetails, function complete(error) {
			if (error) { 
				return alert( "Firebase error: [" + error + "]"); 
			}
			// Fire success callback
			this.props.successCallback();
		}.bind(this));
	},
	render: function() {
		return (
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
		);
	}
});
