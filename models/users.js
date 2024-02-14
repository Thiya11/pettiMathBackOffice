const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    token:    {type:String, required: false}
}, {collection: 'users'})

const model = mongoose.model('UserSchema', UserSchema);

module.exports = model