const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip: {type: String, required: true, maxlength: 5},
    phone: {type: String, required: true, maxlength: 12},
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    customers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    }],
    invoices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice'
    }]
});

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;