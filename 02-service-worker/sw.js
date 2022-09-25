self.addEventListener("fetch", (event) => {
  const rta = fetch(event.request).then((res) =>
    res.ok ? res : fetch("img/main.jpg")
  );

  event.respondWith(rta);
});
