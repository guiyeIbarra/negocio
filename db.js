// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // o el usuario que uses
  password: '',           // o la contraseña que configuraste
  database: 'negocio'     // la que creaste en phpMyAdmin
});

db.connect(err => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err);
    return;
  }
  console.log('🟢 Conectado a MySQL');
});

module.exports = db;
