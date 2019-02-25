DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS user_profiles;
DROP TABLE IF EXISTS signatures;

CREATE TABLE users (
  id SERIAL primary key,
  firstName VARCHAR(40) not null,
  lastName VARCHAR(40) not null,
  email VARCHAR(100)  not null UNIQUE,
  password VARCHAR(200) not null
);

CREATE TABLE signatures(
    user_id INTEGER REFERENCES users(id) NOT NULL UNIQUE,
    signature VARCHAR(10000),
    firstName VARCHAR(40),
    lastName VARCHAR (40)
);

CREATE TABLE user_profiles (
    user_id INTEGER REFERENCES users(id) UNIQUE,
    age INT,
    city VARCHAR(100),
    homepage VARCHAR(300)
);
