const router = require("express").Router();
const Post = require("../models/postsModel");

//CREATE A POST

router.post("/createPost", async (req, res) => {
  try {
    const newPost = new Post({
      posttitle: req.body.posttitle,
      description: req.body.description,
      username: req.body.username,
    });
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS

router.get("/allPosts", async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.status(200).json(allPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET SINGLE POST

router.get("/:id", async (req, res) => {
  try {
    const singlePost = await Post.findById(req.params.id);
    res.status(200).json(singlePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE A POST

router.put("/:id", async (req, res) => {
  if (req.params.id === req.body.id) {
    try {
      await Post.findByIdAndUpdate(req.params.id);
      res.status(200).json("The post was updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You are allowed to updated only your account!");
  }
});

//DELETE A POST

router.delete("/:id", async (req, res) => {
  if (req.params.id === req.body.id) {
    try {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json("The post was deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You are allowed to delete only your account!");
  }
});

module.exports = router;
