var spicedPg = require("spiced-pg");
var pg = require("pg");
var secret = require("./secret.json");
var db = spicedPg("postgres:postgres:postgres@localhost:8080/petition");

console.log(pg);

exports.selectAll = function() {
    return db.query("SELECT * FROM user_profiles");
};

exports.createUser = function(first, last, email, password, signature) {
    var queryString =
        "INSERT INTO user_profiles (firstName, lastName, email, password,signature) VALUES($1,$2,$3,$4,$5)";
    db.query(queryString, [first, last, email, password, signature], function(
        err,
        results
    ) {
        if (!err) {
            console.log(results.rows);
        } else {
            console.log(err);
        }
    });
};

exports.insertProfile = function(age, city, homepage) {
    var queryString =
        "INSERT INTO user_profiles (age, city, homepage) VALUES ($1,$2,$3)";
    db.query(queryString, [age, city, homepage], function(err, results) {
        if (!err) {
            console.log(results);
        } else {
            console.log(err);
        }
    });
};
// function createUser(first, last, email, password, confPassword) {
//   console.log(first,last,email,password,confPassword);
// }
