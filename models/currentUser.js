const mongoose = require('mongoose');

const currentUserSchema = mongoose.Schema({
    userId: {type: String, required: true},
    userName: {type: String, required: false},
},{collection:'users'});

const model = mongoose.model('currentUserSchema', currentUserSchema);

module.exports = model