DROP TABLE IF EXISTS users_profiles;

CREATE TABLE users (
  id SERIAL primary key,
  firstName VARCHAR(255) not null,
  lastName VARCHAR(255) not null,
  UNIQUE email VARCHAR(255) not null,
  password VARCHAR(255) not null,
  signature VARCHAR(255) not null,
  age int,
  city VARCHAR(255),
  homepage VARCHAR(255)
);


DROP TABLE IF EXISTS causes;

CREATE TABLE causes (
  id SERIAL primary key,
  UNIQUE cause VARCHAR(255) not null,
  signatories int
);
