const express = require("express");
const { createUser, updateUser, deleteUser } = require("../controllers/user")

const router = express.Router();

router.post("/", createUser);
router.put("/", updateUser);
router.delete("/:userId", deleteUser);


module.exports = router;