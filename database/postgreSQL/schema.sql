drop database if exists timcamp;

create database timcamp;

\c timcamp;

CREATE TABLE sites (
  id SERIAL PRIMARY KEY,
  sitename VARCHAR NOT NULL,
  sitearea VARCHAR NOT NULL,
  sitestate VARCHAR NOT NULL,
  elevation SMALLINT NOT NULL,
  temperature SMALLINT NOT NULL,
  weather VARCHAR NOT NULL,
  distance numeric(10, 2) NOT NULL
);

CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  price VARCHAR(255),
  image VARCHAR(255)
);

CREATE TABLE activities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL
);

CREATE TABLE terrain (
  id SMALLINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL
);

CREATE TABLE photos (
  id SMALLINT NOT NULL,
  photo VARCHAR(255) NOT NULL,
  userName VARCHAR(255) NOT NULL,
  userImage VARCHAR(255) NOT NULL,
  date VARCHAR(255) NOT NULL,
  likes SMALLINT NOT NULL,
  caption VARCHAR(255) NOT NULL
);

CREATE TABLE attractions (
  id SMALLINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  distance SMALLINT NOT NULL
);
