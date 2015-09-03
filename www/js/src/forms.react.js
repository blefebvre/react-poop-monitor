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