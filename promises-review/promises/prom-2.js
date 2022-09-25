function addOne(number) {
  return new Promise((resolve, reject) => {
    console.log(`number in promise ${number}`);

    if (number >= 7) reject("number is too high");

    setTimeout(() => {
      resolve(number + 1);
    }, 800);
  });
}

addOne(5)
  .then(addOne)
  .then(addOne)
  .then(addOne)
  .then(addOne)
  .then(console.log)
  .catch((err) => console.log("ERROR", err));
