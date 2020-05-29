const mongoose = require('mongoose');

const custSchema = new mongoose.Schema({
    //title: {type: String, required: true}

}, {timestamps:true});

const Customer = mongoose.model('Customer', custSchema);

module.exports = Customer;