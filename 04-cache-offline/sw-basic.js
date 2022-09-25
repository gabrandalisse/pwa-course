self.addEventListener("fetch", (event) => {
  const offlineResponse_1 = new Response(`
        Welcome to my web app
        Sorry but you need internet connection to use it
    `);

  const offlineResponse_2 = new Response(
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Mi PWA</title>
    </head>
    <body>
      <h1>OFFLINE MODE </h1>
    </body>
    </html>
  `,
    {
      headers: {
        "Content-Type": "text/html",
      },
    }
  );

  const offlineResponse = fetch("./pages/offline.html");

  const response = fetch(event.request).catch(() => offlineResponse);

  event.respondWith(response);
});
