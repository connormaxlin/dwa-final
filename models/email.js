var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var emailSchema = new Schema({
    user_email: String,
    otherEmail: String
});

var Email = mongoose.model('Email', emailSchema);

module.exports = Email;