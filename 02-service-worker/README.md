The Response object is the object that all fetch request returns 

- Change the css of the page
```
self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("style.css")) {
    const rta = new Response(
      `
            body {
                background-color: red !important;
                color: pink;
            }
        `,
      {
        headers: {
          "Content-Type": "text/css",
        },
      }
    );

    event.respondWith(rta);
  }
});
```

- Change the img of the page
```
self.addEventListener("fetch", (event) => {
  if (event.request.url.includes(".jpg")) {
    const newImg = fetch("img/main-patas-arriba.jpg");
    event.respondWith(newImg);
  }
});
```