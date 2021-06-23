const router = require("express").Router();

const { hello, createUser } = require("../controller/user");

router.get("/usingRouter", hello);

router.post("/createUser", createUser);

module.exports = router;
