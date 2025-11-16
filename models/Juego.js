const mongoose = require('mongoose');

const JuegoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del juego es obligatorio'],
    trim: true,
    unique: true
  },
  plataforma: {
    type: String,
    required: [true, 'La plataforma es obligatoria']
  },
  portadaURL: {
    type: String,
    required: false
  },
  estado: {
    type: String,
    enum: ['Pendiente', 'Jugando', 'Completado'],
    default: 'Pendiente'
  },
  horasJugadas: {
    type: Number,
    default: 0,
    min: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  genero: {
    type: String
  },
  dios: {
    type: String,
    enum: ['Apolo', 'Hécate', 'Ambos'],
    default: 'Apolo'
  },
  fechaAdquisicion: {
    type: String
  },
  ultimaSesion: {
    type: String
  },
  tags: {
    type: [String]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Juego', JuegoSchema);
