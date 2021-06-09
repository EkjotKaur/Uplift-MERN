const express = require("express");
const app = express();

//  get, post, put/patch, delete

// middlewares
// for incoming post requests
app.use(
  express.urlencoded({
    extended: false,
  })
);
// for sending data in json format (JSON.stringify)
app.use(express.json());

app.use("*", (req, res, next) => {
  console.log("I'm Middleware");
  next();
});

const newF = (req, res, next) => {
  console.log("SECCOND");
  next();
};

app.get("/abc", newF, (req, res) => {
  console.log("HELLO THIS IS GET REQ");
//   res.json({ message: "HEllo " });
    res.send({ message: "HEllo " });
});

app.post("/postr", (req, res) => {
  const { name, email } = req.body;
  // const name = req.body.name

  console.log(name);
  console.log(email);
  const newName = JSON.stringify(req.body);
  console.log(newName);
  const w = JSON.stringify(newName);
  console.log(JSON.parse(w));

  res.json({ data: { name, email } });
// res.json({data: JSON.stringify(req)})
});

app.get("/ab", (req, res) => {
  console.log("HELLO THIS IS GET REQ");

  res.json({ message: "HEllo " });

});

app.listen(5000, () => console.log("Server iss running"));
