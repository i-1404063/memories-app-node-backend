const express = require("express");
const asyncHandler = require("express-async-handler");

const router = express.Router();
const { posts } = require("../controllers/posts");

// @get posts route
router.get("/", asyncHandler(posts.getPost));
router.post("/", asyncHandler(posts.createPost));
router.patch("/:id", asyncHandler(posts.updatePost));
router.delete("/:id", asyncHandler(posts.deletePost));
router.patch("/:id/likepost", asyncHandler(posts.likePost));

module.exports = router;
