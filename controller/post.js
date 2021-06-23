exports.createPost = async (req, res) => {
  const { userId } = req.body;

  let foundUser;
  try {
    foundUser = await User.findById(userId);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }

  if (!foundUser) {
    res.status(500).json({ message: "User not found" });
  }

  const post = new Post({
    ...req.body,
    createdBy: foundUser,
  });

  post
    .save()
    .then((savedUse) => {
      res.status(200).json({ data: savedUse });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error" });
    });
};

exports.getPost = (req, res) => {
  Post.find()
    .populate("createdBy", "name email")
    .populate("likes")
    .then((posts) => {
      res.status(200).json({ data: posts });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error" });
    });
};

exports.like = async (req, res) => {
  const { postID, userID } = req.body;

  let foundPost;
  try {
    foundPost = await Post.findById(postID);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }

  if (!foundPost) {
    res.status(500).json({ message: "Post not found" });
  }

  let foundUser;
  try {
    foundUser = await User.findById(userID);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }

  if (!foundUser) {
    res.status(500).json({ message: "User not found" });
  }

  console.log(typeof foundUser);
  console.log(typeof foundUser._id);

  if (!foundPost.likes.includes(foundUser._id)) {
    foundPost.likes.push(foundUser._id);
    foundPost
      .save()
      .then((savedPost) => {
        res.status(200).json({ data: savedPost });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Error" });
      });
  } else {
    res.status(200).json({ data: foundPost });
  }
};
