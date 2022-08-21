const router = require("express").Router();
const User = require("../models/usersModel");
const Post = require("../models/postsModel");

const bcrypt = require("bcrypt");

//Registration
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json("Signed up successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Logging

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(401).json("Wrong credentials!");

    res.status(200).json(user);
  } catch (err) {
    res.json(err);
  }
});

//Displaying all users

router.get("/allUsers", async (req, res) => {
  try {
    const allUsers = await User.find({});

    res.status(200).json(allUsers);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Display only one user

router.get("/:id", async (req, res) => {
  try {
    const singleUser = await User.findById(req.params.id);

    res.status(200).json(singleUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Updating one user

router.put("/:id", async (req, res) => {
  if (req.body.id === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(401).json("You can update your account only");
  }
});

//Deleting one user

router.delete("/:id", async (req, res) => {
  if (req.params.id === req.body.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await user.delete();
        res.status(200).json("User was deleted successfully!");
      } catch (err) {
        res.status(404).json(err);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});
module.exports = router;
