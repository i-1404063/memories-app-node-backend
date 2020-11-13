const mongoose = require("mongoose");
const Post = require("../models/postModel");

const getPost = async (req, res) => {
  try {
    const postMessages = await Post.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: "Post Not Found" });
  }
};

const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json("No post with that id.");

  const post = req.body;
  const updatedPost = await Post.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );
  res.status(200).json(updatedPost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ message: "post with the given id not found." });

  await Post.findByIdAndRemove(id);

  res.json({ message: "successfully removed." });
};

const likePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ message: "Could not find the post." });
  }

  const newPost = await Post.findByIdAndUpdate(
    _id,
    { $inc: { likeComment: 1 } },
    { new: true }
  );

  res.json({ message: "like added", post: newPost });
};

module.exports.posts = {
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
};
