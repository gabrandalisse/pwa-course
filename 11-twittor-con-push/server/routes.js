// Routes.js - Módulo de rutas
const express = require("express");
const router = express.Router();
const push = require('./push'); 

const mensajes = [
  {
    _id: "XXX",
    user: "spiderman",
    mensaje: "Hola Mundo",
  },
];

// Get mensajes
router.get("/", function (req, res) {
  // res.json('Obteniendo mensajes');
  res.json(mensajes);
});

// Post mensaje
router.post("/", function (req, res) {
  const mensaje = {
    mensaje: req.body.mensaje,
    user: req.body.user,
  };

  mensajes.push(mensaje);

  console.log(mensajes);

  res.json({
    ok: true,
    mensaje,
  });
});

// Post almacenar suscripcion
router.post("/subscribe", function (req, res) {
  const suscripcion = req.body;

  push.addSubscription(suscripcion);

  res.json({
    ok: true,
  });
});

// Get obtener key publico
router.get("/key", function (req, res) {
  const key = push.getKey();
  res.send(key);
});

// Post enviar notificacion PUSH a los usuarios 
// Esto no es algo que se haga, esto se controla de otro lado
// Se hace para fines practicos
router.post("/push", function (req, res) {
  const notificacion = {
    titulo: req.body.titulo,
    cuerpo: req.body.cuerpo,
    usuario: req.body.usuario
  };

  push.sendPush(notificacion);

  res.json(notificacion);
});

module.exports = router;

/**
 * curl --location --request POST 'localhost:3000/api/push' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'titulo=Saludos Linces!' \
--data-urlencode 'cuerpo=Sale CS 1.6?' \
--data-urlencode 'usuario=thor'
 */