const url = "https://reqres.in/api/users";

let user = {
  name: "morpheus",
  job: "leader",
};

fetch(url, {
  method: "POST",
  body: JSON.stringify(user),
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((user) => console.log("USER", user))
  .catch(console.error);
