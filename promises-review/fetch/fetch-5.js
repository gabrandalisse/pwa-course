// Error handling
const url = "https://reqres.in/api/users/10000";

fetch(url)
  .then((res) => {
    console.log("FETCH RES", res);

    if (res.ok) {
      res.json().then((user) => {
        console.log("USER", user);
      });

    } else {
      throw new Error("USER WITH ID 1000 DO NOT EXISTS");
    }
  })
  .catch((err) => {
    console.log("ERROR IN THE REQUEST", err);
  });
