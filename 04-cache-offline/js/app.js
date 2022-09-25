if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
}

// if (window.caches) {
//     // Abre y si no existe lo crea
//     caches.open('prueba-1');
//     caches.open('prueba-2');

//     // Preg si existe
//     // caches.has('prueba-2').then(console.log);

//     //Borrar cache
//     // caches.delete('prueba-1').then(console.log); // return true si lo borro bien

//     // es como abrir la conexion a la base de datos, abre y te devuelve el obj cache
//     caches.open('cache-v1.1').then(cache => {
//         // cache.add('/index.html');

//         cache.addAll([
//             '/index.html',
//             '/css/style.css',
//             '/img/main.jpg'
//         ]).then(() => {
//             // lo ponemos adentro de una promesa porque es mas rapido el borrado que el add ALL

//             // Para borrar algo del cache especifico
//             // cache.delete('/css/style.css');

//             // reemplazar index con otra cosa
//             cache.put('/index.html', new Response('Hello World!'));
//         });

//         // leer un archivo que se encuentra en el cache
//         // cache.match('/index.html').then(res => {
//         //     res.text().then(console.log);
//         // });
//     });

//     // Obtener todos los caches
//     caches.keys().then(keys => console.log('all caches', keys));
// }