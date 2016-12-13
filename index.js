var express = require('express');
var exphbs = require('express-handlebars');
var Mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

var Email = require('./models/email');

require('dotenv').config();

Mongoose.connect(process.env.DB_URL);

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res) {
    res.render('index');
});

// TESTING LINKS ----------------------------------------------------
app.get('/secondEmail/:id', function(req, res) {
    console.log(res.locals);
    res.render('secondEmail');
});

app.get('/complete', function(req, res) {
    var query = Email.find({}, null, { limit: 2, sort: { 'epoch': -1 } });
    query.exec(function(err, docs) {
        var emails = {
            user_email: docs[0].user_email,
            otherEmail: docs[1].user_email
        }
        res.render('complete', emails)
    });
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

app.use('/public', express.static('public'))

app.listen(process.env.PORT || 3000, function() {
    console.log('App listening on port 3000!');
});
