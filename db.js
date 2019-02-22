var spicedPg = require("spiced-pg");
var secret = require("./secret.json");
var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/petition"
);

exports.getAllSignatures = function() {
    const qs =
        "SELECT signature FROM signatures LEFT JOIN user_profiles ON signatures.user_id = profile.user_id";
    return db.query(qs);
};

exports.createUser = function(first, last, email, password) {
    const qs =
        "INSERT INTO users (firstName, lastName, email, password) VALUES($1,$2,$3,$4)";
    return db.query(qs, [first, last, email, password]);
};

exports.createProfile = function(age, city, homepage) {
    const qs =
        "INSERT INTO user_profiles (age, city, homepage) VALUES ($1,$2,$3)";
    return db.query(qs, [age, city, homepage]);
};

exports.createSignature = function(signature) {
    const qs = "INSERT INTO signatures (signature) VALUES ($1)";
    return db.query(qs, [signature]);
};

exports.showTotalSigs = function() {
    const qs = "SELECT * FROM user_profiles JOIN ON ";
};

exports.getSignerCount = function() {
    const qs = "SELECT COUNT(*) FROM signatures";
    return db.query(qs);
};

exports.deleteSignature = function deleteSignature(id) {
    const qs = "DELETE FROM signatures WHERE user_id = $1";
    return db.query(qs, [id]);
};

exports.login = function(email, hash) {
    return db.query("SELECT email FROM users WHERE email=$1 AND password=$2", [
        email,
        hash
    ]);
};

exports.createProfile = function(age, city, homepage, user_id) {
    const qs = `INSERT INTO user_profiles (age, city, homepage, user_id)
    VALUES ($1,$2,$3,$4)
    ON CONFLICT (user_id)
    DO UPDATE SET age = $1, city = $2, homepage = $3, user_id = $4`;
    return db.query(qs, [age, city, homepage, user_id]);
};

module.exports.updateProfile = function updateProfile(
    user_id,
    firstname,
    lastname,
    email,
    password,
    city,
    age,
    homepage
) {
    let qs1 = `UPDATE users
    SET firstname = $2, lastname = $3, email = $4, password = $5
    WHERE id = $1`;
    let param1 = [user_id, firstname, lastname, email, password];

    let qs2 = `UPDATE users
    SET firstname = $2, lastname = $3, email = $4
    WHERE id = $1`;
    let param2 = [user_id, firstname, lastname, email];

    if (password) {
        console.log("changed pw");
        return db.query(q1, param1);
    } else {
        console.log("didn't change pw");
        console.log(q2, param2);
        return db.query(q2, param2);
    }
};

// function createUser(first, last, email, password, confPassword) {
//   console.log(first,last,email,password,confPassword);
// }
