const express = require('express');
const router = express.Router();
const Reseña = require('../models/Resena');


// GET todas las reseñas
router.get('/', async (req, res) => {
  try {
    const reseñas = await Reseña.find();
    res.json(reseñas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener reseñas' });
  }
});

// POST nueva reseña
router.post('/', async (req, res) => {
  try {
    const nuevaReseña = new Reseña(req.body);
    const reseñaGuardada = await nuevaReseña.save();
    res.status(201).json(reseñaGuardada);
  } catch (err) {
    res.status(400).json({ error: 'Error al agregar reseña', details: err.message });
  }
});

// PUT editar reseña
router.put('/:id', async (req, res) => {
  try {
    const reseñaActualizada = await Reseña.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(reseñaActualizada);
  } catch (err) {
    res.status(400).json({ error: 'Error al editar reseña', details: err.message });
  }
});

// DELETE eliminar reseña
router.delete('/:id', async (req, res) => {
  try {
    await Reseña.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Reseña eliminada correctamente' });
  } catch (err) {
    res.status(400).json({ error: 'Error al eliminar reseña', details: err.message });
  }
});

module.exports = router;
