const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./model/user");

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

mongoose
  .connect("mongoURI: mongodb://localhost:27017/uplift", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const newF = (req, res, next) => {
  console.log("SECCOND");
  next();
};

app.get("/abc", newF, (req, res) => {
  console.log("HELLO THIS IS GET REQ");
  //   res.json({ message: "HEllo " });
  res.send({ message: "HEllo " });
});

app.get("/hello/:name", (req, res) => {
  const { name } = req.params;
  console.log(name);
  res.status(202).json({ name: name });
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

app.post("/createUser", (req, res) => {
  const user = new User({
    ...req.body,
  });

  console.log(user);

  user
    .save()
    .then((addedUser) => {
      console.log(addedUser);

      res.json({ user: addedUser });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error" });
    });
});

app.get("/getUsers", (req, res) => {
  User.find()
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error" });
    });
});

app.get("/getUsersByID/:id", (req, res) => {
  User.findById(req.params.id)
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error" });
    });
});

app.put("/editUser/:id", async (req, res) => {
  const { name } = req.body;

  // let foundUser;
  // try {
  //   foundUser = await User.findById(req.params.id);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json({ message: "Error" });
  // }

  // foundUser.name = name;

  // foundUser
  //   .save()
  //   .then((savedUser) => {
  //     res.json({ user: savedUser });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json({ message: "Error" });
  //   });

  User.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    { new: true }
  )
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error" });
    });
});

app.listen(5000, () => console.log("Server iss running"));
