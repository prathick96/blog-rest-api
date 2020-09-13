const express = require("express");
const Post = require("../models/post");
const Author = require("../models/author");
const PostRouter = express.Router();

// /posts - GET
// /posts/:id - GET
// /posts - POST

PostRouter.get("/", async (req, res) => {
  // res.status(404).send("not found");
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
      const post = await Post.findById(id);
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
      const result = await new Post({
        title,
        content,
        author: authorId
      }).save();
      res.status(200).json({
        result
      });
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error!");
    }
  });

module.exports = PostRouter;
