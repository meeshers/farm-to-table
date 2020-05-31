const mongoose = require('mongoose');

const custSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: String,
    city: String,
    state: String,
    zip: {type: Number, maxlength: 5},
    phone: {type: String, required: true, maxlength: 12},
    email: {type: String, required: true},
    password: String,
    profilePic: String,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    invoices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice'
    }]

}, {timestamps:true});

const Customer = mongoose.model('Customer', custSchema);

module.exports = Customer;