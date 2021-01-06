DROP DATABASE IF EXISTS doctors_db;

CREATE DATABASE doctors_db;

USE doctors_db;

CREATE TABLE location(
    id int NOT NULL AUTO_INCREMENT,
    zipcode int NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE speciality(
    id int NOT NULL AUTO_INCREMENT,
    location_id int,
    speciality VARCHAR(45) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (location_id) REFERENCES location(id)
);



CREATE TABLE doctor (
  id int NOT NULL AUTO_INCREMENT,
  speciality_id int,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  phone char(10),
  PRIMARY KEY (id),
   FOREIGN KEY (speciality_id) REFERENCES speciality(id)
);
