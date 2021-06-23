const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./model/user");
const Post = require("./model/post");
const keys = require("./keys");

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

const MONGOURI = keys.MONGOURI;
// const MONGOURI = "mongodb://localhost:27017/uplift"

mongoose
  .connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const userRouter = require("./router/user");
const postRouter = require("./router/post");

app.use("/user", userRouter);
app.use("/post", postRouter);

// const newF = (req, res, next) => {
//   console.log("SECCOND");
//   next();
// };
// const newFunc = (req, res) => {

// }

// app.get('/abc', newFunc)
// app.get("/abc", newF, (req, res) => {
//   console.log("HELLO THIS IS GET REQ");
//   //   res.json({ message: "HEllo " });
//   res.send({ message: "HEllo " });
// });

// app.get("/hello/:name", (req, res) => {
//   const { name } = req.params;
//   console.log(name);
//   res.status(202).json({ name: name });
// });

// app.post("/postr", (req, res) => {
//   const { name, email } = req.body;
//   // const name = req.body.name

//   console.log(name);
//   console.log(email);
//   const newName = JSON.stringify(req.body);
//   console.log(newName);
//   const w = JSON.stringify(newName);
//   console.log(JSON.parse(w));

//   res.json({ data: { name, email } });
//   // res.json({data: JSON.stringify(req)})
// });

// app.get("/ab", (req, res) => {
//   console.log("HELLO THIS IS GET REQ");

//   res.json({ message: "HEllo " });
// });

// app.get("/getUsers", (req, res) => {
//   User.find()
//     .then((users) => {
//       res.json({ users });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ message: "Error" });
//     });
// });

// app.get("/getUsersByID/:id", (req, res) => {
//   User.findById(req.params.id)
//     .then((users) => {
//       res.json({ users });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ message: "Error" });
//     });
// });

// app.put("/editUser/:id", async (req, res) => {
//   const { name } = req.body;

//   // let foundUser;
//   // try {
//   //   foundUser = await User.findById(req.params.id);
//   // } catch (err) {
//   //   console.log(err);
//   //   res.status(500).json({ message: "Error" });
//   // }

//   // foundUser.name = name;

//   // foundUser
//   //   .save()
//   //   .then((savedUser) => {
//   //     res.json({ user: savedUser });
//   //   })
//   //   .catch((err) => {
//   //     console.log(err);
//   //     res.status(500).json({ message: "Error" });
//   //   });

//   User.findByIdAndUpdate(
//     req.params.id,
//     {
//       name,
//     },
//     { new: true }
//   )
//     .then((user) => {
//       res.json({ user });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ message: "Error" });
//     });
// });

// app.delete("/deleteUser/:id", (req, res) => {
//   User.findByIdAndDelete(req.params.id)
//     .then((deleteUser) => {
//       res.status(200).json({ data: deleteUser });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ message: "Error" });
//     });
// });

// app.delete("/deleteUserByIds", (req, res) => {
//   const { ids } = req.body;
//   User.deleteMany({ _id: { $in: ids } })
//     .then((deleteUser) => {
//       res.status(200).json({ data: deleteUser });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ message: "Error" });
//     });
// });

// app.post("/createNewPost", async (req, res) => {
//   const { userId } = req.body;

//   let foundUser;
//   try {
//     foundUser = await User.findById(userId);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Error" });
//   }

//   if (!foundUser) {
//     res.status(500).json({ message: "User not found" });
//   }

//   const post = new Post({
//     ...req.body,
//     createdBy: foundUser,
//   });

//   post
//     .save()
//     .then((savedUse) => {
//       res.status(200).json({ data: savedUse });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ message: "Error" });
//     });
// });

// app.get("/getPosts", (req, res) => {
//   Post.find()
//     .populate("createdBy", "name email")
//     .then((posts) => {
//       res.status(200).json({ data: posts });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ message: "Error" });
//     });
// });

// app.get("/getCount", (req, res) => {
//   User.find({ age: 8 })
//     .count()
//     .then((result) => res.json({ data: result }))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ message: "Error" });
//     });
// });

// app.get("/getSum", (req, res) => {
//   User.aggregate([{ $group: { _id: "$age", sumOfAge: { $sum: 1 } } }])
//     .then((result) => res.json({ data: result }))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ message: "Error" });
//     });
// });

app.listen(5000, () => console.log("Server iss running"));

// A9QKovNVbhUmcN2x
