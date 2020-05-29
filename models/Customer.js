const mongoose = require('mongoose');

const custSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: String,
    city: String,
    state: String,
    zip: Number,
    phone: {type: String, required: true},
    email: {type: String, required: true},
    password: String,
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