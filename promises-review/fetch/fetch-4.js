// Set an img in the html from a fetch request

let img = document.querySelector("img");

fetch("superman.png")
  .then((resp) => resp.blob())
  .then((image) => {
    const imgPath = URL.createObjectURL(image);
    img.src = imgPath;
  });
