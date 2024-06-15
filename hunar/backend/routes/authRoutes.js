const express = require("express");
const { authUser, addUser,filter } = require("../controllers/user");
const router = express.Router();

router.route("/login").post(authUser);
router.route("/register").post(addUser);
router.route("/filter").put(filter);

module.exports = router;
