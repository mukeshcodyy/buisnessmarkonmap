const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }

})

exports.Order = mongoose.model('Order', orderSchema);
