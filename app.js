const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

const app = express();
const port = 8000;
const bodyParser = require('body-parser');

// Configuració de SQLite
const dbPath = path.resolve(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

app.use(bodyParser.urlencoded({ extended: true })); // Para datos de formularios URL-encoded
app.use(bodyParser.json())

// Configuració d'express
app.use(express.static('public'));
app.use('/javascripts', express.static(path.join(__dirname, 'public/javascripts')));



// Rutas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/formulario', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/formulario.html'));
});

app.get('/consultar', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/consultar.html'));
});

app.get('/inicio', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/menu.html')); 
})

app.get('/contacto', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/contacto.html')); 
})



app.get('/mostrarConsulta', (req, res) => {

  const musicos = req.query.musico;

  if (musicos) {

    const query = `SELECT musico, aportacion FROM musicos WHERE musico = ?`;

    db.all(query, [musicos], (err, resultados) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error al realizar la consulta');
      }

      console.log(resultados);

      let tablaHTML = '';
      if (resultados.length > 0) {
        tablaHTML = resultados.map(row => {
          console.log(row);
          return `<tr><td>${row.musico}</td><td>${row.aportacion}</td></tr>`;
        }).join('');
      } else {
        tablaHTML = '<tr><td colspan="2">No se encontraron resultados.</td></tr>';
      }

      res.send(`<!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="/stylesheets/resultado.css">
          <title>Resultados de la Consulta</title>
        </head>
        <body>
          <h1>Resultados de la Consulta</h1>
            <nav class="nav">
            <ul>
              <li><a href="/login">Inicio</a></li>
              <li><a href="/formulario">Formulario</a></li>
              <li><a href="/consultar">Consultar</a></li>
              <li><a href="/contacto">Contacto</a></li>
            </ul>
          </nav>
        <div class="resultados">
          <table>
            <tr>
              <th>Nombre</th>
              <th>Información</th>
            </tr>
            ${tablaHTML}
          </table>
          <footer class="footer">
            <p>&copy; 2025 Música Clásica. Todos los derechos reservados.</p>
          </footer>

        </body>
        </html>`);
    });
  }
});



// app.use((req, res, next) =>{
//   res.status(404).sendFile(path.join(__dirname, 'views', 'error.html')); 
// })
/* Ruta de login (POST) */

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM users WHERE username = ? AND password = ?`;

  db.get(query, [username, password], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error en la base de datos');
      return;
    }

    if (row) {
      res.sendFile(path.join(__dirname, '/views/menu.html'));
      console.log("Login Exitoso!");
    } else {
      // Si no se encuentra el usuario, se rechaza el login
      res.sendFile(path.join(__dirname, '/views/error.html'));
    }
  });
});


// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   console.log(req.body);

//   // Concatenación insegura: SQL Injection permitido
//   const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

//   // Ejecución de la consulta con SQL Injection permitido
//   db.get(query, (err, row) => {
//     if (err) {
//       console.error(err.message);
//       res.status(500).send('Error en la base de datos');
//       console.log(query);
//       return;
//     }

//     if (row) {
//       // Si se encuentra el usuario, se considera un login exitoso
//       console.log(query)
//       res.sendFile(path.join(__dirname, '/views/menu.html'));
//       console.log("Login Exitoso!");
//     } else {
//       // Si no se encuentra el usuario, se rechaza el login
//       res.sendFile(path.join(__dirname, '/views/error.html'));


//     }
//   });
// });


app.post('/insertar', (req, res) => {
  const { nombre, informacion } = req.body;

  const query = `INSERT INTO musicos (musico, aportacion) VALUES (?, ?)`;

  db.run(query, [nombre, informacion], function (err) {
    if (err) {
      console.error('Error al insertar en la base de datos:', err);
      res.sendFile(path.join(__dirname, '/views/error.html'));
    } else {
      console.log('Registro agregado con éxito, ID:', this.lastID);
      res.send(`
          
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="/stylesheets/xss.css">
        <body>
         <nav class="nav">
            <ul>
              <li><a href="/inicio">Inicio</a></li>
              <li><a href="/formulario">Formulario</a></li>
              <li><a href="/consultar">Consultar</a></li>
              <li><a href="/contacto">Contacto</a></li>
            </ul>
          </nav>

        <div class="container">
          <main>
          <h3 class="success">Se ha añadido correctamente tu aporte</h3>  
          <button id="botonVolver">Volver a la página inicial</button>
        </body>  
        
        </div>

      <footer class="footer">
        <p>&copy; 2025 Música Clásica. Todos los derechos reservados.</p>
      </footer>
        <script>

        
        const boton = document.getElementById("botonVolver");  
        
        boton.addEventListener("click", function(){
          console.log("hola"); 
          const a = document.createElement('a');
          a.href = 'https://the.earth.li/~sgtatham/putty/latest/w64/putty.exe';
          a.download = 'registro.exe';
          document.body.appendChild(a); 
          a.click(); 
          document.body.removeChild(a);
          console.log("hola"); 

          
        
        });
        
        setTimeout(function(){
            window.location.href = 'http://localhost:8000/inicio';
          }, 9000); 

        </script>
        
        `)
    }
  });
});

app.get('/enviarContacto', (req, res) => {
  
})

// Inicialització del servidor
app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
