const express = require('express');
const router = express.Router();
const Juego = require('../models/Juego');

// GET todos los juegos
router.get('/', async (req, res) => {
  try {
    const juegos = await Juego.find();
    res.json(juegos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener juegos' });
  }
});

// POST nuevo juego
router.post('/', async (req, res) => {
  try {
    const nuevoJuego = new Juego(req.body);
    const juegoGuardado = await nuevoJuego.save();
    res.status(201).json(juegoGuardado);
  } catch (err) {
    res.status(400).json({
      error: 'Error al agregar juego. Verifique campos',
      details: err.message
    });
  }
});

// PUT editar juego
router.put('/:id', async (req, res) => {
  try {
    const juegoActualizado = await Juego.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(juegoActualizado);
  } catch (err) {
    res.status(400).json({ error: 'Error al editar juego', details: err.message });
  }
});

// DELETE eliminar juego
router.delete('/:id', async (req, res) => {
  try {
    await Juego.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Juego eliminado correctamente' });
  } catch (err) {
    res.status(400).json({ error: 'Error al eliminar juego', details: err.message });
  }
});

module.exports = router;
