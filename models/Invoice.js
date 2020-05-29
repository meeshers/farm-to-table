const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    //title: {type: String, required: true}

}, {timestamps:true});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;