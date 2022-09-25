function addOne(number, callback) {
  if (numer >= 7) {
    callback("numer is too high");
    return;
  }

  setTimeout(() => {
    callback(null, number + 1);
  }, 800);
}

// Callback hell
addOne(5, (error, newValue) => {
  if (error) {
    console.log(error);
    return;
  }

  addOne(newValue, (error, secondNewValue) => {
    if (error) {
      console.log(error);
      return;
    }

    console.log("second new value", secondNewValue);

    addOne(secondNewValue, (error, thirdNewValue) => {
      if (error) {
        console.log(error);
        return;
      }

      console.log("third new value", thirdNewValue);
    });
  });
});
