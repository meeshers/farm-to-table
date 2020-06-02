/* External Modules */
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

/* Internal Modules */
const controllers = require('./controllers');
const authRequired = require("./middleware/authRequired");

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

/* Session config */
app.use(
  session({
    store: new MongoStore({
        url: "mongodb://localhost:27017/",
    }),
    secret: "farmtotable",
    resave: false,
    saveUnitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, //one week
    },
  })
);

// Shop routes
app.use("/", controllers.shop);

//admin routes
app.use("/admin", controllers.admin);

// user auth routes
app.use("/", controllers.auth);

app.listen(PORT, () => {
    console.log("Server running at http://localhost:" + PORT);
})