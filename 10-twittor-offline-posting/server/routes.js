// Routes.js - Módulo de rutas
const express = require("express");
const router = express.Router();

const mensajes = [
  {
    _id: "1",
    user: "spiderman",
    mensaje: "Hola Mundo!",
  },
  {
    _id: "2",
    user: "ironman",
    mensaje: "Ola k ase",
  },
  {
    _id: "3",
    user: "thor",
    mensaje: "Thunderrrr",
  },
];

// Get mensajes
router.get("/", function (req, res) {
  res.json(mensajes);
});

router.post("/", function (req, res) {
  mensajes.push({
    ...req.body
  });
  
  console.log(mensajes);
  
  res.json({
    ok: true
  })
});

module.exports = router;
