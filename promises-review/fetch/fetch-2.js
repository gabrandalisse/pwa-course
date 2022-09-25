const url = "https://reqres.in/api/users";

fetch(url)
  .then((res) => res.json())
  .then(console.log);
