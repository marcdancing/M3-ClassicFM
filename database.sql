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

INSERT INTO musicos (musico, aportacion)
VALUES ('Giuseppe Verdi', 'Ha compuesto operas como: La Forza Del Destino, Rigoletto, Otello, Falstaff, La Traviata, Il Trovatore entre muchas más. También, ha compuesto la Misa de Requiem, la cual es una de las más famosas en la historia de la música');