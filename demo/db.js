//write query function
var spicedPg = require("spiced-pg");

var db = spicedPg(
    "postgres:postgres:postgres@localhost:5432/wintergreen-petition"
);

module.exports.getCities = function getCities() {
    return db.query("SELECT * FROM cities");
};

module.exports.addCity = function addCity(city, state, country) {
    db.query("INSERT INTO cities (city, state) VALUE ($1, $2, $3)", [
        city,
        state || null,
        country || null
    ]);
    //this dollar sign syntax helps protect from SQL injection attacks, it escapes the text into a string
};

//create user -sP someUsername - do this to create credentials for the db
