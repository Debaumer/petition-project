var spicedPg = require("spiced-pg");
var secret = require("./secret.json");
var db = spicedPg("postgres:postgres:postgres@localhost:8080/petition");

exports.getAllSignatures = function() {
    const qs = "SELECT (signature) FROM users";
    return db.query(qs);
};

exports.createUser = function(first, last, email, password) {
    const qs =
        "INSERT INTO users (firstName, lastName, email, password) VALUES($1,$2,$3,$4)";
    return db.query(qs, [first, last, email, password]);
};

exports.createSig = function(signature) {
    const qs = "INSERT INTO users (signature) VALUES ($1)";
    return db.query(qs, [signature]);
};

exports.getSignerCount = function() {
    const qs = "SELECT COUNT (*) FROM signatures";
    return db.query(qs);
};

exports.login = function(email, hash) {
    return db.query("SELECT email FROM users WHERE email=$1 AND password=$2", [
        email,
        hash
    ]);
};

exports.insertProfile = function(age, city, homepage) {
    const qs =
        "INSERT INTO user_profiles (age, city, homepage) VALUES ($1,$2,$3)";
    return db.query(qs, [age, city, homepage]);
};
// function createUser(first, last, email, password, confPassword) {
//   console.log(first,last,email,password,confPassword);
// }
