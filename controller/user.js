exports.hello = (req, res) => {
  res.json({ message: "i'm using router" });
};

exports.createUser = (req, res) => {
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
};
