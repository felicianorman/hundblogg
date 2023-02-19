const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    user: {
      type: String,
    },
    title: {
        type: String,
        required: true,
        minLenght: 2,
        maxLenght: 50
    },
    blogPost: {
        type: String,
        required: true,
        minLenght: 3
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Blog', blogSchema)