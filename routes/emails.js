var express = require('express');
var router = express.Router();
var request = require('request');
require('request-debug')(request)

var Email = require('../models/email');

// router.get('/add', function(req, res) {
//     res.render('index');
// });


// router.post('/add', function(req, res) {
//     // Find existing email based on user1Token
//     var email = new Email();
//     email.user1Events = req.body.user1Events;
//     email.user2Events = req.body.user2Events;


//     email.save(function(err, data) {
//         if (err) {
//             res.send('error');
//         }



//         res.status(200).send({
//             url: req.body.user2Token == "" ? '/secondEmail/' + data._id : 'complete'
//         });


//         //return res.render('secondEmail', {emailURL: "localhost:3000/" + data._id});
//         // return res.redirect(303, '/secondEmail');
//     });
// });


// router.post('/addTwo', function(req, res) {
//     var email = new Email({
//         user_email: req.body.otherEmail
//     });

//     email.save(function(err, data) {
//         if (err) {
//             res.send('error');
//         }
//         // return res.redirect(303, '/complete');
//     });
// });

// router.get('/seconduserauth/{id}', function(req, res) {

// })

module.exports = router;
