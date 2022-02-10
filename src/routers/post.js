const express = require("express");
const { createPosts, getAllPosts, updatePost, deletePost } = require("../controllers/post")

const router = express.Router();

router.post("/", createPosts);
router.get("/:id", getAllPosts);
router.put("/", updatePost);
router.delete("/:postId", deletePost);


module.exports = router;