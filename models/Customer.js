const mongoose = require('mongoose');

const custSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, default: ""},
    city: {type: String, default: ""},
    state: {type: String, default: ""},
    zip: {type: Number, maxlength: 5, default: ""},
    phone: {type: String, required: true, maxlength: 12},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profilePic: String,
    lineitems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lineitem'
    }],
    invoices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice'
    }],
    farmID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farm'
    }

}, {timestamps:true});

const Customer = mongoose.model('Customer', custSchema);

module.exports = Customer;