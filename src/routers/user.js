const express = require("express");
const { createUser, updateUser } = require("../controllers/user")

const router = express.Router();

router.post("/", createUser);
router.put("/", updateUser);


module.exports = router;