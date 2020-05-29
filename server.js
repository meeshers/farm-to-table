/* External Modules */
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

/* Internal Modules */
const controllers = require('./controllers');

/* Instance Modules */
const app = express();

/* App Configurations */
app.set('view engine', 'ejs');

/* Global Variables */
const PORT = process.env.PORT || 4000; //PORT is a system variable (ie caps sets it apart)

/* Middleware */
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

// Home page route
app.get('/', (req,res)=>{
    res.render('index');
})

app.listen(PORT, () => {
    console.log("Server running at http://localhost:" + PORT);
})