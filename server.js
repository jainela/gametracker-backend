require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URL)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => {
    console.error('❌ Error de conexión:', err.message);
    process.exit(1);
  });

const juegoRoutes = require('./routes/juegoRoutes');
app.use('/api/juegos', juegoRoutes);
const resenaRoutes = require('./routes/resenaRoutes');
app.use('/api/resenas', resenaRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
