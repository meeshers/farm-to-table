const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required:true},
    price: {type: String, required: true},
    birthDate: Date,
    readyDate: Date,
    available: Boolean,
    growthNotes: String,
    img: String,
    deleted: {type: Boolean, required: true, default: false},
    farmID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farm'
    }
      
}, {timestamps:true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;