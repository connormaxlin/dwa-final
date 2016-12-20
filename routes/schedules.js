var express = require('express');
var router = express.Router();
var request = require('request');
var Schedule = require('../models/schedule.js');

router.post('/add', function(req, res) {
	var schedule = new Schedule();
	console.log(req.body.scheduleEvents)
	schedule.events = req.body["scheduleEvents[]"]
	schedule.meetingId = req.body.meetingId;

	schedule.save(function(err, data){
		if(err) {
			res.status(500).send({error: 'something went wrong'})
		} else {
			res.status(200).send(data);
		}
	})
})

module.exports = router;