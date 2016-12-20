var express = require('express');
var router = express.Router();
var request = require('request');
var Meeting = require('../models/meeting.js');

router.post('/add', function(req, res) {
	var meeting = new Meeting();
	meeting.name = req.body.meetingName;
	meeting.save(function(err, data){
		if(err) {
			res.status(500).send({error: 'something went wrong'})
		} else {
			var responseBody = {
				meetingId: data._id,
				meetingName: meeting.name
			}
			res.status(200).send(responseBody)
		}
	})
})

router.get('/:id', function(req, res) {
	res.render('authorize')
})

module.exports = router;