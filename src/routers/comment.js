const express = require("express");
const { createComment, updateComment, deleteComment } = require("../controllers/comment")

const router = express.Router();

router.post("/", createComment);
router.put("/", updateComment);
router.delete("/:commentId", deleteComment);
module.exports = router;