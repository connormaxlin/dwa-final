var express = require('express');
var exphbs = require('express-handlebars');
var Mongoose = require('mongoose');
var bodyParser = require('body-parser');
var moment = require('moment');
var app = express();

var Email = require('./models/email');
var Meeting = require('./models/meeting');
var Schedule = require('./models/schedule');

require('dotenv').config();

Mongoose.connect(process.env.DB_URL);

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res) {
    var query = Meeting.find({isActive: true});
    query.exec(function(err, docs) {
        console.log(docs)
        if(!err) {
            res.render('index', {meetings: docs});
        }
    })
});

// TESTING LINKS ----------------------------------------------------
app.get('/secondEmail/:id', function(req, res) {
    console.log(res.locals);
    res.render('secondEmail');
});

app.get('/complete/:meetingId', function(req, res) {
    var query = Schedule.find({meetingId: req.params.meetingId});
    query.exec(function(err, docs) {
        if (err) {
            res.status(500).send(err);
        } else if(docs.length < 2) {
            res.render('complete', {isMeetingFull: false, meetingId: req.params.meetingId});
        } else {
            var meetingQuery = Meeting.findById(req.params.meetingId)
            meetingQuery.exec(function(meetingErr, meetingDoc) {
                if(meetingErr) {
                    res.status(500).send(err)
                } else {
                    meetingDoc.isActive = false;
                    meetingDoc.save(function(saveErr, savedDoc){
                        if(saveErr) {
                            res.status(500).send(saveErr)
                        } else {
                            //find next meeting time
                            var meetingTime = moment().add(30, 'minutes').format("dddd, MMMM Do YYYY, h:mm:ss a");
                            // console.log(docs[0].events[0])
                            // var user1Meeting = moment(docs[0].events[0], "ddd MMM DD YYYY hh:mm:ss ").format("dddd, MMMM Do YYYY, h:mm:ss a");
                            // var user2Meeting = moment(docs[1].events[0], "ddd MMM DD YYYY hh:mm:ss").format("dddd, MMMM Do YYYY, h:mm:ss a");
                            // console.log(moment(meetingTime))
                            // console.log(moment(user1Meeting))
                            // console.log(moment(user2Meeting))
                            // console.log("momentCorrect: " + moment(meetingTime).isSameOrBefore(moment(user1Meeting)))
                            // while (moment(meetingTime).isSameOrBefore(moment(user1Meeting)) && moment(meetingTime).isSameOrBefore(moment(user2Meeting))) {
                            //     moment(meetingTime).add(30, 'minutes');
                            // }
                            
                            // if (moment(meetingTime).isAfter(moment(user1Meeting)) && moment(meetingTime).isAfter(moment(user2Meeting))) {
                            //     console.log(meetingTime)
                            //     res.render('complete', {isMeetingFull: true, nextMeetingTime: meetingTime});
                            // }
                            res.render('complete', {isMeetingFull: true, nextMeetingTime: meetingTime});
                            //add send invite here
                        }
                    })
                }

            })
        }
    })
});

app.get('/status', function(req, res) {
    var query = Email.find({}, null, { limit: 2, sort: { 'epoch': -1 } });
    query.exec(function(err, docs) {
        var emails = {
            user_email: docs[0].user_email,
            otherEmail: docs[1].user_email
        }
        res.render('status', emails)
    });
});

app.get('/:id', function(req, res){
  Email.findById(req.params.id, function(err, data){
    if(data) {
      res.render('index', {user1Token: data.user1Token});
    }
  })
})
// END --------------------------------------------------------------

var email = require('./routes/emails');
app.use('/emails', email);

var meeting = require('./routes/meetings');
app.use('/meeting', meeting);

var schedule = require('./routes/schedules');
app.use('/schedule', schedule);

app.use('/public', express.static('public'))

app.listen(process.env.PORT || 3000, function() {
    console.log('App listening on port 3000!');
});
