// db.js
const mysql = require('mysql2');


/*
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // o el usuario que uses
  password: '',           // o la contraseña que configuraste
  database: 'negocio'     // la que creaste en phpMyAdmin
});
*/

const connection = mysql.createConnection({
  host: 'hopper.proxy.rlwy.net',
  port: 41480,
  user: 'root',
  password: 'UiflRBPDQpmYBukgxUabZiszvqVNnPLC',
  database: 'railway'
});
/*
db.connect(err => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err);
    return;
  }
  console.log('🟢 Conectado a MySQL');
});

module.exports = db;
*/

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos remota exitosa.');
});

module.exports = connection;