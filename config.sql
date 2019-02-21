DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL primary key,
  firstName VARCHAR(255) not null,
  lastName VARCHAR(255) not null,
  email VARCHAR(255) UNIQUE not null,
  password VARCHAR(255) not null,
  signature VARCHAR(500) not null
);

DROP TABLE IF EXISTS user_profiles;

CREATE TABLE user_profiles (
  email VARCHAR(255) UNIQUE,
  age int,
  city VARCHAR(20),
  homepage VARCHAR(100)
);
