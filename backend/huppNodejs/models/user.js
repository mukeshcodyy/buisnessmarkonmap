const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    businessname: {
        type: String,
        required: true
    }
})

exports.User = mongoose.model('User', userSchema);
