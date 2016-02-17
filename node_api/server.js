/**
 * Created by Dimitar_Jilanov on 2/15/2016.
 */
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
// here we declare all functions we use for the standart user interface
var database       = require('./database');
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
database.connectDb();

// START THE SERVER
// =============================================================================
app.listen(port);
// CORS header securiy
app.all('/*', function (req, res, next) {
    // we allow everyone to make calls ( we can easy block it to single domain where it is deployed )
    res.header("Access-Control-Allow-Origin", "*");
    // allow all methods ( OPTIONS is not implemented to return all options _
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // allow the request for the scripts
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});
// when we call from the fetcher service we return the models database
app.get('/api/makesAndModels', function (req, res){
    res.json({
        "makesAndModels": database.getMakesAndModelsDatabase()
    });
});
// when we call from the fetcher service we return the states database
app.get('/api/states', function (req, res){
    res.json({
        "states": database.getStatesDatabase()
    });
});