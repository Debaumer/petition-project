//write query function
var spicedPg = require("spiced-pg");

var db = spicedPg(
    "postgres:postgres:postgres@localhost:5432/wintergreen-petition"
);

module.exports.getCities = function getCities() {
    return db.query("SELECT * FROM cities");
};

//create user -sP someUsername - do this to create credentials for the db
