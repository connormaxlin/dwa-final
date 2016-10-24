var express = require('express');
var router = express.Router();

var Email = require('../models/email');

router.get('/add', function(req, res) {
    res.render('index');
});

router.post('/add', function(req, res) {
    var email = new Email({
        user_email: req.body.user_email
    });

    email.save(function(err, data) {
        if (err) {
            res.send('error');
        }
        return res.redirect(303, '/secondEmail');
    });
});

router.post('/addTwo', function(req, res) {
    var email = new Email({
        user_email: req.body.otherEmail
    });

    email.save(function(err, data) {
        if (err) {
            res.send('error');
        }
        return res.redirect(303, '/complete');
    });
});

module.exports = router;
