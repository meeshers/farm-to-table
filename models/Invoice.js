const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    billedDate: {type: Date, required: true},
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }]

}, {timestamps:true});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
