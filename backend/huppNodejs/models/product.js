const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    businessname: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    latitude:{
        type: Number,
        required: true
    },
    longitude:{
        type: Number,
        required: true
    }
})

exports.Product = mongoose.model('Product', productSchema);
