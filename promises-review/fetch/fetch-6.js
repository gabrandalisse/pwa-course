fetch("not-found.html")
  .then((res) => res.text())
  .then((page) => {
    const body = document.querySelector("body");
    body.innerHTML = page;
  })
  .catch((error) => {
    console.log("ERROR", error);
  });
