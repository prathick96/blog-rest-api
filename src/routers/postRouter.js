const express = require("express");
const Post = require("../models/post");

const PostRouter = express.Router();

PostRouter.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}).populate("author");
    res.status(200).json({
      posts
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error!");
  }
})
  .get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findById(id).populate("author");
      res.status(200).json({
        post
      });
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error!");
    }
  })
  .get("/author/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.find({ author: id }).populate("author");
      res.status(200).json({
        post
      });
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error!");
    }
  })
  .post("/", async (req, res) => {
    try {
      const { title, content, authorId } = req.body;
      console.log(title, content, authorId);
      const result = await new Post({
        title,
        content,
        author: authorId
      });
      result.save();
      res.status(200).json({
        result
      });
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error!");
    }
  });

module.exports = PostRouter;
