/**
 * Created by Dimitar_Jilanov on 2/15/2016.
 */
// home. Used for standart users
(function() {

    // here we use the mongoose to call the api and get the database for the
    // user viewed website
    var mongoose   = require('mongoose');
    // here we save the db with the categories for the nav
    var makesAndModelsDatabase = {};
    // here we save the db with the categories for the nav
    var statesDatabase = {};
    // used to be called from the server on get of the models and makes
    function getMakesAndModelsDatabase() {
        return makesAndModelsDatabase;
    }
    // used to be called from the server on get of the states
    function getStatesDatabase() {
        return statesDatabase;
    }
    // activated on start , connect and fetch the info from the database
    function connectDb(){
        // we cache the product list by the viewing user
        mongoose.connection.on('connected', function () {
            console.log('[Home.js]Mongoose default connection open');
            mongoose.connection.db.collection('makesAndModels', function (err, collection) {
                collection.find().toArray(function(err, docs) {
                    // cache the databse of the makes and models
                    makesAndModelsDatabase = docs;
                });
            });
            mongoose.connection.db.collection('states', function (err, collection) {
                collection.find().toArray(function(err, docs) {
                    // cache the databse of the states
                    statesDatabase = docs;
                });
            });
        });

        // If the connection throws an error
        mongoose.connection.on('error',function (err) {
            console.log('[Home.js]Mongoose default connection error: ' + err);
        });

        // When the connection is disconnected
        mongoose.connection.on('disconnected', function () {
            console.log('[Home.js]Mongoose default connection disconnected');
        });

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', function() {
            mongoose.connection.close(function () {
                console.log('[Home.js]Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });
        // get database
        // mongoose.connect('mongodb://'+ config.dbUsername +':'+ config.dbPassword + config.api);
        mongoose.connect('mongodb://admin:admin1234@ds041394.mongolab.com:41394/mdgcalculator');
    }

    module.exports = {
        connectDb			        : connectDb,
        getStatesDatabase           : getStatesDatabase,
        getMakesAndModelsDatabase	: getMakesAndModelsDatabase
    };
}());
