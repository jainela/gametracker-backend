require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

// ===== Middlewares =====
app.use(cors());
app.use(express.json());

// ===== Conexión a MongoDB =====
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => {
    console.error('❌ Error de conexión a MongoDB:', err.message);
    process.exit(1);
  });

// ===== Rutas API =====
const juegoRoutes = require('./routes/juegoRoutes');
app.use('/api/juegos', juegoRoutes);

const resenaRoutes = require('./routes/resenaRoutes');
app.use('/api/resenas', resenaRoutes);

// ===== Servir frontend compilado (opcional) =====
// Si usas Vite → carpeta "dist"
// Si usas CRA → carpeta "build"
const frontendPath = path.join(__dirname, 'public');
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// ===== Manejo de errores global =====
app.use((err, req, res, next) => {
  console.error('❌ Error en servidor:', err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// ===== Inicio del servidor =====
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
