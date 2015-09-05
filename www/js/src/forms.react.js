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


var DiaperEventForm = React.createClass({
	onDateUpdate: function(date) {
		this.setState({
			date: date
		});
	},
	handleSubmit: function(e) {
		e.preventDefault();

		this.firebaseRef = new Firebase(firebaseURI + "/events/");

		var eventDetails = {
			type: "Diaper",
			pee: React.findDOMNode(this.refs.pee).checked,
			poo: React.findDOMNode(this.refs.poo).checked,
			date: this.state.date.getTime(),
			notes: React.findDOMNode(this.refs.notes).value
		}

		this.firebaseRef.push(eventDetails, function complete(error) {
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

var CheckboxList = React.createClass({
	render: function() {
		return (
			<ul className="list">
				{this.props.children}
			</ul>
		);
	}
});


var CheckboxItem = React.createClass({
	render: function() {
		return (
			<li className="item item-checkbox">
				<label className="checkbox">
					<input type="checkbox" ref={this.props.ref} />
				</label>
				{this.props.label}
			</li>
		);
	}
});

