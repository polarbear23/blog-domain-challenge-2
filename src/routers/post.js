const express = require("express");
const { createPosts, getAllPosts, updatePost } = require("../controllers/post")

const router = express.Router();

router.post("/", createPosts);
router.get("/:id", getAllPosts);
router.put("/", updatePost);


module.exports = router;