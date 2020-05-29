const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
    //title: {type: String, required: true}

};

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;