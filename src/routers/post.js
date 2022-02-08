const express = require("express");
const { createPosts } = require("../controllers/post")

const router = express.Router();

router.post("/", createPosts);


module.exports = router;