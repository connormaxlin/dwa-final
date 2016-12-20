var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schedule = new Schema({
	events: [Date],
	meetingId: {
		type: Schema.Types.ObjectId,
		ref: 'meeting'
	}
});

var ScheduleModel = mongoose.model('schedule', schedule);

module.exports = ScheduleModel;