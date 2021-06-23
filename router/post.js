const { createPost, getPost, like } = require("../controller/post");

const router = require("express").Router();

router.post("/createNewPost", createPost);

router.get("/getPosts", getPost);

router.patch("/like", like);

module.exports = router;
