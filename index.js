const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
const db = require('./db');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Para servir las imágenes

// Configuración de multer (para subir imágenes)
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Ruta para obtener productos
app.get('/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Ruta para agregar productos
app.post('/productos', upload.single('imagen'), (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  const imagen_url = `http://localhost:3000/uploads/${req.file.filename}`;

  db.query(
    'INSERT INTO productos (nombre, descripcion, precio, imagen_url) VALUES (?, ?, ?, ?)',
    [nombre, descripcion, precio, imagen_url],
    (err, result) => {
      if (err) {
        console.error('❌ Error al guardar producto:', err);
        return res.status(500).send(err);
      }
      res.status(200).json({ mensaje: 'Producto agregado exitosamente' });
    }
  );
});

// Eliminar producto por ID
app.delete('/productos/:id', (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM productos WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('❌ Error al eliminar producto:', err);
      return res.status(500).send(err);
    }

    res.json({ mensaje: 'Producto eliminado correctamente' });
  });
});


// Iniciar el servidor
app.listen(3000, () => {
  console.log('🟢 Conectado y servidor corriendo en http://localhost:3000');
});
