var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var meeting = new Schema({
	name: String,
	isActive: {
		type: Boolean,
		default: true
	}
});

var MeetingModel = mongoose.model('meeting', meeting);

module.exports = MeetingModel;