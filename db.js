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

module.exports.getAllProfiles = function() {
    return db.query(
        `SELECT
        users.firstname AS firstName,
        users.lastname AS lastName,
        user_profiles.age AS age,
        user_profiles.city AS city,
        user_profiles.homepage AS homepage,
        signatures.signature AS signature
        FROM users
        LEFT JOIN user_profiles
        ON users.id = user_profiles.user_id
        LEFT JOIN signatures
        ON users.id = signatures.user_id`
    );
};

module.exports.getProfile = function(userId) {
    let qs = `SELECT
    users.firstname AS firstName,
    users.lastname AS lastName,
    users.email AS email,
    user_profiles.age AS age,
    user_profiles.city AS city,
    user_profiles.homepage AS homepage,
    signatures.signature AS signature
    FROM users
    LEFT JOIN user_profiles
    ON users.id = user_profiles.user_id
    LEFT JOIN signatures
    ON users.id = signatures.user_id
    WHERE users.id = $1`;
    let params = [userId];
    return db.query(qs, params);
};

module.exports.updateUserInfo = function updateUserInfo(
    user_id,
    firstname,
    lastname,
    email,
    password
) {
    if (!arguments) {
        console.log("no items entered for user info");
        return {};
    }

    let qs = `UPDATE users
    SET firstName = $2, lastName = $3, email= $4 , password = $5
    WHERE id = $1`;
    let params = [user_id, firstname, lastname, email, password];

    if (!password) {
        console.log("no password");
        qs = `UPDATE users
        SET firstName = $2, lastName = $3, email = $4
        WHERE id = $1`;
        params = [user_id, firstname, lastname, email];
    }

    return db.query(qs, params);
};

module.exports.updateProfile = function updateProfile(
    age,
    city,
    homepage,
    user_id
) {
    if (!arguments) {
        console.log("no info entered for user_profiles");
        return {};
    }
    let qs = `INSERT INTO user_profiles(age, city, homepage, user_id)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id)
        DO UPDATE SET age = $1, city = $2, homepage = $3, user_id = $4`;
    let params = [age, city, homepage, user_id];
    return db.query(qs, params);
};

// function createUser(first, last, email, password, confPassword) {
//   console.log(first,last,email,password,confPassword);
// }
