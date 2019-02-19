var spicedPg = require('spiced-pg');
var secret = require('./secret.json');
var db = spicedPg('postgres:postgres:postgres@localhost:8080/petition');

exports.selectAll = db.query('SELECT * FROM user_profiles').then(function(results) {
    console.log(results.rows);
    return results.rows;
}).catch(function(err) {
    //console.log(err);
});

exports.createUser = function(first,last,email,password,signature) {
  queryString = 'INSERT INTO user_profiles (firstName, lastName, email, password,signature) VALUES($1,$2,$3,$4,$5)';
  db.query(queryString,[first,last,email,password,signature],function(err, results) {
    if(!err) {
      console.log(results.rows);
    } else {
      console.log(err);
    }
  })
};

exports.insertProfile = function(age, city, homepage) {
  queryString = 'INSERT INTO user_profiles (age, city, homepage) VALUES ($1,$2,$3)';
  db.query(queryString,[age,city,homepage],function(err,results) {
    if(!err) {
      console.log(queryString);
    } else {
      console.log(err);
    }
  })
};
// function createUser(first, last, email, password, confPassword) {
//   console.log(first,last,email,password,confPassword);
// }
