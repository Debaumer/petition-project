var spicedPg = require('spiced-pg');
var secret = require('./secret.json');
var db = spicedPg('postgres:postgres:postgres@localhost:8080/petition');

exports.selectAll = function() {
  return db.query('SELECT * FROM users');
};

exports.createUser = function(first,last,email,password,signature) {
  var queryString = 'INSERT INTO users (firstName, lastName, email, password,signature) VALUES($1,$2,$3,$4,$5)';
  return db.query(queryString,[first,last,email,password,signature])
};

exports.getHash = function(hash) {
  var queryString = 'SELECT password FROM users where password=$1';
  return db.query(queryString, [hash]).then(result => {
    console.log(result);
    res.send(`${result}`);
  }).catch(error => {
    console.log(error);
    res.send(`${error}`);
  })
}

exports.login = function(email,hash) {
  db.query('SELECT email FROM users WHERE email=$1 AND password=$2',[email,password])
  .then(result => {
    console.log(result);
    return result;
  }).catch(error => {
    console.log(error);
    return error;
  });
};

exports.insertProfile = function(age, city, homepage) {
  var queryString = 'INSERT INTO user_profiles (age, city, homepage) VALUES ($1,$2,$3)';
  db.query(queryString,[age,city,homepage]).
  then(result => {
    console.log(result);
  }).catch( error => {
    console.log(error);
  })
};
// function createUser(first, last, email, password, confPassword) {
//   console.log(first,last,email,password,confPassword);
// }
