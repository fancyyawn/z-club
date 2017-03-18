const mongoose = require('mongoose');
const config = require('config-lite');

mongoose.connect(config.mongodb.url, function (err) {
    if(err){
        console.error('connect to %s error: ', config.mongodb.url, err.message);
        process.exit(1);
    }
});

exports.User = require('./user');
exports.Topic = require('./topic');
exports.Comment = require('./comment');