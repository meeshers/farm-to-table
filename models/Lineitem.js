const mongoose = require('mongoose');

const lineItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    qty: {type: Number, required: true},
    price: {type: Number, required: true}

}, {timestamps:true});

const Lineitem = mongoose.model('Lineitem', lineItemSchema);

module.exports = Lineitem;