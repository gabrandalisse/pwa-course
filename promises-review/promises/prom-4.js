const addSlow = (number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(number + 1);
    }, 800);
  });

const addFast = (number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve(number + 1);
      reject("addFast failed");
    }, 300);
  });

Promise.race([addSlow(5), addFast(10)])
  .then((fastestResponse) => console.log(fastestResponse))
  .catch(console.log);
