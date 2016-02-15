/**
 * Created by Dimitar_Jilanov on 2/15/2016.
 */
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
// here we declare all functions we use for the standart user interface
var makesAndModels       = require('./makesAndModels');
// this will let us get nv.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use( bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
// SET NEEDED VARIABLES
// =============================================================================
// we connect to the db using the credentials and fetch the home and products
makesAndModels.connectDb();

// START THE SERVER
// =============================================================================
app.listen(port);
// CORS header securiy
app.all('/*', function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "www.jilanov.eu");
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});
// when we call from the home we return the database
app.get('/api/makesAndModels', function (req, res){
    res.json({
        "makesAndModels": makesAndModels.getMakesAndModelsDatabase(),
    });
});