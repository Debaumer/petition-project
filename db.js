var spicedPg = require("spiced-pg");
var dbURL =
    process.env.DATABASE_URL ||
    "postgres:postgres:postgres@localhost:5432/petition";
var db = spicedPg(dbURL);

//create user on register
exports.createUser = function(first, last, email, password) {
    const qs =
        "INSERT INTO users (firstName, lastName, email, password) VALUES($1,$2,$3,$4)";
    return db.query(qs, [first, last, email, password]);
};

exports.getUserdata = function(email, password) {
    const qs = "SELECT (id) FROM users WHERE email = $1 AND password = $2";
    return db.query(qs, [email, password]);
};

//signature related queries
exports.createSignature = function(user_id, signature, firstName, lastName) {
    const qs =
        "INSERT INTO signatures (user_id,signature,firstName,lastName) VALUES ($1,$2,$3,$4)";
    return db.query(qs, [user_id, signature, firstName, lastName]);
};

exports.getSig = function(user_id) {
    const qs = "SELECT signature FROM signatures WHERE user_id = $1";
    return db.query(qs, [user_id]);
};

exports.getSignerCount = function() {
    const qs = "SELECT count(*) FROM signatures";
    return db.query(qs);
};

exports.getAllSigners = function getAllSigners() {
    return db.query("SELECT * FROM signatures");
};

exports.deleteSignature = function deleteSignature(id) {
    const qs = "DELETE FROM signatures WHERE user_id = $1";
    return db.query(qs, [id]);
};

//logins
exports.login = function(email) {
    return db.query("SELECT (password) FROM users WHERE email=$1", [email]);
};

exports.loginCheck = function(email) {
    const qs = "SELECT (id) FROM users WHERE email = $1";
    return db.query(qs, [email]);
};

//profile related queries
exports.createProfile = function(user_id, city, homepage, age) {
    const qs = `INSERT INTO user_profiles (user_id, city, homepage, age)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;
    return db.query(qs, [user_id, city, homepage, age]);
};

module.exports.getProfile = function() {
    return db.query(
        `SELECT
        users.firstname AS firstName,
        users.lastname AS lastName,
        user_profiles.age AS age,
        user_profiles.city AS city,
        user_profiles.homepage AS homepage
        FROM users
        LEFT JOIN user_profiles
        ON users.id = user_profiles.user_id`
    );
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
        console.log("changed pword");
        return db.query(qs1, param1);
    } else {
        console.log("didn't change pword");
        console.log(qs2, param2);
        return db.query(qs2, param2);
    }
};

// function createUser(first, last, email, password, confPassword) {
//   console.log(first,last,email,password,confPassword);
// }
