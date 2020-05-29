const mongoose = require('mongoose');
const conn = 'mongodb://localhost:27017/blog';

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
    //Authors: require('./Author'),
};