// Localstorage data provider impl for the Poop Monitor
function PMDataProvider() {
	this.storageKey = "poopMonitorEventData";
}

// Fire callback once for each event in the system
PMDataProvider.prototype.getEvents = function(callback) {
	var eventsJSONString = localStorage.getItem(this.storageKey);
	var events = JSON.parse(eventsJSONString) || [];
	events.map(function(event) {
		// Callback once for each event, just like Firebase does
		callback(event);
	})
};

// Persist the given event. callback fired once complete
PMDataProvider.prototype.saveEvent = function(event, callback) {
	var events = JSON.parse(localStorage.getItem(this.storageKey)) || [];
	events.push(event);
	localStorage.setItem(this.storageKey, JSON.stringify(events));
	callback();
};

// Close the provider
PMDataProvider.prototype.close = function() {
	// no-op for localStorage
};