const express = require("express");
const Author = require("../models/author");

const AuthorRouter = express.Router();

AuthorRouter.get("/", async (req, res) => {
  try {
    const authors = await Author.find({});
    res.status(200).json({ authors });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
})
  .get("/:id", async (req, res) => {
    try {
      const author = await Author.findById(req.params.id);
      res.status(200).json({ author });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  })
  .post("/", async (req, res) => {
    try {
      const { name } = req.body;
      const result = await new Author({
        name
      }).save();
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  });

module.exports = AuthorRouter;
