const mongoose = require('mongoose');

const ReseñaSchema = new mongoose.Schema({
  juego: { type: String, required: true },
  juegoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Juego' },
  autor: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  fecha: { type: String },
  titulo: { type: String },
  contenido: { type: String },
  horasJugadas: { type: Number, default: 0 },
  completado: { type: Boolean, default: false },
  plataforma: { type: String },
  dios: { type: String, enum: ['Apolo', 'Hécate', 'Ambos'], default: 'Apolo' },
  likes: { type: Number, default: 0 },
  tags: { type: [String] }
}, { timestamps: true });

module.exports = mongoose.model('Reseña', ReseñaSchema);
