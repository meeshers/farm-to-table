const mongoose = require('mongoose');
require("dotenv").config();

const conn = process.env.MONGODB_URI;

mongoose.connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then( () =>{
    console.log('Mongodb connected...');
}).catch( (error) => {
    console.log(error);
});

module.exports = {
    Customers: require('./Customer'),
    Products: require('./Product'),
    Invoices: require('./Invoice'),
    Farms: require('./Farm'),
    Lineitems: require('./Lineitem')
};