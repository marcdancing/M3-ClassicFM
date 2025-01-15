DROP TABLE IF EXISTS musicos; 
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE musicos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    musico TEXT NOT NULL,
    aportacion TEXT NOT NULL
);

INSERT INTO users (username, password)
VALUES ('test', 'hola123'); 