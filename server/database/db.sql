CREATE DATABASE IF NOT EXISTS contacts;
USE contacts;

CREATE TABLE IF NOT EXISTS users (
  fullname varchar(255),
  username varchar(255),
  email varchar(255) UNIQUE,
  password varchar(255),
  PRIMARY KEY (username)
);

CREATE TABLE IF NOT EXISTS contacts (
  contactId int not null auto_increment,
  name varchar(255),
  email varchar(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user varchar(255) not null,
  PRIMARY KEY (contactId),
  FOREIGN KEY (user) REFERENCES users(username)
);