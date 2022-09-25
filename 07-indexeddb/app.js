// indexedDB: Reforzamiento

const request = window.indexedDB.open("my-database", 1);

// Se actualiza cuando se crea o se sube de version de la BD
request.onupgradeneeded = (event) => {
  console.log("Actualizacion de BD");

  const db = event.target.result;

  db.createObjectStore("heroes", {
    keyPath: "id",
  });
};

// Manejo de errores
request.onerror = (event) => {
  console.log("db error", event.target.error);
};

// Insertar datos
request.onsuccess = (event) => {
  const db = event.target.result;

  const heroesData = [
    {
      id: "1",
      heroe: "Spiderman",
      mensaje: "Hola k tal",
    },
    {
      id: "2",
      heroe: "Iron Man",
      mensaje: "Pues aki",
    },
  ];

  const heroesTransaction = db.transaction("heroes", "readwrite");

  heroesTransaction.onerror = (event) => {
    console.log("Error guardando", event.target.error);
  };

  heroesTransaction.oncomplete = (event) => {
    console.log("Transaccion realizada con exito", event);
  };

  const heroesStore = heroesTransaction.objectStore("heroes");

  heroesData.forEach((heroe) => {
    heroesStore.add(heroe);
  });

  heroesStore.onsuccess = (event) => {
    console.log("Nuevo item agregado a la base de datos");
  };
};
