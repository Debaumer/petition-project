DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS user_profiles;
DROP TABLE IF EXISTS signatures;

CREATE TABLE users (
  id SERIAL primary key,
  firstName VARCHAR(25) not null,
  lastName VARCHAR(40) not null,
  email VARCHAR(100)  not null UNIQUE,
  password VARCHAR(20) not null
);

CREATE TABLE signatures(
    signature VARCHAR(2048),
    firstName VARCHAR(25), --get rid of this
    lastName VARCHAR (40), --get rid of this
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE user_profiles (
    id SERIAL primary key,
    age INT,
    city VARCHAR(100),
    url VARCHAR(300),
    user_id INTEGER REFERENCES users(id) NOT NULL UNIQUE
);
