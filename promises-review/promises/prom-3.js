const returnTrue = () => true;

const addSlow = (number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(number + 1);
      //   reject('addSlow fail');
    }, 800);
  });

const addFast = (number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(number + 1);
    }, 300);
  });

// addSlow(5).then(console.log);
// addFast(10).then(console.log);

const randomArr = [addSlow(5), addFast(10), true, "Hello World", returnTrue()];

Promise.all(randomArr)
  .then((responses) => {
    console.log(responses);
  })
  .catch(console.log);
