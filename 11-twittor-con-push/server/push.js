const fs = require("fs");
const webpush = require("web-push");
const vapid = require("./vapid.json");
const urlSafeBase64 = require("urlsafe-base64");

webpush.setVapidDetails(
  "mailto:gabiandres_00@hotmail.com",
  vapid.publicKey,
  vapid.privateKey
);

let SUSCRIPCIONES = require("./subs-db.json");

module.exports.getKey = () => {
  return urlSafeBase64.decode(vapid.publicKey);
};

module.exports.addSubscription = (suscripcion) => {
  SUSCRIPCIONES.push(suscripcion.suscripcion);
  fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(SUSCRIPCIONES));
};

// post is the info that we wan to send trough the push notification
module.exports.sendPush = (post) => {
  const notificacionesEnviadas = [];

  SUSCRIPCIONES.forEach((suscripcion, i) => {
    const pushProm = webpush
      .sendNotification(suscripcion, JSON.stringify(post))
      .then(console.log("notificacion enviada"))
      .catch((err) => {
        console.log("notificacion fallo");

        // 410 GONE ya no existe
        if (err.statusCode === 410) {
          SUSCRIPCIONES[i].borrar = true;
        }
      });

      notificacionesEnviadas.push(pushProm);
  });

  Promise.all(notificacionesEnviadas).then(() => {
    SUSCRIPCIONES = SUSCRIPCIONES.filter(subs => !subs.borrar);
    fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(SUSCRIPCIONES));
  });
};
