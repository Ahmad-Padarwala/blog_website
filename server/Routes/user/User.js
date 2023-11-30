const express = require("express");
const router = express.Router();

const User = require("../../Controllers/user/User");

router.route("/users").get(User.getUser);

module.exports = router;
