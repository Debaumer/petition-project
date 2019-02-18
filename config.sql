DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL primary key,
  cause VARCHAR(255),
  cause_id int,
  email VARCHAR(255) not null,
  password VARCHAR(255) not null,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
);

CREATE TABLE causes (
  id SERIAL primary key,
  cause VARCHAR(255) not null,
  signatories int,
);
