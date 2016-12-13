var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gAuth = new Schema({
    user1Events: [Date],
    user2Events: [Date]
});

var gAuthModel = mongoose.model('gAuth', gAuth);

module.exports = gAuthModel;