// Firebase data provider impl for the Poop Monitor
function PMDataProvider() {
	this.firebaseURI = "https://<your Firebase app id>.firebaseio.com/events/";
	this.firebaseRef = new Firebase(this.firebaseURI);
}

// Fire callback once for each event in the system
PMDataProvider.prototype.getEvents = function(callback) {
	this.firebaseRef.on("child_added", function(dataSnapshot) {
		callback(dataSnapshot.val());
	});
};

// Persist the given event. callback fired once complete
PMDataProvider.prototype.saveEvent = function(event, callback) {
	this.firebaseRef.push(event, function complete(error) {
		if (error) { 
			return callback( error ); 
		}
		callback();
	}.bind(this));
};

// Close the provider
PMDataProvider.prototype.close = function() {
	this.firebaseRef.off();
};