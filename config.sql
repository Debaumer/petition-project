DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_profiles;
DROP TABLE IF EXISTS signatures;

CREATE TABLE users (
  id SERIAL primary key,
  firstName VARCHAR(25) not null,
  lastName VARCHAR(40) not null,
  email VARCHAR(100) UNIQUE not null,
  password VARCHAR(20) not null
);

CREATE TABLE signatures(
    signature VARCHAR(2048),
    firstName VARCHAR(25),
    lastName VARCHAR (40)
);

CREATE TABLE user_profiles (
    id SERIAL primary key,
    age INT,
    city VARCHAR(100),
    url VARCHAR(300)
);
