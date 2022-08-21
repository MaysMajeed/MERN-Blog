const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    posttitle: { type: String, required: true },
    description: { type: String, required: true },
    username: { type: String },
    categories: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
